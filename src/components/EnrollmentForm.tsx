import { DisciplinaComboBox } from "./DisciplinaComboBox";
import { TurmaComboBox } from "./TurmaComboBox";
import { AlunoComboBox } from "./AlunoComboBox";
import { useInscricaoStore } from "../store/EnrollmentStore";
import { useInscreverAluno } from "../hooks/useInscreverAluno";

export function EnrollmentForm() {
  const { turmaIdSelecionada, alunoIdSelecionado, setAlunoIdSelecionado } =
    useInscricaoStore();

  const { mutate } = useInscreverAluno();

  const handleInscrever = () => {
    if (!turmaIdSelecionada || !alunoIdSelecionado) return;

    mutate(
      { turmaId: turmaIdSelecionada, alunoId: alunoIdSelecionado },
      {
        onSuccess: () => {
          setAlunoIdSelecionado(null);
        },
      }
    );
  };

  const podeInscrever = !!turmaIdSelecionada && !!alunoIdSelecionado;

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <label className="fw-bold">Disciplina:</label>
        <br />
        <DisciplinaComboBox />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label className="fw-bold">Turma:</label>
        <br />
        <TurmaComboBox />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="fw-bold">Aluno:</label>
        <br />
        <AlunoComboBox />
      </div>

      <button
        className="btn btn-success btn-sm d-flex align-items-center me-3"
        disabled={!podeInscrever}
        onClick={handleInscrever}
      >
        {"Inscrever Aluno"}
      </button>
    </div>
  );
}
