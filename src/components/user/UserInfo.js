import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getUser } from '../../reducers/userReducer'

const UserInfo = ({ getUser, user }) => {
  const match = useRouteMatch('/user/:id')
  const id = match.params.id
  useEffect(() => {
    getUser(id)
  }, [getUser, id])

  if (user.id === id) {
    return (
      <div>
        <ul>
          <li>Name: {user.name}</li>
          <li>Username: {user.username}</li>
          <li>Blogs: </li>
          <ul>
            {user.blogs.length === 0 ? (
              <li>No blogs found</li>
            ) : (
              user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
            )}
          </ul>
        </ul>
      </div>
    )
  } else {
    return <div>User not found</div>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.singleUser,
  }
}

const mapDispatchToProps = { getUser }
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
