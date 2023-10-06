import { useEffect, useState, useRef, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select from "../common/Select/Select";
import CircularProgress from "@mui/material/CircularProgress";
// import Backdrop from "@mui/material/Backdrop";
import ConfirmationBox from "../common/ConfirmationBox/ConfirmationBox";
import { useFetcher, useModifier } from "../../hooks/useReactQuery";
import { ApiEndpoints, QueryKeys, HTTPMethods } from "../../utils/constants";
import "./CreateEditDeleteProject.scss";
import UserContext from "../../context/UserContext";
import { ApiResponseKeys } from "../../utils/apiKeysMap";
import { defaultProjectData } from "./pageConstants";

export default function CreateEditDeleteProject({ openModal, setOpenModal, actionType, projectData }) {
  const backdropRef = useRef(null);
  const [projectDetails, setProjectDetails] = useState(actionType !== "create" ? { ...projectData } : { ...defaultProjectData });
  const { ntid } = useContext(UserContext);
  const getApiKeys = () => {
    switch (actionType) {
      case "create":
        return { method: HTTPMethods.POST, key: QueryKeys.projectsList };
      case "edit":
        return { method: HTTPMethods.PUT, key: QueryKeys.projectsList };
      case "delete":
        return { method: HTTPMethods.DELETE, key: QueryKeys.projectsList };
      default:
        return {};
    }
  };
  const handleValueChange = (newValue, changingParam) => {
    const newProjectDetails = { ...projectDetails };
    newProjectDetails[changingParam] = newValue;
    setProjectDetails(newProjectDetails);
  };

  const {
    data: domains = [],
    isLoading: isDomainLoading,
    isError: isDomainError
  } = useFetcher(ApiEndpoints.getDomains, [QueryKeys.getDomains], {}, openModal === true);
  const {
    data: subDomains = [],
    isLoading: isSubDomainLoading,
    isError: isSubDomainError
  } = useFetcher(ApiEndpoints.getSubDomains, [QueryKeys.getSubDomains], {}, openModal === true);

  useEffect(() => setProjectDetails({ ...projectData }), [projectData]);

  const { mutate, status: apiChangeStatus } = useModifier([getApiKeys().key]);

  const formatRequestPayload = (data) => {
    switch (actionType) {
      case "edit":
        return {
          ntid,
          [ApiResponseKeys.project_id]: data.project_id,
          [ApiResponseKeys.project_name]: data.project_name,
          [ApiResponseKeys.project_group]: data.project_group,
          [ApiResponseKeys.project_domain]: data.project_domain,
          [ApiResponseKeys.project_subdomain]: data.project_subdomain
        };
      case "create":
        return {
          ntid,
          [ApiResponseKeys.project_name]: data.project_name,
          [ApiResponseKeys.project_group]: data.project_group,
          [ApiResponseKeys.project_domain]: data.project_domain,
          [ApiResponseKeys.project_subdomain]: data.project_subdomain
        };
      case "delete":
        return {
          ntid,
          project_id: data[ApiResponseKeys.project_id]
        };
      default:
        console.warn("Action not specified");
        return null;
    }
  };

  const handleSave = (data, action) => {
    const formattedData = formatRequestPayload(data);
    mutate(
      action === "delete"
        ? { method: getApiKeys().method, url: ApiEndpoints.projectOperations, data: {}, params: formattedData }
        : { method: getApiKeys().method, url: ApiEndpoints.projectOperations, data: formattedData }
    );
  };

  return (
    <ConfirmationBox
      title={`${actionType === "create" ? "Create" : actionType === "edit" ? "Edit" : "Delete"} New Document`}
      isOpen={openModal}
      handleClose={() => setOpenModal(false)}
      handleAccept={() => handleSave(projectDetails, actionType)}
    >
      <div ref={backdropRef} className="project-changes-container">
        {actionType !== "delete" ? (
          <div className="create-edit-container">
            <p>Filled the mandatory information to create a new document</p>
            <FormControl fullWidth sx={{ margin: { xs: "0 0 1rem 0", md: "0 0 1rem 0" } }}>
              <FormLabel className="mb-2" style={{ fontWeight: "bold", color: "black" }}>
                Document Title
              </FormLabel>
              <TextField
                value={projectDetails.project_name}
                placeholder="Enter title"
                onChange={(event) => handleValueChange(event.target.value, "project_name")}
              />
            </FormControl>
            <Select
              value={projectDetails.project_group}
              label={<label style={{ fontWeight: "bold", color: "black" }}>Select Team</label>}
              placeholder="Select a team"
              options={["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6"]}
              margin={{ xs: "0 0 1rem 0", md: "0 0 1rem 0" }}
              onChange={(event) => handleValueChange(event.target.value, "project_group")}
            />
            <div>
              <Select
                value={projectDetails.project_domain}
                label={<label style={{ fontWeight: "bold", color: "black" }}>Select Template</label>}
                placeholder="Select"
                options={domains.map((domain) => domain[ApiResponseKeys.domainName])}
                margin={{ xs: "0 0 1rem 0", md: "0 0 1rem 0" }}
                onChange={(event) => handleValueChange(event.target.value, "project_domain")}
                isLoading={isDomainLoading}
                isError={isDomainError}
              />
              <Select
                value={projectDetails.project_subdomain}
                label={<label style={{ fontWeight: "bold", color: "black" }}>Select Knowledge DB</label>}
                placeholder="Select"
                options={subDomains.map((subDomain) => subDomain[ApiResponseKeys.subDomainName])}
                margin={{ xs: "0 0 1rem 0", md: "0 0 1rem 0" }}
                onChange={(event) => handleValueChange(event.target.value, "project_subdomain")}
                isLoading={isSubDomainLoading}
                isError={isSubDomainError}
              />
              <Select
                value={projectDetails.project_subdomain}
                label={<label style={{ fontWeight: "bold", color: "black" }}>Select Example DB</label>}
                placeholder="Select"
                options={subDomains.map((subDomain) => subDomain[ApiResponseKeys.subDomainName])}
                margin={{ xs: "0 0 1rem 0", md: "0 0 1rem 0" }}
                onChange={(event) => handleValueChange(event.target.value, "project_subdomain")}
                isLoading={isSubDomainLoading}
                isError={isSubDomainError}
              />
            </div>
          </div>
        ) : (
          <div className="delete-project-container">
            <h6 className="mt-4 sub-heading">Project Name:</h6>
            <p className="mt-1 project-name">{projectData.project_name}</p>
            <p className="delete-disclaimer mt-5">You are about to delete a project, this action cannot be reversed.</p>
          </div>
        )}

        <div className="right-column">
          <div className="vertical-divider" />
          <div className="team-details-container">
            <h2>Team Details</h2>
            <p>Add team members you would like to work with in this file</p>
            <div className="search-box">
              <div className="search-input">
                <input type="text" placeholder="Type here" />
                <button type="button" className="search-btn">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {apiChangeStatus === "loading" && (
          <div className="project-action-loader d-flex position-absolute align-items-center justify-content-center mt-6">
            <CircularProgress sx={{ margin: "auto" }} />
          </div>
        )}
      </div>
    </ConfirmationBox>
  );
}
