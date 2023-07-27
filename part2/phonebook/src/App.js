import phonebookService from './services/persons'
import { useEffect, useState } from 'react'
import Filter from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/PersonList'
import './index.css'
import Notification from './components/Notification'



const App = () => {

  // persons array state array 
  // why state?
  // so that the number list can refresh when a new member is added 
  const [persons, setPersons] = useState([])

  // currentId state for declaring the id of the persons array
  // why state?
  // so that the  
  const [currentId, setCurrentId] = useState(persons.length + 1)


  const [errorMessage, setErrorMessage ] = useState('Test');



  // useEffect for fetching data from the server 
  // why useEffect?
  // so that the data is fetched only once when the app is rendered
  // it is a good practice to use useEffect for fetching data from the server
  // useEffect is a hook that takes two parameters
  // the first parameter is a function that is executed when the component is rendered
  // the second parameter is an array of dependencies
  // if the second parameter is an empty array, the function is executed only when the component is rendered for the first time
  // if the second parameter is not an empty array, the function is executed when the component is rendered for the first time and when any of the dependencies change
  // if the second parameter is not defined, the function is executed when the component is rendered for the first time and after every render
  // it is better to use axios in useEffect than in the body of the component
  // if axios is used in the body of the component, the component is rendered every time the data is fetched from the server
  // if axios is used in useEffect, the component is rendered only once when the data is fetched from the server
  // the axios is helping is here to maintain security and privacy of the data and is preferred over fetch
  useEffect(() => {

    phonebookService.getAll().then(response => {
      console.log(response);
      setPersons(response)
      setCurrentId(response.length + 1)
    })
  },[])

  const [error, setError] = useState(false)

  const testStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

  // filteredPersons state for filtering the persons array
  // why state? 
  // so that the filtered persons array can be rendered when the filter is applied
  const [filteredPersons, setFilteredPersons] = useState(persons)

  // showFilter state for showing the filtered persons array
  // why state?
  // so that the filtered persons array can be rendered when the showFilter is true
  const [showFilter, setShowFilter] = useState(false)



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={(!error) ? testStyle: null} message={errorMessage}/>
      <Filter persons={persons} setShowFilter={setShowFilter} setFilteredPersons={setFilteredPersons} setErrorMessage={setErrorMessage}/>
      <h3>Add a new</h3>
      <PersonForm setError={setError} persons={persons} setPersons={setPersons} currentId={currentId} setCurrentId={setCurrentId} setErrorMessage={setErrorMessage}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filteredPersons={filteredPersons} showFilter={showFilter} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )

};

export default App; 