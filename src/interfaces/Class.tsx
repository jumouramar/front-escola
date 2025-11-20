import type { Professor } from "./Teacher";
import type { Disciplina } from "./Subject";

export interface Turma {
  id: number;
  ano: number;
  periodo: string;
  professor?: Professor;
  disciplina?: Disciplina;
}
