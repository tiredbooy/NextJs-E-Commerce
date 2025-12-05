import { Card, CardContent } from "@/components/ui/card";
export default function OrderLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-6">{children}</CardContent>
      </Card>
    </div>
  );
}
