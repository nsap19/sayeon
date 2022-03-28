import React, { useState } from "react";
import axios from "axios";
import { Stack, Grid } from "@mui/material";
import { ReactComponent as Edit } from "../../../assets/icon/edit.svg";

const ChangeNickname: React.FC = () => {
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('닉네임');
  // const [nickname, setNickname] = useState<string>('');
  // const [validatedNickname, setValidatedNickname] = useState(false);

  const nicknameEditingMode = () => {
    if (!isEditingNickname) {
      return setIsEditingNickname(true)
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  };


  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `users/${userId}`,
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     setNickname(res.data.nickname);
  //   })
  //   .catch((err) => console.log(err))
  // }, []);


  const changeNickname = () => {
    // 닉네임 중복 체크
    axios
    .post("users/nickname", null, {
      params: {
        nickname,
      },
    })
    .then(() => {
      // setValidatedNickname(true);
      axios({
        method: "put",
        url: "userInfo/nickname",
        data: {
          nickname: nickname
        }
      })
      .then(() => {
        console.log('닉네임 변경 완료')
        setIsEditingNickname(false)
      })
      .catch((err) => console.log(err));
    })
    .catch(() => {
      // setValidatedNickname(false);
      alert('중복된 닉네임입니다.')
    });
  };

  return (
    <Stack>
      <Grid container spacing={1}>
        <Grid item xs={9} sx={{ m: "auto" }}>
          {isEditingNickname ? (
            <input type="text" value={nickname} onChange={(e) => onChangeNickname(e)} />
          ) : (
            <h2>{nickname}</h2>
          )}
        </Grid>
        <Grid item xs={3} sx={{ m: "auto" }}>
          <div>
            {isEditingNickname ? (
              <button onClick={changeNickname}>수정</button>
            ) : (
              <Edit onClick={nicknameEditingMode}/>
            )}
          </div>
        </Grid>
      </Grid>
    </Stack>
  )
}


export default ChangeNickname;