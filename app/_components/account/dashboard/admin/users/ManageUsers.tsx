import { Card } from "@/components/ui/card";
import UsersTable from "./UsersTable";

interface Props {
  // props here
}

export default function ManageUsers({}: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <h1 className="font-semibold text-3xl">Manage Users</h1>
      <UsersTable />
    </Card>
  );
}
