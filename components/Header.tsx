import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white py-4 border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <Link href="/" className="text-xl font-bold">
          Bay Area Auto Directory
        </Link>
        <nav className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/sf">San Francisco</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
