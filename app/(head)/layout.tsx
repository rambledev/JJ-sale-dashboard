import HEADSidebar from '@/components/layout/HEADSidebar';

export default function HEADLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <HEADSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}