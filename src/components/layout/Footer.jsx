export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground">
      <div className="padding-global container-xlarge mx-auto grid gap-10 border-t border-white/20 py-14 text-sm text-gray-700 sm:grid-cols-[1.4fr_repeat(2,1fr)]">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-foreground">Next.js Starter</p>
          <p className="max-w-md text-gray-600">
            A clean, modern Next.js starter with smooth scrolling, responsive layouts, and polished components.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">Quick Links</p>
          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-primary transition-colors">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-primary transition-colors">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">Connect</p>
          <ul className="space-y-3">
            <li>
              <a href="mailto:hello@flowdojo.com" className="hover:text-primary transition-colors">hello@flowdojo.com</a>
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-3">
              {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-white"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </li>
          </ul>
        </div>

        <div className="sm:col-span-3 border-t border-white/20 pt-6 text-xs text-gray-500 sm:border-t-0 sm:pt-0 sm:text-right">
          <p>© 2026 Next.js Starter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}