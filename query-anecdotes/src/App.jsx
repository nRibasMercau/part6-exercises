import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW": 
      return action.payload
    case "CLEAR":
      return ''
    default:
      return state
  }
}

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
 
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      //const anecdotes = queryClient.getQueryData('anecdotes')
      //queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({ type: 'NEW', payload: 'ERROR! anecdote must have at least 5 characters' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
    notificationDispatch({ type: 'NEW', payload: `anecdote '${content}' created` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }


  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'NEW', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
       notificationDispatch({ type: 'CLEAR' }) 
    }, 5000)
  }

  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'], 
    queryFn: getAnecdotes, 
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification} />
      <AnecdoteForm onSubmit={addAnecdote} />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
