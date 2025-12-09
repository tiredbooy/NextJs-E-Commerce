import Tickets from "@/app/_components/account/dashboard/admin/tickets/Tickets";

interface Props {
  // props here
  searchParams :{status: string}
}

export default async function page ({ searchParams }: Props) {
  const  {status} = await searchParams
  return <Tickets status={status} role="admin" />
};
