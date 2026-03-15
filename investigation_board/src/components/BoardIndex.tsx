import { useNavigate } from "react-router-dom";
import { getAllBoards } from "../utils/board_utils";
import { PushPin, Folders } from "@phosphor-icons/react";
import { CorkBackground } from "./CorkBackground";

export function BoardIndex() {
  const boards = getAllBoards();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <CorkBackground />
      <div className="relative z-10">
      {/* Header */}
      <div className="px-8 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <Folders size={32} weight="duotone" className="text-amber-900" />
          <h1 className="font-title text-4xl text-amber-950 tracking-wide">
            Investigation Board
          </h1>
        </div>
        <p className="text-amber-800/70 text-sm ml-11">
          Select a case file to investigate
        </p>
      </div>

      {/* Board cards grid */}
      <div className="px-8 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <button
            key={board.slug}
            onClick={() => navigate(`/board/${board.slug}`)}
            className="group relative bg-cream rounded-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left cursor-pointer border-0"
          >
            {/* Pin decoration */}
            <div className="absolute -top-2 right-6 z-10">
              <PushPin
                size={22}
                weight="fill"
                className="text-red-600 rotate-12"
              />
            </div>

            <div className="p-5">
              <h2 className="font-title text-lg text-gray-800 mb-1">
                {board.title}
              </h2>
              {board.description && (
                <p className="text-xs text-gray-500 mb-3">
                  {board.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>{board.nodes.length} subjects</span>
                <span className="text-gray-300">|</span>
                <span>{board.edges.length} connections</span>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-b-sm" />
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
