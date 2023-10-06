import backIcon from "../../../assets/images/back-arrow.svg";
import IconButton from "@mui/material/IconButton";
import downloadIcon from "../../../assets/images/save-icon.svg";
import bookmark from "../../../assets/images/bookmark.svg";
import { Button } from "@mui/material";
import { commonText } from "../../../i18n/Common";
import { useNavigate } from "react-router-dom";
import "./NavHeader.scss";
import { NavHeaderText } from "../../../i18n/Components";

const NavHeader = ({ icon = backIcon, path = "/", navigationHeader = NavHeaderText.navigationHeader, handleDownload, handleBookmark }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex nav-header">
      <img src={icon} alt={commonText.backIconAlt} role="presentation" onClick={() => navigate(path)} />
      <button type="button" className="navigation-header ms-2" onClick={() => navigate(path)}>
        {navigationHeader}
      </button>
      <div className="d-flex flex-row align-items-center">
        <div className="nav-right">
          <IconButton size="small" onClick={handleDownload} className="ms-2">
            <img src={downloadIcon} alt={commonText.downloadIconAlt} />
          </IconButton>
          <IconButton size="small" onClick={handleBookmark} className="ms-2">
            <img src={bookmark} alt={commonText.downloadIconAlt} />
          </IconButton>
          <Button variant="contained" style={{ backgroundColor: "#2663EB", color: "white" }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
