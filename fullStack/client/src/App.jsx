/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import axios from "axios";
import FileBase64 from "react-file-base64";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const [firstName, setFirstName] = useState(""); //firstName=""
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [message, setMessage] = useState(false);

  const [details, setDetails] = useState([]);

  const postRequestHandler = async (e) => {
    e.preventDefault();

    const data = { firstName, email, password, image };

    const response = await axios.post(
      "http://localhost:5000/create-user",
      data
    );
    localStorage.setItem("profile", response.data.token);
    // console.log("This is reposne from BE: ", response);
    setMessage(true);
    setFirstName("");
    setEmail("");
    setPassword("");
    setImage("");
  };

  const getRequestHandler = async (e) => {
    //e.preventDefault();
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).res.tokenId
        }`;
      }
      return req;
    });

    const response = await API.get("/get-users");
    setDetails(response.data.details);
  };

  const removeUser = async (id) => {
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).res.tokenId
        }`;
      }
      return req;
    });

    await API.delete(`/${id}`);
    console.log("User deleted: ", id);
    getRequestHandler();
  };

  // const Logout = () => {
  //   //localStorage.clear();
  //   localStorage.removeItem("profile");
  // };

  return (
    <div>
      <Login /> <br />
      <Logout />
      <h2>Create a new user</h2>
      {/* <button onClick={() => Logout()} style={{ color: "red" }}>
        Logout
      </button> */}
      <form>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          type="text"
          placeholder="firstName"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="text"
          placeholder="password"
        />
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => {
            //console.log(base64);
            setImage(base64);
          }}
        />
        <button onClick={postRequestHandler}>Insert</button>
      </form>
      {message ? <h3 style={{ color: "green" }}>Data insreted!</h3> : ""}
      <button onClick={getRequestHandler}>Get users ...</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {details.map((value) => {
          return (
            <div
              key={value._id}
              style={{
                border: "1px solid gray",
                width: "150px",
                margin: "20px",
                padding: "5px",
              }}
            >
              <h4>{value.firstName}</h4>
              <img src={value.image} width="100%" alt="user" />
              <h4>{value.email}</h4>
              <small
                style={{ color: "red" }}
                onClick={() => removeUser(value._id)}
              >
                Delete
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
