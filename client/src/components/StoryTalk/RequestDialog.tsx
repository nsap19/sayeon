import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  List,
  ListItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AlertType {
  requestType: string;
  title: string;
  content: string;
}

const initialState = {
  requestType: "",
  title: "",
  content: "",
};

const RequestDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  otherUserId: string | undefined;
}> = ({ open, onClose, otherUserId }) => {
  const [alert, setAlert] = useState<AlertType>();
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setAlert(initialState);
    }, 100);
  };

  const navigate = useNavigate();
  const handleClick = (requestType: string) => {
    switch (requestType) {
      case "BLOCK":
        setAlert({
          requestType,
          title: "차단",
          content: "차단한 사용자와는 더이상 대화하실 수 없습니다.",
        });
        break;
      case "REPORT":
        setAlert({
          requestType,
          title: "신고",
          content: "신고한 사용자와는 더이상 대화하실 수 없습니다.",
        });
        break;
      case "DELETE":
        setAlert({
          requestType,
          title: "삭제",
          content: "사용자와 교환한 모든 사연이 삭제됩니다.",
        });
        break;
    }
  };

  const request = (requestType: string) => {
    axios
      .post(
        "request",
        { requestType: requestType, requestedId: otherUserId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        handleClose();
        window.location.reload();
        navigate("/story-talk", {
          state: { openSnackbar: true },
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: { borderRadius: 20, width: "300px" },
      }}
    >
      {alert?.title ? (
        <>
          <DialogTitle
            sx={{ fontSize: "18px", fontFamily: "S-CoreDream-4Regular" }}
          >
            정말 {alert.title}하시겠습니까?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ fontSize: "14px", fontFamily: "S-CoreDream-4Regular" }}
            >
              {alert.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontFamily: "S-CoreDream-4Regular" }}
              onClick={() => {
                setAlert(initialState);
              }}
            >
              취소
            </Button>
            <Button
              sx={{ fontFamily: "S-CoreDream-4Regular" }}
              onClick={() => {
                request(alert.requestType);
              }}
              autoFocus
            >
              {alert.title}
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <List sx={{ width: "100%" }}>
            {/* <ListItem
              sx={{ padding: "20px " }}
              button
              onClick={() => handleClick("BLOCK")}
            >
              사용자 차단
            </ListItem>
            <Divider /> */}
            <ListItem
              sx={{ padding: "20px " }}
              button
              onClick={() => handleClick("REPORT")}
            >
              사용자 신고
            </ListItem>
            <Divider />
            <ListItem
              sx={{ padding: "20px " }}
              button
              onClick={() => handleClick("DELETE")}
            >
              사연 대화 삭제
            </ListItem>
          </List>
        </>
      )}
    </Dialog>
  );
};

export default RequestDialog;
