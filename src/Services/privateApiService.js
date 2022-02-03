import { useState, useEffect } from 'react'
import axios from 'axios'

const { token } = JSON.parse(localStorage.getItem('onLoggedUser')) || ''

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

if (token !== '') apiService.defaults.headers.common['authorization'] = token

export const GetHandle = (apiEndpoint, id) => {
  const [response, setResponse] = useState()

  const axiosUrl = id ? `${apiEndpoint}/${id}` : `${apiEndpoint}`

  useEffect(() => {
    apiService
      .get(axiosUrl)
      .then((res) => setResponse(res.data))
      .catch((err) => setResponse({ error: err }))
  }, [])

  if (!response) return null

  return response
}

export const PostHandle = (apiEndpoint, bodyData) => {
  const [response, setResponse] = useState()

  useEffect(() => {
    apiService
      .post(apiEndpoint, bodyData)
      .then((res) => setResponse(res.data))
      .catch((err) => setResponse({ error: err }))
  }, [])

  if (!response) return null

  return response
}

// use the setState function where you gonna save your data
export const deleteHandler = (apiEndpoint, id, setState) => {
  apiService
    .delete(`${apiEndpoint}/${id}`)
    .then((res) =>
      setState({
        data: res.data,
      }),
    )
    .catch((err) =>
      setState({
        error: err.message,
      }),
    )
}

// use the setState function where you gonna save your data
export const putHandler = (apiEndpoint, id, bodyData, setState) => {
  apiService
    .put(`${apiEndpoint}/${id}`, bodyData)
    .then((res) =>
      setState({
        data: res.data,
      }),
    )
    .catch((err) =>
      setState({
        error: err.message,
      }),
    )
}
