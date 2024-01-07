import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useSearch } from "@/context/search";

export default function TopNav() {
  const { data, status } = useSession();
  const { searchQuery, setSearchQuery, fetchSearchResults } = useSearch();
  //console.log("Search Query => ", searchQuery);
  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link className="nav-link" href={"/"}>
        BLOG
      </Link>

      {/* search form */}
      <form className="d-flex mb-0" role="search" onSubmit={fetchSearchResults}>
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button className="btn">&#128270;</button>
      </form>

      {status === "authenticated" ? (
        <div className="d-flex">
          <Link className="nav-link" href={`/dashboard/${data?.user.role}`}>
            {data?.user?.name} ({data?.user?.role})
          </Link>
          <a
            className="nav-link cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </a>
        </div>
      ) : (
        <div className="d-flex">
          <Link className="nav-link" href={"/login"}>
            Login
          </Link>
          <Link className="nav-link" href={"/register"}>
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
