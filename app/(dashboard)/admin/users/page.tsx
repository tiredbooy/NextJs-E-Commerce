import ManageUsers from "@/app/_components/account/dashboard/admin/users/ManageUsers";

interface Props {
  // props here
  searchParams? : {page: string}
}

export default function page ({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1
  return ( <ManageUsers page={page} />
  );
};
