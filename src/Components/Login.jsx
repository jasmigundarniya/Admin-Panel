import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import admin from "../assets/admin.jpg";
import "./Login.css";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiTrip } from "react-icons/bi";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const inputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const { email, password } = data;

  const getData = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch("http://localhost:4000/api/v1/admins", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.user) {
        localStorage.setItem("admin", JSON.stringify(result.user.email));
        localStorage.setItem("id", JSON.stringify(result.user._id));
        SuccessToast("Logged in Successfully!!");
        navigate("/dashboard");
      } else {
        ErrorToast("Invalid email or password!!");
      }
    } catch (error) {
      ErrorToast(error.message);
    }
  };

  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  // const handleSubmit = () => {
  //   if (
  //     email.current.value == "admin@gmail.com" &&
  //     password.current.value == "admin012"
  //   ) {
  //     navigate("/dashboard");
  //   } else {
  //     ErrorToast("Please fill valid email and password");
  //   }
  // };

  return (
    <>
      <div className="containers-fluid">
        <Row className="w-100">
          <Col className="admin col-md-8">
            <img src={admin} />
          </Col>

          <Col className="col-md-4 textside">
            {/* <div className='alogo'>
                            <img src={logo} />
                        </div> */}
            <BiTrip style={{ fontSize: "2rem", color: "#16a085" }} />
            <form onSubmit={getData}>
              <h4>Sign in</h4>

              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="E-mail Address"
                  onChange={inputData}
                  required
                />
                <br />
                <br />
                <input
                  type={passwordType}
                  placeholder="password"
                  required
                  name="password"
                  id="password"
                  value={password}
                  onChange={inputData}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  marginTop: -34,
                  marginRight: 90,
                }}
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </div>

              <Button>LOGIN</Button>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
