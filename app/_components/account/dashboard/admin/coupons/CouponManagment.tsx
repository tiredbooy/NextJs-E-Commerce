import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { RiCoupon2Line } from "react-icons/ri";
import CouponsTable from "./CouponsTable";

interface Props {
  // props here
}

export default function CouponManagment({}: Props) {
  return (
    <Card className="flex flex-col ">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row gap-1 items-center text-2xl font-semibold">
          <RiCoupon2Line />
          <h1>Manage Coupons</h1>
        </div>
        <Link href="/admin/coupons/new">
          <Button className="text-background font-semibold">Create Coupon</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <CouponsTable />
      </CardContent>
    </Card>
  );
}
