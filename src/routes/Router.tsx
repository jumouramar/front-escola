import { createBrowserRouter } from "react-router-dom";

import AlunosPage from "../pages/Alunos";
import TurmasPage from "../pages/Turmas";
import TurmaDetalhePage from "../pages/TurmasDetalhes";

const router = createBrowserRouter([
  { path: "/alunos", element: <AlunosPage /> },
  { path: "/turmas", element: <TurmasPage /> },
  { path: "/turmas/:id", element: <TurmaDetalhePage /> },
]);
export default router;
