import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import style from "./admin.module.css";

export default async function AdminLayout({ children }) {

  // 🔐 Cookie Check
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin");

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div className={style.container}>
      
      {/* Sidebar */}
      <div className={style.nav_container}>
        <div className={style.admin_heading}>
          <h1>Admin</h1>
        </div>

        <div className={style.link_container}>
          <nav className={style.nav_links}>
            <Link href="/admin/introUpload">Intro Upload</Link>
            <Link href="/admin/experiance_technology_section">Experience & technology section</Link>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/">Logout</Link>
          </nav>
        </div>
      </div>

      {/* Right Side Content */}
      <div className={style.content}>
        {children}
      </div>

    </div>
  );
}