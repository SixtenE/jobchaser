"use client";

import { Card } from "./ui/card";
import { Calendar, ChartNoAxesCombined, Clock, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { Reorder } from "motion/react";
import Filters from "./Filters";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

type Job = {
  id: string;
  company: string;
  logo: string;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

export default function Page() {
  const search = useSelector((state: RootState) => state.filter.search);
  const filters = useSelector((state: RootState) => state.filter.filters);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const uniqueToolsAndLanguages = useMemo(() => {
    const toolsSet = new Set<string>();
    const languagesSet = new Set<string>();
    jobs.forEach((job) => {
      job.tools.forEach((tool) => toolsSet.add(tool));
      job.languages.forEach((language) => languagesSet.add(language));
    });
    return [...Array.from(toolsSet), ...Array.from(languagesSet)];
  }, [jobs]);

  const jobsFilteredBySearch = useMemo(() => {
    return jobs.filter((job) => {
      if (!search) return true;

      const lowerSearch = search.toLowerCase();

      return (
        job.position.toLowerCase().includes(lowerSearch) ||
        job.company.toLowerCase().includes(lowerSearch) ||
        job.location.toLowerCase().includes(lowerSearch) ||
        job.role.toLowerCase().includes(lowerSearch) ||
        job.level.toLowerCase().includes(lowerSearch) ||
        job.postedAt.toLowerCase().includes(lowerSearch) ||
        job.contract.toLowerCase().includes(lowerSearch) ||
        job.languages.some((lang) =>
          lang.toLowerCase().includes(lowerSearch),
        ) ||
        job.tools.some((tool) => tool.toLowerCase().includes(lowerSearch))
      );
    });
  }, [jobs, search]);

  const jobsFilteredByToolsAndLanguages = useMemo(() => {
    if (filters.length === 0) return jobsFilteredBySearch;
    return jobsFilteredBySearch.filter((job) => {
      return filters.every((filter) => {
        return job.tools.includes(filter) || job.languages.includes(filter);
      });
    });
  }, [jobsFilteredBySearch, filters]);

  useEffect(() => {
    async function getJobs() {
      const token = localStorage.getItem("token");

      try {
        const jobs = await api.get<Job[]>("/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (jobs.status !== 200) {
          toast.error("Failed to fetch jobs. Please try again later.");
          return;
        }

        setJobs(jobs.data);
        setLoading(false);
      } catch {
        toast.error("Failed to fetch jobs. Please try again later.");
      }
    }
    getJobs();
  }, []);
  if (loading) {
    return <Skeleton className="h-44 w-full rounded-lg"></Skeleton>;
  }

  return (
    <>
      <Filters toolsAndLangs={uniqueToolsAndLanguages} />
      {jobsFilteredByToolsAndLanguages.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-y-4 px-4 pt-20">
          <h2 className="text-2xl font-semibold">No jobs found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters to find relevant jobs.
          </p>
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={jobs}
          onReorder={() => {}}
          className="flex w-full flex-col gap-y-4 pb-64"
        >
          {jobsFilteredByToolsAndLanguages.map((job) => (
            <Reorder.Item key={job.id} value={job}>
              <Card
                key={job.id}
                className="overflow-hidden rounded-lg py-0 shadow-xs"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10">
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={`/${job.logo}`}
                          alt={`${job.company} logo`}
                        />
                        <AvatarFallback>
                          {job.company.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xl font-semibold">{job.position}</h3>
                      <p className="text-foreground text-base font-medium">
                        {job.company}
                      </p>
                      <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <ChartNoAxesCombined className="mr-1 h-4 w-4" />
                          <p>{job.level}</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          <p>{job.contract}</p>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          <p>{job.postedAt}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex w-full flex-wrap gap-x-1 gap-y-1">
                        {[...job.tools, ...job.languages].map((element) => (
                          <Badge key={element} variant="secondary">
                            {element}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </>
  );
}
