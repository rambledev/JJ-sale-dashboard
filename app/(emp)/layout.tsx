import EMPSidebar from '@/components/layout/EMPSidebar';

export default function EMPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <EMPSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}