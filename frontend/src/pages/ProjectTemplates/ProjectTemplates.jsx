import { useState, useEffect, useContext, useRef } from "react";
import "./ProjectTemplates.scss";
import Table from "../../components/common/Table/Table";
import Button from "@mui/material/Button";
import KebabMenu from "../../components/common/KebabMenu/KebabMenu";
import { MyTemplatesCreated, MyTemplatesUploaded } from "../../jsonData";
import ProjectDetailsHeader from "../../components/common/ProjectDetailsHeader/ProjectDetailsHeader";
import TabsContainer from "../../components/common/TabsContainer/TabsContainer";
import SidebarContext from "../../context/SidebarContext";
import CreateTemplate from "../CreateTemplate/CreateTemplate";
import ConfirmationBox from "../../components/common/ConfirmationBox/ConfirmationBox";
import CreateEditDeleteProject from "../../components/CreateEditProjectForm/CreateEditDeleteProject";
import { Plus } from "../../assets";
import { Upload } from "../../assets/images";
import UploadBox from "../../components/common/UploadBox/UploadBox";
import {
  CreatedTemplateTableHeaders,
  UploadedTemplateTableHeaders,
  TemplateTabHeaders,
  TemplateType,
  CreatedTemplateKebabMenuOptions,
  UploadedTemplateKebabMenuOptions
} from "../../utils/constants";

export default function ProjectTemplates() {
  const [tablePageNo, setTablePageNo] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [openModal, setOpenModal] = useState(""); // to open view/edit/delete modals
  const { setSidebarButtons } = useContext(SidebarContext);
  const selectedTemplateRef = useRef({});
  const [tableRows, setTableRows] = useState({
    created: [[...CreatedTemplateTableHeaders]],
    uploaded: [[...UploadedTemplateTableHeaders]]
  });

  const handleMenuItemClick = (optionIndex, selectionFor = "") => {
    const templatesData = activeTabIndex === 0 ? MyTemplatesCreated : MyTemplatesUploaded;
    const kebabMenuOptions = activeTabIndex === 0 ? CreatedTemplateKebabMenuOptions : UploadedTemplateKebabMenuOptions;
    const selectedValue = templatesData.filter((item) => item.template_name === selectionFor)[0];
    selectedTemplateRef.current = selectedValue;
    setOpenModal(kebabMenuOptions[optionIndex].key);
  };

  const generateTableContent = (templateType) => {
    const newTableData = [...(templateType === TemplateType.CREATED ? tableRows.created : tableRows.uploaded)];
    const templateData = templateType === TemplateType.CREATED ? MyTemplatesCreated : MyTemplatesUploaded;

    templateData.forEach((template, index) => {
      newTableData[index + 1] = [
        template.template_name,
        template.created_by,
        template.created_on,
        <div key={index} className="d-flex">
          <Button variant="text" sx={{ textDecoration: "underline" }} onClick={() => console.warn("Using ", template.template_name)}>
            Use
          </Button>
          <KebabMenu
            handleMenuItemClick={(optionIndex) => handleMenuItemClick(optionIndex, template.template_name)}
            menuOptions={templateType === TemplateType.CREATED ? CreatedTemplateKebabMenuOptions : UploadedTemplateKebabMenuOptions}
            closeOnSelect
          />
        </div>
      ];
    });

    return newTableData;
  };

  const handleTabChange = (_event, newValue) => {
    setActiveTabIndex(newValue);
  };

  useEffect(() => {
    setSidebarButtons([
      {
        text: "Create Template",
        onClick: () => setOpenModal("create"),
        icon: Plus
      },
      {
        text: "Upload Template",
        onClick: () => setOpenModal("upload"),
        icon: Upload
      }
    ]);
    setTableRows({ ...tableRows, created: generateTableContent(TemplateType.CREATED), uploaded: generateTableContent(TemplateType.UPLOADED) });
  }, []);

  return (
    <div className="home-container">
      <ProjectDetailsHeader />
      <h1 className="heading">Templates</h1>
      <TabsContainer
        tabLabels={TemplateTabHeaders}
        tabsAriaLabel="Create and Upload Tabs"
        activeTabIndex={activeTabIndex}
        handleChange={handleTabChange}
      />
      <Table
        rows={activeTabIndex === 0 ? tableRows.created : tableRows.uploaded}
        isPaginated
        pageNo={tablePageNo}
        handlePageChange={(_, newPage) => setTablePageNo(newPage)}
      />
      {openModal === "create" && <CreateTemplate open setOpen={setOpenModal} />}
      {openModal === "upload" && <UploadBox open setOpen={setOpenModal} />}
      <ConfirmationBox
        title={`${openModal === "view" ? "View" : openModal === "edit" ? "Edit" : "Delete"} Template`}
        isOpen={openModal === "view" || openModal === "edit" || openModal === "delete"}
        handleClose={() => setOpenModal(false)}
      >
        <CreateEditDeleteProject actionType={openModal} projectData={selectedTemplateRef.current} />
      </ConfirmationBox>
    </div>
  );
}
