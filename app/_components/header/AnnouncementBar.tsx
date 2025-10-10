import Link from "next/link";
import { Announcment } from "@/app/_lib/types";

interface AnnouncmentObj {
  announcmentObj: Announcment;
}

function AnnouncementBar({ announcmentObj }: AnnouncmentObj) {
  const { announcmentTxt, linkTxt, href } = announcmentObj;
  return (
    <div className="w-full bg-foreground text-muted-foreground py-2 text-sm md:text-lg ">
      <span className="flex flex-row items-center gap-2 justify-center">
        <span>{announcmentTxt}</span>
        <Link className="text-popover underline" href={href}>
          {linkTxt}
        </Link>
      </span>
    </div>
  );
}

export default AnnouncementBar;
