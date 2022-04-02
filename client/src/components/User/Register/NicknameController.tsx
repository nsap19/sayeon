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

const NicknameController: React.FC<{
  control: Control<registerInput, any>;
  trigger: UseFormTrigger<registerInput>;
  getValues: UseFormGetValues<registerInput>;
}> = ({ control, trigger, getValues }) => {
  const [validatedNickname, setValidatedNickname] = useState(false);

  const checkNicknameDuplication = () => {
    const nickname = getValues().nickname;

    axios
      .post("users/nickname", null, {
        params: {
          nickname,
        },
      })
      .then(() => {
        setValidatedNickname(true);
        trigger("nickname");
      })
      .catch(() => {
        setValidatedNickname(false);
        trigger("nickname");
      });
  };

  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount) {
      trigger("email");
    }
  }, [validatedNickname, isMount, trigger]);

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
          value: 8,
          message: "닉네임은 8자 이내로 입력해주세요.",
        },
        validate: () => {
          if (!validatedNickname) {
            return "중복된 닉네임입니다.";
          }
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
          onChange={(e) => {
            field.onChange(e);
            checkNicknameDuplication();
          }}
        />
      )}
    />
  );
};

export default NicknameController;
