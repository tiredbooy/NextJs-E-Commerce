import { SkeletonGrid, StatsSkeletonCard } from "@/app/_components/reusable/SkeletonCard";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { HiUsers } from "react-icons/hi";
import UsersContent from "./UsersContent";

interface Props {
  // props here
  page: number;
}

export default function ManageUsers({ page }: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-row gap-1 items-center  text-2xl md:text-3xl">
        <HiUsers />
        <h1 className="font-semibold">Manage Users</h1>
      </div>
      <Suspense fallback={
        <>
          <StatsSkeletonCard />
          <SkeletonGrid variant="list" count={10} columns={1} />
        </>
      }
      >
        <UsersContent page={page} />
      </Suspense>
    </Card>
  );
}
