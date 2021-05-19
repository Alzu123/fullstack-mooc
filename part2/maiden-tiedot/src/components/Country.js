import React from 'react'

const Country = ({ country, onSubmit }) => (
    <div>
      <form onSubmit={onSubmit}>
        {country.name}
        <button type="submit">save</button>
      </form>
    </div>
  )

export default Country