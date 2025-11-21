import { User } from "@/app/_lib/types/user_types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import UserTableRow from "./UserTableRow";


interface Props {
  // props here
  users: User[];
}

export default function UsersTable({ users }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Picture</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Total Orders</TableHead>
          <TableHead>Total Spent</TableHead>
          <TableHead>Joined Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => (
          <UserTableRow user={user} key={user.id} />
        ))}
      </TableBody>
    </Table>
  );
}
