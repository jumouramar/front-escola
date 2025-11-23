import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg custom-bg">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Escola
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person"></i> Alunos
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <NavLink className="dropdown-item" to="/alunos">
                    <i className="bi bi-card-list"></i> Listar
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/student_registration">
                    <i className="bi bi-person-plus"></i> Cadastrar
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/student_enrollment">
                    <i className="bi bi-clipboard"></i> Inscrever
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-card-list"></i> Turmas
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <NavLink className="dropdown-item" to="/turmas">
                    <i className="bi bi-card-list"></i> Listar
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/search">
                    <i className="bi bi-search"></i> Buscar
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/manage_class">
                    <i className="bi bi-clipboard-data"></i> Gerenciar
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
