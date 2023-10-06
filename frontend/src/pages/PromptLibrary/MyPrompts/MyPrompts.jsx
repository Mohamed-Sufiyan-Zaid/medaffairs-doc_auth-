import { useState, useEffect, useContext } from "react";
import "../../Home/Home.scss";
import Table from "../../../components/common/Table/Table";
import { MyPromptsTableHeaders } from "../../../utils/constants";
import Button from "@mui/material/Button";
// import CreateEditDeleteProject from "../../../components/CreateEditProjectForm/CreateEditDeleteProject";
import Plus from "../../../assets/icons/plus.svg";
import SidebarContext from "../../../context/SidebarContext";
import { ApiResponseKeys } from "../../../utils/apiKeysMap";
import { defaultProjectData } from "../../../components/CreateEditProjectForm/pageConstants";
import { myPrompt } from "../../../jsonData";
import ConfigurePrompt from "../../../components/ConfigurePrompt/ConfigurePrompt";

export default function MyPrompts() {
  const [tableRows, setTableRows] = useState([]);
  const [openModal, setOpenModal] = useState(false); // [create|edit|delete] to open
  const [selectedProject, setSelectedProject] = useState({ ...defaultProjectData });
  const [actionType, setActionType] = useState("");
  const sidebarContext = useContext(SidebarContext);

  const generateTableContent = (data = []) => {
    const newTableData = data.map((project, index) => [
      project.prompt_text,
      project.domain,
      project.prompt_type,
      project.status,
      <div key={index} className="d-flex">
        <Button variant="text" sx={{ textDecoration: "underline" }} onClick={() => console.warn("Viewing ", project.prompt_text)}>
          View Details
        </Button>
      </div>
    ]);
    setTableRows(newTableData);
  };

  const mapProjectsListRows = (data) =>
    data.map((project) => ({
      prompt_text: project[ApiResponseKeys.prompt_text],
      project_id: project[ApiResponseKeys.project_id],
      domain: project[ApiResponseKeys.domain],
      prompt_type: project[ApiResponseKeys.prompt_type],
      status: project[ApiResponseKeys.status]
    }));

  useEffect(() => {
    sidebarContext.setSidebarButtons([
      {
        text: "Create Prompt",
        onClick: () => {
          setSelectedProject({ ...defaultProjectData });
          setActionType("create");
          setOpenModal(true);
        },
        icon: Plus
      }
    ]);
  }, []);

  useEffect(() => {
    const updatedList = mapProjectsListRows(myPrompt);
    generateTableContent(updatedList);
  }, []);

  return (
    <div className="home-container">
      <h1 className="heading mt-5 mb-3">My Prompts</h1>
      <Table rows={tableRows} headers={MyPromptsTableHeaders} />
      <ConfigurePrompt openModal={openModal} setOpenModal={setOpenModal} actionType={actionType} projectData={selectedProject} />
      {/* <CreateEditDeleteProject openModal={openModal} setOpenModal={setOpenModal} actionType={actionType} projectData={selectedProject} /> */}
    </div>
  );
}
