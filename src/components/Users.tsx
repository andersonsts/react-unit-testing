import React, { useEffect, useState } from "react"
import getUsers from "../services/users"

interface User {
  name: string 
  id: number
  username: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getUsers().then(data => setUsers(data)).catch(_ => setError('error'))
  }, [])

  const handleErr = () => setError('')

  if (!!error) return <div onClick={handleErr}>Error :/</div>
  
  return (
    <>
      {users.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
          <strong>{item.name}</strong>
          <p>{item.username}</p>
        </div>
      ))}
    </>
  )
}