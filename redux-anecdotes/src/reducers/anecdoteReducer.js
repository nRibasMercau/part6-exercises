import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes', 
  initialState: [], 
  reducers: {
    /*
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const anecdoteChanged = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteChanged)
    },
    */
    appendAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {
      return action.payload
    }, 
    replaceAnecdote(state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    }
  }
})

export const { replaceAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch(replaceAnecdote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer
