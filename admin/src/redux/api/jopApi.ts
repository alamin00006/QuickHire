import {
  CreateJobDto,
  JobListResponse,
  JobResponse,
  UpdateJobDto,
} from "@/types/job";
import { baseApi } from "./baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobListResponse, any>({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params,
      }),
      providesTags: ["Job"],
    }),
    getSingleJob: builder.query<JobResponse, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),
    createJob: builder.mutation<JobResponse, CreateJobDto>({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Job"],
    }),

    updateJob: builder.mutation<
      JobResponse,
      { id: string; data: UpdateJobDto }
    >({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Job"],
    }),

    deleteJob: builder.mutation<any, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetSingleJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
