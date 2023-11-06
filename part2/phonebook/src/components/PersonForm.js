import React, { useState } from 'react'
import phonebookService from '../services/persons'


const PersonForm = (props) => {

    const { setError, persons, setPersons, setMessage } = props

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const onChangeNameHandler = (event) => {
        event.preventDefault();
        setNewName(event.target.value)
    }

    const onChangeNumberHandler = (event) => {
        setNewNumber(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const condition = persons.some(person => person.name === newName);
        if(condition) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(p => p.name === newName);
                const changedPerson = { ...person, number: newNumber };
                phonebookService.update(person.id, changedPerson).then(response => {
                    setPersons(persons.map(p => p.id !== person.id ? p : response));
                    setNewName('');
                    setNewNumber('');
                }).catch(
                    error => {
                        setError(true)
                        setMessage(`The Person has either been deleted or there is an error at the server side`)
                        setTimeout(() => {
                            setError(false)
                            setMessage(null)
                        }, 5000)
                    }
                )
                return;
            }
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber,
        }

        phonebookService.create(newPerson).then(response => {
            newPerson.id = response.id;
            newPerson.name= response.name;
            newPerson.number = response.number;
            setPersons(persons.concat(newPerson));
            setMessage(`Added ${newPerson.name} to the Phonebook`);
            
        }).catch(
            error => {
                setError(true);
                setMessage(error.response.data.error)
                console.log(error.response.data.error);
                setTimeout(() => {
                    setError(false);
                }
                , 5000)
            }
            )
            
        setTimeout(() => {
            setMessage(null)
        }, 4500);
        setNewName('');
        setNewNumber('');

    }
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <label>name: </label>
                <input value={newName} onChange={onChangeNameHandler} />
                <br />
                <label>number: </label>
                <input value={newNumber} onChange={onChangeNumberHandler} />
                <button type='submit'>Add</button>
            </form>
        </>
    )

}

export default PersonForm;