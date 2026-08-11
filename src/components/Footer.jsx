export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-border px-5 py-8 text-center">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
        © {year} Youssef Sayed — end of transmission
        <span className="text-gold"> //</span>
        <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-gold align-middle" />
      </p>
    </footer>
  );
}