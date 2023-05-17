// Librarys
import React from 'react'

// Services
import ApiProfile from '../services/ApiProfile'

// Constants
import { APPLICATION_ID, CALLER_ID, WIX_APP_URL } from './constants'
import isObject from '../utils/isObject'

const apiProfile = new ApiProfile('MI_API_KEY')

/**
 * Hook that implemenents the requests of the Profile component
 * @returns {object} Object
 */
export default function useProfile() {
  const [message, setMessage] = React.useState('')
  const [profile, setProfile] = React.useState([])

  // Callback for get profiles
  const getProfiles = React.useCallback(async () => {
    try {
      const data = await apiProfile.get({ url: '/_functions/pinchCorsTest' })

      // Cors response not exists in data
      if (!('corsResponse' in data)) return

      console.log('[Getting Profile.....]', data);
      setProfile(data)
    } catch (error) {
      console.log('[Bad Getting Profile.....]', error)
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener('load', getProfiles)

    return () => {
      window.removeEventListener('load', getProfiles)
    }
  }, [profile])

  // This hook is listening an event that came from the Iframe
  React.useEffect(() => {
    console.log('[handler]')

    const handler = (ev) => {
      console.log('[handler.event]', ev)
      if (!isObject(ev.data)) return
      if (!ev.data.callerId) return
      if (ev.data.callerId !== CALLER_ID)
      if (!ev.data.userId) return
      if (!ev.data.userName) return
      if (!ev.data.userAvatar) return
      console.log('[VALIDATION-OK]');
      setMessage(ev.data);
    }

    // Define message to send
    const messageToSend = {
      applicationId: APPLICATION_ID
    };

    // Post message
    window.parent.postMessage(messageToSend, WIX_APP_URL)

    window.addEventListener('message', handler)

    // Don't forget to remove addEventListener
    return () => window.removeEventListener('message', handler)
  }, [])

  return {
    message: message,
    profile: profile
  }
}