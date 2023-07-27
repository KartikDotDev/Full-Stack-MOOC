import React, { useState } from 'react'
import phonebookService from '../services/persons'


const PersonForm = (props) => {

    const { setError, persons, setPersons, setErrorMessage, currentId, setCurrentId } = props

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const onChangeNameHandler = (event) => {
        event.preventDefault();
        // console.log(event);
        // console.log(event.target.value);
        setNewName(event.target.value)
    }

    const onChangeNumberHandler = (event) => {
        // console.log(event);
        setNewNumber(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(event);
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const person = persons.find(p => p.name === newName);
            const changedPerson = { ...person, number: newNumber };
            phonebookService.update(person.id, changedPerson).then(response => {
                console.log(response);
                setPersons(persons.map(p => p.id !== person.id ? p : response));
                setNewName('');
                setNewNumber('');
            }).catch(
                error => {
                    setError(true)
                    setErrorMessage(`The Person has either been deleted or there is an error at the server side`)
                    
                    setTimeout(() => {
                        setError(false)
                        setErrorMessage(null)
                    }, 5000)
                }
            )
            return;
        }

        console.log(event.target.value);
        const newPerson = {
            name: newName,
            number: newNumber,
            id: currentId
        }

        phonebookService.create(newPerson).then(response => {
            console.log(response);
            setErrorMessage(`Added ${newPerson.name} to the Phonebook`);
            
        }).catch(
            error => {
                setError(true);
                setErrorMessage(`Information of ${newPerson.name} has already been removed from the server}`)
                setTimeout(() => {
                    setError(false);
                    setErrorMessage(null);
                }
                    , 5000)
            }
        )

        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        const newId = currentId + 1;
        setCurrentId(newId);

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