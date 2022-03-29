import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import { StyledTextField } from "./StyledComponent";
import { registerInput } from "./types";

const EmailInputController: React.FC<{
  control: Control<registerInput, any>;
}> = ({ control }) => {
  const [validatedEmail, setValidatedEmail] = useState(false);

  const checkEmailDuplication = (email: string) => {
    // setValidatedEmail(true);
    axios
      .post("users/email", { email })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Controller
      name="email"
      control={control}
      defaultValue=""
      rules={{
        required: {
          value: true,
          message: "이메일을 입력해주세요.",
        },
        pattern: {
          value:
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
          message: "이메일 형식이 올바르지 않습니다.",
        },
        validate: () => {
          if (!validatedEmail) {
            return "이미 가입된 이메일입니다.";
          }
        },
      }}
      render={({ field, fieldState }) => (
        <>
          <p>{field.value}</p>
          <StyledTextField
            {...field}
            label="이메일"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ? fieldState.error.message : " "
            }
          />
          <Button onClick={() => checkEmailDuplication(field.value)}>
            중복 확인
          </Button>
        </>
      )}
    />
  );
};

export default EmailInputController;
