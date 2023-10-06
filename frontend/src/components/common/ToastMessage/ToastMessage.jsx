import "./ToastMessage.scss";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { TOAST_TYPE } from "../../../models/components/enums";
import successIcon from "../../../assets/images/success-icon.svg";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const getAlertIcon = (severity) => {
  if (severity === TOAST_TYPE.SUCCESS) {
    return <img src={successIcon} alt="alert" />;
  }
  return <ErrorOutlineOutlinedIcon />;
};

const ToastMessage = ({ severity, isVisible, message }) => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <Snackbar open={isVisible && showAlert} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }} data-testid="toast">
      <Alert
        severity={severity}
        icon={getAlertIcon(severity)}
        className="toast-alert px-4 d-flex align-items-center"
        onClose={() => {
          setShowAlert(false);
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;

ToastMessage.defaultProps = {
  severity: TOAST_TYPE.SUCCESS
};
