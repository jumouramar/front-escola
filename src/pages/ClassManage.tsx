import { useState } from "react";
import useListarTurmas from "../hooks/listarTurmas";
import useListarAlunosPorTurma from "../hooks/listarAlunosPorTurma";

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

type Aluno = {
  id: string | number;
  nome: string;
  email: string;
};

export default function ClassManagePage() {
  const { data: turmas, isLoading, error } = useListarTurmas();

  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);

  const changeTurmaSelecionada = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const turma = turmas?.find(
      (t: Turma) => t.id.toString() === e.target.value
    );
    setTurmaSelecionada(turma || null);
  };

  const { data: alunos } = useListarAlunosPorTurma(
    turmaSelecionada?.id,
    !!turmaSelecionada
  );

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          marginBottom: 20,
        }}
      >
        <h3 style={{ margin: "0 0 0 0" }}>Turma</h3>

        <select
          className="select-box"
          value={turmaSelecionada?.id || ""}
          onChange={changeTurmaSelecionada}
          style={{ padding: 8, minWidth: 280 }}
        >
          <option value="">Selecione uma turma</option>
          {turmas?.map((turma: Turma) => (
            <option value={turma.id}>
              {turma.id} — {turma.disciplina?.nome}
            </option>
          ))}
        </select>
      </div>

      <table className="default-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!turmaSelecionada ? (
            <tr></tr>
          ) : !alunos || alunos.length === 0 ? (
            <tr>
              <td>Esta turma não possui alunos cadastrados.</td>
            </tr>
          ) : (
            (alunos ?? []).map((aluno: Aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>
                  <button>Remover</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
