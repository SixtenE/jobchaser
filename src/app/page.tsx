import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/WordRotate";

import { ChevronRight } from "lucide-react";

import Link from "next/link";

export default function Page() {
  return (
    <section className="flex w-full flex-col items-center gap-y-7 px-4 pt-20">
      <Badge className="bg-blue-700 text-white">We just launched! 🎉</Badge>

      <h1 className="flex flex-col text-center text-4xl font-bold tracking-tight sm:text-5xl">
        If you know
        <WordRotate
          className="text-7xl"
          words={[
            "React",
            "Django",
            "JavaScript",
            "Python",
            "Vue",
            "Sass",
            "Ruby",
            "CSS",
            "HTML",
            "RoR",
          ].sort(() => Math.random() - 0.5)}
        />
        you can find a job here!
      </h1>
      <p className="text-lg leading-6 font-medium">
        Find your dream job, get hired, and start your career journey with us.
        <br />
        Explore thousands of job listings.
      </p>
      <div className="mt-4 flex gap-x-4">
        <Link href="/jobs">
          <Button size="lg">Get started</Button>
        </Link>
        <Link href="/sign-up">
          <Button size="lg" variant="outline">
            Create a free account
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </section>
  );
}
