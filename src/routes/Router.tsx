import { createBrowserRouter } from "react-router-dom";

import AlunosPage from "../pages/Alunos";
import TurmasPage from "../pages/Turmas";
import TurmaDetalhePage from "../pages/TurmasDetalhes";
import Layout from "./Layout";
import HomePage from "../pages/Home";
import TurmasSearchPage from "../pages/TurmasSearch";
import ClassManagePage from "../pages/ClassManage";
import StudentRegistrationPage from "../pages/StudentRegistration";
import StudentEnrollmentPage from "../pages/StudentEnrollment";
import StudentPage from "../pages/StudentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      { path: "/alunos", element: <AlunosPage /> },
      { path: "/turmas", element: <TurmasPage /> },
      { path: "/search", element: <TurmasSearchPage /> },
      { path: "/manage_class", element: <ClassManagePage /> },
      { path: "/turmas/:id", element: <TurmaDetalhePage /> },
      { path: "/student_registration", element: <StudentRegistrationPage /> },
      {
        path: "/student_enrollment",
        element: <StudentEnrollmentPage />,
      },
      { path: "/student/:id", element: <StudentPage /> },
    ],
  },
]);
export default router;
