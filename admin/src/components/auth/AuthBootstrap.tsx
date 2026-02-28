"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setCredentials, logout } from "@/redux/authSlice";
import { instance as axiosInstance } from "@/lib/axios/axiosInstance";

export default function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axiosInstance.post(
          "/auth/refresh",
          null,
          { headers: { "x-skip-refresh": "1" } }, // prevent interceptor loop
        );

        dispatch(
          setCredentials({
            accessToken: res.data.data.accessToken,
            user: res.data.data.user,
          }),
        );
      } catch {
        dispatch(logout());
      }
    };

    initAuth();
  }, [dispatch]);

  return null;
}
