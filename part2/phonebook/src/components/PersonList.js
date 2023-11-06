import Person from './Person'

const Persons = (props) => {
  const { persons, setErrorMessage, filteredPersons, showFilter, setPersons} = props;

  const deletePerson = (id) => {
    setPersons(persons.filter(p => p.id !== id));
  };

  if (showFilter) {
    return (
      <>
        <ul>
          {filteredPersons.map(person => (
            <li key={person.id}>
              <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}  setErrorMessage={setErrorMessage} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
