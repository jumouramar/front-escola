import { useForm } from "react-hook-form";
import type { Aluno } from "../interfaces/Student";
import { useNavigate } from "react-router-dom";
import useCadastrarAluno from "../hooks/useRegisterStudent";
import useAlunoStore from "../store/StudentStore";
import { useEffect } from "react";

interface FormStudent {
  nome: string;
  email: string;
}

export default function StudentForm() {
  const setMensagem = useAlunoStore((s) => s.setMensagem);
  const alunoSelecionado = useAlunoStore((s) => s.alunoSelecionado);

  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm<FormStudent>();
  const { mutate: cadastrarAluno, error: errorCadastrarAluno } =
    useCadastrarAluno();

  const inicializaForm = () => {
    if (alunoSelecionado.id) {
      setValue("nome", alunoSelecionado.nome);
      setValue("email", alunoSelecionado.email);
    } else {
      reset();
    }
  };

  useEffect(() => {
    inicializaForm();
  }, [alunoSelecionado]);

  const submit = ({ nome, email }: FormStudent) => {
    const aluno: Aluno = {
      nome: nome,
      email: email,
    };

    cadastrarAluno(aluno, {
      onSuccess: (alunoCadastrado: Aluno) => {
        setMensagem("Aluno cadastrado com sucesso!");
        navigate("/student/" + alunoCadastrado.id);
      },
    });
  };

  if (errorCadastrarAluno) throw errorCadastrarAluno;

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <div className="d-flex justify-content-center mb-3">
        <div style={{ minWidth: 300 }}>
          <div className="mb-2">
            <label htmlFor="nome" className="fw-bold">
              Nome
            </label>
            <input
              {...register("nome")}
              type="text"
              id="nome"
              className="form-control form-control-sm"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="fw-bold">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="form-control form-control-sm"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-success btn-sm d-flex align-items-center me-3"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
