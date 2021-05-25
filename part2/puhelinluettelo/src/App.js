import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import InputForm from './Components/InputForm'
import Notification from './Components/Notification'
import Numbers from './Components/Numbers'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationStatus, setNotificationStatus ] = useState(null)

  const setTemporaryNotification = (message, time, isSuccess) => {
    setNotificationMessage(message)
    setNotificationStatus(isSuccess)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationStatus(null)
    }, time)
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    const personWithSameName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (personWithSameName) {
      const updateConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (updateConfirmed) {
        personsService
          .update(personWithSameName.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personWithSameName.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setTemporaryNotification(`Updated the phone number of ${returnedPerson.name}`, 5000, true)
          })
          .catch(error => {
            setTemporaryNotification(`Information of ${newName} has already been removed from server`, 5000, false)
          })
        return
      } else {
        setNewName('')
        setNewNumber('')
        return
      }
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
        setTemporaryNotification(`Added ${returnedPerson.name}`, 5000, true)
      })
      .catch(error => {
        setTemporaryNotification(`Could not add ${newPerson} to server`, 5000, false)
      })
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const removePerson = id => {
    const personToRemove = persons.find(person => person.id === id)
    const removalConfirmed = window.confirm(`Delete ${personToRemove.name}?`)
    if (removalConfirmed) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setTemporaryNotification(`Removed ${personToRemove.name} from the phone book`, 5000, true)
        })
        .catch(error => {
          setTemporaryNotification(`Failed to remove ${personToRemove.name} from the phone book`, 5000, false)
        })
    }

    return
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isSuccess={notificationStatus} />
      <Filter onChange={handleFilterChange} value={filter} />

      <h3>Add a new</h3>
      <InputForm onSubmit={addPerson} onNameChange={handleNameChange} nameValue={newName} onNumberChange={handleNumberChange} numberValue={newNumber}/>

      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )

}

export default App