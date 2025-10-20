import { Breadcrumb } from "@/app/_components/reusable/BreadCrumpt";
import BlogPageHeader from "./BlogPageHeader";
import BlogsSearchBox from "./BlogsSearchBox";
import BlogsTable from "./BlogsTable";

interface Props {
  // props here
}

export default function BlogsManagment ({  }: Props) {
  return (
    <div className="px-8 py-10 flex flex-col gap-y-5">
        <Breadcrumb />
        <BlogPageHeader />
        <BlogsSearchBox />
        <BlogsTable />
    </div>
  );
};
