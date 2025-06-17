export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full px-8 pt-32 sm:max-w-sm">{children}</section>
  );
}
