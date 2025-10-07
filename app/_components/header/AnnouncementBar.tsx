import Link from "next/link";
import { Announcment } from "./Header";

interface AnnouncmentObj {
  announcmentObj: Announcment;
}

function AnnouncementBar({ announcmentObj }: AnnouncmentObj) {
  const { announcmentTxt, linkTxt, href } = announcmentObj;
  return (
    <div className="w-screen bg-foreground text-muted-foreground py-2  text-lg ">
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
