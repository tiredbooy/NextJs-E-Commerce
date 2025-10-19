import { User } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiDotsVertical } from "react-icons/hi";
import image from "@/public/casualCategory.jpeg";
import UserTableRow from "./UserTableRow";

const users: User[] = [
  {
    id: 1,
    first_name: "Mahdi",
    last_name: "Kazemi",
    phone: "09393591452",
    total_orders: 22,
    total_spent: 23412,
    image: image,
    status: "active",
    created_at: new Date().toISOString(),
    email: "mahdykazemyo1i2@gmail.com",
  },
  {
    id: 2,
    first_name: "Mahdi",
    last_name: "Kazemi",
    phone: "09393591452",
    total_orders: 22,
    total_spent: 23412,
    image: image,
    status: "active",
    created_at: new Date().toISOString(),
    email: "mahdykazemyo1i2@gmail.com",
  },
  {
    id: 3,
    first_name: "Mahdi",
    last_name: "Kazemi",
    phone: "09393591452",
    total_orders: 22,
    image: image,
    total_spent: 23412,
    status: "active",
    created_at: new Date().toISOString(),
    email: "mahdykazemyo1i2@gmail.com",
  },
  {
    id: 4,
    first_name: "Mahdi",
    last_name: "Kazemi",
    phone: "09393591452",
    image: image,
    total_orders: 22,
    total_spent: 23412,
    status: "active",
    created_at: new Date().toISOString(),
    email: "mahdykazemyo1i2@gmail.com",
  },
  {
    id: 5,
    first_name: "Mahdi",
    last_name: "Kazemi",
    phone: "09393591452",
    total_orders: 22,
    total_spent: 23412,
    status: "active",
    created_at: new Date().toISOString(),
    email: "mahdykazemyo1i2@gmail.com",
  },
];

interface Props {
  // props here
}

export default function UsersTable({}: Props) {
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
          <TableHead>Status</TableHead>
          <TableHead>Joined Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserTableRow user={user} key={user.id} />
        ))}
      </TableBody>
    </Table>
  );
}
