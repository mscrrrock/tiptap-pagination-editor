import './globals.css';

export const metadata = {
  title: 'tiptap-pagination-editor',
  description: 'Minimal Next 14 app with Tiptap editor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen p-8">
          <div className="max-w-3xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
