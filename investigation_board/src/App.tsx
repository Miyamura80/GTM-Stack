import { Routes, Route } from "react-router-dom";
import { BoardIndex } from "./components/BoardIndex";
import { BoardView } from "./components/BoardView";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardIndex />} />
      <Route path="/board/:slug" element={<BoardView />} />
    </Routes>
  );
}
