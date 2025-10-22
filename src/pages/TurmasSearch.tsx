import { useMemo, useState } from "react";
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

export default function TurmasSearchPage() {
  const { data, isLoading, error } = useListarTurmas();

  const [texto, setTexto] = useState<string>(""); // hook de estado do componente

  const turmasFiltradas = useMemo(() => {
    // hook que guarda o calculo / só recalcula o resultado quando data ou texto mudarem
    if (!texto) return [];
    return data.filter((turma: Turma) => String(turma.id).includes(texto));
  }, [data, texto]);

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Turmas</h3>

      <div style={{ marginBottom: 12 }}>
        <input
          className="search-box"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite o ID da turma"
        />
      </div>

      {texto.length == 0 ? (
        <p style={{ color: "#6b7280" }}>
          Digite algo na barra de pesquisa para listar turmas.
        </p>
      ) : turmasFiltradas.length == 0 ? (
        <p style={{ color: "#6b7280" }}>Nenhuma turma encontrada.</p>
      ) : (
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
            {turmasFiltradas.map((turma: Turma) => (
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
      )}
    </div>
  );
}
