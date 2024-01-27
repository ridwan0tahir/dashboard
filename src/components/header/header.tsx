import * as React from "react";
import { cn } from "@/lib/utils";
import { H1, H3 } from "@/components/typography";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <div className={cn("relative h-12 max-w-sm", className)}>
      <Button className="w-6 h-6 p-1 absolute left-2 top-1/2 -translate-y-1/2">
        <Icons.Search className="w-full h-full text-gray-400" />
      </Button>
      <Input className="w-[28vw] pl-10" placeholder="Search..." />
    </div>
  );
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface HeaderProps {
  title: string;
}
export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-background h-24 p-5 sticky top-0 z-50">
      <div className="h-full flex items-center justify-between">
        <H1 variant="h5">{title}</H1>
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:space-x-5">
          <SearchBar />
          <div className="shrink-0 flex items-center space-x-2.5">
            <Icons.Calendar className="w-5 h-5" />
            <span className="text-sm font-inter font-medium">
              {formatDate(new Date())}
            </span>
          </div>
          <Button variant="outline" className="p-2.5 rounded-full">
            <Icons.Bell className="w-5 h-5" />
          </Button>
          <Button
            size={null}
            variant="outline"
            className="px-2 py-1.5 rounded-full flex items-center space-x-2.5"
          >
            <div className="w-9 h-9 bg-secondary rounded-full"></div>
            <div className="flex flex-col">
              <H3 className="text-base leading-none">Justin Bieber</H3>
              <small>Justin@gmail.com</small>
            </div>
            <Icons.ChevronDown className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 lg:hidden">
          <Button variant="outline" className="p-2.5 rounded-full">
            <Icons.Bell className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="p-2.5 rounded-full">
            <Icons.Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
