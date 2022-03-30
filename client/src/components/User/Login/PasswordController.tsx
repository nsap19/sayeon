import React from "react";
import { Controller, Control } from "react-hook-form";
import { StyledTextField } from "components/User/Login/StyledComponent";
import { loginInput } from "components/User/Login/types";

const PasswordContoller: React.FC<{
  control: Control<loginInput, any>;
}> = ({ control }) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <StyledTextField
          {...field}
          label="비밀번호"
          type="password"
          error={!!fieldState.error}
          helperText={
            fieldState.error?.message ? fieldState.error.message : " "
          }
        />
      )}
      name="password"
      control={control}
      rules={{
        required: { value: true, message: "비밀번호를 입력해주세요." },
      }}
      defaultValue=""
    />
  );
};

export default PasswordContoller;
