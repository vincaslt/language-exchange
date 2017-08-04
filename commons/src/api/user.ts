import axiosCreator from 'axios'
import { User as UserModel } from '../models'
import { Login as LoginDto, Token as TokenDto } from '../dto'

const PROFILE_SERVICE_URL = 'http://localhost:3030'

const axios = axiosCreator.create({
  baseURL: PROFILE_SERVICE_URL
})

export const getUserFromToken = (token: string): Promise<UserModel> => {
  return axios.get('/user', {
    headers: { authorization: `Bearer ${token}` }
  }).then(({ data }) => data)
}

export const login = (loginData: LoginDto): Promise<TokenDto> => {
  return axios.post('/login', loginData)
    .then(({ data }) => data)
}