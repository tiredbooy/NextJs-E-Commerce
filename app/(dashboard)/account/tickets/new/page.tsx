import { NewTicketForm } from "@/app/_components/account/dashboard/admin/tickets/NewTicketForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdAdd } from "react-icons/md";



export default async function page() {


  return (
    <Card className="px-10 py-8 border-border bg-card">
      <CardHeader className="flex flex-row gap-1 items-center text-xl font-semibold md:text-3xl">
        <MdAdd />
        <CardTitle>Create New Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <NewTicketForm />
      </CardContent>
    </Card>
  );
}
