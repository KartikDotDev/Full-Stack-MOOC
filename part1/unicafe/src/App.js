import { useState } from 'react'

const Button = (props) => <button onClick={props.onClickHandler}>{props.text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total;

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good}/>
          <StatisticLine text={"neutral"} value={neutral}/>
          <StatisticLine text={"bad"} value={bad}/>
          <StatisticLine text={"total"} value={total}/>
          <StatisticLine text={"average"} value={average}/>
          <StatisticLine text={"positive"} value={positive}/>
        </tbody>
      </table>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => {
    const updatedVal = good + 1;
    setGood(updatedVal)
  }

  const neutralClickHandler = () => {
    const updatedVal = neutral + 1;
    setNeutral(updatedVal)
  }

  const badClickHandler = () => {
    const updatedVal = bad + 1;
    setBad(updatedVal)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClickHandler = {goodClickHandler} text = {"good"}/>
      <Button onClickHandler = {neutralClickHandler} text = {"neutral"}/>
      <Button onClickHandler = {badClickHandler} text = {"bad"}/>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;