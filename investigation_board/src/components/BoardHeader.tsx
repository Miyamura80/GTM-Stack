import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

interface BoardHeaderProps {
  title: string;
  description?: string;
}

export function BoardHeader({ title, description }: BoardHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 px-6 py-3 bg-amber-950/80 backdrop-blur-sm border-b border-amber-900/50">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-amber-200 hover:text-white transition-colors text-sm cursor-pointer"
      >
        <ArrowLeft size={18} weight="bold" />
        <span>Back</span>
      </button>
      <div className="h-5 w-px bg-amber-700" />
      <h1 className="font-title text-xl text-amber-100 tracking-wide">
        {title}
      </h1>
      {description && (
        <p className="text-amber-300/70 text-xs ml-2 hidden sm:block">
          {description}
        </p>
      )}
    </div>
  );
}
