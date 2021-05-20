import React from 'react'

const Numbers = ({ persons, filter }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => 
        <div key={person.id}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default Numbers