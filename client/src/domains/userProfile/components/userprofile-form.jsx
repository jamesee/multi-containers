import { Button } from "../../../components/button";
import { TextField } from "../../../components/text-field";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../auth";
import { load } from "dotenv";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "api";

const updateProfile = (token, { company, department, designation }) =>
  fetch(`${BASE_URL}/user-details`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      company,
      department,
      designation,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res)
    // throw new Error(res.statusText);
  })

const getProfile = (token, signal) =>
  fetch(`${BASE_URL}/user-details`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    signal,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res)
    // throw new Error(res.statusText);
  })

export const UserProfileForm = () => {
  const statusInit = { message: "", status: "idle" };
  const [company, setCompany] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [mystatus, setMystatus] = React.useState(statusInit);
  const history = useHistory();
  const auth = useAuth();
  const ab = new AbortController();

  const loadProfile = (token, signal) => {
    setIsLoading(true);
    getProfile(token, signal).then((data) => {
        const { company, department, designation } = data;
        setCompany(company);
        setDepartment(department);
        setDesignation(designation);
      setIsLoading(false);
    })
    .catch((res) => {
      console.log(res.status, res.statusText);
      res.json().then((data) => {
        console.log(data);
        setMystatus({ message: data.errors, status: "errors" });
      });
    });

  }
  
  React.useEffect(() => {
    if (auth.status !== "authenticated") {
      return;
    }
    const token = localStorage.getItem("auth");
    loadProfile(token, ab.signal);
    return () => {
      ab.abort();
    };
  }, [auth]);

  return (
    <div className="max-w-md mx-auto m-10 shadow">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setMystatus({ ...mystatus, status: "loading" });
          if (auth.status === "authenticated") {
            const token = localStorage.getItem("auth");
            updateProfile(token, { company, department, designation })
            .then((data) => {
                const { company, department, designation } = data;
                setCompany(company);
                setDepartment(department);
                setDesignation(designation);
                setMystatus({ ...mystatus, status: "idle" });
                history.push("/");
              })
            .catch((res) => {
                console.log(res.status, res.statusText);
                res.json().then((data) => {
                  console.log(data);
                  setMystatus({ message: data.errors, status: "errors" });
                });
              })
            }
          }
        }

        className="p-6"
      >
        {
          mystatus.status === "errors" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            {mystatus.message}
          </div>
          )
        }
        <div className="space-y-6">
          <TextField
            label="Company"
            value={company}
            onChangeValue={setCompany}
            name="company"
            id="company"
            autoFocus
            required
            disabled={mystatus.status === "loading"}
          />
          <TextField
            label="Department"
            value={department}
            onChangeValue={setDepartment}
            name="department"
            id="department"
            autoFocus
            required
            disabled={mystatus.status === "loading"}
          />
          <TextField
            label="Designation"
            value={designation}
            onChangeValue={setDesignation}
            name="designation"
            id="designation"
            required
            disabled={mystatus.status === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={mystatus.status === "loading"}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}
