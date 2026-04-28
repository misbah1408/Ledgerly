export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden overscroll-none">
      <main className="h-full">
        {children}
      </main>
    </div>
  );
}
