import { useState } from "react";
import useListarAlunos from "../hooks/listarAlunos";
import useRemoverAluno from "../hooks/useRemoveStudent";
import useTokenStore from "../store/TokenStore";

type Aluno = {
  id: string | number;
  nome: string;
  email: string;
};

export default function StudentRemovalPage() {
  const { data: alunos, isLoading, error } = useListarAlunos();
  const { mutate: removerAluno } = useRemoverAluno();
  const userRole = useTokenStore((s) => s.tokenResponse.role);

  const [msg403, setMsg403] = useState("");

  const handleRemover = (alunoId: string | number) => {
    if (userRole != "ADMIN") {
      setMsg403("403-forbiden");
      return;
    }

    setMsg403("");
    removerAluno(alunoId);
  };

  if (isLoading) return <p>Carregando alunos...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 20 }}>Remover Alunos</h3>

      {msg403 && (
        <div className="alert alert-danger fw-bold mb-3" role="alert">
          {msg403}
        </div>
      )}

      <table className="default-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!alunos || alunos.length === 0 ? (
            <tr>
              <td colSpan={4}>Nenhum aluno cadastrado.</td>
            </tr>
          ) : (
            alunos.map((aluno: Aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>
                  <button onClick={() => handleRemover(aluno.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
