import { useEffect, useState } from "react";
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

function setGrupoAlunos(key: string, ids: Array<string | number>) {
  localStorage.setItem(key, JSON.stringify(ids));
}

function getGrupoAlunos(key: string): Array<string | number> {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export default function ClassManagePage() {
  const { data: turmas, isLoading, error } = useListarTurmas();

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

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

  const [grupoIds, setGrupoIds] = useState<Array<string | number>>([]);

  const storageKey = turmaSelecionada ? turmaSelecionada.id.toString() : "";

  useEffect(() => {
    if (!storageKey) {
      setGrupoIds([]);
      return;
    }
    setGrupoIds(getGrupoAlunos(storageKey));
  }, [storageKey]);

  const changeAlunoGrupo = (alunoId: string | number) => {
    if (!storageKey) return;
    const atual = new Set(grupoIds);
    if (atual.has(alunoId)) {
      atual.delete(alunoId);
    } else {
      atual.add(alunoId);
    }
    const novo = Array.from(atual);
    setGrupoIds(novo);
    setGrupoAlunos(storageKey, novo);
  };

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
        <h3 style={{ margin: 0 }}>Turma</h3>

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
            <p></p>
          ) : !alunos || alunos.length === 0 ? (
            <tr>
              <td>Esta turma não possui alunos cadastrados.</td>
            </tr>
          ) : (
            alunos.map((aluno: Aluno) => {
              const noGrupo = grupoIds.includes(aluno.id);
              return (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>
                    <button onClick={() => changeAlunoGrupo(aluno.id)}>
                      {noGrupo ? "Remover" : "Incluir"}
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
