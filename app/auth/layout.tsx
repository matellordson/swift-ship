import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Nav />
      {children}
    </div>
  );
}

function Nav() {
  return (
    <nav className="mb-10 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <svg
                  className="h-8 w-8 text-black dark:text-white"
                  viewBox="0 0 76 65"
                  fill="currentColor"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="ml-2 text-xl font-bold">Vercel</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
