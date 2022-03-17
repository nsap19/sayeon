import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function Login() {
  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  // HANDLER
  const handleSubmit = async (event: any) => {
    setDisabled(true);
    event.preventDefault();
    // await axios
    //   .post("/api/users/login")
    //   .then((response) => {
    //     console.log("axios resonse: ", response);
    //   })
    //   .catch((err) => {
    //     console.log("axios err: ", err);
    //   });
    setEmail("");
    setPassword("");
    setDisabled(false);
  };
  function handleEmailValue(event: any) {
    setEmail(event.target.value);
  }
  function handlePasswordValue(event: any) {
    setPassword(event.target.value);
  }

  // VALIDATION
  function validateForm() {
    // 이메일, 비밀번호 검증 형식
    return email.length > 10;
  }

  return (
    <div>
      <img src={"경로"} alt={"로고"} />
      <form className="loginform" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="email"
            placeholder="이메일을 입력하세요"
            onChange={handleEmailValue}
            required
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handlePasswordValue}
            required
            value={password}
          />
        </label>
        <button type="submit" disabled={!validateForm() || disabled}>
          LOG IN
        </button>
      </form>
      <button type="button">
        <Link to="/register">회원가입</Link>
      </button>
      <div>비밀번호를 잊으셨나요?</div>
    </div>
  );
}
