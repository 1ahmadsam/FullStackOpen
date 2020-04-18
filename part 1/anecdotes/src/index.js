import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = (props) => {
  const voteList = Array(props.anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([...voteList]);

  const randomClick = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(random);
  };

  //finds index of biggest votes
  const mostVotes = vote.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  const voteClick = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button onClick={randomClick} text="next anecdote" />
      <Button onClick={voteClick} text="vote" />
      {/* <p>{vote}</p> */}
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVotes]}</p>
      <p>has {vote[mostVotes]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
