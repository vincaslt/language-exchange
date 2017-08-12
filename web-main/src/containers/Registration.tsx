import { connect } from 'react-redux'
import { Registration } from '../components/Registration'
import { actions } from '../modules/user'

const mapDispatchToProps = {
  onSubmit: (username: string, password: string) => actions.requestCreateUser({ username, password })
}

const ConnectedRegistration = connect(null, mapDispatchToProps)(Registration)

export { ConnectedRegistration as Registration }