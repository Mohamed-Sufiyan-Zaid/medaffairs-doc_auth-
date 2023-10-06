import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HTTPMethods } from "../utils/constants";

// baseURL and headers to be updated as per requirement
export function axiosFn(method = HTTPMethods.GET, url = "", params = {}, data = {}) {
  return axios({
    method,
    url,
    baseURL: import.meta.env.VITE_API_ENDPOINT_URL,
    data,
    params,
    headers: {
      "Content-Type": "application/json"
      //   "Authorization": `Bearer ${accessToken}`
    }
  });
}

// NOTE : queryKey should be used using enums QueryKeys defined in common types.ts
export function useFetcher(url, queryKey, params, enableQuery, staleTime = 3000000) {
  // enableQuery : can be used when call is dependent on some condition
  return useQuery({
    queryKey: [...queryKey],
    queryFn: () => axiosFn(HTTPMethods.GET, url, params),
    enabled: enableQuery,
    select: (data) => data.data,
    staleTime
  });
}

export function useModifier(inValidateQueryKey) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ method, url, data, params = {} }) => axiosFn(method, url, params, data),
    onSuccess: () => {
      queryClient.invalidateQueries([...inValidateQueryKey]);
    }
  });
}

// queryClient.invalidateQueries makes a new get call after post call to update data
// queryClient.setQueryData can be used to directly update data without making a new get call if the post call returns the updated response
