import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";

export type TagType = "Job" | "Application" | "Location";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Job", "Application", "Location"] as TagType[],
  endpoints: () => ({}),
});
