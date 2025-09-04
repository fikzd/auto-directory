'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 text-sm">
        <p>© {new Date().getFullYear()} Bay Area Auto Directory. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="/privacy" className="hover:text-gray-200">Privacy</a>
          <a href="/terms" className="hover:text-gray-200">Terms</a>
        </div>
      </div>
    </footer>
  );
}
