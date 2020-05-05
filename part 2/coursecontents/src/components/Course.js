import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  let initialVal = 0;
  const sum = course.parts.reduce(
    (acc, part) => acc + part.exercises,
    initialVal
  );
  return <b>total of {sum} exercises</b>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div>
      <Header key={course.id} course={course} />
      <Content key={course.id} course={course} />
      <Total key={course.id} course={course} />
    </div>
  ));
};

export default Course;
