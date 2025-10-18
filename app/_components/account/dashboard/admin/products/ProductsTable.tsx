import { products } from "@/app/_components/new-arrivals/NewArrivals";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductTableRow from "./ProductTableRow";

interface Props {
  // props here
}

export default function ProductsTable({}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead>Created At</TableHead>
          {/* <TableHead>Category</TableHead> */}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <ProductTableRow product={product} key={product.id} />
        ))}
      </TableBody>
    </Table>
  );
}
