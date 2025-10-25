import CEOSidebar from '@/components/layout/CEOSidebar';

export default function CEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <CEOSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}