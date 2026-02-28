import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";
import { instance as axiosInstance } from "@/lib/axios/axiosInstance";

export interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: unknown;
  params?: Record<string, unknown>;
  contentType?: string;
}

export const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    { status?: number; data: unknown }
  > =>
  async ({ url, method = "GET", data, params, contentType }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: contentType ? { "Content-Type": contentType } : undefined,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as {
        response?: { status?: number; data?: unknown };
        message?: string;
      };
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

//   import type { AxiosRequestConfig } from "axios";
// import { instance as axiosInstance } from "@/lib/axios/axiosInstance";

// export interface AxiosBaseQueryArgs {
//   url: string;
//   method?: AxiosRequestConfig["method"];
//   data?: any;
//   params?: any;
//   contentType?: string;
// }

// export const axiosBaseQuery =
//   () =>
//   async ({
//     url,
//     method = "GET",
//     data,
//     params,
//     contentType,
//   }: AxiosBaseQueryArgs) => {
//     try {
//       const result = await axiosInstance({
//         url,
//         method,
//         data,
//         params,
//         headers: contentType ? { "Content-Type": contentType } : undefined,
//       });

//       return { data: result.data };
//     } catch (axiosError: any) {
//       return {
//         error: {
//           status: axiosError.response?.status,
//           data: axiosError.response?.data || axiosError.message,
//         },
//       };
//     }
//   };
