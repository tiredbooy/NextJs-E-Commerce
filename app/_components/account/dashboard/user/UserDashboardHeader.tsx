interface Props {
  // props here
}

const UserDashboardHeader: React.FC<Props> = ({}) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Welcome, Mahdi!</h1>
      <p className="text-muted-foreground mt-1 text-xs sm:text-sm md:text-md">
        You have 3 orders in progress • 5 items in your favorites • 2 new deals
        waiting for you
      </p>
    </div>
  );
};

export default UserDashboardHeader;
