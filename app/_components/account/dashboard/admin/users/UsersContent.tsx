import { getUsers } from "@/app/_lib/services/services";
import UsersTable from "./UsersTable";
import Pagination from "@/app/_components/reusable/Pagination";

interface Props {
  queries: {
    page: number,
    sortBy: string,
    orderBy: string
    search: string
    joined: string
  }
}

export default async function UsersContent({ queries }: Props) {
  const usersData = await getUsers(queries);
  const currentPage = queries?.page || 1
  const totalPages = usersData?.total_pages;
  return (
    <>
      <UsersTable users={usersData.users || []} />
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          hasNext={usersData.has_next}
          hasPrev={usersData.has_prev}
        />
      )}
    </>
  );
}
