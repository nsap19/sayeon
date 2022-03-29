import React, { useState, useEffect, useCallback } from "react";
import { Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Cropper from "react-cropper";
import { uploadFile } from "./utils/uploadFile";
import { detectKeywords } from "./utils/detectKeywords";
import { translate } from "./utils/translate";
import "cropperjs/dist/cropper.css";
import "./SelectImage.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCreateStory } from "../../../store/createStory";
import { ReactComponent as Camera } from "assets/icon/camera.svg";
import { updateImage, updateKeywords } from "../../../store/createStory";
import Loading from "./Loading";

const Input = styled("input")({
  display: "none",
});

const StyledButton = styled(Button)({
  color: "white",
  fontFamily: "S-CoreDream-4Regular",
});

const SelectImage: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();
  const [imageType, setImageType] = useState<"mini" | "square" | "wide">(
    "square"
  );
  const [imageExtension, setImageExtension] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imageReady, setImageReady] = useState<boolean>(false);
  const [keywordsReady, setKeywordsReady] = useState<boolean>(false);

  const onChange = (e: any) => {
    e.preventDefault();

    setImageReady(false);
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

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL(imageExtension, 0.1));
    }
  };

  const { receiver } = useAppSelector(selectCreateStory);
  const dispatch = useAppDispatch();
  const handleUpload = useCallback(() => {
    setKeywordsReady(true);

    // 1. 크롭된 이미지를 blob object로 생성
    cropper.getCroppedCanvas().toBlob((blob: any) => {
      const formData = new FormData();
      formData.append("croppedImage", blob, imageName);
      formData.forEach((file) => {
        console.log("blob object", file);

        // 2. S3 업로드
        uploadFile(file)
          .then((res) => {
            // 3. 업로드 완료시 키워드 추출
            console.log("upload 후 then", Date());
            detectKeywords(imageName)
              .then((res) => {
                console.log("resres", res);

                // 4. 키워드 추출 후 번역
                Promise.all(
                  res.map((tag: any) => {
                    console.log(translate(tag.name));
                    return translate(tag.name);
                  })
                ).then((res) => {
                  console.log(res);

                  // 5. 번역 완료시 상태 저장
                  dispatch(updateKeywords(res));
                  dispatch(
                    updateImage({
                      name: imageName,
                      url: `https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/${imageName}`,
                      type: imageType,
                    })
                  );

                  if (receiver) {
                    setStep(2);
                  } else {
                    setStep(3);
                  }
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
    }, imageExtension);
  }, [
    cropper,
    dispatch,
    imageExtension,
    imageName,
    imageType,
    receiver,
    setStep,
  ]);

  useEffect(() => {
    if (cropData) {
      handleUpload(); // getCropDate => handleUpload
    }
  }, [cropData, handleUpload]);

  const imageTypeOptions: {
    value: "mini" | "square" | "wide";
    ratio: number;
  }[] = [
    { value: "mini", ratio: 42 / 62 },
    { value: "square", ratio: 1 / 1 },
    { value: "wide", ratio: 99 / 62 },
  ];

  return (
    <>
      {keywordsReady ? (
        <Loading keywordsReady={keywordsReady} />
      ) : (
        <>
          <Box sx={{ margin: "10px", overflow: "hidden" }}>
            <Stack direction="column">
              {receiver ? (
                <p style={{ margin: "10px" }}>{receiver}에게 사연보내기</p>
              ) : (
                <p style={{ margin: "10px" }}>랜덤 사연보내기</p>
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
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChange}
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
                  backgroundColor: imageReady ? "rgba(0, 0, 0, 50%)" : "white",
                  borderRadius: "20px",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
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
                  {imageName ? (
                    <p>업로드 중</p>
                  ) : (
                    <>
                      <Camera />
                      <p>사진 업로드</p>
                    </>
                  )}
                </Box>
                <Cropper
                  style={{ maxHeight: "300px" }}
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
            </Stack>

            <Stack
              sx={{ margin: "20px auto" }}
              direction="row"
              justifyContent="center"
              spacing={2}
            >
              {imageTypeOptions.map((imageTypeOption) => (
                <StyledButton
                  variant="contained"
                  disableElevation={true}
                  onClick={() => {
                    cropper.setAspectRatio(imageTypeOption.ratio);
                    setImageType(imageTypeOption.value);
                  }}
                  key={imageTypeOption.value}
                >
                  {imageTypeOption.value}
                </StyledButton>
              ))}
            </Stack>
          </Box>

          <Box>
            <Button
              onClick={getCropData}
              disabled={!imageReady}
              variant="contained"
              size="large"
              disableElevation={true}
              sx={{
                color: "white",
                fontFamily: "S-CoreDream-4Regular",
                margin: "10px 0",
                width: "300px",
                borderRadius: 31.5,
              }}
            >
              다음
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default SelectImage;
