import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import { ReactComponent as Edit } from "../../../assets/icon/edit.svg";
import "./Profile.css";


const ChangeNickname: React.FC = () => {
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [defaultNickname, setDefaultNickname] = useState<string>('');
  const [openMinAlert, setOpenMinAlert] = useState<boolean>(false);
  const [openMaxAlert, setOpenMaxAlert] = useState<boolean>(false);
  const [openOverlapAlert, setOpenOverlapAlert] = useState<boolean>(false);

  const nicknameEditingMode = () => {
    if (!isEditingNickname) {
      return setIsEditingNickname(true)
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  };


  useEffect(() => {
    getMyNickname()
  }, []);

  const getMyNickname = () => {
    const token = localStorage.getItem("token") 
    axios({
      method: "get",
      url: 'userInfo/myinfo',
      headers: {
        Authorization : `Bearer ${token}`,
      }
    })
    .then((res) => {
      // console.log(res)
      setNickname(res.data.data.memberProfile.nickname);
      setDefaultNickname(res.data.data.memberProfile.nickname);
    })
    .catch((err) => console.log(err));
  }


  const changeNickname = () => {
    const token = localStorage.getItem("token")
    if (!nickname.length) {
      setOpenMinAlert(true)
      setTimeout(function() { setOpenMinAlert(false); }, 2000)
    }
    else if (nickname.length >= 9) {
      setOpenMaxAlert(true)
      setTimeout(function() { setOpenMaxAlert(false); }, 2000)
    }
    else {
      axios
      .post("users/nickname", null, {
        params: {
          nickname,
        },
      })
      .then(() => {
        axios({
          method: "put",
          url: "userInfo/nickname",
          headers: {
            // 'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`,
          },
          data: {
            nickname,
          }
        })
        .then(() => {
          console.log('닉네임 변경 완료')
          setIsEditingNickname(false)
          getMyNickname()
        })
        .catch((err) => console.log(err));
      })
      .catch(() => {
        setOpenOverlapAlert(true)
        setTimeout(function() { setOpenOverlapAlert(false); }, 2000)
      });
    }
  };

  const closeEditing = () => {
    setIsEditingNickname(false)
    setNickname(defaultNickname)
  };

  return (
    <Stack>
      {isEditingNickname ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack>
            <input 
              className="input-custom" 
              type="text"
              // minLength={2} 
              // maxLength={10} 
              value={nickname} 
              onChange={(e) => onChangeNickname(e)} 
            />
            {openMinAlert ? (
              <small className="small-custom" id="nicknameHelpBlock">1자 이상 입력해주세요</small>
            ) : null }
            {openMaxAlert ? (
              <small className="small-custom" id="nicknameHelpBlock">8자 이하 입력해주세요</small>
            ) : null }
            {openOverlapAlert ? (
              <small className="small-custom" id="nicknameHelpBlock">중복된 닉네임입니다.</small>
            ) : null }
          </Stack>
          <Stack direction="row">
            <button className="button-custom" onClick={changeNickname}>수정</button>
            <button className="button-custom" onClick={closeEditing}>취소</button>
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2} alignItems="center">
          <p className="p-custom">{nickname}</p>
          <Edit onClick={nicknameEditingMode} className="svg-custom" />
        </Stack>
      )}
    </Stack>
  )
}


export default ChangeNickname;