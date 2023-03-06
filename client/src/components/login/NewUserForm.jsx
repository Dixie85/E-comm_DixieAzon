import axios from "../../api/axios";
import { useEffect, useState } from "react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";
const INITIAL_STATE = {
  email: "",
  password: "",
  confirm_password: "",
  role: "user",
};

function NewUserForm({ onSubmit }) {
  const [inputData, setInputData] = useState(INITIAL_STATE);
  const [errMsg, setErrMsg] = useState("");
  console.log(errMsg, "errMsg");

  useEffect(() => {
    setErrMsg("");
  }, [inputData]);

  const handleChange = (e) => {
    setInputData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);

    // const v1 = USER_REGEX.test(inputData.email);
    // const v2 = PWD_REGEX.test(inputData.password);
    // if (!v1 || !v2) {
    //   setErrMsg("Invalid Entry");
    //   console.log("Invalid Entry");
    //   return;
    // }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(inputData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      //clear state and controlled inputs
      setInputData(INITIAL_STATE);
    } catch (err) {
      if (!err?.response) {
        console.log(err, "Loging from IF");
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <section className="flex flex-col justify-center m-auto p-6 ">
      <div className="flex flex-col px-1 m-auto justify-center rounded-3xl bg-gradient-to-r from-blue-500/50 via-orange-500/60 to-blue-500/50 ">
        <h3 className="mt-3 text-2xl text-center text-stone-50">Create new user</h3>
        <form onSubmit={onFormSubmit} className="mt-3 mb-10 p-12 mx-auto bg-white shadow-2xl rounded-2xl">
          <label htmlFor="email">Email</label>
          <input
            placeholder="email"
            id="email"
            value={inputData.email}
            onChange={handleChange}
            className="ml-2 mb-3 p-1 border rounded-md"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            value={inputData.password}
            onChange={handleChange}
            className="ml-2 mb-3 p-1 border rounded-md"
          />
          <br />
          <label htmlFor="confirm_password">Confirm password</label>
          <input
            type="password"
            placeholder="confirm password"
            id="confirm_password"
            value={inputData.confirm_password}
            onChange={handleChange}
            className="ml-2 mb-3 p-1 border rounded-md"
          />
          <br />
          <label htmlFor="role">Type of User</label>
          <select
            placeholder="user"
            id="role"
            value={inputData.type}
            onChange={handleChange}
            className="ml-2 mb-3 p-1 border rounded-md"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          <button className="mt-3 py-2 px-4  border rounded-md text-white hover:bg-orange-300/80 hover:shadow-md active:bg-orange-400 active:text-white bg-gradient-to-r from-blue-500/60 to-orange-500/50">Create</button>
          {errMsg && <p className="mt-3 text-red-600 text-center">{errMsg}</p>}
        </form>
      </div>
    </section>
  );
}

export default NewUserForm;
