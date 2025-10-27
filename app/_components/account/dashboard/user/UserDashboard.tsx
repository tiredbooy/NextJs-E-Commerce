import UserDashboardHeader from "./UserDashboardHeader";

interface Props {
  // props here
}

const UserDashboard: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <UserDashboardHeader />
    </div>
  );
};

export default UserDashboard;
