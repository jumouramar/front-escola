import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import type { TokenResponse } from "../interfaces/TokenResponse";
import type { UsuarioLogin } from "../interfaces/UsuarioLogin";
import useTokenStore from "../store/TokenStore";
import useLoginStore from "../store/LoginStore";
import isErrorResponse from "../util/isErrorResponse";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.email("Informe um email válido."),
  senha: z.string().nonempty("Informe a senha."),
});

type FormLogin = z.infer<typeof schema>;

const LoginForm = () => {
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const loginInvalido = useLoginStore((s) => s.loginInvalido);
  const msg = useLoginStore((s) => s.msg);

  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTokenResponse({ idUser: 0, token: "", nome: "", role: "" });

    return () => {
      setLoginInvalido(false);
      setMsg("");
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: zodResolver(schema) });

  const { mutate: efetuarLogin } = useEfetuarLogin();

  const submit = ({ email, senha }: FormLogin) => {
    const usuarioLogin: UsuarioLogin = { email, senha };
    efetuarLogin(usuarioLogin, {
      onSuccess: (tokenResp: TokenResponse) => {
        console.log("LOGIN SUCESSO:", tokenResp);
        setTokenResponse({
          idUser: tokenResp.idUser,
          token: tokenResp.token,
          nome: tokenResp.nome,
          role: tokenResp.role,
        });
        if (location.state?.destino) {
          navigate(location.state.destino);
        } else {
          navigate("/");
        }
      },
      onError: (error) => {
        if (isErrorResponse(error)) {
          // Esse conteúdo só será executado se não houver validação no cliente.
          // Isto é, se houver validação apenas no back-end. Pois havendo validação
          // no cliente com o Zod, se houver um erro a requisição não será submetida
          // para o back-end. Consequentemente não entrará aqui em onError.
          // Por esta razão, não será exibida a mensagem "Login inválido" se ocorrer
          // um erro de validação detectado pelo Zod.
          setLoginInvalido(true);
          setMsg("Login inválido");
        } else {
          console.log("deu erro", error);
          // Aqui nunca irá ocorrer o erro 403 pois todos os usuários podem
          // tentar efetuar login. Um erro 403 só ocorrerá quando um usuário
          // estive logado e tentar fazer algo sem possuir o respectivo Role.
          // *****************************************************************
          // *   Aqui estamos capturando o erro lançado em useEfetuarLogin   *
          // *****************************************************************

          // Ocorrerá o erro 401 quando o usuário tentar acessar um recurso que
          // requer login.

          if (error.message.includes("401")) {
            setLoginInvalido(true);
            setMsg("Email ou senha inválidos.");
          } else {
            setLoginInvalido(true);
            setMsg(
              "Não foi possível efetuar o login. Por favor, tente mais tarde."
            );
          }
        }
      },
    });
  };

  // if (errorEfetuarLogin) throw errorEfetuarLogin;

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      {loginInvalido && (
        <div className="alert alert-danger fw-bold mb-3" role="alert">
          {msg}
        </div>
      )}

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
          Entrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
