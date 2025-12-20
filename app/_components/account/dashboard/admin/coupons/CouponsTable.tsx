import { getCoupons } from "@/app/_lib/services/orderServices";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  // props here
}

export default async function CouponsTable({}: Props) {
  const coupons = await getCoupons() || [];

  return (
    <>
      {coupons?.length !== 0 ? (
        <Table>
          <TableCaption>A List Of all coupons</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Min Purchase</TableHead>
              <TableHead>Max Purchase</TableHead>
              <TableHead>Current Uses / Max</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expire At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons?.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.code}</TableCell>
                <TableCell>{c.discount_percentage}%</TableCell>
                <TableCell>${c.min_purchase}</TableCell>
                <TableCell>${c.max_purchase}</TableCell>
                <TableCell>
                  {c.current_uses}/{c.max_uses}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      c.is_active ? "bg-success" : "bg-muted-foreground"
                    } text-background`}
                  >
                    {c.is_active ? "Active" : "De Active"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(c.expires_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className=" bg-destructive/60 font-semibold text-center text-background w-1/3 mx-auto py-2 px-4 rounded-md">
          There is not Coupons at this time
        </div>
      )}
    </>
  );
}
