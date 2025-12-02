import { getUsers } from "@/app/_lib/services/services";
import UsersTable from "./UsersTable";
import Pagination from "@/app/_components/reusable/Pagination";

interface Props {
  // props here
  page?: number;
}

export default async function UsersContent({ page }: Props) {
  const currentPage = page ? page : 1;
  const usersData = await getUsers({ limit: 10, page: currentPage });
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
