import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import InputForm from './Components/InputForm'
import Numbers from './Components/Numbers'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewNumber('')
        setNewName('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />

      <h3>Add a new</h3>
      <InputForm onSubmit={addPerson} onNameChange={handleNameChange} nameValue={newName} onNumberChange={handleNumberChange} numberValue={newNumber}/>

      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} />
    </div>
  )

}

export default App