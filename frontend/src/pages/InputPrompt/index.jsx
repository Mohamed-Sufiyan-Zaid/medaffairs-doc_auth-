import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./InputPrompt.scss";
import PromptSuggestion from "../../components/PromptSuggestions/PromptSuggestion";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import ChatMessage from "../../components/ChatMessage/ChatMessage";

const messages = [
  {
    msg: "You are a research agent who is provided with a user query and some context. Your task is to answer questions which can help your team \nresearch on the user’s questions. These are previously asked questions: {unanswered_questions}",
    isReply: false
  },
  {
    msg: "This is a chat message reply",
    isReply: true,
    citationsContent: "MAX608.0.pdf, , pages :- 2, 4, 6"
  },
  {
    msg: "You are a research agent who is provided with a user query and some context. Your task is to answer questions which can help your team \nresearch on the user’s questions. These are previously asked questions: {unanswered_questions}",
    isReply: false
  },
  {
    msg: "This is a chat message reply",
    isReply: true,
    citationsContent: "MAX608.0.pdf, , pages :- 2, 4, 6"
  },
  {
    msg: "You are a research agent who is provided with a user query and some context. Your task is to answer questions which can help your team \nresearch on the user’s questions. These are previously asked questions: {unanswered_questions}",
    isReply: false
  }
];

const ChatMessages = () => (
  <div>
    {messages.map((message, index) => (
      <div key={index}>
        <ChatMessage textMessage={message.msg} isReply={message.isReply} citationsContent={message.citationsContent} />
      </div>
    ))}
  </div>
);

function InputPrompt({ title }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{title}</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" className="InputPrompt">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 1rem" }}>
          {title && <DialogTitle>{title}</DialogTitle>}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <div className="dialog-content-container">
            <div className="chat-messages-container">
              <ChatMessages />
            </div>
            <PromptSuggestion />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InputPrompt;
