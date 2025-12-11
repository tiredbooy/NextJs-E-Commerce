import ManageUsers from "@/app/_components/account/dashboard/admin/users/ManageUsers";

interface Props {
  // props here
  searchParams: { 
    page: string,
    sortBy: string,
    orderBy: string
    search: string
    joined: string
   };
}

export default async function page({ searchParams }: Props) {
  const { page, sortBy, orderBy, search, joined } = await searchParams;
  const queryObj = {
    limit: 10,
    page: Number(page) || 1,
    search,
    joined,
    sortBy,
    orderBy
  }

  return <ManageUsers queries={queryObj} />;
}
