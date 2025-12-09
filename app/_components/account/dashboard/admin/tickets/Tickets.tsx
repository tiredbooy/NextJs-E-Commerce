import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdMessage } from "react-icons/md";
import TicketsTable from "./TicketsTable";
import ToggleGroupFilter, {
  ToggleOption,
} from "@/app/_components/reusable/ToggleGroup";
import { UserRole } from "@/app/_lib/types";

interface Props {
  status: string
  role: UserRole
}

export default function Tickets({status, role}: Props) {
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
      <CardHeader className="flex flex-row justify-between items-center text-xl font-semibold md:text-3xl">
        <div className="flex flex-row gap-1">
          <MdMessage />
          <CardTitle>Tickets</CardTitle>
        </div>
        <ToggleGroupFilter
          paramName="status"
          defaultValue="all"
          options={statusOptions}
        />
      </CardHeader>
      <CardContent>
        <TicketsTable status={status} role={role} />
      </CardContent>
    </Card>
  );
}
