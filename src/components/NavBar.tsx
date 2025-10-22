import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
          {/* <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrinho">
                <i className="bi bi-cart3 me-1"></i>
                Carrinho
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favoritos">
                <i className="bi bi-heart me-1"></i>
                Favoritos
              </NavLink>
            </li>
          </ul> */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/alunos">
                <i className="bi bi-card-list me-1"></i>
                Alunos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/turmas">
                <i className="bi bi-card-list me-1"></i>
                Turmas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teste">
                <i className="bi bi-card-list me-1"></i>
                Buscar Turmas
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/cadastrar-produto">
                <i className="bi bi-database-add me-1"></i>
                Cad. Produto
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Entrar
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
