import { Button } from "../../../components/button";
import { TextField } from "../../../components/text-field";
import * as React from "react";
import { useLogin, useAuth} from "../auth.state";
import { Link } from "react-router-dom";

const ACCESS_TOKEN_STORAGE = "auth";

export const LoginForm = () => {
  const statusInit = { message: "", status: "idle" };
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState(statusInit);
  const login = useLogin();
  const auth = useAuth();

  return (
    <div className="max-w-md mx-auto m-6 shadow">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setStatus({ ...status, status: "loading" });
          login({ email, password })
            .then((res) => {
              auth.login(res.token);
              localStorage.setItem(ACCESS_TOKEN_STORAGE, res.token);
              setStatus(statusInit);
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
          Login
        </div>
        <div className="space-y-6">
          <TextField
            label="Email"
            value={email}
            onChangeValue={setEmail}
            name="username"
            id="username"
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
            Login
          </Button>
        </div>
      </form>
      <div className="text-xl m-5  font-bold text-center">
        <Link
          className="underline text-center text-md leading-relaxed text-pink-500"
          to={`/register`}
        >
          Register
        </Link>
      </div>
    </div>
  );
};
