import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    const res = await axios.post('error', newAnecdote)
    return res
  }
  const res = axios.post(baseUrl, newAnecdote)
  return res.data
}

export const updateAnecdote = updatedAnecdote => 
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
