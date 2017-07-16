import { Action } from 'redux-actions'
import { Selector } from 'reselect'

export function withPayload<Payload, State>(
  action: Action<Payload|undefined>,
  cb: (payload: Payload) => State,
  state: State
) {
  if (action.payload) {
    return cb(action.payload)
  }

  return state 
}

export function safeSelect<State>(statePropertyName: string) {
  return <Property>(propertyName: string): Selector<State, Property> => 
         (state: State): Property => 
         (state[statePropertyName] && state[statePropertyName][propertyName]) as Property
}