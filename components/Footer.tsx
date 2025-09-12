export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200">
      <div className="container-narrow py-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Rent Local</p>
        <div className="flex items-center gap-4">
          <a className="hover:underline" href="#">Terms</a>
          <a className="hover:underline" href="#">Privacy</a>
          <a className="hover:underline" href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}
