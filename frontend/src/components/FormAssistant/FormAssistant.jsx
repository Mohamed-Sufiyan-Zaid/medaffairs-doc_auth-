import React, { useState } from "react";
import InputPrompt from "../../pages/InputPrompt/index";
import "./FormAssistant.scss";

const FormAssistant = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [showChat, setShowChat] = useState(false);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    setShowChat(false);
  };

  const handleRefineTextClick = () => {
    setShowChat(true);
  };

  return (
    <div className="rightnav">
      <div className="tabs">
        <button type="button" onClick={() => handleTabClick(1)} className={activeTab === 1 ? "active" : ""}>
          Query Log
        </button>
        <button type="button" onClick={() => handleTabClick(2)} className={activeTab === 2 ? "active" : ""}>
          History
        </button>
      </div>
      <div className="tab-content">
        {showChat ? (
          <InputPrompt /> // chat component if showChat is true
        ) : (
          <>
            {activeTab === 1 && (
              <div>
                <div className="edit-send-button" onClick={handleRefineTextClick} role="presentation">
                  Refine Text
                </div>
              </div>
            )}
            {activeTab === 2 && <div />}
          </>
        )}
      </div>
    </div>
  );
};

export default FormAssistant;
