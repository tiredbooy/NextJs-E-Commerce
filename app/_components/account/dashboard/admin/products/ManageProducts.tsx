import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaBoxes } from "react-icons/fa";
import ProductsInformation from "./ProductsInformation";
import ProductsTable from "./ProductsTable";

interface Props {
  // props here
}

export default function ManageProducts({}: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <FaBoxes />
          <h1 className="font-semibold text-base md:text-3xl">Manage Products</h1>
        </div>
        <Button className="font-semibold text-background cursor-pointer">
          Add Product
        </Button>
      </div>

      {/* <div className="flex flex-row gap-5"> */}
      <ProductsInformation />
      {/* </div> */}
      <ProductsTable />
    </Card>
  );
}
