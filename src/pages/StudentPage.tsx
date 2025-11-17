import { useParams } from "react-router-dom";
import useGetStudent from "../hooks/useGetStudentById";

export default function StudentPage() {
  const id = useParams().id ?? "";

  const { data: aluno } = useGetStudent(id, true);

  if (!aluno) {
    return <div className="container mt-4">Aluno não encontrado.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Página do Aluno</h3>
      <p>
        <strong>ID:</strong> {aluno.id}
      </p>
      <p>
        <strong>Nome:</strong> {aluno.nome}
      </p>
      <p>
        <strong>Email:</strong> {aluno.email}
      </p>
    </div>
  );
}
