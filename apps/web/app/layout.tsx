import './global.css';

export const metadata = {
  title: 'NX - Next.js Starter',
  description: 'Test backend for NX - Next.js Starter',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
