/**
 * Admin layout: sidebar (content nav + manage data links) and main area.
 * On /admin (content) we show section editor; on /admin/manage/* we show CRUD panels.
 */
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminAllBlogs from "../../components/admin/AdminAllBlogs";
import AdminEvents from "./AdminEvents";
import AdminAllMembership from "../../components/admin/AdminAllMembership";
import AdminAllContact from "../../components/admin/AdminAllContact";
import { ADMIN_NAV } from "../../data/adminNav";
import { HiBars3 } from "react-icons/hi2";

const MANAGE_LINKS = [
  { label: "Events", to: "/admin/manage/events" },
  { label: "Blog posts", to: "/admin/manage/blog" },
  { label: "Services", to: "/admin/manage/services" },
  { label: "Gallery", to: "/admin/manage/gallery" },
  { label: "Membership", to: "/admin/manage/membership" },
];

function getSectionLabel(nav, pageSlug, sectionKey) {
  const page = nav.find((p) => p.slug === pageSlug);
  if (!page) return null;
  const sec = page.sections.find((s) => s.key === sectionKey);
  return sec ? sec.label : null;
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(ADMIN_NAV[0]?.slug ?? null);
  const [selectedSection, setSelectedSection] = useState(ADMIN_NAV[0]?.sections?.[0]?.key ?? null);

  const location = useLocation();
  const isManage = location.pathname.startsWith("/admin/manage");

  const handleSelect = (pageSlug, sectionKey) => {
    setSelectedPage(pageSlug);
    setSelectedSection(sectionKey);
    setSidebarOpen(false);
  };

  const sectionLabel = getSectionLabel(ADMIN_NAV, selectedPage, selectedSection);

  return (
    <div className="flex h-screen min-h-0 w-full overflow-hidden bg-gradient-to-br from-page-bg via-reiki-section-alt/20 to-page-bg antialiased">
      <div className="flex min-w-0 flex-1 flex-col md:flex-row shadow-xl md:shadow-2xl">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-reiki-dark/30 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} aria-hidden />
        )}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-200 ease-out md:relative md:inset-auto md:z-0 md:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <AdminSidebar
            nav={ADMIN_NAV}
            selectedPage={isManage ? null : selectedPage}
            selectedSection={isManage ? null : selectedSection}
            onSelect={handleSelect}
            manageLinks={MANAGE_LINKS}
            isManageRoute={isManage}
            currentPath={location.pathname}
            onCloseSidebar={() => setSidebarOpen(false)}
          />
        </div>
        <main className="relative flex min-h-0 flex-1 flex-col">
          <button type="button" onClick={() => setSidebarOpen(true)} className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-reiki-card-border bg-white text-reiki-dark shadow-sm transition hover:bg-reiki-section md:hidden" aria-label="Open menu">
            <HiBars3 className="text-xl" />
          </button>
          {!isManage ? (
            selectedPage === "blog" && selectedSection === "all-blogs" ? (
              <AdminAllBlogs />
            ) : selectedPage === "events" && selectedSection === "all-events" ? (
              <AdminEvents />
            ) : selectedPage === "membership" && selectedSection === "all-membership" ? (
              <AdminAllMembership />
            ) : selectedPage === "contact" && selectedSection === "all-contact" ? (
              <AdminAllContact />
            ) : (
              <AdminPanel
                page={ADMIN_NAV.find((p) => p.slug === selectedPage)?.page ?? ""}
                pageSlug={selectedPage}
                section={selectedSection}
                sectionLabel={sectionLabel}
              />
            )
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}
