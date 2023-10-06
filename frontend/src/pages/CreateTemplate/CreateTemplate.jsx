import Button from "@mui/material/Button";
import "./CreateTemplate.scss";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";

function CreateTemplate() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {};

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Template</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" className="createTemplateDialog">
        <h2 className="createTemplateDialogTitle">Create Template</h2>
        <Grid container>
          <Grid item xs={6}>
            <div className="d-flex">
              <span className="project-name">Project Name:</span>
              <span className="m-1">E-commerce</span>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="d-flex">
              <span className="m-1 template-name">Template Name:</span>
              <FormControl>
                <TextField placeholder="Enter template name" className="createTemplateCustomTextField" />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <DialogContent>
          <QuillEditor />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Add Generated Text Placeholder
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateTemplate;
