import "./DocumentHeader.scss";
import { useState } from "react";
import Select from "../common/Select/Select";
import editIcon from "../../assets/images/edit.svg";
// import downloadIcon from "../../assets/images/save-icon.svg";
// import bookmark from "../../assets/images/bookmark.svg";
// import { Button } from "@mui/material";
import { commonText } from "../../i18n/Common";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DocumentHeaderText } from "../../i18n/Components";
import Divider from "@mui/material/Divider";
import NavHeader from "../common/NavHeader/NavHeader";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const DocumentHeader = ({
  navigationHeader,
  path,
  defaultTitle,
  documentNameLabel,
  documentNamePlaceHolder,
  // handleDownload,
  // handleBookmark,
  templateLabel,
  templateName,
  numOfSections,
  setHtmlString,
  documentId
}) => {
  // const [selectedValue, setSelectedValue] = useState(DocumentHeaderText.saveOpt);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [inEditState, setEditState] = useState(false);
  const [input, setInput] = useState(defaultTitle);

  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  return (
    <div className="doc-header d-d-flex flex-column">
      {navigationHeader && <NavHeader navigationHeader={navigationHeader} path={path} />}
      {documentNameLabel && (
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <p className="input-label">{documentNameLabel}</p>
            {!inEditState ? (
              <div className="d-flex flex-row align-items-center ms-3 label-value">
                <p>{input}</p>
                <IconButton className="ml-2" size="small" onClick={() => setEditState(true)}>
                  <img src={editIcon} alt={commonText.editIconAlt} />
                </IconButton>
              </div>
            ) : (
              <div className="d-flex flex-row align-items-center ms-3 label-value">
                <TextField
                  value={input}
                  size="small"
                  onChange={(e) => {
                    setInput(e.currentTarget.value);
                  }}
                  variant="outlined"
                  placeholder={documentNamePlaceHolder || ""}
                />
                <IconButton size="small" onClick={() => setEditState(false)}>
                  <DoneOutlinedIcon />
                </IconButton>
              </div>
            )}
          </div>
          {/* <div className="d-flex flex-row align-items-center">
            <IconButton size="small" onClick={handleDownload} className="ms-2">
              <img src={downloadIcon} alt={commonText.downloadIconAlt} />
            </IconButton>
            <IconButton size="small" onClick={handleBookmark} className="ms-2">
              <img src={bookmark} alt={commonText.downloadIconAlt} />
            </IconButton>
            <Select
              style={{ backgroundColor: "blue", color: "white" }}
              options={[DocumentHeaderText.saveOpt, DocumentHeaderText.approveOpt]}
              value={selectedValue}
              onChange={handleChange}
            />
            <Button variant="contained" style={{ backgroundColor: "#2663EB", color: "white" }} value={selectedValue} onClick={handleChange}>
              Save
            </Button>
          </div> */}
        </div>
      )}
      {templateLabel && (
        <div className="d-flex flex-row justify-content-between align-items-center mt-3 doc-template">
          <div className="d-flex flex-row align-items-center">
            <p className="input-label">{templateLabel}</p>
            {templateName && documentId !== "document" && <p className="ms-3 label-value">{templateName}</p>}
            {documentId === "document" && (
              <Select
                placeholder="Select a template"
                options={["Template 1", "Template 2", "Template 3", "Template 4", "Template 5", "Template 6"]}
                margin={{ xs: "0 0 1rem 0", md: "0 0 2rem 0" }}
                value={selectedTemplate}
                onChange={(event) => {
                  setSelectedTemplate(event.target.value);
                  setHtmlString("<h2>Text dhuihc</h2><p>{Generated Text Placeholder - ID 1}</p><p>cdgbcjkdnkcnke</p>");
                }}
              />
            )}
          </div>
          {numOfSections && (
            <div className="d-flex flex-row align-items-center">
              <p className="input-label">{DocumentHeaderText.section}</p>
              <p className="ms-3 label-value">{numOfSections}</p>
            </div>
          )}
        </div>
      )}
      <Divider className="divider mt-3 mb-3" />
    </div>
  );
};
export default DocumentHeader;
