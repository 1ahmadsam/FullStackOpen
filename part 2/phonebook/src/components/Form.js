import React, { useState } from 'react';
import personService from '../services/Persons';

const Form = ({ persons, setPersons, handleNameChange, setStatusMessage }) => {
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    const isDuplicate = persons.find((el) => el.name === newName);
    event.preventDefault();
    if (isDuplicate) {
      // window.alert(`${newName} is already added to phonebook`);
      console.log(isDuplicate);
      const result = window.confirm(
        `${isDuplicate.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        personService
          .update(isDuplicate.id, {
            id: isDuplicate.id,
            name: isDuplicate.name,
            number: newNumber,
          })
          .then((returnedPerson) => {
            const newArr = persons.filter(
              (person) => person.id !== isDuplicate.id
            );
            const temp = newArr.concat(returnedPerson);
            setPersons(temp);
            setNewNumber('');
            setNewName('');
          })
          .catch((err) =>
            setStatusMessage([
              {
                message: `Information of ${newName} has already been updated`,
                messageGood: false,
              },
            ])
          );
      }
      //change functionality
    } else {
      //Post Request
      personService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewNumber('');
          setNewName('');
        });
      setStatusMessage([{ message: `Added ${newName}`, messageGood: true }]);
    }
  };

  return (
    <form>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={(e) => handleNameChange(e, setNewName)}
        />
      </div>

      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={(e) => handleNameChange(e, setNewNumber)}
        />
      </div>
      <div>
        <button type='submit' onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
