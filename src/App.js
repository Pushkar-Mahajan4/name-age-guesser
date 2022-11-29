import "./App.css";
import { useState, useCallback } from "react";
import Fetch from "./components/fetch-component/Fetch";
import { FixedSizeList } from "react-window";
import Header from "./components/header-files/Header";

function App() {
  const [name, setName] = useState("");
  const [oddguess, setOddGuess] = useState(false);
  const [guess, setGuess] = useState([]);

  const fetchName = async () => {
    setOddGuess(false);

    if (name.trim() && name.trim() !== "") {
      try {
        const user = await Fetch(name);
        if (user.age % 2 !== 0) {
          setOddGuess(true);
        }
        setGuess([...guess, user]);
        setName("");
      } catch (e) {
        e.printStackTrace();
      }
    } else {
      alert("Invalid input");
    }
  };

  const Row = useCallback(
    ({ index, style }) => {
      const { name, age } = guess[index];
      return (
        <div style={style}>
          <div className="list-element">{`${name} - ${age}`}</div>
        </div>
      );
    },
    [guess]
  );

  return (
    <div className="App">
      <Header />
      <main>
        <div className="card-body">
          <h3 className="card-heading">Total Guesses : {guess.length}</h3>
          <label className="odd-label">
            {oddguess && "What an odd number of guess!"}
          </label>
          <div className="card-main">
            <fieldset>
              <legend>Please enter a name here</legend>
              <input
                type="text"
                className="name-box"
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
            </fieldset>
            <div className="card-button">
              <button className="button-clear" onClick={() => setName("")}>
                Clear
              </button>
              <button className="button-submit" onClick={fetchName}>
                Submit
              </button>
            </div>
            <div className="card-list">
              <h4>All the Guesses: </h4>
              {guess.length !== 0 ? (
                <div className="card-sublist">
                  <FixedSizeList
                    className="list-size"
                    height={225}
                    itemCount={guess.length}
                    itemSize={50}
                    width={350}
                  >
                    {Row}
                  </FixedSizeList>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
