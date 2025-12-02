import ManageUsers from "@/app/_components/account/dashboard/admin/users/ManageUsers";

interface Props {
  // props here
  searchParams?: { page: string };
}

export default async function page({ searchParams }: Props) {
  const { page } = await searchParams;
  return <ManageUsers page={Number(page)} />;
}
