import AdminSidebar from "@/components/admin/sidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f7f5fb" }}>
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-7 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
