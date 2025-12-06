import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useRegisterUser from "../hooks/useRegisterUser";

const schema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormRegister = z.infer<typeof schema>;

export default function UserRegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({
    resolver: zodResolver(schema),
  });

  const { mutate: cadastrarUsuario, error } = useRegisterUser();

  const submit = ({ nome, email, senha }: FormRegister) => {
    cadastrarUsuario(
      { nome, email, senha },
      {
        onSuccess: () => {
          alert("Usuário cadastrado com sucesso! Faça login.");
          navigate("/login");
        },
        onError: (err) => {
          console.error(err);
          alert("Erro ao cadastrar usuário.");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <div className="mb-3">
        <label htmlFor="nome" className="form-label fw-bold">
          Nome
        </label>
        <input
          {...register("nome")}
          type="text"
          id="nome"
          className="form-control form-control-sm"
        />
        {errors.nome && (
          <div className="text-danger small mt-1">{errors.nome.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold">
          Email
        </label>
        <input
          {...register("email")}
          type="text"
          id="email"
          className="form-control form-control-sm"
        />
        {errors.email && (
          <div className="text-danger small mt-1">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="senha" className="form-label fw-bold">
          Senha
        </label>
        <input
          {...register("senha")}
          type="password"
          id="senha"
          className="form-control form-control-sm"
        />
        {errors.senha && (
          <div className="text-danger small mt-1">{errors.senha.message}</div>
        )}
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-success">
          Cadastrar
        </button>
      </div>
    </form>
  );
}
