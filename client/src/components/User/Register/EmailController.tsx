import React, { useState, useEffect } from "react";
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";
import axios from "axios";
import { StyledTextField } from "./StyledComponent";
import { registerInput } from "./types";
import { useIsMount } from "./CustomHook";

const EmailController: React.FC<{
  control: Control<registerInput, any>;
  trigger: UseFormTrigger<registerInput>;
  getValues: UseFormGetValues<registerInput>;
}> = ({ control, trigger, getValues }) => {
  const [validatedEmail, setValidatedEmail] = useState(false);

  const checkEmailDuplication = () => {
    const email = getValues().email;
    axios
      .post("users/email", null, {
        params: {
          email,
        },
      })
      .then(() => {
        setValidatedEmail(true);
        trigger("email");
      })
      .catch(() => {
        setValidatedEmail(false);
        trigger("email");
      });
  };

  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount) {
      trigger("email");
    }
  }, [isMount, trigger, validatedEmail]);

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
          <StyledTextField
            {...field}
            label="이메일"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ? fieldState.error.message : " "
            }
            onChange={(e) => {
              field.onChange(e);
              checkEmailDuplication();
            }}
          />
        </>
      )}
    />
  );
};

export default EmailController;
