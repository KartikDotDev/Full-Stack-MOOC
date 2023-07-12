import { useState } from 'react'

const Button = (props) => <button onClick={props.onClickHandler}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  // state based votemap based on the length of the anecdotes array
  const [voteMap, setVoteMap] = useState(new Array(anecdotes.length).fill(0))

  // console.log(anecdotes)
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)
  console.log(voteMap);

  const voteHandler = () => { 
    const updatedVal = voteMap; 
    updatedVal[selected] += 1;
    if (mostVotes < updatedVal[selected]) {
      setMostVotes(updatedVal[selected]) 
      setMostVoted(selected)
    }
    setVoteMap([...updatedVal]) 
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voteMap[selected]} votes</p>
      <Button text = "vote" onClickHandler = {voteHandler} />
      <Button text = "next anecdote" onClickHandler = {() => setSelected(Math.floor(Math.random() * anecdotes.length))} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

export default App