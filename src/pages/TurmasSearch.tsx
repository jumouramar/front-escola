import { useEffect, useMemo, useState } from "react";
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

export default function TurmasSearchPage() {
  const [texto, setTexto] = useState<string>("");
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const itensPorPagina = 10;

  const { data, isLoading, error } = useListarTurmas();

  const { data: alunosData } = useListarAlunosPorTurma(
    turmaSelecionada?.id,
    !!turmaSelecionada
  );

  const turmasFiltradas = useMemo(() => {
    if (!texto) return [];
    return data.filter((turma: Turma) => String(turma.id).includes(texto));
  }, [data, texto]);

  useEffect(() => {
    setTurmaSelecionada(null);
    setPaginaAtual(1);
  }, [texto]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [turmaSelecionada]);

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  const alunos = alunosData || [];

  const totalPaginas = Math.ceil(alunos.length / itensPorPagina);
  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const alunosPaginados = alunos.slice(indiceInicio, indiceFim);

  const irParaPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Buscar</h3>

      <div style={{ marginBottom: 12 }}>
        <input
          className="search-box"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite o ID da turma"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr", gap: 16 }}>
        <div>
          <h4>Turmas</h4>

          {texto.length == 0 ? (
            <p>
              Digite o código na barra de pesquisa para encontrar uma turma.
            </p>
          ) : turmasFiltradas.length == 0 ? (
            <p>Nenhuma turma encontrada.</p>
          ) : (
            <table className="default-table">
              <tbody>
                {turmasFiltradas.map((turma: Turma) => (
                  <tr
                    key={turma.id}
                    onClick={() => setTurmaSelecionada(turma)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        turmaSelecionada?.id === turma.id
                          ? "#e0f2fe"
                          : undefined,
                    }}
                  >
                    <td>{turma.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          {!turmaSelecionada ? (
            <p></p>
          ) : alunos.length == 0 ? (
            <p>Esta turma não possui alunos cadastrados.</p>
          ) : (
            <>
              <div style={{ marginBottom: 12, display: "flex", gap: 16 }}>
                <div>
                  Ano: <strong>{turmaSelecionada.ano}</strong>
                </div>
                <div>
                  Período: <strong>{turmaSelecionada.periodo}</strong>
                </div>
                <div>
                  Disciplina:{" "}
                  <strong>{turmaSelecionada.disciplina.nome}</strong>
                </div>
                <div>
                  Professor: <strong>{turmaSelecionada.professor.nome}</strong>
                </div>
              </div>

              <table className="default-table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosPaginados.map((aluno: Aluno) => (
                    <tr key={aluno.id}>
                      <td>{aluno.id}</td>
                      <td>{aluno.nome}</td>
                      <td>{aluno.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPaginas > 1 && (
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => irParaPagina(paginaAtual - 1)}
                    disabled={paginaAtual == 1}
                    style={{
                      padding: "6px 12px",
                      cursor: paginaAtual == 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    Anterior
                  </button>

                  <span>
                    {paginaAtual} de {totalPaginas}
                  </span>

                  <button
                    onClick={() => irParaPagina(paginaAtual + 1)}
                    disabled={paginaAtual == totalPaginas}
                    style={{
                      padding: "6px 12px",
                      cursor:
                        paginaAtual == totalPaginas ? "not-allowed" : "pointer",
                    }}
                  >
                    Próximo
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
