import axiosCreator from 'axios'

const PROFILE_SERVICE_URL = 'http://localhost:3030'

const axios = axiosCreator.create({
  baseURL: PROFILE_SERVICE_URL
})

export const getUserFromToken = (token: string) => {
  return axios.get('/user', {
    headers: { authorization: `Bearer ${token}` }
  }).then(({ data }) => data)
}