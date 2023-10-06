import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import UploadBox from "../../components/common/UploadBox/UploadBox";
import "./UploadTemplate.scss";

function UploadTemplate() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {};

  return (
    <>
      <Button onClick={() => setOpen(true)}>Upload Template</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" className="uploadTemplateDialog">
        <DialogContent>
          <UploadBox />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UploadTemplate;
