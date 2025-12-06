import { createBrowserRouter } from "react-router-dom";

import AlunosPage from "../pages/Alunos";
import TurmasPage from "../pages/Turmas";
import TurmaDetalhePage from "../pages/TurmasDetalhes";
import HomePage from "../pages/Home";
import TurmasSearchPage from "../pages/TurmasSearch";
import ClassManagePage from "../pages/ClassManage";
import StudentRegistrationPage from "../pages/StudentRegistration";
import StudentEnrollmentPage from "../pages/StudentEnrollment";
import StudentPage from "../pages/StudentPage";
import LoginPage from "../pages/Login";
// import RegisterPage from "../pages/Register";
import ErrorPage from "../pages/Error";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      { path: "alunos", element: <AlunosPage /> },
      { path: "turmas", element: <TurmasPage /> },
      { path: "search", element: <TurmasSearchPage /> },
      { path: "manage_class", element: <ClassManagePage /> },
      { path: "turmas/:id", element: <TurmaDetalhePage /> },
      { path: "student_registration", element: <StudentRegistrationPage /> },
      {
        path: "student_enrollment",
        element: <StudentEnrollmentPage />,
      },
      { path: "student/:id", element: <StudentPage /> },
    ],
  },
]);

export default router;
