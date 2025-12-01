import { SearchParams } from "next/dist/server/request/search-params";
import AdminDashboard from "../../_components/account/dashboard/admin/AdminDashboard";

interface Props {
  // props here
  searchParams : {duration: string}
}

const page: React.FC<Props> = async ({searchParams}) => {
  const {duration} = await searchParams
  return <AdminDashboard duration={Number(duration)} />;
};

export default page;
