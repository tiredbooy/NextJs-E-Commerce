import {
  SkeletonGrid,
  StatsSkeletonCard,
} from "@/app/_components/reusable/SkeletonCard";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { HiUsers } from "react-icons/hi";
import UsersContent from "./UsersContent";
import SortBy, { SortOption } from "@/app/_components/products/filter/SortBy";

interface Props {
  // props here
  queries: {
    page: number,
    sortBy: string,
    orderBy: string
    search: string
    joined: string
  }
}

export default function ManageUsers({ queries }: Props) {
  const sortOptions: SortOption[] = [
    { value: "created_at-desc", label: "Newest First" },
    { value: "created_at-asc", label: "Oldest First" },
    { value: "email", label: "Email" },
    { value: "first_name-asc", label: "First name: A to Z" },
    { value: "first_name-desc", label: "First name: Z to A" },
    { value: "last_name-asc", label: "Last name: A to Z" },
    { value: "last_name-desc", label: "Last name: Z to A" },
    { value: "role-desc", label: "Role Users" },
    { value: "role-asc", label: "Role Admins" },
  ];

  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5 items-center">
        <div className="flex flex-row gap-1 items-center  text-2xl md:text-3xl">
          <HiUsers />
          <h1 className="font-semibold">Manage Users</h1>
        </div>
        <SortBy options={sortOptions} defaultSort="created_at" />
      </div>
      <Suspense
        fallback={
          <>
            <StatsSkeletonCard />
            <SkeletonGrid variant="list" count={10} columns={1} />
          </>
        }
      >
        <UsersContent queries={queries} />
      </Suspense>
    </Card>
  );
}
