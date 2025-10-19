import { Card } from "@/components/ui/card";
import UsersTable from "./UsersTable";
import { HiUsers } from "react-icons/hi";

interface Props {
  // props here
}

export default function ManageUsers({}: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-row gap-1 items-center  text-2xl md:text-3xl">
        <HiUsers />
        <h1 className="font-semibold">Manage Users</h1>
      </div>
      <UsersTable />
    </Card>
  );
}
