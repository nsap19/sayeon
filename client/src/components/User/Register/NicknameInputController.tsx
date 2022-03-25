import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import { StyledTextField } from "./StyledComponent";
import { registerInput } from "./types";

const NicknameInputController: React.FC<{
  control: Control<registerInput, any>;
}> = ({ control }) => {
  const [validatedNickname, setValidatedNickname] = useState(false);

  return (
    <Controller
      name="nickname"
      control={control}
      defaultValue=""
      rules={{
        required: {
          value: true,
          message: "닉네임을 입력해주세요.",
        },
        maxLength: {
          value: 10,
          message: "닉네임은 10자 이내로 입력해주세요.",
        },
      }}
      render={({ field, fieldState }) => (
        <StyledTextField
          {...field}
          label="닉네임"
          error={!!fieldState.error}
          helperText={
            fieldState.error?.message ? fieldState.error.message : " "
          }
        />
      )}
    />
  );
};

export default NicknameInputController;
