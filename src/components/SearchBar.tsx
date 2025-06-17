import { setSearch } from "@/redux/slices/filterSlice";
import { RootState } from "@/redux/store";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "./ui/input";

export default function SearchBar() {
  const search = useSelector((state: RootState) => state.filter.search);
  const dispatch = useDispatch();

  return (
    <div className="relative flex w-full items-center">
      <Search className="text-muted-foreground absolute left-4" />
      <Input
        type="search"
        placeholder="Search for jobs..."
        className="w-full rounded-full p-6 pl-12"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
}
