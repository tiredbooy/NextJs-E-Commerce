import Loading from "@/app/_components/reusable/Loading";

interface Props {
  // props here
}

export default function loading({}: Props) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Loading variant="bars" text="Loading Orders..." />
    </div>
  );
}
