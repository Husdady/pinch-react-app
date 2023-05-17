import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function Profile() {
  //const API_URI = 'https://proxy.rsamanez.workers.dev?https://pro.pinch.cleaning/_functions/pinchCorsTest'
  const API_URI = 'https://pro.pinch.cleaning/_functions/pinchCorsTest'
  const [profile, setProfile] = useState([])
  const getProfiles = async () => {
    try {
      const fetchData = await axios.get(API_URI, {
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
      })
      console.log('Getting Profile.....', fetchData.data);
      setProfile(fetchData.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.addEventListener('load', getProfiles)
    return () => {
      window.removeEventListener('load', getProfiles)
    }
  }, [profile])

  const [message, setMessage] = useState('')
  // This hook is listening an event that came from the Iframe
  useEffect(() => {
    const handler = (ev: MessageEvent<{ type: string, message: string }>) => {
      console.log('ev', ev)
      if (typeof ev.data !== 'object') return
      if (!ev.data.callerId) return
      if (!ev.data.userId) return
      if (!ev.data.userName) return
      if (!ev.data.userAvatar) return
      console.log('VALIDATION-OK');
      setMessage(ev.data);
    }

    window.addEventListener('message', handler)

    // Don't forget to remove addEventListener
    return () => window.removeEventListener('message', handler)
  }, [])
  return (
    <div>
      <h5 className="mb-4">React Axios HTTP GET Request Example</h5>
      <h5 className="card-title">{profile.corsResponse}</h5>
      <h4>CallerId: {message.callerId}</h4>
      <h4>UserId: {message.userId}</h4>
      <h4>UserName: {message.userName}</h4>
      <h4>Avatar URL: {message.userAvatar}</h4>
      <h4>Message: {message.personalData}</h4>
    </div>
    // <div>
    //   <h5 className="mb-4">React Axios HTTP GET Request Example</h5>
    //   <h5 className="card-title">{profile.corsResponse}</h5>
    // </div>
  )
}