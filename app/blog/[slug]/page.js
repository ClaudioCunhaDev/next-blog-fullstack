import BlogLike from "@/components/blogs/BlogLike";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

async function getBlog(slug) {
  const response = await fetch(`${process.env.API}/blog/${slug}`, {
    method: "GET",
    next: { revalidate: 1 },
  });

  const data = await response.json();
  return data;
}

export const metadata = {
  title: "Latest Recipes",
  description: "Latest recipes on web development",
};

export default async function BlogViewPage({ params }) {
  //console.log(params);
  const blog = await getBlog(params.slug);

  return (
    <main>
      {/*       <pre>{JSON.stringify(blog, null, 4)}</pre>
       */}
      <div className="container mb-5">
        <div className="card">
          <div style={{ height: "300px", overflow: "hidden" }}>
            <Image
              width={500}
              height={300}
              src={blog.image || "/images/default.jpg"}
              className="card-img-top"
              alt={blog.title}
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
            </h5>
            <div className="card-text">
              <div
                dangerouslySetInnerHTML={{
                  __html: blog?.content,
                }}
              ></div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">Category: {blog.category}</small>
              <small className="text-muted">
                Author: {blog?.postedBy?.name || "Admin"}
              </small>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <BlogLike blog={blog} />
              <small className="text-muted">
                Posted: {dayjs(blog.createdAt).fromNow()}
              </small>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
