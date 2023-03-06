import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import jwt_decode from "jwt-decode";
import useAuth from "../../hooks/useAuth";


const INITIAL_STATE = { email: "", password: "" };
const LOGIN_URL = "/login";

function LoginForm() {
  const { setAuth } = useAuth();

  const [inputData, setInputData] = useState(INITIAL_STATE);
  const [errMsg, setErrMsg] = useState("");
  console.log(errMsg)

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(inputData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const {UserInfo} = jwt_decode(accessToken);
      const {email, role, storeId} = UserInfo

      console.log(email, role, storeId,'decoded');
      console.log(JSON.stringify(response?.data));

      //clear state and controlled inputs
      setAuth({ email, role, storeId ,accessToken });
      setInputData(INITIAL_STATE);
      navigate(from, { replace: true });

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response.data.message);
      } else if (err.response?.status === 404) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section className="flex flex-col justify-center m-auto p-6 ">
      <div className="flex flex-col px-1 m-auto justify-center rounded-3xl bg-gradient-to-r from-red-500/50 via-orange-500/60 to-red-500/50 ">
        <h3 className="mt-3 text-2xl text-center text-stone-50">Login</h3>
        <form onSubmit={onFormSubmit} className="mt-3 mb-10 p-12 mx-auto bg-white shadow-2xl rounded-2xl">
          <label htmlFor="email">Email
          <input
            placeholder="email"
            id="email"
            value={inputData.email}
            onChange={handleChange}
            className="ml-2 mb-3 p-1 border rounded-md"
          /></label>
          <br />
          <label htmlFor="password" className="mr-2">Password
          <input
          type='password'
            placeholder="password"
            id="password"
            value={inputData.password}
            onChange={handleChange}
            className="ml-2 mb-3 p-1 border rounded-md bg"
          /></label>
          <br />
          <button className="mt-3 py-2 px-4  border rounded-md bg-orange-200/70 hover:bg-orange-300/80 hover:shadow-md active:bg-orange-400 active:text-white bg-" >Login</button>
          {errMsg && <p className="mt-3 text-red-600 text-center">{errMsg}</p>}
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
