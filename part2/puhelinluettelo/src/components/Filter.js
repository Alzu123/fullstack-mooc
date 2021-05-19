import React from 'react'

const Filter = ({ value, onChange}) => (
  <form>
    <div>
      Filter shown phonebook with
      <input 
        value={value}
        onChange={onChange}
      />
    </div>
  </form>
)

export default Filter