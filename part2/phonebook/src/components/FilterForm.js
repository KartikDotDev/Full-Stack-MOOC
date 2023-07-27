import React, { useState } from 'react'

const Filter = (props) => {

    const { persons, setShowFilter, setFilteredPersons } = props

    const [filter, setFilter] = useState('')

    const onChangeHandler = (event) => {
        console.log(event);
        console.log(event.target.value);

        setFilter(event.target.value)
        if (event.target.value === '') {
            setShowFilter(false)
        } else {
            setShowFilter(true)
            setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
        }
    }
    return (
        <div>
            <label>filter shown with</label>
            <input onChange={onChangeHandler} />
        </div>
    )
}

export default Filter;