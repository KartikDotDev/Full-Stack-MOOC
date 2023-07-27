import phonebookService from "../services/persons";

const Person = (props) => {
    const { person, deletePerson, setErrorMessage } = props

    const deleteButtonHandler = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            phonebookService.deletePerson(person.id).then(() => {
                console.log(`${person.name} is deleted`);
                alert(`${person.name} is deleted`);
                deletePerson(person.id);
            }).catch(error => 
                setErrorMessage(`cannot delete the selected person`)
                )
        }
    }

    return (
        <div>
            <p>{person.name} {person.number}</p>
            <button onClick={deleteButtonHandler}>delete</button>
        </div>
    )
}

export default Person;