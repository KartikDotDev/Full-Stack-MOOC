const Course = (props) => {
    const { course } = props
    return (
        <div className="Course">
            <h2>{course.name}</h2>

            {course.parts.map(element => <p key={element.id}>{element.name} {element.exercises}</p>)}

            <strong>total of {course.parts.reduce(( (sum, part) => {/* console.log('what is happening', sum, part); */ if (typeof sum === 'number') return sum + part.exercises; else return sum.exercises + part.exercises}))} exercises</strong>
        </div>
    )

}

export default Course;