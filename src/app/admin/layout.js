import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import style from "./admin.module.css";

export default async function AdminLayout({ children }) {

  // 🔐 Cookie Check - Naam wahi rakhein jo backend/middleware mein hai
  const cookieStore = await cookies();
  const token = cookieStore.get("token"); // 'admin' ki jagah 'token' karein

  if (!token) {
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
            <Link href="/admin/upload_MyProjects">Upload Projects</Link>
            {/* Logout ke liye ek alag logic banana hoga, abhi ke liye ye bas redirect karega */}
            <Link href="/admin/upload_services">Services</Link> 
            <Link href="/login">Logout</Link> 
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