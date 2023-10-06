import downloadIcon from "../assets/images/download.svg";
import deleteIcon from "../assets/images/delete.svg";
import EditIcon from "../assets/images/edit.svg";
import DeleteIcon from "../assets/images/delete-icon.svg";
import ViewIcon from "../assets/images/view-icon.svg";

import {
  ManageTemplatesCardText,
  AuthorDocumentCardText,
  ManagePromptLibraryCardText,
  ManageContentLibraryCardText
} from "../i18n/ApplicationCardText";

export const ApiEndpoints = Object.freeze({
  templates: "/templates", // dummy endpoint
  stats: "/document/stats", // dummy endpoint
  projectsList: "/projects/nt-id",
  projectOperations: "/project",
  getDomains: "get-domains",
  getSubDomains: "get-sub-domains"
});

export const QueryKeys = Object.freeze({
  templates: "templates", // dummy endpoint
  stats: "stats", // dummy endpoint
  projectsList: "projectsList",
  createProject: "createProject",
  editProject: "editProject",
  deleteProject: "deleteProject",
  getDomains: "getDomains",
  getSubDomains: "getSubDomains"
});

export const HTTPMethods = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
});

export const ProjectTableHeaders = ["Project Name", "Domain", "Last Updated Date", "Owner", ""];

export const DocumentTableHeaders = ["Document Name", "Created by", "Created on", "", ""];

export const CreatedTemplateTableHeaders = ["Template Name", "Created by", "Created on", "", ""];

export const UploadedTemplateTableHeaders = ["Template Name", "Uploaded by", "Uploaded on", "", ""];

export const TemplateType = {
  CREATED: "Created",
  UPLOADED: "Uploaded"
};

export const TemplateTabHeaders = [TemplateType.CREATED, TemplateType.UPLOADED];

export const DocumentTableKebabMenuOptions = [
  {
    key: "download",
    label: "Download",
    icon: downloadIcon
  },
  {
    key: "delete",
    label: "Delete",
    icon: deleteIcon
  }
];

export const ProjectListKebabMenuOptions = [
  {
    key: "edit",
    label: "Edit",
    icon: EditIcon
  },
  {
    key: "delete",
    label: "Delete",
    icon: DeleteIcon
  }
];

export const CreatedTemplateKebabMenuOptions = [
  {
    key: "view",
    label: "View",
    icon: ViewIcon
  },
  {
    key: "edit",
    label: "Edit",
    icon: EditIcon
  },
  {
    key: "delete",
    label: "Delete",
    icon: deleteIcon
  }
];

export const UploadedTemplateKebabMenuOptions = [
  {
    key: "edit",
    label: "Edit",
    icon: EditIcon
  },
  {
    key: "delete",
    label: "Delete",
    icon: deleteIcon
  }
];

export const ApplicationCards = [ManageTemplatesCardText, AuthorDocumentCardText, ManagePromptLibraryCardText, ManageContentLibraryCardText];

export const htmlString = `
<h4>Header</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>{Generated Text Placeholder - ID 1}</p>

<h4>Sub-header #1</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>{Generated Text Placeholder - ID 2}</p>

<h4>Sub-header #2</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>{Generated Text Placeholder - ID 3}</p>`;

export const documentContextData = [
  {
    documentId: 1,
    promptData: [
      {
        id: 1,
        ogText: "Test OG",
        presentText: "TEST PResent",
        prompt: "Test prompt"
      },
      {
        id: 2,
        ogText: "Test OG 2",
        presentText: "TEST PResent 2",
        prompt: "Test prompt 2"
      }
    ]
  },
  {
    documentId: 2,
    promptData: [
      {
        id: 1,
        ogText: "Test OG 3",
        presentText: "TEST PResent",
        prompt: "Test prompt"
      },
      {
        id: 2,
        ogText: "Test OG 4",
        presentText: "TEST PResent 2",
        prompt: "Test prompt 2"
      }
    ]
  },
  {
    documentId: 200,
    promptData: [
      {
        id: 1,
        ogText: "Test OG 3",
        presentText: "TEST PResent",
        prompt: "Test prompt"
      },
      {
        id: 2,
        ogText: "Test OG 4",
        presentText: "TEST PResent 2",
        prompt: "Test prompt 2"
      }
    ]
  }
];
export const MyPromptsTableHeaders = ["Prompt Text", "Domain", "Prompt Type", "Status", ""];
