import { AxiosRequestConfig, default as axiosCreator } from 'axios'

import { User as UserModel } from '../models'
import { Login as LoginDto, Token as TokenDto } from '../dto'

const PROFILE_SERVICE_URL = 'https://192.168.0.111:3030'

// TODO: Pass config, rather than trying to figgure out environment

const axiosConfig: AxiosRequestConfig = {
  baseURL: PROFILE_SERVICE_URL
}

if (typeof window === 'undefined') {
  const https = require('https') // tslint:disable-line:no-var-requires
  axiosConfig.httpsAgent = new https.Agent({
    rejectUnauthorized: false
  })
}

const axios = axiosCreator.create(axiosConfig)

export const getUserFromToken = (token: string): Promise<UserModel> => {
  return axios.get('/user', {
    headers: { authorization: `Bearer ${token}` }
  }).then(({ data }) => data)
}

export const login = (loginData: LoginDto): Promise<TokenDto> => {
  return axios.post('/login', loginData)
    .then(({ data }) => data)
}