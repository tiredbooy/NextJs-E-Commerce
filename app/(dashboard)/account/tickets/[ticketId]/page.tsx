import TicketDetails from "@/app/_components/account/dashboard/admin/tickets/TicketDetails";

interface Props {
  // props here
  params: Promise<{ ticketId: number }>;
}

export default async function TicketId({ params }: Props) {
  const { ticketId } = await params;
  return <TicketDetails ticketId={ticketId} />;
}
