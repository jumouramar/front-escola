import InscricaoForm from "../components/InscricaoForm";
import TurmasSearch from "../components/TurmasSearch";

export default function ClassRegistrationPage() {
  return (
    <div style={{ padding: 20 }}>
      <h3 className="mb-4">Inscrição de Aluno na Turma</h3>
      <InscricaoForm />
      <hr className="mb-4 mt-4" />
      <TurmasSearch />
    </div>
  );
}
