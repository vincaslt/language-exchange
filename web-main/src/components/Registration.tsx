import * as React from 'react'
import { InputField } from '../ui/InputField'
import { Button } from '../ui/Button'

interface Props {
  onSubmit: (username: string, password: string) => {}
}

interface State {
  username: string
  password: string
}

class Registration extends React.Component<Props, State> {
  props: Props
  state: State = { username: '', password: '' }

  handleUsernameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ username: e.currentTarget.value })
  }

  handlePasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value })
  }

  render() {
    return(
      <div>
        <InputField placeholder="Username" onChange={this.handleUsernameChange} />
        <InputField placeholder="Password" type="password" onChange={this.handlePasswordChange} />
        <Button
          disabled={!this.state.username || !this.state.password}
          onClick={() => { this.props.onSubmit(this.state.username, this.state.password) }}
        >
          Sign up
        </Button>
      </div>
    )
  }
}

export { Registration }