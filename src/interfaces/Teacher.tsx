import type { Turma } from "./Class.tsx";

export interface Professor {
  id: number;
  nome: string;
  email: string;
  turmas?: Turma[];
}
