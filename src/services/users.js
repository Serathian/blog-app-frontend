import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newUserObject) => {
  console.log('createNew called: ', newUserObject)
  const response = await axios.post(baseUrl, newUserObject)
  return response.data
}

export default { getAll, createNew }
