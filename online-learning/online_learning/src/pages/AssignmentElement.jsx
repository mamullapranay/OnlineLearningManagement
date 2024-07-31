import React, { useState, useContext, useEffect } from "react";
import ReactFileReader from "react-file-reader";
import axios from "axios";
import { Context } from "../context/Context";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import styles from "../styles/Calendar.module.css";
import Sample from "../PdfView/Sample";

//assignment element starts
function AssignmentElement(props) {
  const { user } = useContext(Context);

  const [file, setFile] = useState();
  const [issue, setIssue] = useState(new Date(props.issueDate));
  const [deadline, setDeadline] = useState(new Date(props.deadline));
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [subModal, setSubModal] = useState(false);
  const [subArray, setSubArray] = useState([]);
  const [viewFile, setViewFile] = useState();
  const [editModal, setEditModal] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDeadline, setNewDeadline] = useState(props.deadline);

  useEffect(() => {
    for (let i = 0; i < props.sub.length; i++) {
      if (props.sub[i].student == user._id) {
        setFile(props.sub[i].file);
        setSubmitted(true);
        return;
      }
    }
  }, [props.sub]);

  useEffect(async () => {
    let Subarr = [];
    for (let i = 0; i < props.sub.length; i++) {
      const res = await axios.get("/auth/" + props.sub[i].student);
      Subarr.push({
        stuName: res.data.name,
        stuEmail: res.data.email,
        stuId: props.sub[i].student,
        stuFile: props.sub[i].file,
      });
    }
    setSubArray(Subarr);
  }, [props.assignId]);

  const handleFiles = async (files) => {
    const response = await axios.put(
      "/assignment/submission/" + props.assignId,
      {
        student: user._id,
        file: files.base64,
      }
    );
    props.update(response.data);
  };

  const ViewSubmissions = () => {
    setSubModal(true);
  };

  const openPDF = (event) => {
    setViewFile(event.target.value);
    setOpen(true);
  };

  const handleEdit = async () => {
    const updatedAssignment = {
      title: newTitle,
      deadline: newDeadline,
    };
    const response = await axios.put(
      "/assignment/" + props.assignId,
      updatedAssignment
    );
    props.update(response.data);
    setEditModal(false);
  };

  const handleDelete = async () => {
    await axios.delete("/assignment/" + props.assignId);
    props.update();
  };

  return (
    <div
      style={{
        backgroundColor: "slategrey",
        padding: "25px 25px",
        margin: "20px 50px",
      }}
    >
      <div>
        <h5>{props.title}</h5>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "10px" }}>Assignment : </p>
            <button value={props.link} onClick={openPDF} style={{ padding: "5px" }}>
              View PDF
            </button>
          </div>
          <p>Issue Date : {issue.toString()}</p>
          <p>Deadline : {deadline.toString()}</p>
        </div>
        <div
          style={{
            width: "150px",
            textAlign: "center",
            backgroundColor: "white",
            padding: "5px",
            float: "right",
          }}
        >
          {user.role == "student" && (
            <>
              {!submitted && (
                <ReactFileReader
                  fileTypes={[".pdf"]}
                  base64={true}
                  handleFiles={handleFiles}
                >
                  <button className="btn">Upload</button>
                </ReactFileReader>
              )}

              {submitted && (
                <Button variant="outlined" value={file} onClick={openPDF}>
                  View submission
                </Button>
              )}
            </>
          )}
          {user.role == "teacher" && (
            <>
              <Button onClick={() => setEditModal(true)}>Edit</Button>
              <Button onClick={handleDelete}>Delete</Button>
              <button className={styles.btnn} onClick={ViewSubmissions}>
                View Submissions
              </button>
            </>
          )}
        </div>

        {/* Edit dialog box */}
        <Dialog open={editModal} onClose={() => setEditModal(false)}>
          <DialogTitle>Edit Assignment</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="End Date And Time"
                value={newDeadline}
                onChange={(newValue) => {
                  setNewDeadline(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button onClick={handleEdit} variant="contained" color="primary">
              Save
            </Button>
          </DialogContent>
        </Dialog>

        {/* Submissions dialog box */}
        <Dialog
          fullScreen
          open={subModal}
          onClose={() => {
            setSubModal(false);
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setSubModal(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Assignment: {props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {subArray.map((event) => {
              return (
                <div key={event.stuId}>
                  <ListItem>
                    <ListItemText
                      primary={event.stuName}
                      secondary={event.stuEmail}
                    />
                    <Button
                      variant="outlined"
                      value={event.stuFile}
                      onClick={openPDF}
                    >
                      View Pdf
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </Dialog>

        {/* Pdf dialog box */}
        <Dialog
          PaperProps={{
            style: {
              overflow: "visible",
            },
          }}
          onClose={() => {
            setOpen(false);
          }}
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div>
              <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Sample file={viewFile} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AssignmentElement;
