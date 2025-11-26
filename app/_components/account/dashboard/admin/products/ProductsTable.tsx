import { Product } from "@/app/_lib/types/product_types";
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
  products: Product[];
}

export default async function ProductsTable({ products }: Props) {
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
        {products?.map((product: Product) => (
          <ProductTableRow product={product} key={product.id} />
        ))}
      </TableBody>
    </Table>
  );
}
