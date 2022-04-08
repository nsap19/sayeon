import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Stack,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import Cropper from "react-cropper";
import { uploadFile } from "./utils/uploadFile";
import { detectKeywords } from "./utils/detectKeywords";
import "cropperjs/dist/cropper.css";
import "./SelectImage.css";
import { ReactComponent as Image } from "assets/icon/image.svg";
import { updateImage, updateKeywords } from "../../../store/createStory";
import { useAppDispatch } from "../../../store/hooks";
import Loading from "./Loading";
import { receiverState } from "../types";
import {
  StyledButton,
  StyledP,
  StyledToggleButtonGroup,
  StyledToggleButton,
  StyledStack,
} from "../StyledComponent";

const SelectImage: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
  receiver: receiverState;
}> = ({ setStep, receiver }) => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();
  const [imageType, setImageType] = useState<"MINI" | "SQUARE" | "WIDE">(
    "SQUARE"
  );
  const [imageExtension, setImageExtension] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imageReady, setImageReady] = useState<boolean>(false);
  const [keywordsReady, setKeywordsReady] = useState<boolean>(false);

  const onChange = (e: any) => {
    e.preventDefault();

    setImageName(Date.now() + "_" + e.target.files[0].name);
    setImageExtension(e.target.files[0].type);

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files[0].size > 3 * 1024 * 1024) {
      setQuality(0.1);
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(
        cropper.getCroppedCanvas().toDataURL(imageExtension, quality)
      );
    }
  };

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [quality, setQuality] = useState(1);
  const [alertContent, setAlertContent] =
    useState("민감한 사진으로 확인되었습니다.");
  const handleUpload = useCallback(() => {
    setKeywordsReady(true);

    // 1. 크롭된 이미지를 blob object로 생성
    cropper.getCroppedCanvas().toBlob(
      (blob: any) => {
        const formData = new FormData();
        formData.append("croppedImage", blob, imageName);

        // 2. S3 업로드
        uploadFile(formData.get("croppedImage"))
          .then((res) => {
            // 3. 업로드 완료시 키워드 추출 및 번역
            detectKeywords(imageName)
              .then((res) => {
                // 4. 번역 완료시 상태 저장
                dispatch(updateKeywords(res.data.keywords.split(",")));
                dispatch(
                  updateImage({
                    name: imageName,
                    url: `https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/${imageName}`,
                    type: imageType,
                  })
                );
                setStep(2);
              })
              .catch((err) => {
                if (err.message === "Input image is too large.") {
                  setAlertContent("최대 크기를 초과하였습니다.");
                }

                setCropData("");
                setOpen(true);
                setKeywordsReady(false);
              });
          })
          .catch((err) => {
            // console.log(err);
          });
      },
      imageExtension,
      quality
    );
  }, [cropper, dispatch, imageExtension, imageName, imageType, setStep]);

  useEffect(() => {
    if (cropData) {
      handleUpload(); // getCropDate => handleUpload
    }
  }, [cropData, handleUpload]);

  const imageTypeOptions: {
    value: "MINI" | "SQUARE" | "WIDE";
    ratio: number;
  }[] = [
    { value: "MINI", ratio: 42 / 62 },
    { value: "SQUARE", ratio: 1 / 1 },
    { value: "WIDE", ratio: 99 / 62 },
  ];

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <p>{alertContent}</p>
          <p>다른 사진을 골라주세요.</p>
        </Alert>
      </Snackbar>

      {keywordsReady ? (
        <Loading keywordsReady={keywordsReady} />
      ) : (
        <StyledStack>
          <Stack direction="column" alignItems="center">
            {receiver ? (
              <StyledP>{receiver.info.nickname}에게 사연보내기</StyledP>
            ) : (
              <StyledP>랜덤 사연보내기</StyledP>
            )}

            {/* <input type="file" onChange={onChange} /> */}
            <label
              htmlFor="contained-button-file"
              style={{
                minWidth: "300px",
                margin: "auto",
                textAlign: "right",
              }}
            >
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={onChange}
                style={{ display: "none" }}
              />
              <Button
                href="/send"
                sx={{
                  color: "white",
                  fontFamily: "S-CoreDream-4Regular",
                  marginBottom: "10px",
                }}
                disableElevation={true}
                variant="contained"
                component="span"
                size="small"
              >
                사진 고르기
              </Button>
            </label>

            <Box
              // 최소 window 크기 320px 기준 = 양 옆 마진 10px + 최소 사진 너비 300px
              sx={{
                margin: "0 10px",
                minWidth: "300px",
                height: "300px",
                backgroundColor: imageReady ? "transparent" : "white",
                borderRadius: imageReady ? "" : "20px",
                boxShadow: imageReady
                  ? ""
                  : "0px 10px 30px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: imageReady ? "none" : "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "absolute",
                }}
              >
                {imageName ? <CircularProgress /> : <Image />}
              </Box>
              <Cropper
                style={{
                  maxHeight: "300px",
                  maxWidth: "300px",
                  boxShadow: "0px 10px 30px rgb(0 0 0 / 5%)",
                }}
                aspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                guides={true}
                zoomOnWheel={false}
                ready={() => setImageReady(true)}
              />
            </Box>

            <StyledToggleButtonGroup size="small" value={imageType} exclusive>
              {imageTypeOptions.map((imageTypeOption) => (
                <StyledToggleButton
                  onClick={() => {
                    cropper.setAspectRatio(imageTypeOption.ratio);
                    setImageType(imageTypeOption.value);
                  }}
                  key={imageTypeOption.value}
                  value={imageTypeOption.value}
                >
                  {imageTypeOption.value}
                </StyledToggleButton>
              ))}
            </StyledToggleButtonGroup>
          </Stack>

          <Box sx={{ textAlign: "center" }}>
            <StyledButton
              onClick={getCropData}
              disabled={!imageReady}
              variant="contained"
              size="large"
              disableElevation={true}
            >
              다음
            </StyledButton>
          </Box>
        </StyledStack>
      )}
    </>
  );
};

export default SelectImage;
