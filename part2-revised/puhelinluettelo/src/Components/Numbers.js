import React from 'react'

const Numbers = ({ persons, filter, removePerson }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Numbers