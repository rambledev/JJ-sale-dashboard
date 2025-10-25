import ADMINSidebar from '@/components/layout/ADMINSidebar';

export default function ADMINLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ADMINSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}