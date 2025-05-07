import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="sticky top-4" />
        <div className="mx-auto max-w-3xl px-5">{children}</div>
      </main>
    </SidebarProvider>
  );
}
