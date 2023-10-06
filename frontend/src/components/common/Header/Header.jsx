import { Logo } from "../../../assets";
import "./Header.scss";
import Typography from "@mui/material/Typography";

const Header = ({ heading = "Document Authoring", subHeading = "" }) => (
  <div className="header py-3">
    <div className="header-contents d-flex align-items-center justify-content-start">
      <img alt="Pfizer logo" src={Logo} className="logo" />
      <div className="divider px-3" />
      <div className="">
        <Typography variant="h3" className="px-3  main-heading">
          {heading}
          <span className="sub-heading"> | {subHeading}</span>
        </Typography>
      </div>
    </div>
  </div>
);

export default Header;
