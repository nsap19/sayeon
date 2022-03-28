import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { setLoggedUser } from "store/user";
import axios from "axios";

export default function Login() {
  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  // DISPATCHER
  const dispatch = useAppDispatch();

  // HANDLER
  const handleSubmit = async (event: any) => {
    setDisabled(true); // 로그인 중에는 새로운 요청을 받지 않음
    event.preventDefault(); // submit event 중 새로고침 x
    // axios 요청 - login
    await axios
      .post(
        "/api/users/login",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("axios resonse: ", response);
        console.log("res.data.accessToken: ", response.data);
        // default header
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data;
        // get User date & dispatch
        dispatch(setLoggedUser(response.data));
      })
      /// routing
      ///
      .catch((err) => {
        console.log("axios err: ", err);
      });

    // form reset
    setEmail("");
    setPassword("");
    // button active
    setDisabled(false);
  };

  // 이메일 입력
  function handleEmailValue(event: any) {
    setEmail(event.target.value);
  }
  // 비밀번호 입력
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