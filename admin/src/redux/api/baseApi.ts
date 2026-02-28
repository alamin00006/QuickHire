import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";

export type TagType =
  | "Owner"
  | "Model"
  | "user"
  | "Brand"
  | "branch"
  | "BodyType"
  | "Product"
  | "order"
  | "Role"
  | "service_order"
  | "company_Info"
  | "Auth"
  | "Permission"
  | "Category"
  | "Subcategory"
  | "Unit"
  | "ProductStock"
  | "Job"
  | "Location"
  | "Application";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "Owner",
    "Model",
    "user",
    "Brand",
    "BodyType",
    "branch",
    "Product",
    "order",
    "Role",
    "service_order",
    "company_Info",
    "Auth",
    "Permission",
    "Category",
    "Subcategory",
    "Unit",
    "ProductStock",
    "Job",
    "Location",
    "Application",
  ] as TagType[],
  endpoints: () => ({}),
});
