import { create } from "zustand";

type InscricaoState = {
  disciplinaIdSelecionada: number | null;
  turmaIdSelecionada: number | null;
  alunoIdSelecionado: number | null;
  filtroPesquisa: string;

  paginaAtual: number;
  tamanhoPagina: number;

  setDisciplinaIdSelecionada: (id: number | null) => void;
  setTurmaIdSelecionada: (id: number | null) => void;
  setAlunoIdSelecionado: (id: number | null) => void;
  setFiltroPesquisa: (valor: string) => void;
  setPaginaAtual: (pagina: number) => void;
};

export const useInscricaoStore = create<InscricaoState>((set) => ({
  disciplinaIdSelecionada: null,
  turmaIdSelecionada: null,
  alunoIdSelecionado: null,
  filtroPesquisa: "",
  paginaAtual: 1,
  tamanhoPagina: 10,

  setDisciplinaIdSelecionada: (id) =>
    set({
      disciplinaIdSelecionada: id,
      turmaIdSelecionada: null,
      alunoIdSelecionado: null,
      filtroPesquisa: "",
      paginaAtual: 1,
    }),

  setTurmaIdSelecionada: (id) =>
    set({
      turmaIdSelecionada: id,
      alunoIdSelecionado: null,
      filtroPesquisa: "",
      paginaAtual: 1,
    }),

  setAlunoIdSelecionado: (id) => set({ alunoIdSelecionado: id }),
  setFiltroPesquisa: (valor) => set({ filtroPesquisa: valor, paginaAtual: 1 }),
  setPaginaAtual: (pagina) => set({ paginaAtual: pagina }),
}));
