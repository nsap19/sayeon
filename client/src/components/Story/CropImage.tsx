import React, { useState, useEffect } from "react";
import Cropper from "react-cropper";
import { dataUrlToFile, dataUrlToFileUsingFetch } from "./utils";
import "cropperjs/dist/cropper.css";
import "./CropImage.css";
import { Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactComponent as Camera } from "../../assets/icon/camera.svg";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Input = styled("input")({
  display: "none",
});

const CropImage: React.FC<{
  receiver: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ receiver, setStep }) => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();
  const [imageSelected, setImageSelected] = useState(false);

  const onChange = (e: any) => {
    e.preventDefault();

    setImageSelected(true);

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
    console.log("???");
    if (typeof cropper !== "undefined") {
      console.log("!!");
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  useEffect(() => {
    // console.log(cropData);
    if (cropData) {
      handleUpload(cropData);
    }
  }, [cropData]);

  const handleUpload = async (url: string) => {
    /**
     * You can also use this async method in place of dataUrlToFile(url) method.
     * const file = await dataUrlToFileUsingFetch(url, 'output.png', 'image/png')
     */

    console.log("이게뭘까", url);
    localStorage.setItem("imgUrl", url);
    const file = dataUrlToFile(url, "output.png");
    console.log(file);
    console.log(typeof file);

    console.log(
      `We have File "${file.name}", now we can upload it wherever we want!`
    );

    /**
     * Now that we have a File object, we can upload it to S3 (or anywhere else you want)
     *
     * const params = {
     *   Bucket: "BUCKET_NAME"
     *   Key: "randomId" + .png // You can use nanoid here if you want. This becomes the filename (or key) in S3.
     *   Body: file
     * }
     *
     * // Handle errors with try-catch block...
     * const data = await s3.upload(params)
     * console.log(`File uploaded successfully. ${data.Location}`);
     */
    function getBase64Image(img: any) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    var imgurl = cropper.getCroppedCanvas().toDataURL();
    var img = document.createElement("img");
    img.src = imgurl;
    console.log(getBase64Image(img));
    localStorage.setItem("imgData", getBase64Image(img));

    cropper.getCroppedCanvas().toBlob(function (blob: any) {
      var formData = new FormData();
      formData.append("croppedImage", blob);
      console.log(formData);
    });
    setStep(2);
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
            }}
          >
            mini
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              cropper.setAspectRatio(1 / 1);
            }}
          >
            square
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              cropper.setAspectRatio(99 / 62);
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
