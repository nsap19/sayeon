import React from "react";
import { Controller, Control } from "react-hook-form";
import { StyledTextField } from "components/User/Login/StyledComponent";
import { loginInput } from "components/User/Login/types";

const EmailController: React.FC<{
  control: Control<loginInput, any>;
}> = ({ control }) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <StyledTextField
          {...field}
          label="이메일"
          type="text"
          error={!!fieldState.error}
          helperText={
            fieldState.error?.message ? fieldState.error.message : " "
          }
        />
      )}
      name="email"
      control={control}
      rules={{
        required: { value: true, message: "이메일을 입력해주세요." },
      }}
      defaultValue=""
    />
  );
};

export default EmailController;
