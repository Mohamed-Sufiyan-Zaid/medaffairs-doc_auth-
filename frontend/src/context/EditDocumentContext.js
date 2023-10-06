import { createContext } from "react";

const EditDocumentContext = createContext({
  editDocumentData: [],
  setEditDocumentData: () => {}
});

export default EditDocumentContext;
