import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2><b>Users</b></h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList