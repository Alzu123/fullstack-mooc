import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import InputForm from './Components/InputForm'
import Numbers from './Components/Numbers'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
    const removalConfirmed = window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)
    if (removalConfirmed) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

    return
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />

      <h3>Add a new</h3>
      <InputForm onSubmit={addPerson} onNameChange={handleNameChange} nameValue={newName} onNumberChange={handleNumberChange} numberValue={newNumber}/>

      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )

}

export default App