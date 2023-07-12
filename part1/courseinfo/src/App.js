const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ array }) => {
  return (
    <div>
      {array.map((element, index) => (
        <p key={index}>{element.part} {element.exercise}</p>
      ))}
    </div>
  )
}

const Total = ({ array }) => {

  let sum = 0;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    sum += element.exercise;
  }

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        part: 'Fundamentals of React',
        exercise: 10
      },
      {
        part: 'Using props to pass data',
        exercise: 7
      },
      {
        part: 'State of a component',
        exercise: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content array={course.parts} />
      <Total array={course.parts} />

    </div>
  )
};

export default App;