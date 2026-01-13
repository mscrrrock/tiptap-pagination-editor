import dynamic from 'next/dynamic';

// TipTap editor must be client-side only
const ClientPaginatedEditor = dynamic(
  () => import('../components/PaginatedEditor'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Title bar */}
      <div className="pl-[112px] py-6 bg-white border-b hidden-print">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tiptap Pagination Editor [Prototype]
        </h1>
      </div>

      {/* Editor */}
      <main>
        <ClientPaginatedEditor />
      </main>
    </>
  );
}


