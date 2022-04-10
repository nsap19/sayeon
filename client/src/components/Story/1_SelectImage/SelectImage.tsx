import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { uploadFile } from "./utils/uploadFile";
import { detectKeywords } from "./utils/detectKeywords";
import { updateImage, updateKeywords } from "../../../store/createStory";
import { useAppDispatch } from "../../../store/hooks";
import { receiverState } from "../types";
import Loading from "./Loading";
import EditImage from "./EditImage";
import {
  StyledButton,
  StyledP,
  StyledToggleButtonGroup,
  StyledToggleButton,
  StyledStack,
} from "../StyledComponent";
import "cropperjs/dist/cropper.css";
import "./SelectImage.css";

const SelectImage: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
  receiver: receiverState;
}> = ({ setStep, receiver }) => {
  const [image, setImage] = useState("");
  const [cropper, setCropper] = useState<any>();
  const [imageType, setImageType] = useState<"MINI" | "SQUARE" | "WIDE">(
    "SQUARE"
  );
  const [imageExtension, setImageExtension] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imageReady, setImageReady] = useState<boolean>(false);
  const [clickNext, setClickNext] = useState<boolean>(false);
  const [keywordsLoading, setKeywordsLoading] = useState(false);

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

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [alertContent, setAlertContent] = useState("다시 시도해주세요.");

  const getQuality = () => {
    let quality = 0.9;
    const head = `data:${imageExtension};base64,`;
    let fileSize =
      ((cropper.getCroppedCanvas().toDataURL(imageExtension, quality).length -
        head.length) *
        3) /
      4;

    while (4 * 1024 * 1024 < fileSize) {
      if (0.05 < quality) {
        quality -= 0.1;
        fileSize =
          ((cropper.getCroppedCanvas().toDataURL(imageExtension, quality)
            .length -
            head.length) *
            3) /
          4;
      } else {
        return 0;
      }
    }
    return quality;
  };

  useEffect(() => {
    if (clickNext) {
      setTimeout(() => {
        setKeywordsLoading(true);
        handleUpload();
      }, 100);
    }
  }, [clickNext]);

  const handleUpload = () => {
    const quality = getQuality();
    if (quality === 0) {
      setAlertContent("최대 크기를 초과하였습니다.");
      setOpen(true);
      setClickNext(false);
    }

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
                if (err.message === "민감한 사진으로 확인되었습니다.") {
                  setAlertContent("민감한 사진으로 확인되었습니다.");
                }
                setOpen(true);
                setClickNext(false);
              });
          })
          .catch((err) => {
            // console.log(err);
          });
      },
      imageExtension,
      quality
    );
  };

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

      {keywordsLoading ? (
        <Loading />
      ) : (
        <StyledStack>
          <Stack direction="column" alignItems="center">
            {receiver ? (
              <StyledP>{receiver.info.nickname}에게 사연보내기</StyledP>
            ) : (
              <StyledP>랜덤 사연보내기</StyledP>
            )}

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

            <EditImage
              imageReady={imageReady}
              imageName={imageName}
              image={image}
              setCropper={setCropper}
              setImageReady={setImageReady}
            />

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

          <Box sx={{ position: "relative", textAlign: "center" }}>
            <StyledButton
              onClick={() => {
                setClickNext(true);
              }}
              disabled={!imageReady || clickNext}
              variant="contained"
              size="large"
              disableElevation={true}
            >
              다음
            </StyledButton>
            {clickNext && (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </StyledStack>
      )}
    </>
  );
};

export default SelectImage;
