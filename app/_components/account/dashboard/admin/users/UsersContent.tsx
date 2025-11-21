import { getUsers } from "@/app/_lib/services/services";
import UsersTable from "./UsersTable";

interface Props {
  // props here
  page?: number;
}

export default async function UsersContent({ page = 1 }: Props) {
  const usersData = await getUsers({ limit: 20, page });
  return (
    <>
      <UsersTable users={usersData.users || []} />
    </>
  );
}
