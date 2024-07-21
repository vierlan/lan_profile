import React from 'react'

function ProfileData({userData}) {
  console.log(userData)

  return (
    <>

      {userData && (
        <div className="profile-text">
          <h2>Profile Data For: {userData.username}</h2>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
        </div>
      )}

    </>
  )
}

export default ProfileData
