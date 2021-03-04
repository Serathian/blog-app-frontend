import React from 'react'
import { connect } from 'react-redux'
import Togglable from '../misc/Togglable'
import { userLogin } from '../../reducers/loginReducer'
import userService from '../../services/users'

const NewUser = ({ userLogin }) => {
  const handleCreateUser = (e) => {
    e.preventDefault()
    const username = e.target.newusername.value
    const name = e.target.newname.value
    const password = e.target.newpassword.value
    createNewUser(username, name, password)
    e.target.reset()
  }

  const createNewUser = async (username, name, password) => {
    console.log('new user called')
    const newUser = await userService.createNew({
      username,
      name,
      password,
    })
    console.log('new user returned: ', newUser)
    if (newUser.id) {
      userLogin(username, password)
    }
  }

  return (
    <Togglable defaultVisibility={false} buttonLabel='Create User'>
      <div>
        <form onSubmit={(e) => handleCreateUser(e)}>
          <div>
            username
            <input id='newusername' type='text' name='Username' />
          </div>
          <div>
            name
            <input id='newname' type='text' name='Name' />
          </div>
          <div>
            password
            <input id='newpassword' type='password' name='Password' />
          </div>
          <div>
            <button id='create-button' type='submit'>
              Create
            </button>
          </div>
        </form>
      </div>
    </Togglable>
  )
}

const mapDispatchToProps = {
  userLogin,
}

export default connect(null, mapDispatchToProps)(NewUser)
