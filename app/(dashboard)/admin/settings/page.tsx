import AdminSettings from "@/app/_components/account/dashboard/admin/settings/AdminSettings";
import { getSetting } from "@/app/_lib/services/settingService";

interface Props {
  // props here
}

export default async function page ({  }: Props) {
  const initialSetting = await getSetting()

  return (
    <AdminSettings initialSetting={initialSetting} />
  );
};
