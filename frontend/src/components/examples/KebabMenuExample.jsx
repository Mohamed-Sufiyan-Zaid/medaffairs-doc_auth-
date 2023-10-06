import { useState } from "react";
import KebabMenu from "../common/KebabMenu/KebabMenu";
import downloadIcon from "../../assets/images/download.svg";
import deleteIcon from "../../assets/images/delete-icon.svg";

export const kebabMenuOptions = [
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

const KebabMenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedMenuId, setOpenedMenuId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setOpenedMenuId(id);
    setAnchorEl(event.target);
  };

  const handleMenuClose = () => {
    setOpenedMenuId(null);
    setAnchorEl(null);
  };
  const handleMenuItemClick = (id, optionIndex) => {
    const selectedValue = kebabMenuOptions[optionIndex].key;
    alert(selectedValue);
  };

  const dummyData = {
    documentId: "123456",
    author: "John Doe"
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="h-6 w-6" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      <KebabMenu
        data={dummyData}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleMenuItemClick={handleMenuItemClick}
        menuOptions={kebabMenuOptions}
        anchorEl={anchorEl}
        openedMenuId={openedMenuId}
      />
    </div>
  );
};

export default KebabMenuComponent;
