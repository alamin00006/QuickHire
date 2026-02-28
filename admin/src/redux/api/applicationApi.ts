import {
  ApplicationListResponse,
  ApplicationResponse,
  ApplyJobDto,
} from "@/types/application";
import { baseApi } from "./baseApi";

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation<ApplicationResponse, ApplyJobDto>({
      query: (data) => ({
        url: "/applications",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Application"],
    }),

    getApplicationsByJob: builder.query<ApplicationListResponse, string>({
      query: (jobId) => ({
        url: `/applications/job/${jobId}`,
        method: "GET",
      }),
      providesTags: (result, error, jobId) =>
        result
          ? [
              ...result.applications.map(({ id }) => ({
                type: "Application" as const,
                id,
              })),
              { type: "Application", id: `JOB_${jobId}` },
            ]
          : [{ type: "Application", id: `JOB_${jobId}` }],
    }),
    //  Get all applications
    getAllApplications: builder.query<ApplicationListResponse, void>({
      query: () => ({
        url: `/applications`,
        method: "GET",
      }),
      providesTags: ["Application"],
    }),
  }),
});

export const {
  useApplyJobMutation,
  useGetApplicationsByJobQuery,
  useGetAllApplicationsQuery,
} = applicationsApi;
