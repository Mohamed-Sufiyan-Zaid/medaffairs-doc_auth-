import { createSelector } from "reselect";

export default (slice) => ({
  getDocuments: createSelector(
    (state) => state[slice.name],
    (data) => {
      let localData = data.documents;
      if (localData.searchBy !== "") {
        localData = localData.filter((item) => item.title.search(data.searchBy) !== -1);
      }
      if (data.sortBy !== "date") {
        localData = localData.sort((a, b) => a[data.sortBy] - b[data.sortBy]);
      }
      return localData;
    }
  ),
  getSortBy: createSelector(
    (state) => state[slice.name],
    (data) => data.sortBy
  ),
  getSearchBy: createSelector(
    (state) => state[slice.name],
    (data) => data.searchBy
  )
});
