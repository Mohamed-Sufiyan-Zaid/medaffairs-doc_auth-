import React, { useState } from "react";
import Accordion from "../common/Accordion";
import TextArea from "../common/TextArea";
import { accordionItems } from "../../jsonData";
import "./PromptSuggestion.scss";

const PromptSuggestion = () => {
  const [inputValue, setInputValue] = useState("");

  const getRowCount = (text) => {
    if (!text) return 1;
    const charactersPerRow = 70;
    return Math.max(1, Math.ceil(text.length / charactersPerRow));
  };

  return (
    <div className="suggestions-overlay">
      <div className="combined-container">
        {inputValue && (
          <>
            <h6>Suggestions(4)</h6>
            <div className="accordion-container">
              {accordionItems.map((item, index) => (
                <div key={index} className="expanded-container">
                  <Accordion summary={item.summary} details={item.details} onClick={() => setInputValue(item.details)} />
                </div>
              ))}
            </div>
          </>
        )}
        <div className={`input-wrapper d-flex ${!inputValue && "sticky-textarea"}`}>
          <TextArea value={inputValue} onChange={(e) => setInputValue(e.target.value)} rows={getRowCount(inputValue)} />
        </div>
      </div>
    </div>
  );
};

export default PromptSuggestion;
