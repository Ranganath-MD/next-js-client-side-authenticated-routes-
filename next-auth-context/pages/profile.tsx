import React from 'react'
import { Button } from 'semantic-ui-react'

const Profile = () => {
  return (
    <div>
      <h1>Profile page</h1>
      <Button secondary>Logout</Button>
    </div>
  )
}

Profile.requiresAuth = true;

export default Profile