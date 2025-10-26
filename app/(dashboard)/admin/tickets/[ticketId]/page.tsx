// interface Props {
//   // props here
// }

import TicketDetails from "@/app/_components/account/dashboard/admin/tickets/TicketDetails";

export default async function page({ params }) {
  const { ticketId } = await params;
  return <TicketDetails ticketId={ticketId} />;
}
