import { TableRowSkeleton } from "@/app/_components/reusable/SkeletonCard";
import ToggleGroupFilter, {
  ToggleOption,
} from "@/app/_components/reusable/ToggleGroup";
import { UserRole } from "@/app/_lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { MdMessage } from "react-icons/md";
import TicketsTable from "./TicketsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  status: string;
  role: UserRole;
}

export default function Tickets({ status, role }: Props) {
  const statusOptions: ToggleOption[] = [
    { id: "all", title: "All", value: "all" },
    { id: "pending", title: "Pending", value: "pending" },
    {
      id: "open",
      title: "Open",
      value: "open",
    },
    {
      id: "closed",
      title: "Closed",
      value: "closed",
    },
  ];

  return (
    <Card className="px-10 py-8 border-border bg-card">
      <CardHeader>
        {role === "user" && (
          <Link
            className=" text-center lg:text-right"
            href={"/account/tickets/new"}
          >
            <Button className="bg-primary-dark text-background font-semibold">
              New Ticket
            </Button>
          </Link>
        )}
        <div className="flex gap-5 flex-col lg:flex-row justify-between items-center text-xl font-semibold md:text-3xl">
          <div className="flex flex-row gap-1">
            <MdMessage />
            <CardTitle>Tickets</CardTitle>
          </div>
          <ToggleGroupFilter
            paramName="status"
            defaultValue="all"
            options={statusOptions}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <TableRowSkeleton key={i + 1} />
          ))}
        >
          <TicketsTable status={status} role={role} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
