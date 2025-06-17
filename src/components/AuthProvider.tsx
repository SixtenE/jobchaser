"use client";

import { clearUser, setUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "redaxios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

const publicRoutes = ["/sign-in", "/sign-up", "/"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    async function isAuthenticated() {
      if (publicRoutes.includes(pathname)) return;

      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(clearUser());
        router.push("/sign-in");
        return;
      }

      try {
        const user = await api.post<{ id: string; email: string }>(
          "/auth/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        dispatch(setUser(user.data));
      } catch {
        toast.error("Session expired. Please sign in again.");
        localStorage.removeItem("token");
        dispatch(clearUser());
      }
    }
    isAuthenticated();
  }, [dispatch, pathname, router]);

  return <>{children}</>;
}
