import { Button } from "@/components/ui/button";
import { MdArticle } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";

interface Props {
  // props here
}

export default function BlogPageHeader({}: Props) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-1 items-center text-xl md:text-3xl">
        <MdArticle />
        <h1 className="font-semibold">Blogs</h1>
      </div>
      <Button className="cursor-pointer text-background font-semibold">
        <FaPlusCircle />
        <span>Create New Blog</span>
      </Button>
    </div>
  );
}
