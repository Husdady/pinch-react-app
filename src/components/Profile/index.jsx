// Librarys
import React from 'react'

// Hooks
import useProfile from './useProfile'

export default function Profile() {
  const { profile, message } = useProfile()

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
  )
}