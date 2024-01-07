import Link from "next/link";

async function getBlogs(searchParams) {
  //console.log("searchParams1 => ", searchParams);
  const urlParams = {
    page: searchParams.page || "1",
  };

  const searchQuery = new URLSearchParams(urlParams).toString();
  //console.log("searchParams2 => ", searchQuery);
  const response = await fetch(`${process.env.API}/blog?${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    //console.log("Failed to fetch logs => ", response);
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  return data; //{blogs, currentPage, totalPages}
}

export default async function BlogList({ searchParams }) {
  //console.log("searchParams3 => ", searchParams);
  const data = await getBlogs(searchParams);
  //console.log("data in home page =>", data);
  const { blogs, currentPage, totalPages } = data;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  return (
    <main className="container">
      <p className="lead text-primary text-center">Latest Blogs</p>

      {blogs.map((blog) => (
        <div className="d-flex justify-content-between" key={blog._id}>
          <p>{blog.title}</p>
          <Link
            className="text-danger"
            href={`/dashboard/admin/blog/update/${blog.slug}`}
          >
            Update
          </Link>
        </div>
      ))}

      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {hasPreviousPage && (
              <Link className="page-link" href={`?page=${currentPage - 1}`}>
                Prev
              </Link>
            )}

            {hasNextPage && (
              <Link className="page-link" href={`?page=${currentPage + 1}`}>
                Next
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </main>
  );
}
