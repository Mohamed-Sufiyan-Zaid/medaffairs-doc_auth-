import { useState, useEffect, useContext } from "react";
import "./ProjectDocuments.scss";
import Button from "@mui/material/Button";
import Table from "../../components/common/Table/Table";
import KebabMenu from "../../components/common/KebabMenu/KebabMenu";
import { useNavigate } from "react-router-dom";
import { DocumentTableHeaders, DocumentTableKebabMenuOptions } from "../../utils/constants";
import { MyDocuments } from "../../jsonData";
import { ProjectDocumentsText } from "../../i18n/ProjectDocumentsText";
import ProjectDetailsHeader from "../../components/common/ProjectDetailsHeader/ProjectDetailsHeader";
import SidebarContext from "../../context/SidebarContext";
import Plus from "../../assets/icons/plus.svg";

const handleMenuItemClick = (optionIndex, selectionFor = "") => {
  const selectedValue = DocumentTableKebabMenuOptions[optionIndex].key;
  console.warn(selectedValue, "selected for ", selectionFor);
};

const ProjectDocuments = () => {
  const [tableRows, setTableRows] = useState([]);
  const [tablePageNo, setTablePageNo] = useState(0);
  const navigate = useNavigate();
  const { setSidebarButtons } = useContext(SidebarContext);
  const generateTableContent = () => {
    const newTableData = [];
    MyDocuments.forEach((document, index) => {
      newTableData[index + 1] = [
        document.document_name,
        document.created_on,
        document.created_by,
        <div key={index} className="d-flex">
          <Button variant="text" sx={{ textDecoration: "underline" }} onClick={() => navigate(`/document/${document.id}`)}>
            {ProjectDocumentsText.tableOption}
          </Button>
          <KebabMenu
            handleMenuItemClick={(optionIndex) => handleMenuItemClick(optionIndex, document.document_name)}
            menuOptions={DocumentTableKebabMenuOptions}
            closeOnSelect
          />
        </div>
      ];
    });
    setTableRows(newTableData);
  };

  useEffect(() => {
    setSidebarButtons([
      {
        text: "New Document",
        onClick: () => navigate("/document"),
        icon: Plus
      }
    ]);
    generateTableContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="doc-container">
      <ProjectDetailsHeader />
      <div>
        <h1 className="doc-heading mb-lg-3">All Documents</h1>
        <Table
          rows={tableRows}
          headers={DocumentTableHeaders}
          isPaginated
          pageNo={tablePageNo}
          handlePageChange={(_, newPage) => setTablePageNo(newPage)}
        />
      </div>
    </div>
  );
};
export default ProjectDocuments;
