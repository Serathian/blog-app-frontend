import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from '../../reducers/userReducer'
import User from './User'

const UserList = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users
            .sort((a, b) => b.blogs - a.blogs)
            .map((user) => (
              <User key={user.id} user={user} />
            ))}
        </tbody>
      </table>
    </div>
  )
}
const mapStateToProps = (state) => {
  return { users: state.users.userList }
}

const mapDispatchToProps = {
  getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
