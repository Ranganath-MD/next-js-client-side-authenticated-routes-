import React from 'react'
import withAuth from "../utils/withAuth";

const Profile = () => {
  return (
    <div>
      <h1>Profile page</h1>
      <button>Logout</button>
    </div>
  )
}

export default withAuth(Profile)