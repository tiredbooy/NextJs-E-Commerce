import BlogForm from "@/app/_components/account/dashboard/admin/blogs/BlogForm";

interface Props {
  // props here
  // params: {
  //   blogId: number;
  // };
}

export default async function page({  }: Props) {
  // const { blogId } = await params;
  return (
    <BlogForm />
  );
}
