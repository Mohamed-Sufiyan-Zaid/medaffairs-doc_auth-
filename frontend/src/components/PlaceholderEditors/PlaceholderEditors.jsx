import { useState, useRef, useEffect, useContext } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import "./PlaceholderEditor.scss";
import EditDocumentContext from "../../context/EditDocumentContext";

const PlaceholderEditors = ({ placeholderId, content }) => {
  const { documentId } = useParams();
  const [show, setShow] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const textAreaRef = useRef(null);
  const [assistantPromptData, setAssistantPromptData] = useState();
  const { editDocumentData } = useContext(EditDocumentContext);

  useEffect(() => {
    if (editDocumentData && documentId !== "document") {
      const docData = editDocumentData.find((doc) => doc.documentId === Number(documentId));
      const promptData = docData.promptData.find((prompt) => prompt.id === Number(placeholderId));
      setAssistantPromptData(promptData);
    }
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the text area
    function handleClickOutside(event) {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        console.warn("Clicked outside the text area");
        setShow(false);
      }
    }
    // Attach the click event listener when the text area is shown otherwise remove it
    if (show) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  const handleClick = () => {
    console.warn("button clicked", placeholderId);
    setShow(!show);
    // show form assistant or not
  };

  return (
    <div className="d-flex flex-column placeholder-editor" ref={textAreaRef}>
      <div className="d-flex flex-row placeholder-editor-content justify-content-start align-items-center">
        {content}
        <IconButton onClick={handleClick} className="placeholder-editor-btn">
          Edit with AI
        </IconButton>
        <IconButton onClick={handleClick} className="placeholder-add-btn">
          Add new
        </IconButton>
        <IconButton onClick={handleClick} className="placeholder-delete-btn">
          Delete
        </IconButton>
      </div>
      {show && (
        <TextField
          placeholder="Type content here or use the Input Prompts button for gen AI"
          multiline
          minRows={2}
          sx={{ marginBottom: "1rem" }}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      )}
      {!show && editedContent && <div>{editedContent}</div>}
      {JSON.stringify(assistantPromptData)}
    </div>
  );
};

export default PlaceholderEditors;
