"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

interface Props {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function BlogsSearchBox({
  //   onSearch,
  placeholder = "Search blogs...",
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <Card>
      <CardContent className="">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-4 items-center"
        >
          <Input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button type="submit" className="gap-2 font-semibold text-background ">
            <MdSearch size={18} />
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
