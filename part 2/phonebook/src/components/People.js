import React from 'react';
import personService from '../services/Persons';

const People = ({ newFilter, persons, setPersons, setStatusMessage }) => {
  const numbersToShow = newFilter
    ? persons.filter((person) =>
        person.name.toUpperCase().includes(newFilter.toUpperCase())
      )
    : persons;

  return (
    <div>
      {numbersToShow.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
          persons={persons}
          setPersons={setPersons}
          setStatusMessage={setStatusMessage}
        />
      ))}
    </div>
  );
};

const Person = ({
  name,
  number,
  id,
  persons,
  setPersons,
  setStatusMessage,
}) => {
  const handleDelete = () => {
    const result = window.confirm(`Delete ${name} ?`);
    if (result) {
      const newArr = () => persons.filter((person) => person.id !== id);
      personService.deletePerson(id).catch((err) =>
        setStatusMessage([
          {
            message: `Information of ${name} has already been removed from server`,
            messageGood: false,
          },
        ])
      );
      setPersons(newArr());
    }
  };

  return (
    <div>
      <p>
        {name} {number}
        <button onClick={handleDelete}>delete</button>
      </p>
    </div>
  );
};

export default People;
