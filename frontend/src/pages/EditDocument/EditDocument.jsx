import DocumentHeader from "../../components/DocumentHeader/DocumentHeader";
import Grid from "@mui/material/Grid";
import { htmlString as htmlString1 } from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import FormAssistant from "../../components/FormAssistant/FormAssistant";
import { useState, useEffect, useContext } from "react";
import SidebarContext from "../../context/SidebarContext";
import "./EditDocument.scss";
import Plus from "../../assets/icons/plus.svg";
import { generateDocumentWithPlaceHoldersToEdit } from "../../utils/documentUtils";

const EditDocument = () => {
  const [documentWithEditablePlaceholder, setDocumentWithEditablePlaceholder] = useState();
  const [htmlString, setHtmlString] = useState(htmlString1);
  const navigate = useNavigate();
  const { documentId } = useParams();
  const { setSidebarButtons } = useContext(SidebarContext);

  useEffect(() => {
    setDocumentWithEditablePlaceholder(generateDocumentWithPlaceHoldersToEdit(htmlString));
  }, [htmlString]);

  useEffect(() => {
    setHtmlString(htmlString1);
  }, []);
  useEffect(() => {
    setSidebarButtons([
      {
        text: "New Document",
        onClick: () => {
          navigate("/document");
        },
        icon: Plus
      }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <div className="d-flex flex-column edit-document-container">
            <div className="document-header">
              <DocumentHeader
                navigationHeader="Back to My Documents"
                documentNameLabel
                defaultTitle="Document Name"
                // templateLabel="template name : "
                // templateName={!Number.isNaN(documentId) ? "dummy" : ""}
                numOfSections={4}
                path="/"
                setHtmlString={setHtmlString}
                documentId={documentId || null}
              />
            </div>
            <div className="d-flex flex-column document-editor-content">{documentWithEditablePlaceholder}</div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <FormAssistant />
        </Grid>
      </Grid>
    </div>
  );
};
export default EditDocument;
