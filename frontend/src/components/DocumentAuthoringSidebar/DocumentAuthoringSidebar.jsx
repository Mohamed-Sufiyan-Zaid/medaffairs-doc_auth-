import "./DocumentAuthoringSidebar.scss";
import Button from "@mui/material/Button";
import GetSvgIcon from "../../utils/GetSvgIcon";

export default function DocumentAuthoringSidebar({ title = "Document Authoring", buttons = [], user = { firstName: "", lastName: "" } }) {
  return (
    <div className="sidebar-container col-md-2">
      <h2 className="heading text-center mt-3">{title}</h2>
      <div className="button-container pl-2">
        {buttons.map((button, key) => (
          <Button key={key} variant="text" color="secondary" onClick={button.onClick} startIcon={<GetSvgIcon icon={button.icon} />}>
            {button.text}
          </Button>
        ))}
      </div>
      <div className="user-profile-container">
        <div className="user-thumbnail d-flex align-items-center">
          <span className="d-flex align-items-center justify-content-center">
            {user.firstName ? user.firstName.slice(0, 1) : ""}
            {user.lastName ? user.lastName.slice(0, 1) : ""}
          </span>
          <span className="user-name">
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}
