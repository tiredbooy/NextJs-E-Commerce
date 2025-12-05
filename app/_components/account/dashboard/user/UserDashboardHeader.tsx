import { getCurrentUserReadOnly } from "@/app/_lib/services/authService";

interface Props {
  // props here
}

const UserDashboardHeader: React.FC<Props> = async ({}) => {
  const user = await getCurrentUserReadOnly();
  const firstName = user?.name.split("+")[0];
  return (
    <div className="mb-6">
      <div className="flex flex-row gap-3">
        <h2 className="text-3xl font-bold block first-letter:uppercase">
          Welcome,{" "}
        </h2>
        <h1 className="text-3xl font-bold block first-letter:uppercase">
          {firstName}
        </h1>
      </div>
      <p className="text-muted-foreground mt-1 text-xs sm:text-sm md:text-md">
        You have 3 orders in progress • 5 items in your favorites
      </p>
    </div>
  );
};

export default UserDashboardHeader;
