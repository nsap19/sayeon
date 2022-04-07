import React, { useEffect, useState } from "react";
import SelectImage from "../../components/Story/1_SelectImage/SelectImage";
import { Stack } from "@mui/material";
import Headerbar from "../../components/Headerbar";
import SelectWaiting from "../../components/Story/3_SelectWaiting/SelectWaiting";
import SelectKeyword from "../../components/Story/2_SelectKeyword/SelectKeyword";
import ConfirmStory from "../../components/Story/4_ConfirmStory/ConfirmStory";
import CreateStoryHeaderbar from "../../components/Story/CreateStoryHeaderbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface CustomizedState {
  id: string;
  info: { profilePic: number; nickname: string };
}

const CreateStory: React.FC = () => {
  const location = useLocation();
  const receiver = location.state as CustomizedState;
  const [step, setStep] = useState<number>(1);

  const getMyInfo = () => {
    axios
      .get("userInfo/myinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        if (err.response.status) {
          localStorage.removeItem("token");
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      });
  };

  useEffect(() => {
    document.getElementById("create-story")!.scrollTo(0, 0);
    getMyInfo();
  }, [step]);

  return (
    <>
      {step === 1 ? (
        <Headerbar headerName={"사연 작성"} />
      ) : (
        <CreateStoryHeaderbar
          headerName={"사연 작성"}
          setStep={setStep}
          receiver={receiver}
        />
      )}

      <Stack
        id="create-story"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "calc(100% - 70px - 70px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {
          {
            1: <SelectImage setStep={setStep} receiver={receiver} />,
            2: <SelectKeyword setStep={setStep} receiver={receiver} />,
            3: <SelectWaiting setStep={setStep} receiver={receiver} />,
            4: <ConfirmStory receiver={receiver} />,
          }[step]
        }
      </Stack>
    </>
  );
};

export default CreateStory;
