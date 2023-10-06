import { useState, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select from "../common/Select/Select";
import ConfirmationBox from "../common/ConfirmationBox/ConfirmationBox";

export default function ConfigurePrompt({ openModal, setOpenModal, actionType, projectData }) {
  const backdropRef = useRef(null);
  const [projectDetails, setProjectDetails] = useState({ ...projectData });

  const handleValueChange = (newValue, changingParam) => {
    const newProjectDetails = { ...projectDetails };
    newProjectDetails[changingParam] = newValue;
    setProjectDetails(newProjectDetails);
  };

  const handleSave = (data) => {
    console.warn(data);
  };

  return (
    <ConfirmationBox
      title="Configure Prompt"
      isOpen={openModal}
      handleClose={() => setOpenModal(false)}
      handleAccept={() => handleSave(projectDetails, actionType)}
    >
      <div ref={backdropRef} className="project-changes-container">
        <div className="configure prompt">
          <Select
            value={projectDetails.project_group}
            label="Select Group"
            placeholder="Select a group"
            options={["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6"]}
            margin={{ xs: "0 0 1rem 0", md: "0 0 2rem 0" }}
            onChange={(event) => handleValueChange(event.target.value, "project_group")}
          />
          <div className="d-flex">
            <FormControl fullWidth>
              <FormLabel className="mb-2">Domain</FormLabel>
              <TextField
                value={projectDetails.domain}
                placeholder="Enter a domain"
                onChange={(event) => handleValueChange(event.target.value, "domain")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ margin: "0 0 0 1rem" }}>
              <FormLabel className="mb-2">Sub-Domain</FormLabel>
              <TextField
                value={projectDetails.sub_domain}
                placeholder="Enter a sub domain"
                onChange={(event) => handleValueChange(event.target.value, "sub_domain")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ margin: "0 0 0 1rem" }}>
              <FormLabel className="mb-2">Category</FormLabel>
              <TextField
                value={projectDetails.category}
                placeholder="Enter a category"
                onChange={(event) => handleValueChange(event.target.value, "category")}
              />
            </FormControl>
          </div>
        </div>
      </div>
    </ConfirmationBox>
  );
}
