import * as React from 'react'
import { InputField } from '../ui/InputField'
import { Button } from '../ui/Button'

interface Props {
  onSubmit: (username: string) => {}
}

interface State {
  username: string
}

class Login extends React.Component<Props, State> {
  props: Props
  state: State

  handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ username: e.currentTarget.value })
  }

  render() {
    return(
      <div>
        <InputField onChange={this.handleChange} />
        <Button onClick={() => { this.props.onSubmit(this.state.username) }}>Login</Button>
      </div>
    )
  }
}

export { Login }