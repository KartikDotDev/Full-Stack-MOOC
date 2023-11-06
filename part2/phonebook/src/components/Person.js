import phonebookService from "../services/persons";

const Person = (props) => {
    const { person, deletePerson, setErrorMessage } = props

    const deleteButtonHandler = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            phonebookService.deletePerson(person.id).then(() => {
                console.log(`${person.name} is deleted`);
                alert(`${person.name} is deleted`);
                deletePerson(person.id);
            }).catch(error => {
                console.log(error);
                setErrorMessage(error.response.data.error);

            })
        }
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000);
    }

    return (
        <div key={person.id}>
            <p>{person.name} {person.number}</p>
            <button onClick={deleteButtonHandler}>delete</button>
        </div>
    )
}

export default Person;