"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(clearUser());
    localStorage.removeItem("token");
    router.push("/sign-in");
  }

  return (
    <header className="flex w-full justify-between px-16 py-3">
      <div>
        <Link href="/">
          <h1 className="font-serif text-2xl font-bold tracking-tighter">
            jobchaser
          </h1>
        </Link>
      </div>
      <div className="flex gap-x-2">
        {user && (
          <Button variant="ghost" onClick={handleSignOut}>
            sign out
          </Button>
        )}
        <Button onClick={toggleTheme} size="icon">
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </div>
    </header>
  );
}
