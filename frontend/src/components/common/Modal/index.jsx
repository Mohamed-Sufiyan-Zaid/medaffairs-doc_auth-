import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ open, onClose, title, children }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 1rem" }}>
        <h2 id="dialog-title">{title}</h2>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
