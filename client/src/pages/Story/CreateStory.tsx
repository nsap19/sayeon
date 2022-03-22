import React, { useState } from "react";
import CropImage from "../../components/Story/CropImage";
import { Stack } from "@mui/material";
import HeaderBar from "../../components/HeaderBar";
import SelectWaiting from "../../components/Story/SelectWaiting";
import SelectKeyword from "../../components/Story/SelectKeyword";

const CreateStory: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      <HeaderBar headerName={"사연 작성"} />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ height: "calc(100% - 56px)" }}
      >
        {
          {
            1: (
              <CropImage receiver={"일이삼사오육칠팔구십"} setStep={setStep} />
            ),
            2: (
              <SelectWaiting
                receiver={"일이삼사오육칠팔구십"}
                setStep={setStep}
              />
            ),
            3: (
              <SelectKeyword
                receiver={"일이삼사오육칠팔구십"}
                setStep={setStep}
              />
            ),
          }[step]
        }
      </Stack>
    </>
  );
};

export default CreateStory;
