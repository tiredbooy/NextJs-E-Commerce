import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orders } from "../../user/order/UserOrdersTable";
import OrderTableRow from "./OrderTableRow";

export interface AdminOrder {
  id: string; // "ORD-12345"
  customer: {
    id: string;
    name: string;
    email: string;
  };
  date: string; // ISO date
  items: number; // count or array of products
  total: number;
  paymentMethod: "credit_card" | "paypal" | "cod";
  paymentStatus: "paid" | "pending" | "failed";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  trackingNumber?: string;
}


export const adminOrders: AdminOrder[] = [
  {
    id: "ORD-10234",
    customer: {
      id: "CUST-5891",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
    },
    date: "2024-10-15T14:32:00Z",
    items: 3,
    total: 459.97,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    status: "shipped",
    shippingAddress: {
      street: "123 Oak Street, Apt 4B",
      city: "New York",
      country: "USA",
      postalCode: "10001",
    },
    trackingNumber: "TRK-US-9876543210",
  },
  {
    id: "ORD-10235",
    customer: {
      id: "CUST-4712",
      name: "Michael Chen",
      email: "m.chen@email.com",
    },
    date: "2024-10-16T09:15:00Z",
    items: 1,
    total: 299.99,
    paymentMethod: "paypal",
    paymentStatus: "paid",
    status: "processing",
    shippingAddress: {
      street: "456 Maple Avenue",
      city: "Los Angeles",
      country: "USA",
      postalCode: "90001",
    },
    trackingNumber: undefined,
  },
  {
    id: "ORD-10236",
    customer: {
      id: "CUST-8923",
      name: "Emma Rodriguez",
      email: "emma.rod@email.com",
    },
    date: "2024-10-16T11:48:00Z",
    items: 5,
    total: 789.45,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    status: "delivered",
    shippingAddress: {
      street: "789 Pine Road",
      city: "Chicago",
      country: "USA",
      postalCode: "60601",
    },
    trackingNumber: "TRK-US-1234567890",
  },
  {
    id: "ORD-10237",
    customer: {
      id: "CUST-3456",
      name: "James Wilson",
      email: "j.wilson@email.com",
    },
    date: "2024-10-17T08:22:00Z",
    items: 2,
    total: 159.98,
    paymentMethod: "cod",
    paymentStatus: "pending",
    status: "pending",
    shippingAddress: {
      street: "321 Elm Street",
      city: "Houston",
      country: "USA",
      postalCode: "77001",
    },
    trackingNumber: undefined,
  },
  {
    id: "ORD-10238",
    customer: {
      id: "CUST-7845",
      name: "Aisha Patel",
      email: "aisha.patel@email.com",
    },
    date: "2024-10-17T13:55:00Z",
    items: 4,
    total: 549.96,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    status: "shipped",
    shippingAddress: {
      street: "654 Cedar Lane",
      city: "Phoenix",
      country: "USA",
      postalCode: "85001",
    },
    trackingNumber: "TRK-US-5555666677",
  },
  {
    id: "ORD-10239",
    customer: {
      id: "CUST-2134",
      name: "David Kim",
      email: "david.kim@email.com",
    },
    date: "2024-10-17T16:30:00Z",
    items: 1,
    total: 899.99,
    paymentMethod: "paypal",
    paymentStatus: "paid",
    status: "processing",
    shippingAddress: {
      street: "987 Birch Boulevard",
      city: "San Francisco",
      country: "USA",
      postalCode: "94101",
    },
    trackingNumber: undefined,
  },
  {
    id: "ORD-10240",
    customer: {
      id: "CUST-9871",
      name: "Sophie Martin",
      email: "sophie.m@email.com",
    },
    date: "2024-10-18T10:12:00Z",
    items: 3,
    total: 399.97,
    paymentMethod: "credit_card",
    paymentStatus: "failed",
    status: "cancelled",
    shippingAddress: {
      street: "147 Walnut Street",
      city: "Seattle",
      country: "USA",
      postalCode: "98101",
    },
    trackingNumber: undefined,
  },
  {
    id: "ORD-10241",
    customer: {
      id: "CUST-6543",
      name: "Mohammed Al-Rashid",
      email: "m.alrashid@email.com",
    },
    date: "2024-10-18T12:45:00Z",
    items: 2,
    total: 679.98,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    status: "shipped",
    shippingAddress: {
      street: "258 Ash Avenue",
      city: "Boston",
      country: "USA",
      postalCode: "02101",
    },
    trackingNumber: "TRK-US-8888999900",
  },
  {
    id: "ORD-10242",
    customer: {
      id: "CUST-1298",
      name: "Isabella Garcia",
      email: "bella.garcia@email.com",
    },
    date: "2024-10-18T14:20:00Z",
    items: 6,
    total: 1249.94,
    paymentMethod: "paypal",
    paymentStatus: "paid",
    status: "processing",
    shippingAddress: {
      street: "369 Spruce Court",
      city: "Miami",
      country: "USA",
      postalCode: "33101",
    },
    trackingNumber: undefined,
  },
  {
    id: "ORD-10243",
    customer: {
      id: "CUST-5432",
      name: "Thomas Anderson",
      email: "t.anderson@email.com",
    },
    date: "2024-10-18T15:50:00Z",
    items: 1,
    total: 199.99,
    paymentMethod: "cod",
    paymentStatus: "pending",
    status: "pending",
    shippingAddress: {
      street: "741 Willow Way",
      city: "Denver",
      country: "USA",
      postalCode: "80201",
    },
    trackingNumber: undefined,
  },
  {
    id: "ORD-10244",
    customer: {
      id: "CUST-8765",
      name: "Yuki Tanaka",
      email: "yuki.tanaka@email.com",
    },
    date: "2024-10-18T17:05:00Z",
    items: 4,
    total: 599.96,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    status: "delivered",
    shippingAddress: {
      street: "852 Cherry Circle",
      city: "Portland",
      country: "USA",
      postalCode: "97201",
    },
    trackingNumber: "TRK-US-3333444455",
  },
  {
    id: "ORD-10245",
    customer: {
      id: "CUST-3219",
      name: "Lucas Silva",
      email: "lucas.silva@email.com",
    },
    date: "2024-10-18T18:30:00Z",
    items: 3,
    total: 429.97,
    paymentMethod: "paypal",
    paymentStatus: "paid",
    status: "shipped",
    shippingAddress: {
      street: "963 Poplar Place",
      city: "Austin",
      country: "USA",
      postalCode: "78701",
    },
    trackingNumber: "TRK-US-7777888899",
  },
];

export default function OrdersTable({}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {adminOrders?.map((order) => (
          <OrderTableRow order={order} key={order.id} />
        ))}
      </TableBody>
    </Table>
  );
}
