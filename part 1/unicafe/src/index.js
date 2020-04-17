import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  // if any button is clicked than display stats
  const total = bad + good + neutral;
  if (good + bad + neutral > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={(good - bad) / total} />

          <Statistic text="positive" value={`${(good / total) * 100} %`} />
        </tbody>
      </table>
    );
  } else {
    return null;
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (buttonSet, buttonVal) => {
    buttonSet(buttonVal + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick(setGood, good)} text="good" />
      <Button
        handleClick={() => handleClick(setNeutral, neutral)}
        text="neutral"
      />

      <Button handleClick={() => handleClick(setBad, bad)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
