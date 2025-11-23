import { EnrollmentForm } from "../components/EnrollmentForm";
import { TabelaDeAlunosPorTurma } from "../components/TabelaDeAlunosPorTurma";

export default function StudentEnrollmentPage() {
  return (
    <div style={{ padding: 20 }}>
      <h3 className="mb-4">Inscrição de Aluno na Turma</h3>
      <EnrollmentForm />
      <hr className="mb-4 mt-4" />
      {/* <Pesquisa />*/}
      <TabelaDeAlunosPorTurma />
      {/*<Paginacao /> */}
    </div>
  );
}
