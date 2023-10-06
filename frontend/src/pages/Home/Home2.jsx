import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//  import Createnew from "./create_new";
import "./Home2.scss";
import CreateEditDeleteProject from "../../components/CreateEditProjectForm/CreateEditDeleteProject";
// import Plus from "../../assets/icons/plus.svg";
// import SidebarContext from "../../context/SidebarContext";
import { defaultProjectData } from "../../components/CreateEditProjectForm/pageConstants";
import { documentSelector, fetchSessions, updateSearchBy, updateSortBy } from "../../store/features/document/index";

const Documenthistory = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOrder, setSortOrder] = useState(false);
  const documents = useSelector(documentSelector.getDocuments);
  const [openModal, setOpenModal] = useState(false); // [create|edit|delete] to open
  const [selectedProject, setSelectedProject] = useState({ ...defaultProjectData });
  const [actionType, setActionType] = useState("");
  // const sidebarContext = useContext(SidebarContext);
  //  const [isPopupOpen, setIsPopupOpen] = useState(false);
  //   const sortOrder: any = useSelector(documentSelector.getSortBy);
  //   const searchBy: any = useSelector(documentSelector.getSearchBy);
  //  const [menuOpenState, setMenuOpenState] = useState < boolean > Array(documents.length).fill(false);

  const userUUID = "user_uuid";
  dispatch(fetchSessions(userUUID));

  const activeDocuments = documents.filter((doc) => doc.status !== "Inactive");
  const archivedDocuments = documents.filter((doc) => doc.status === "Inactive");

  const statusColors = {
    active: "#0DBDBA",
    inactive: "#4C5459",
    locked: "#925e1f"
  };

  const sortedDocuments = [...documents].sort((a, b) => (a.isBookmarked === b.isBookmarked ? 0 : a.isBookmarked ? -1 : 1));

  const handleSearchInputChange = (searchVal) => {
    const newValue = searchVal.target.value;
    setSearchQuery(newValue);
    dispatch(updateSearchBy(newValue));
  };

  const handleSortOption = (sortVal) => () => {
    dispatch(updateSortBy(sortVal));
  };

  // const toggleMenu = (index) => {
  //   const updatedMenuOpenState = [...menuOpenState];
  //   updatedMenuOpenState[index] = !updatedMenuOpenState[index];
  //   setMenuOpenState(updatedMenuOpenState);
  // };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const toggleSortOptions = () => {
    setSortOrder(!isSortOrder);
  };

  //   const handleCreateNewClick = () => {
  //     // create new
  //   };

  // useEffect(() => {
  //   sidebarContext.setSidebarButtons([
  //     {
  //       text: "Create Project",
  //       onClick: () => {
  //         setSelectedProject({ ...defaultProjectData });
  //         setActionType("create");
  //         setOpenModal(true);
  //       },
  //       icon: Plus
  //     }
  //   ]);
  // }, []);

  /* useEffect(() => {
    dispatch(updateSearchBy("Title2"));
  }, [])  */

  return (
    <div className="home">
      <div className="doc_tab">
        <button type="button" onClick={() => handleTabClick(1)} className={activeTab === 1 ? "active" : ""}>
          My Documents
        </button>
        <button type="button" onClick={() => handleTabClick(2)} className={activeTab === 2 ? "active" : ""}>
          Archived Documents
        </button>
      </div>

      <div className="navi-bar">
        <div className="search-bar">
          <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchInputChange} />
        </div>
        <div className="sort-toggle" onClick={toggleSortOptions} role="presentation">
          <span>Sort by </span>
          {isSortOrder && (
            <div className="sort-box">
              {[
                { t: "Date", v: "date" },
                { t: "Readibility Score", v: "RScore" },
                { t: "Perception Score", v: "PScore" }
              ].map((item, index) => (
                <button key={`${index}`} type="button" onClick={handleSortOption(item.v)}>
                  {item.t}
                </button>
              ))}
              {/* <button>Date</button>
              <button>RScore</button>
              <button>Option 3</button> */}
            </div>
          )}
        </div>

        <button
          type="button"
          className="create-button"
          onClick={() => {
            setSelectedProject({ ...defaultProjectData });
            setActionType("create");
            setOpenModal(true);
          }}
        >
          {" "}
          Create New
        </button>
        {/* <Createnew isOpen={isPopupOpen} onClose={handlePopupClose} /> */}
      </div>
      {activeTab === 1 && (
        <div className="tab-container">
          {sortedDocuments &&
            activeDocuments.map((document, index) => (
              <div key={index} className="tab-component">
                <div className="content">
                  {document.isBookmarked && <img src="" alt="bookmark" className="bookmark-icon" />}
                  <div className="title">{document.title}</div>
                  {/* <div className="menu-toggle" onClick={() => toggleMenu(index)} role="presentation">
                    {menuOpenState[index] && (
                      <div className="menu-box">
                        <div>Clone</div>
                        <div>Edit</div>
                        <div>Download</div>
                      </div>
                    )}
                  </div> */}
                </div>
                <div className="line" />
                <div className="info">
                  <span className="created-by-on">
                    Details
                    <div className="status" style={{ backgroundColor: statusColors[document.status.toLowerCase()] }}>
                      {document.status}
                    </div>
                    <div className="owner">{`Owner: ${document.createdBy}`}</div>
                  </span>
                </div>

                <div className="scores">
                  <div>Readability Score</div>
                  <div className="field scorev1" style={{ color: "#9D8806" }}>
                    {document.RScore}
                  </div>
                </div>

                <div className="actions">
                  <div>Perception Score</div>
                  <div className="field scorev2">{document.PScore}</div>
                </div>

                <div className="menu-toggle">
                  <button type="button" className="menu1">
                    Preview
                  </button>
                  <button type="button" className="menu2">
                    Clone
                  </button>
                  <button type="button" className="menu3">
                    Edit
                  </button>
                  <button type="button" className="menu4">
                    Download
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {activeTab === 2 && (
        <div className="tab-container">
          {archivedDocuments.map((document, index) => (
            <div key={index} className="tab-component">
              <div className="content">
                {document.isBookmarked && <img src="" alt="bookmark" className="bookmark-icon" />}
                <div className="title">{document.title}</div>
              </div>
              <div className="line" />
              <div className="info">
                <span className="created-by-on">
                  Details
                  <div className="status" style={{ backgroundColor: statusColors[document.status.toLowerCase()] }}>
                    {document.status}
                  </div>
                  <div className="owner">{`Owner: ${document.createdBy}`}</div>
                </span>
              </div>

              <div className="scores">
                <div>Readability Score</div>
                <div className="field scorev1" style={{ color: "#9D8806" }}>
                  {document.RScore}
                </div>
              </div>

              <div className="actions">
                <div>Perception Score</div>
                <div className="field scorev2">{document.PScore}</div>
              </div>
              <div className="menu-toggle">
                <button type="button" className="menu1">
                  Preview
                </button>
                <button type="button" className="menu2">
                  Clone
                </button>
                <button type="button" className="menu3">
                  Edit
                </button>
                <button type="button" className="menu4">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <CreateEditDeleteProject openModal={openModal} setOpenModal={setOpenModal} actionType={actionType} projectData={selectedProject} />
    </div>
  );
};

export default Documenthistory;
