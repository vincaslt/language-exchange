import { connect } from 'react-redux'
import { Login } from '../components/Login'
import { actions } from '../modules/token'

const mapDispatchToProps = {
  onSubmit: (username: string, password: string) => actions.login({ username, password })
}

const ConnectedLogin = connect(null, mapDispatchToProps)(Login)

export { ConnectedLogin as Login }