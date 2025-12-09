import Tickets from "@/app/_components/account/dashboard/admin/tickets/Tickets";

interface Props {
  // props here
  params: {status: string}
}

export default async function page({params}: Props) {
  const {status} = await params
  return <Tickets status={status} role="user" />;
}
