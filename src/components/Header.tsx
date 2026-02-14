import { MessageSquareText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-14 items-center px-4 mx-auto">
        <div className="flex items-center gap-2 font-semibold mr-4">
          <MessageSquareText className="h-6 w-6" />

          <span className="hidden sm:inline-block text-lg">
            Feedback Analyzer
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
