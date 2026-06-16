import React, { Children, isValidElement, ReactNode } from "react";

const bionifyText = (text: string) => {
  // Split by words, keeping whitespace and punctuation
  return text.split(/(\s+)/).map((word, i) => {
    if (/^\s+$/.test(word)) return word; // return whitespace as is
    
    // Calculate how many actual alphabetic letters are in the word
    const letters = word.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
    if (letters.length <= 1) {
      return <span key={i} className="bionic-bold">{word}</span>;
    }

    const mid = Math.ceil(letters.length / 2);
    
    // Find the split index in the original word
    let splitIdx = 0;
    let letterCount = 0;
    for (let char of word) {
      if (/[a-zA-Zа-яА-ЯёЁ]/.test(char)) letterCount++;
      splitIdx++;
      if (letterCount >= mid) break;
    }

    if (splitIdx === 0 || splitIdx >= word.length) {
      return <span key={i} className="bionic-bold">{word}</span>;
    }

    return (
      <span key={i} className="bionic-word">
        <span className="bionic-bold">{word.slice(0, splitIdx)}</span>
        <span className="bionic-rest">{word.slice(splitIdx)}</span>
      </span>
    );
  });
};

export const Bionify = ({ children }: { children: ReactNode }): ReactNode => {
  if (typeof children === "string") {
    return <>{bionifyText(children)}</>;
  }
  if (typeof children === "number") {
    return <>{bionifyText(children.toString())}</>;
  }
  if (Array.isArray(children)) {
    return Children.map(children, (child) => <Bionify>{child}</Bionify>);
  }
  if (isValidElement(children)) {
    // Return React elements as-is. They will handle their own Bionify if they are MDX components.
    return children;
  }
  return children;
};
