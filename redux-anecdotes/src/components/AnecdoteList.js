import { useDispatch, useSelector } from 'react-redux'
import  { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const compareFn = (anecdote1, anecdote2) => {
  return anecdote2.votes - anecdote1.votes
}


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes}</div>
      <button onClick={handleClick}>vote</button>
    </div>
  )
}


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })

  return (
    <div>
      {anecdotes
        .sort(compareFn)
        .map(anecdote => 
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification(`you voted for "${anecdote.content}"`, 10))
          }}
        />
        )
      }
    </div>
  )
}

export default AnecdoteList
