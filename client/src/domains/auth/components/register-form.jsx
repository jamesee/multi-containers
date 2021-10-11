import { Button } from "../../../components/button";
import { TextField } from "../../../components/text-field";
import * as React from "react";
import { useRegister, useLogin } from "../auth.state";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../auth.state";

const ACCESS_TOKEN_STORAGE = "auth";

export const RegisterForm = () => {
  const statusInit = { message: "", status: "idle" };
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState(statusInit);

  const auth = useAuth();
  const login = useLogin();
  const register = useRegister();
  const history = useHistory();

  return (
    <div className="max-w-md mx-auto m-10 shadow">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setStatus({ ...status, status: "loading" });

          register({ username, email, password })
            .then((res) => {
              login({ email, password }).then((res) => {
                auth.login(res.token);
                localStorage.setItem(ACCESS_TOKEN_STORAGE, res.token);
                setStatus(statusInit);
              });
              history.push("/");
            })
            .catch((res) => {
              console.log(res.status, res.statusText);
              res.json().then((data) => {
                console.log(data);
                setStatus({ message: data.errors, status: "errors" });
              });
            });
        }}
        className="p-6"
      >
        {status.status === "errors" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            {status.message}
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Register User
        </div>
        <div className="space-y-6">
          <TextField
            label="Username"
            value={username}
            onChangeValue={setUsername}
            name="username"
            id="username"
            autoFocus
            required
            disabled={status.status === "loading"}
          />
          <TextField
            label="Email"
            value={email}
            onChangeValue={setEmail}
            name="email"
            id="email"
            autoFocus
            required
            disabled={status.status === "loading"}
          />
          <TextField
            label="Password"
            value={password}
            onChangeValue={setPassword}
            name="password"
            id="password"
            type="password"
            required
            disabled={status.status === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status.status === "loading"}
          >
            Register
          </Button>
        </div>
      </form>
      <div className="text-xl m-5  font-bold text-center">
        <Link
          className="underline text-center text-md leading-relaxed text-pink-500"
          to={`/`}
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};
