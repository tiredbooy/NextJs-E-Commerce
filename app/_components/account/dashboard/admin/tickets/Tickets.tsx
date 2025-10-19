import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdMessage } from "react-icons/md";
import TicketsTable from "./TicketsTable";

export default function Tickets({}: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <CardHeader className="flex flex-row gap-1 items-center text-xl font-semibold md:text-3xl">
        <MdMessage />
        <CardTitle>Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <TicketsTable />
      </CardContent>
    </Card>
  );
}
