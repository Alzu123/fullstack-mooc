import React from 'react'

const Total = ({ parts }) => {
    const totalExercises = parts.reduce( (accumulator, part) => accumulator + part.exercises, 0)

    return (
        <div>
            <p>
                <b>Total of {totalExercises} exercises.</b>
            </p>
        </div>
    )
}

export default Total