import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import documentService from "../../services/document.service";
import selector from "./document_selector";

// export interface DocumentState {
//   activeTab: number;
//   searchQuery[];
//   documents[];
//   searchBy: string;
//   sortBy: string;
// }

const initialState = {
  activeTab: 1,
  searchQuery: [],
  searchBy: "",
  sortBy: "date", // title, createdBy,
  documents: [
    {
      title: "Title1",
      createdBy: "Joe zee",
      status: "Locked",
      RScore: "64.4",
      PScore: "8th/9th",
      isBookmarked: false
    },
    {
      title: "Title2",
      createdBy: "Joe zee",
      status: "Active",
      RScore: "20",
      PScore: "8th/9th",
      isBookmarked: true
    },
    {
      title: "Title3",
      createdBy: "Joe zee",
      status: "Inactive",
      RScore: "30",
      PScore: "8th/9th"
    }
  ]
};

export const loadSearchQuery = createAsyncThunk("user/loadUserRoles", async () => {
  const res = await documentService.loadSearchQuery();
  return res.data;
});

export const fetchSessions = createAsyncThunk("document/fetchSessions", async (ntid) => {
  const apiUrl = "http://localhost:8000/biopharma/session/fetch_all_sessions";
  const requestData = {
    status: "success",
    sessions: [],
    ntid
  };

  // try {
  //   const response = await axios.post(apiUrl, requestData);
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }

  const response = await axios.post(apiUrl, requestData);
  return response.data;
});

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    updateSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    updateSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: {
    [loadSearchQuery.fulfilled]: (state, action) => {
      state.searchQuery = action.payload;
    },
    [fetchSessions.fulfilled]: (state, action) => {
      state.documents = action.payload.sessions;
    }
  }
});

export const documentSelector = selector(documentSlice);
export const { updateSearchBy, updateSortBy } = documentSlice.actions;

export default documentSlice.reducer;
