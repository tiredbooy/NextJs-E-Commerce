interface Props {
  // props here
  params: {
    blogId: number;
  };
}

export default async function page({ params }: Props) {
  const { blogId } = await params;
  return (
    <div className="">{blogId ? <h1>Blog #{blogId}</h1> : <h1>Blog</h1>}</div>
  );
}
