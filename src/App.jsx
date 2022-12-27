import { login } from "./utils";
import "./index.css";
import { useState } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// [ok] - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// [ok] - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// [ok] - Desabilite o botão de Login equanto você está executando o login.
// [ok] - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// [ok] - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) return;

    setIsRequesting(true);
    setError("");

    const input = {
      email,
      password,
    };

    login(input)
      .then(() => {
        alert("Login realizado com sucesso");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsRequesting(false));
  };

  const handleEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const disabledButtonWhen = () =>
    !email || password.length < 6 || isRequesting;

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {error && <div className="errorMessage">{error}</div>}
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            autoComplete="off"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            value={password}
            onChange={handlePassword}
          />
        </div>

        <div className="button">
          <button disabled={disabledButtonWhen()} onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
