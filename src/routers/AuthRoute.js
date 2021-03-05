import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = ({ isAuthUser, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthUser === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/loginpage' />
        )
      }
    />
  )
}

const mapStateToProps = (props) => ({
  isAuthUser: props.curUser.isAuthUser,
})

export default connect(mapStateToProps)(AuthRoute)
