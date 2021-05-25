import React from 'react'

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => 
        <Part part={part} key={index} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  let numExercises = 0
  parts.forEach(part => numExercises += part.exercises)

  return <p>Number of exercises {numExercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App