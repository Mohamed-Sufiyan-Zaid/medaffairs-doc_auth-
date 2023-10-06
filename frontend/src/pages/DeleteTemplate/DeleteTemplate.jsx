import React, { useState } from "react";
import ConfirmationBox from "../../components/common/ConfirmationBox/ConfirmationBox";
import "./DeleteTemplate.scss";

const DeleteTemplates = () => {
  const [open, setIsOpen] = useState(true);
  return (
    <ConfirmationBox isOpen={open} handleClose={() => setIsOpen(false)} agreeText="Delete" disagreeText="Cancel" title="Delete Prompt">
      <div className="template-container">
        <p>Template Name:</p>
        <h6>Document Template for Generating Dosage Summary</h6>
        <h6 className="mt-5">You are about to delete a template, this action cannot be reversed. </h6>
      </div>
    </ConfirmationBox>
  );
};
export default DeleteTemplates;
