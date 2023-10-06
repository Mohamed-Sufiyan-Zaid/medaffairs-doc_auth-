import parse from "html-react-parser";
import EditDocumentEmptyState from "../components/EditDocumentEmptyState/EditDocumentEmptyState";
import PlaceholderEditors from "../components/PlaceholderEditors/PlaceholderEditors";
import { EditDocumentText } from "../i18n/EditDocumentText";

export const generateDocumentWithPlaceHoldersToEdit = (htmlContent) => {
  if (!htmlContent) {
    return <EditDocumentEmptyState header={EditDocumentText.contentUnavailable} subHeader={EditDocumentText.selectTemplate} />;
  }
  return parse(htmlContent, {
    // eslint-disable-next-line consistent-return
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name === "p") {
        const content = domNode.children[0].data;
        // Define a regular expression pattern to match {Generated Text Placeholder - ID [Any ID]}
        const regex = /\{Generated Text Placeholder - ID (\d+)\}/;
        if (regex.test(content)) {
          // Extract the ID from the matched content
          const match = regex.exec(content);
          const placeholderId = match[1];
          return <PlaceholderEditors placeholderId={placeholderId} content={content} />;
        }
      }
    }
  });
};
