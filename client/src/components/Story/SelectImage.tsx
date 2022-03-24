import React, { useState, useEffect } from "react";
import Cropper from "react-cropper";
import { dataUrlToFile, dataUrlToFileUsingFetch } from "./utils";
import "cropperjs/dist/cropper.css";
import "./SelectImage.css";
import { Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactComponent as Camera } from "../../assets/icon/camera.svg";
import { selectCreateStory } from "../../store/createStory";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateImage } from "../../store/createStory";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Input = styled("input")({
  display: "none",
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
      console.log(cropData);
      handleUpload(cropData); // getCropDate => handleUpload
    }
  }, [cropData]);

  const { receiver } = useAppSelector(selectCreateStory);
  const dispatch = useAppDispatch();

  const handleUpload = async (url: string) => {
    // 이후 서버 업로드 작성

    dispatch(updateImage({ url: url, type: imageType }));
    if (receiver) {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  return (
    <>
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {receiver ? <p>{receiver}에게 사연보내기</p> : <p>랜덤 사연보내기</p>}

          {/* <input type="file" onChange={onChange} /> */}
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={onChange}
            />
            <Button variant="contained" component="span">
              사진 고르기
            </Button>
          </label>
          <div
            // 최소 window 크기 320px 기준 = 양 옆 마진 10px + 최소 사진 너비 300px
            style={{
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
          </div>
        </div>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              cropper.setAspectRatio(42 / 62);
              setImageType("mini");
            }}
          >
            mini
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              cropper.setAspectRatio(1 / 1);
              setImageType("square");
            }}
          >
            square
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              cropper.setAspectRatio(99 / 62);
              setImageType("wide");
            }}
          >
            wide
          </Button>
        </Box>
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
        {/* <button onClick={getCropData}>get Crop data</button> */}
        <Button
          onClick={getCropData}
          disabled={!imageSelected}
          variant="contained"
        >
          다음
        </Button>
      </Box>
    </>
  );
};

export default CropImage;
