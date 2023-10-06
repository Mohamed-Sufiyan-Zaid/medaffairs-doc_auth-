import { createContext } from "react";

const SidebarContext = createContext({ sidebarButtons: [], setSidebarButtons: () => {} });

export default SidebarContext;
