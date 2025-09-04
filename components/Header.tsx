'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-black text-white shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-lg hover:text-gray-300">
          Bay Area Auto Directory
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/sf" className="hover:text-gray-300">San Francisco</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
