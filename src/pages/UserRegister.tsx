import UserRegisterForm from "../components/UserRegisterForm";
import { Link } from "react-router-dom";

export default function UserRegisterPage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#004f9f" }}
    >
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4 text-center">
          <h3>Cadastro de Usuário</h3>
        </div>

        <UserRegisterForm />

        <div className="mt-3 text-center">
          <span className="me-1">Já tem conta?</span>
          <Link to="/login">Faça login</Link>
        </div>
      </div>
    </div>
  );
}
