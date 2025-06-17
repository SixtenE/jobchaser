"use client";

import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { clearFilters, toggleFilter } from "@/redux/slices/filterSlice";

interface FilterProps {
  toolsAndLangs: string[];
}

export default function Filters({ toolsAndLangs }: FilterProps) {
  const filters = useSelector((state: RootState) => state.filter.filters);
  const dispatch = useDispatch();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-filters">
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent className="flex w-full flex-wrap gap-x-2 gap-y-2 p-1">
          {toolsAndLangs.map((filter) => (
            <Button
              key={filter}
              variant={filters.includes(filter) ? "default" : "secondary"}
              size="sm"
              onClick={() => dispatch(toggleFilter(filter))}
            >
              {filter}
            </Button>
          ))}
          <Button
            variant="link"
            size="sm"
            className="text-muted-foreground"
            onClick={() => dispatch(clearFilters())}
          >
            Reset
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
