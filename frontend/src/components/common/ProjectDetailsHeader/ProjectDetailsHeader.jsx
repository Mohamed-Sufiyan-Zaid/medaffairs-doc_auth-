import NavHeader from "../NavHeader/NavHeader";
import { commonText } from "../../../i18n/Common";
import "./ProjectDetailsHeader.scss";

const ProjectDetailsHeader = ({ projectName, createdDate, createdBy, navProps }) => (
  <div className="project-details-header">
    <NavHeader {...navProps} />
    <h1 className="doc-heading my-3">{projectName}</h1>
    <p className="doc-created">
      {commonText.createdOn} <span>{createdDate}</span> {commonText.by} <span>{createdBy}</span>
    </p>
  </div>
);

export default ProjectDetailsHeader;

// TODO: Remove these defaultProps and pass all the props via useNavigate
// const navigate = useNavigate();
// navigate('project/id/documents', { state: { projectName: name, createdDate: 'August 23, 2023', createdBy: "John Doe" } });

// const {state} = useLocation();
// const { projectName, createdDate,  createdBy} = state; // Read values passed on state

ProjectDetailsHeader.defaultProps = {
  projectName: "Project Drug Trial",
  createdDate: "August 23, 2023",
  createdBy: "John Doe"
};
