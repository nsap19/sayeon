import React, { useState, useEffect } from "react";
import { Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Cropper from "react-cropper";
import { dataUrlToFile } from "./utils";
import "cropperjs/dist/cropper.css";
import "./SelectImage.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCreateStory } from "../../store/createStory";
import { ReactComponent as Camera } from "../../assets/icon/camera.svg";
import { updateImage } from "../../store/createStory";

const Input = styled("input")({
  display: "none",
});

const StyledButton = styled(Button)({
  color: "white",
  fontFamily: "S-CoreDream-4Regular",
});

const CropImage: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();
  const [imageSelected, setImageSelected] = useState(false);
  const [imageType, setImageType] = useState<"mini" | "square" | "wide">(
    "square"
  );
  const [imageExtension, setImageExtension] = useState<string>("");

  const onChange = (e: any) => {
    e.preventDefault();

    setImageSelected(true);
    console.log(e.target.files[0].type);
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
      setCropData(cropper.getCroppedCanvas().toDataURL(imageExtension));
    }
  };

  useEffect(() => {
    if (cropData) {
      handleUpload(cropData); // getCropDate => handleUpload
    }
  }, [cropData]);

  const { receiver } = useAppSelector(selectCreateStory);
  const dispatch = useAppDispatch();

  const handleUpload = async (url: string) => {
    const a = document.createElement("a");
    a.download = "image.jpg";

    const file = dataUrlToFile(url, "output.png");
    console.log("file object", file);

    cropper.getCroppedCanvas().toBlob(
      (blob: any) => {
        //HTMLCanvasElement를 return 받아서 blob파일로 변환해준다
        const formData = new FormData();

        formData.append("croppedImage", blob /*, 'example.png' , 0.7*/);
        formData.forEach((file) => console.log("blob object", file));
        //새로운 formData를 생성해서 앞에서 변경해준 blob파일을 삽입한다.(이름 지정 가능, 맨뒤 매개변수는 화질 설정)
      } /*, 'image/png' */
    ); //서버에 저장 형식 사용 가능

    // a.href = url; // base64 URL
    // const newUrl = window.URL.createObjectURL(file);
    // a.href = newUrl;
    // a.click();
    // window.URL.revokeObjectURL(newUrl);

    dispatch(updateImage({ url: url, type: imageType }));
    if (receiver) {
      setStep(2);
    } else {
      setStep(3);
    }
  };

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
            style={{ minWidth: "300px", margin: "auto", textAlign: "right" }}
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
              backgroundColor: imageSelected ? "rgba(0, 0, 0, 50%)" : "white",
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
                display: imageSelected ? "none" : "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <Camera />
              <p>사진 업로드</p>
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

      {/* 디버깅용 */}
      {/* <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
            {cropData && (
              <button
                style={{ float: "right" }}
                onClick={() => handleUpload(cropData)}
              >
                Upload
              </button>
            )}
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>
      </div> */}

      <Box>
        <Button
          onClick={getCropData}
          disabled={!imageSelected}
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
  );
};

export default CropImage;
