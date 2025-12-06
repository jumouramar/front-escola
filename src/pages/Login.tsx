import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#004f9f" }}
    >
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4 text-center">
          <h3>Login</h3>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
