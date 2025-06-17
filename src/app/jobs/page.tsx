"use client";

import JobList from "@/components/JobList";
import SearchBar from "@/components/SearchBar";
import { api } from "@/lib/api";
import { setUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Response } from "redaxios";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      if (user) return;

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be signed in to access this page.");
        router.push("/sign-in");
        return;
      }

      try {
        const user: Response<{ id: string; email: string }> = await api.post(
          "/auth/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (user.status !== 200) {
          toast.error("You must be signed in to access this page.");
          router.push("/sign-in");
          return;
        }

        dispatch(setUser(user.data));
      } catch {
        toast.error("You must be signed in to access this page.");
        router.push("/sign-in");
        return;
      }
    }
    checkAuth();
  }, [user, dispatch, router]);

  if (!user) return null;

  return (
    <section className="flex w-full flex-col items-center gap-y-6 px-2 lg:w-3/4">
      <SearchBar />
      <JobList />
    </section>
  );
}
