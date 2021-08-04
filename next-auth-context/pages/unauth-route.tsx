import React from 'react'

const UnAuth = () => {
  return (
    <div>
      <h1>Unauth</h1>
    </div>
  )
}
UnAuth.requiresAuth = false;
UnAuth.displayName = "unauth";

export default UnAuth
