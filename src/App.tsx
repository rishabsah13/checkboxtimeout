import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import LetterComponent from "./LetterComponent";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [checkboxes, setCheckboxes] = useState<boolean[]>(
    new Array(7).fill(false)
  );
  const [letterHistory, setLetterHistory] = useState<string[][]>(
    new Array(7).fill([])
  );

  const handleCheckboxChange = useCallback(async (index: number) => {
    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = [...prevCheckboxes];
      newCheckboxes[index] = !newCheckboxes[index];
      return newCheckboxes;
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i]) {
          try {
            const response = await fetch(
              `https://navirego-interview-mc3narrsb-volodymyr-matselyukh.vercel.app/api/letters/${i}`
            );
            const data = await response.json();
            setLetterHistory((prevLetterHistory) => {
              const newLetterHistory = [...prevLetterHistory];
              newLetterHistory[i] = [
                ...newLetterHistory[i].slice(-29),
                data.letter,
              ];
              return newLetterHistory;
            });
          } catch (error) {
            console.error(`Error fetching data for checkbox ${i}:`, error);
          }
        }
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, [checkboxes]);

  return (
    <div className="App">
      <h1>Numbered Checkboxes</h1>
      <form>
        {checkboxes.map((isChecked, index) => (
          <div key={index} className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(index)}
              />
              Checkbox {index + 1}
            </label>
            {isChecked && (
              <LetterComponent key={index} letters={letterHistory[index]} />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default App;
