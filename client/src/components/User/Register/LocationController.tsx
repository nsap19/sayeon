import React, { useState } from "react";
import { Controller, Control, UseFormResetField } from "react-hook-form";
import { FormControl, MenuItem } from "@mui/material";
import { StyledTextField } from "./StyledComponent";
import { registerInput } from "./types";
import LocationJson from "assets/json/location.json";

const locationOptions = Object.keys(LocationJson).sort();

const LocationController: React.FC<{
  control: Control<registerInput, any>;
  resetField: UseFormResetField<registerInput>;
}> = ({ control, resetField }) => {
  const [detailedLocationOptions, setDetailedLocationOptions] = useState<
    string[]
  >([]);
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <>
      <Controller
        name="location"
        control={control}
        rules={{
          required: {
            value: true,
            message: "위치를 선택해주세요.",
          },
        }}
        render={({ field: { onChange }, fieldState }) => (
          <StyledTextField
            select
            defaultValue=""
            label="시/도"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ? fieldState.error.message : " "
            }
            onChange={(e) => {
              onChange(e.target.value);
              setDetailedLocationOptions(
                LocationJson[e.target.value as keyof typeof LocationJson].sort()
              );
              resetField("detailedLocation");
              setIsDisabled(false);
            }}
          >
            {locationOptions.map((option, index) => {
              return (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </StyledTextField>
        )}
      ></Controller>

      <Controller
        name="detailedLocation"
        control={control}
        rules={{
          required: {
            value: true,
            message: "위치를 선택해주세요.",
          },
        }}
        render={({ field, fieldState }) => (
          <FormControl>
            <StyledTextField
              {...field}
              select
              label="시/군/구"
              disabled={isDisabled}
              defaultValue=""
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ? fieldState.error.message : " "
              }
            >
              {detailedLocationOptions.map((option, index) => {
                return (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </StyledTextField>
          </FormControl>
        )}
      ></Controller>
    </>
  );
};

export default LocationController;
