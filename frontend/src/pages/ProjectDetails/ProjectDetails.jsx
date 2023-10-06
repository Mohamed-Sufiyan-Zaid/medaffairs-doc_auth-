import "./ProjectDetails.scss";
import ProjectDetailsHeader from "../../components/common/ProjectDetailsHeader/ProjectDetailsHeader";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";
import FolderData from "../../components/FolderData/FolderData";
import AppCardDetails from "../../components/ApplicationCard/AppCardDetails";
import { ApplicationCards } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="doc-container">
      <ProjectDetailsHeader />
      <div className="container">
        <div className="row custom-grid">
          {ApplicationCards.map((app) => (
            <div className="col-md-6 custom-cell" key={app.title}>
              <ApplicationCard
                title={app.title}
                description={app.description}
                folderChildren={
                  Object.keys(app.folder).length !== 0 ? <FolderData title={app.folder.title} value={app.folder.value} type={app.folder.type} /> : ""
                }
                detailedChildren={app.detailsList.length !== 0 ? <AppCardDetails detailsList={app.detailsList} /> : ""}
                btnText={app.btnText}
                isBtnDisabled={app.isBtnDisabled}
                className="mt-3"
                handleBtnClick={app.navPath ? () => navigate(`/project/${id}/${app.navPath}`) : () => {}}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectDetails;
