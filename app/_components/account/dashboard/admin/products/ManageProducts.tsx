import { Card } from "@/components/ui/card";
import ProductsInformation from "./ProductsInformation";
import ProductsTable from "./ProductsTable";

interface Props {
  // props here
}

export default function ManageProducts({}: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <h1 className="font-semibold text-3xl">Manage Products</h1>
      {/* <div className="flex flex-row gap-5"> */}
      <ProductsInformation />
      {/* </div> */}
      <ProductsTable />
    </Card>
  );
}
