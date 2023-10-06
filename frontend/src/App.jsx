import React, { useEffect, useRef, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// eslint-disable-next-line import/no-unresolved
import "~bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line import/no-unresolved
import "~bootstrap/dist/js/bootstrap.min";

import "./App.scss";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import Header from "./components/common/Header/Header";
import HomePage from "./pages/Home/Home2";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ProjectTemplates from "./pages/ProjectTemplates/ProjectTemplates";
import ProjectDocuments from "./pages/ProjectDocuments/ProjectDocuments";
import DocumentAuthoringSidebar from "./components/DocumentAuthoringSidebar/DocumentAuthoringSidebar";
import UploadBox from "./components/common/UploadBox/UploadBox";
import QuillEditor from "./components/QuillEditor/QuillEditor";
import InfoCard from "./components/InfoCard/InfoCard";
import DocumentHeader from "./components/DocumentHeader/DocumentHeader";
import ToastMessage from "./components/common/ToastMessage/ToastMessage";
import ConfirmationBox from "./components/common/ConfirmationBox/ConfirmationBox";
import KebabMenuExample from "./components/examples/KebabMenuExample";
import { TOAST_TYPE } from "./models/components/enums";
import InputPrompt from "./pages/InputPrompt";
import TabsExample from "./components/examples/TabsExample";
import ApplicationCard from "./components/ApplicationCard/ApplicationCard";
import AppCardDetails from "./components/ApplicationCard/AppCardDetails";
import FolderData from "./components/FolderData/FolderData";
import SidebarContext from "./context/SidebarContext";
import EditDocumentContext from "./context/EditDocumentContext";
import EditDocument from "./pages/EditDocument/EditDocument";
import CreateTemplate from "./pages/CreateTemplate/CreateTemplate";
import UploadTemplate from "./pages/UploadTemplate/UploadTemplate";
import DeleteTemplate from "./pages/DeleteTemplate/DeleteTemplate";
import PromptSuggestion from "./components/PromptSuggestions/PromptSuggestion";
import UserContext from "./context/UserContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { documentContextData } from "./utils/constants";
import MyPrompts from "./pages/PromptLibrary/MyPrompts/MyPrompts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

const text = {
  heading: "Document Authoring",
  subHeading: "Home"
};

const messages = [
  {
    msg: "You are a research agent who is provided with a user query and some context. Your task is to answer questions which can help your team \nresearch on the user’s questions. These are previously asked questions: {unanswered_questions}",
    isReply: false
  },
  {
    msg: "This is a chat message reply",
    isReply: true,
    citationsContent: "MAX608.0.pdf, , pages :- 2, 4, 6"
  }
];

const appCardDetailsList = [
  {
    title: "Created: ",
    value: 12
  },
  {
    title: "Uploaded: ",
    value: 7
  }
];
const ChatMessages = () => (
  <div>
    {messages.map((message, index) => (
      <div key={index}>
        <ChatMessage textMessage={message.msg} isReply={message.isReply} citationsContent={message.citationsContent} />
      </div>
    ))}
  </div>
);

function App() {
  const rootRef = useRef(null);
  const [containerStart, setContainerStart] = useState(99);
  const [sidebarButtons, setSidebarButtons] = useState([]);
  const [userInfo, setUserInfo] = useState({ ntid: "", firstName: "", lastName: "" });
  const [pageLoader, setPageLoader] = useState(true);
  const [editDocumentData, setEditDocumentData] = useState([...documentContextData]);

  useEffect(() => {
    if (rootRef.current) {
      setContainerStart(window.innerHeight - 16 - rootRef.current.getBoundingClientRect().top);
    }
  });

  const memoisedSidebarState = useMemo(() => ({ sidebarButtons, setSidebarButtons }), [sidebarButtons, setSidebarButtons]);

  const memoisedDocumentData = useMemo(() => ({ editDocumentData, setEditDocumentData }), [editDocumentData, setEditDocumentData]);

  // The below function simulates user info fetching via an API
  const fetchUserDetails = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ntid: "ns9000", firstName: "John", lastName: "Doe" });
      }, 3000);
    });

  // The below function simulates user info fetching via an API
  useEffect(() => {
    const fetchUserInfo = async () => {
      setPageLoader(true);
      const userData = await fetchUserDetails();
      setUserInfo(userData);
      setPageLoader(false);
    };
    fetchUserInfo();
  }, []);

  const [open, setIsOpen] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={userInfo}>
        <Router>
          <Header heading={text.heading} subHeading={text.subHeading} />
          {pageLoader ? (
            <Backdrop open={pageLoader}>
              <CircularProgress />
            </Backdrop>
          ) : (
            <div ref={rootRef} className="root-container d-flex justify-content-center px-2">
              <div className="main-container position-relative d-flex mb-2 mt-2" style={{ height: `${containerStart}px` }}>
                <SidebarContext.Provider value={memoisedSidebarState}>
                  <DocumentAuthoringSidebar buttons={sidebarButtons} user={userInfo} />
                  <div className="content-container col-md-10 ml-auto">
                    <Routes>
                      {/* List of all projects */}
                      <Route path="/" element={<HomePage />} />
                      {/* Project details page */}
                      <Route path="/project/:id" element={<ProjectDetails />} />
                      <Route path="/input-prompt" element={<InputPrompt title="Input" />} />
                      {/* TODO: to be moved to ProjectTemplates page once the component is ready */}
                      <Route path="/create-template" element={<CreateTemplate />} />
                      {/* manage templates for project */}
                      <Route path="/project/:id/templates" element={<ProjectTemplates />} />

                      {/* manage documents authored for project */}
                      <Route path="/upload-template" element={<UploadTemplate />} />
                      <Route path="/delete-template" element={<DeleteTemplate />} />
                      <Route path="/prompt-suggestion" element={<PromptSuggestion />} />
                      <Route path="/project/:id/documents" element={<ProjectDocuments />} />
                      <Route path="/prompt-engineer" element={<MyPrompts />} />

                      {/* open selected document from manage documents */}
                      <Route
                        path="/document?/:documentId"
                        element={
                          <EditDocumentContext.Provider value={memoisedDocumentData}>
                            <EditDocument />
                          </EditDocumentContext.Provider>
                        }
                      />

                      <Route path="/upload" element={<UploadBox title="test" />} />
                      <Route path="/chat" element={<ChatMessages />} />
                      <Route path="/edit" element={<QuillEditor />} />
                      <Route path="/info" element={<InfoCard header="Total Projects" info={37} />} />
                      <Route path="/toast" element={<ToastMessage severity={TOAST_TYPE.SUCCESS} isVisible message="This is a success message" />} />
                      <Route path="/kebab" element={<KebabMenuExample />} />
                      <Route path="/tabs" element={<TabsExample />} />
                      <Route
                        path="/app-card"
                        element={
                          <ApplicationCard
                            title="Manage Templates"
                            description="This contains all your created and uploaded templates and you can manage your existing templates or add new ones."
                            folderChildren={<FolderData title="Title" value={12} type="folder" />}
                            detailedChildren={<AppCardDetails detailsList={appCardDetailsList} />}
                            btnText="View"
                            className="mt-3"
                          />
                        }
                      />
                      <Route
                        path="/confirm"
                        element={
                          <ConfirmationBox isOpen={open} handleClose={() => setIsOpen(false)} agreeText="Agree" disagreeText="Disagree" title="Title">
                            <div>This can be any child component</div>
                          </ConfirmationBox>
                        }
                      />
                      <Route
                        path="/dochead"
                        element={
                          <DocumentHeader
                            navigationHeader="Back to Home"
                            documentNameLabel="Document Name : "
                            defaultTitle="Document Name"
                            templateLabel="template name : "
                            templateName="dummy"
                            numOfSections={4}
                            path="/info"
                          />
                        }
                      />
                    </Routes>
                  </div>
                </SidebarContext.Provider>
              </div>
            </div>
          )}
        </Router>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
