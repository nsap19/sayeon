import React, { useState } from "react";
import SelectImage from "../../components/Story/1_SelectImage/SelectImage";
import { Stack } from "@mui/material";
import Headerbar from "../../components/Headerbar";
import SelectWaiting from "../../components/Story/2_SelectWaiting/SelectWaiting";
import SelectKeyword from "../../components/Story/3_SelectKeyword/SelectKeyword";
import ConfirmStory from "../../components/Story/4_ConfirmStory/ConfirmStory";
import CreateStoryHeaderbar from "../../components/Story/CreateStoryHeaderbar";

const CreateStory: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      {step === 1 ? (
        <Headerbar headerName={"사연 작성"} />
      ) : (
        <CreateStoryHeaderbar headerName={"사연 작성"} setStep={setStep} />
      )}

      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          height: "calc(100% - 56px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {
          {
            1: <SelectImage setStep={setStep} />,
            2: <SelectWaiting setStep={setStep} />,
            3: <SelectKeyword setStep={setStep} />,
            4: <ConfirmStory setStep={setStep} />,
          }[step]
        }
      </Stack>
    </>
  );
};

export default CreateStory;
