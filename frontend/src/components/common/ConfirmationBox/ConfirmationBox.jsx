import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import EditDocument from "../../../pages/EditDocument/EditDocument";
import { ConfirmationBoxText } from "../../../i18n/Components";
import { useNavigate } from "react-router-dom";
import "./ConfirmationBox.scss";

export default function ConfirmationBox({ isOpen, title, handleClose, children }) {
  // const handleAgree = () => {
  //   handleAccept();
  //   handleClose();
  // };
  const navigate = useNavigate();
  return (
    <div className="confirmation-box">
      <Dialog
        PaperProps={{ style: { width: "100%", height: "100%", margin: 0, borderRadius: 0 } }}
        open={isOpen}
        className="popup"
        onClose={handleClose}
        aria-labelledby="alert-confirmation-title"
        aria-describedby="alert-confirmation-description"
        fullScreen
      >
        <Button onClick={handleClose} className="back-btn">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23" stroke="#2663EB" strokeWidth="2" />
            <path d="M31 24H17" stroke="#2663EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 31L17 24L24 17" stroke="#2663EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
        <p className="back">Back</p>
        {title && <DialogTitle className="confirmation-title">{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
        <Divider className="confirmation-box-divider mt-3 mb-3" />
        <DialogActions>
          <Button variant="contained" onClick={() => navigate("/document")}>
            Create Document
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmationBox.defaultProps = {
  isOpen: false,
  agreeText: ConfirmationBoxText.agreeText,
  disagreeText: ConfirmationBoxText.disagreeText
};
