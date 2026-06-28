import AdminSidebar from "@/components/admin/sidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f7f5fb" }}>
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="pt-16 lg:pt-0 p-4 lg:p-7 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
