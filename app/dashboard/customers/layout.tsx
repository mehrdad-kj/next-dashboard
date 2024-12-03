export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-yellow-500 text-green-400">
      {children}
    </div>
  );
}
