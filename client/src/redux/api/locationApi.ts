import { baseApi } from "./baseApi";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔎 Get all locations
    getLocations: builder.query({
      query: () => ({
        url: "/locations",
        method: "GET",
      }),
      providesTags: ["Location"],
    }),

    // ➕ Create location
    createLocation: builder.mutation({
      query: (data) => ({
        url: "/locations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Location"],
    }),

    //  Delete location
    deleteLocation: builder.mutation({
      query: (id: string) => ({
        url: `/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useCreateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
