"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios from "redaxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/authSlice";

// Create an axios instance with base URL
const api = axios.create({
  //   baseURL: "http://192.168.1.255:8080/api",
  baseURL: "http://localhost:8080/api",
});

export default function Page() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      router.push("/jobs");
    }
  }, [router, user]);

  if (user) return null;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">Sign in to Jobchaser</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  );
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function AuthForm() {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "sixten.ekblad@chasacademy.se",
      password: "karl",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await api.post<{
      user: { id: string; email: string };
      token: string;
    }>("/auth/sign-in", values);

    localStorage.setItem("token", user.data.token);

    dispatch(setUser(user.data.user));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-muted-foreground text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </p>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
}
