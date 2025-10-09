import { NavLink } from "react-router-dom";
import useListarTurmas from "../hooks/listarTurmas";

type Professor = {
  id: string | number;
  nome: string;
  email: string;
};

type Disciplina = {
  id: string | number;
  nome: string;
  cargaHoraria: number;
};

type Turma = {
  id: string | number;
  ano: number;
  periodo: string;
  professor: Professor;
  disciplina: Disciplina;
};

export default function TurmasPage() {
  const { data, isLoading, error } = useListarTurmas();

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Turmas</h3>
      <table className="default-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Ano</th>
            <th>Período</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((turma: Turma) => (
            <tr key={turma.id}>
              <td>{turma.id}</td>
              <td>{turma.ano}</td>
              <td>{turma.periodo}</td>
              <td>{turma.disciplina.nome}</td>
              <td>{turma.professor.nome}</td>
              <td>
                <NavLink to={`/turmas/${turma.id}`}>Ver detalhes</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
