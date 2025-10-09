import { NavLink, useParams } from "react-router-dom";
import useRecuperarTurmaPorId from "../hooks/recuperarTurmaPorId";
import useListarInscricoes from "../hooks/listarInscricoes";
import React from "react";

type Aluno = { id: number | string; nome: string; email: string };
type Inscricao = {
  id: number | string;
  dataHora: string;
  aluno: Aluno;
  turma: { id: number | string };
};

export default function TurmaDetalhePage() {
  const { id } = useParams();
  const { data: turma, isLoading, error } = useRecuperarTurmaPorId(id);

  const {
    data: todasInscricoes = [],
    isLoading: loadingInsc,
    error: errorInsc,
  } = useListarInscricoes();

  const inscricoesDaTurma = React.useMemo(
    () =>
      todasInscricoes.filter(
        (i: Inscricao) => String(i.turma.id) === String(id)
      ),
    [todasInscricoes, id]
  );

  if (isLoading || loadingInsc) return <p>Carregando turma...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;
  if (errorInsc) return <p>Erro Inscrição: {(errorInsc as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Turma {turma.id}</h3>

      <section style={{ marginBottom: 12 }}>
        <h4>Informações gerais</h4>
        <ul>
          <li>
            <strong>Ano:</strong> {turma.ano}
          </li>
          <li>
            <strong>Período:</strong> {turma.periodo}
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 12 }}>
        <h4>Disciplina</h4>
        <ul>
          <li>
            <strong>Nome:</strong> {turma.disciplina.nome}
          </li>
          <li>
            <strong>Carga Horária:</strong> {turma.disciplina.cargaHoraria} h
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 12 }}>
        <h4>Professor</h4>
        <ul>
          <li>
            <strong>Nome:</strong> {turma.professor.nome}
          </li>
          <li>
            <strong>Email:</strong> {turma.professor.email}
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h4>Alunos inscritos ({inscricoesDaTurma.length})</h4>
        {inscricoesDaTurma.length === 0 ? (
          <p>Nenhum aluno inscrito.</p>
        ) : (
          <table className="default-table">
            <thead>
              <tr>
                <th>id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Data da inscrição</th>
              </tr>
            </thead>
            <tbody>
              {inscricoesDaTurma.map((insc: Inscricao) => (
                <tr key={insc.id}>
                  <td>{insc.aluno.id}</td>
                  <td>{insc.aluno.nome}</td>
                  <td>{insc.aluno.email}</td>
                  <td>{new Date(insc.dataHora).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <div style={{ marginTop: 16 }}>
        <NavLink to="/turmas">Voltar</NavLink>
      </div>
    </div>
  );
}
