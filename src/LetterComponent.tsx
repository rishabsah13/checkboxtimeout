import React from 'react';


interface LetterComponentProps {
  letters: string[];
}

const LetterComponent: React.FC<LetterComponentProps> = ({ letters }) => {
  return (
    <div className="letter-component">
      {letters.map((letter, index) => (
        <div key={index}>{letter}</div>
      ))}
    </div>
  );
};

export default LetterComponent;
