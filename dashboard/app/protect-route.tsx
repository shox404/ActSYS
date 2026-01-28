"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useCheckAuthQuery } from "@/store/apis/auth";
import { setUser, clearAuthState } from "@/store/slices/auth";
import { LoaderIcon } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: apiUser, isLoading, isError } = useCheckAuthQuery();

  useEffect(() => {
    if (apiUser) {
      dispatch(setUser(apiUser));
    }
  }, [apiUser, dispatch]);

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      dispatch(clearAuthState());

      if (isError) router.replace("/auth");
    }
  }, [isLoading, isError, user, router, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoaderIcon className="animate-spin w-10 h-10 text-gray-600" />
      </div>
    );
  }

  return children;
}