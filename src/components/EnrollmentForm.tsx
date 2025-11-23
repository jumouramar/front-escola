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
        <label>
          <strong>Disciplina: </strong>
        </label>
        <br />
        <DisciplinaComboBox />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          <strong>Turma: </strong>
        </label>
        <br />
        <TurmaComboBox />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          <strong>Aluno: </strong>
        </label>
        <br />
        <AlunoComboBox />
      </div>

      <button disabled={!podeInscrever} onClick={handleInscrever}>
        {"Inscrever Aluno"}
      </button>
    </div>
  );
}
