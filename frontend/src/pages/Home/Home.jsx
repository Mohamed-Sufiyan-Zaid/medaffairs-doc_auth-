import { useState, useEffect, useContext } from "react";
import "./Home.scss";
import CountsCard from "../../components/common/CountsCard/CountsCard";
import { cardList } from "../../jsonData";
import Table from "../../components/common/Table/Table";
import { ProjectTableHeaders, ProjectListKebabMenuOptions, ApiEndpoints, QueryKeys } from "../../utils/constants";
import Button from "@mui/material/Button";
import KebabMenu from "../../components/common/KebabMenu/KebabMenu";
import CreateEditDeleteProject from "../../components/CreateEditProjectForm/CreateEditDeleteProject";
import Plus from "../../assets/icons/plus.svg";
import SidebarContext from "../../context/SidebarContext";
import { useFetcher } from "../../hooks/useReactQuery";
import CircularProgress from "@mui/material/CircularProgress";
import UserContext from "../../context/UserContext";
import { ApiResponseKeys } from "../../utils/apiKeysMap";
import { defaultProjectData } from "../../components/CreateEditProjectForm/pageConstants";

export default function HomePage() {
  const [tableRows, setTableRows] = useState([]);
  const [tablePageNo, setTablePageNo] = useState(0);
  const [openModal, setOpenModal] = useState(false); // [create|edit|delete] to open
  const [selectedProject, setSelectedProject] = useState({ ...defaultProjectData });
  const [actionType, setActionType] = useState("");
  const sidebarContext = useContext(SidebarContext);
  const { ntid } = useContext(UserContext);

  const handleKebabMenuItemClick = (optionIndex, selectionFor = null, data = {}) => {
    setSelectedProject(data.filter((item) => item.project_id === selectionFor)[0]);
    setActionType(ProjectListKebabMenuOptions[optionIndex].key);
    setOpenModal(true);
  };

  const generateTableContent = (data = []) => {
    const newTableData = data.map((project, index) => [
      project.project_name,
      project.project_domain,
      project.last_updated_date,
      project.ntid,
      <div key={index} className="d-flex">
        <Button variant="text" sx={{ textDecoration: "underline" }} onClick={() => console.warn("Viewing ", project.project_name)}>
          View Details
        </Button>
        <KebabMenu
          handleMenuItemClick={(optionIndex) => handleKebabMenuItemClick(optionIndex, project.project_id, data)}
          menuOptions={ProjectListKebabMenuOptions}
          closeOnSelect
        />
      </div>
    ]);
    setTableRows(newTableData);
  };

  const mapProjectsListRows = (data) =>
    data.map((project) => ({
      project_name: project[ApiResponseKeys.project_name],
      project_id: project[ApiResponseKeys.project_id],
      project_domain: project[ApiResponseKeys.project_domain],
      project_subdomain: project[ApiResponseKeys.project_subdomain],
      project_group: "FE Hardcoded",
      last_updated_date: project[ApiResponseKeys.last_updated_date],
      version: project[ApiResponseKeys.version],
      ntid: project[ApiResponseKeys.ntid]
    }));

  const {
    data: rawProjectsList = [],
    isSuccess,
    status: projectsListStatus = ""
  } = useFetcher(ApiEndpoints.projectsList, [QueryKeys.projectsList], { ntid }, true);

  useEffect(() => {
    sidebarContext.setSidebarButtons([
      {
        text: "Create Project",
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
    if (isSuccess) {
      const updatedList = mapProjectsListRows(rawProjectsList);
      generateTableContent(updatedList);
    }
  }, [rawProjectsList, isSuccess]);

  return (
    <div className="home-container">
      <h1 className="heading">Overview</h1>
      <div className="cards-container d-flex">
        {cardList.map((cardData, index) => (
          <CountsCard key={index} title={cardData.title} count={cardData.count} />
        ))}
      </div>
      <h1 className="heading mt-5 mb-3">All Projects</h1>
      {projectsListStatus === "success" ? (
        <Table
          rows={tableRows}
          headers={ProjectTableHeaders}
          isPaginated
          pageNo={tablePageNo}
          handlePageChange={(_, newPage) => setTablePageNo(newPage)}
        />
      ) : projectsListStatus === "loading" ? (
        <div className="d-flex align-items-center justify-content-center mt-6">
          <CircularProgress sx={{ margin: "auto" }} />
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center table-error">
          <div>Something went wrong fetching list of projects!</div>
        </div>
      )}
      <CreateEditDeleteProject openModal={openModal} setOpenModal={setOpenModal} actionType={actionType} projectData={selectedProject} />
    </div>
  );
}
