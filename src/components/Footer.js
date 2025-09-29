'use client';

export default function Footer() {
  return (
    <footer className="py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 font-rubik">
          © 2025 ScanCycle. Made with 💚 by{' '}
          <a 
            href="https://slaviors.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-[#4A706B] font-semibold transition-colors duration-200"
          >
            Slaviors
          </a>
        </p>
      </div>
    </footer>
  );
}
