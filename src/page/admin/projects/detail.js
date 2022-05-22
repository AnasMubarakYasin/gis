import LayoutAdmin from "src/layout/admin";
import LayoutPage from "src/layout/page";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { projectsActions } from "src/store/projects";

import { Formik, Form, Field } from "formik";
import { TextField as FormikTextField } from "formik-mui";

// import { useTheme } from '@mui/material/styles'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// import ButtonGroup from '@mui/material/ButtonGroup'
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const tasks = [
  {
    id: 1,
    note: "Task 1",
  },
  {
    id: 2,
    note: "Task 2",
  },
];

function PageProjectsDetail(props) {
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.value);
  const project = projects.find((project) => project.name === name);
  const [image, setImage] = useState(project?.image ?? "");
  const [isAddTask, setIsAddTask] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    id: "",
    message: <div>message</div>,
  });
  const handleImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleIsAddTask = (event) => {
    setIsAddTask(!isAddTask);
  };
  const handleSnackClose = (event, reason) => {
    setSnack((prev) => ({ ...prev, open: false }));
  };
  const handleCreateProject = (data) => {
    dispatch(projectsActions.add({ data }));
    // dispatch(projectsActions.set({ data: projects }));
    console.log(data);
    console.log(projects);
    navigate(`./../${data.name}`, { replace: true });
  };
  const handleUpdateProject = (data) => {
    dispatch(projectsActions.put({ id: project.id, data }));
    // dispatch(projectsActions.set({ data: projects }));
    console.log(data);
    console.log(projects);
    navigate(`./../${data.name}`, { replace: true });
  };

  return (
    <LayoutPage>
      <LayoutAdmin pageTitle={name}>
        <Box
          display="grid"
          padding={{
            mobile: "16px",
            tablet: "32px",
          }}
          gap={{
            mobile: "16px",
            tablet: "32px",
          }}
        >
          <Paper variant="outlined">
            <Formik
              initialValues={
                project
                  ? project
                  : {
                      status: "",
                      period: null,
                    }
              }
              validate={(values) => {
                const errors = {};
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const data = Object.assign({}, values, {
                  image,
                  period: values.period.toString(),
                });
                let message;
                try {
                  if (project) {
                    handleUpdateProject(data);
                    message = <Alert severity="success">Success Update</Alert>;
                  } else {
                    handleCreateProject(data);
                    message = <Alert severity="success">Success Create</Alert>;
                  }
                } catch (error) {
                  message = <Alert severity="error">Failed Operation</Alert>;
                  console.log(error);
                }
                setSnack((prev) => ({
                  ...prev,
                  open: true,
                  message,
                }));
                setSubmitting(false);
              }}
            >
              {({
                isSubmitting,
                values,
                submitForm,
                handleBlur,
                handleChange,
                setFieldValue,
              }) => (
                <Form autoComplete="off">
                  <Box
                    display="grid"
                    padding={{
                      mobile: "16px",
                      tablet: "32px",
                    }}
                    gap={{
                      mobile: "16px",
                      tablet: "32px",
                    }}
                  >
                    <Box display="grid" sx={{ placeItems: "center" }}>
                      <Box
                        component="label"
                        htmlFor="input-image"
                        sx={{
                          width: {
                            mobile: "100%",
                            tablet: "320px",
                          },
                        }}
                      >
                        <Input
                          accept="image/*"
                          id="input-image"
                          type="file"
                          sx={{ display: "none" }}
                          onInput={handleImage}
                          disabled={isSubmitting}
                        />
                        <Button
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          disabled={isSubmitting}
                          sx={{ width: "100%" }}
                        >
                          <Avatar
                            variant="rounded"
                            alt={name}
                            src={image}
                            sx={{
                              width: "100%",
                              height: "auto",
                              aspectRatio: "4 / 3",
                              objectFit: "contain",
                              objectPosition: "center",
                            }}
                          >
                            <PhotoCameraIcon
                              sx={{ width: "44px", height: "44px" }}
                            />
                          </Avatar>
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns={{
                        mobile: "1fr",
                        tablet: "1fr 1fr",
                      }}
                      gridTemplateRows="auto"
                      gap={{
                        mobile: "16px",
                        tablet: "32px",
                      }}
                    >
                      <Field
                        component={FormikTextField}
                        variant="outlined"
                        name="name"
                        type="text"
                        label="Name"
                        required
                      />
                      <Field
                        component={FormikTextField}
                        variant="outlined"
                        name="companyName"
                        type="text"
                        label="Company Name"
                        required
                      />
                      <Field
                        component={FormikTextField}
                        variant="outlined"
                        name="description"
                        type="text"
                        label="Description"
                        multiline
                        minRows={3}
                        required
                      />
                      <Field
                        component={FormikTextField}
                        variant="outlined"
                        name="obstacles"
                        type="text"
                        label="Obstacles"
                        multiline
                        minRows={3}
                        required
                      />
                      <FormControl fullWidth>
                        <InputLabel id="status" required>
                          Status
                        </InputLabel>
                        <Select
                          labelId="status"
                          id="status"
                          name="status"
                          label="Status"
                          value={values.status}
                          onChange={(event) =>
                            setFieldValue("status", event.target.value)
                          }
                          disabled={isSubmitting}
                          required
                        >
                          <MenuItem value="Pembangunan">Pembangunan</MenuItem>
                          <MenuItem value="Perawatan">Perawatan</MenuItem>
                        </Select>
                      </FormControl>
                      <Field
                        component={FormikTextField}
                        variant="outlined"
                        name="progress"
                        type="number"
                        label="Work Progress"
                        required
                        readOnly
                      />
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Work Period"
                          value={values.period}
                          onChange={(newValue) =>
                            setFieldValue("period", newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="period"
                              required
                              disabled={isSubmitting}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Box
                      display="grid"
                      paddingX={{
                        mobile: "16px",
                        tablet: "30%",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        disableElevation
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
          <Box display="grid" gap="16px">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">Tasks</Typography>
              <ButtonGroup
                variant="contained"
                disableElevation
                aria-label="outlined primary button group"
              >
                <Tooltip title="Create Task">
                  <Button
                    startIcon={<AddIcon />}
                    sx={{
                      display: "grid",
                      placeContent: "center",
                      placeItems: "center",
                      minWidth: "auto",
                      padding: "12px",
                      "& .css-1d6wzja-MuiButton-startIcon": {
                        margin: "0",
                      },
                    }}
                    onClick={handleIsAddTask}
                  ></Button>
                </Tooltip>
                <Tooltip title="More Option">
                  <Button
                    startIcon={<MoreVertIcon />}
                    sx={{
                      display: "grid",
                      placeContent: "center",
                      placeItems: "center",
                      minWidth: "auto",
                      padding: "12px",
                      "& .css-1d6wzja-MuiButton-startIcon": {
                        margin: "0",
                      },
                    }}
                  ></Button>
                </Tooltip>
              </ButtonGroup>
            </Box>
            <Box display="flex" gap="8px" alignItems="center">
              <Typography variant="subtitle2">40%</Typography>
              <LinearProgress
                variant="determinate"
                value={40}
                sx={{ width: "100%", height: "8px", borderRadius: "4px" }}
              ></LinearProgress>
            </Box>
            {isAddTask && (
              <Paper variant="outlined">
                <Box display="grid" gap="16px" padding="16px">
                  <TextField label="Note" multiline minRows={1}></TextField>
                  <Box display="flex" gap="16px">
                    <Button fullWidth variant="contained" color="primary">
                      Add
                    </Button>
                    <Button fullWidth variant="outlined" color="error">
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}
            {tasks.map((task) => (
              <Paper key={task.id} variant="outlined" sx={{ padding: "16px" }}>
                <Box display="flex" gap="16px" alignItems="center">
                  <Typography variant="subtitle1" sx={{ flexGrow: "1" }}>
                    {task.note}
                  </Typography>
                  <Tooltip title="More Option">
                    <Button
                      startIcon={<MoreVertIcon />}
                      sx={{
                        display: "grid",
                        placeContent: "center",
                        placeItems: "center",
                        minWidth: "auto",
                        padding: "12px",
                        "& .css-1d6wzja-MuiButton-startIcon": {
                          margin: "0",
                        },
                      }}
                    ></Button>
                  </Tooltip>
                </Box>
                <Box></Box>
              </Paper>
            ))}
          </Box>
          <Box display="grid" gap="16px">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">Attandance</Typography>
              <ButtonGroup
                variant="contained"
                disableElevation
                aria-label="outlined primary button group"
              >
                <Tooltip title="Create Task">
                  <Button
                    startIcon={<AddIcon />}
                    sx={{
                      display: "grid",
                      placeContent: "center",
                      placeItems: "center",
                      minWidth: "auto",
                      padding: "12px",
                      "& .css-1d6wzja-MuiButton-startIcon": {
                        margin: "0",
                      },
                    }}
                    onClick={handleIsAddTask}
                  ></Button>
                </Tooltip>
                <Tooltip title="More Option">
                  <Button
                    startIcon={<MoreVertIcon />}
                    sx={{
                      display: "grid",
                      placeContent: "center",
                      placeItems: "center",
                      minWidth: "auto",
                      padding: "12px",
                      "& .css-1d6wzja-MuiButton-startIcon": {
                        margin: "0",
                      },
                    }}
                  ></Button>
                </Tooltip>
              </ButtonGroup>
            </Box>
            <Box display="flex" gap="8px" alignItems="center">
              <Typography variant="subtitle2">40%</Typography>
              <LinearProgress
                variant="determinate"
                value={40}
                sx={{ width: "100%", height: "8px", borderRadius: "4px" }}
              ></LinearProgress>
            </Box>
            {tasks.map((task) => (
              <Paper key={task.id} variant="outlined" sx={{ padding: "16px" }}>
                <Box display="flex" gap="16px" alignItems="center">
                  <Typography variant="subtitle1" sx={{ flexGrow: "1" }}>
                    {task.note}
                  </Typography>
                  <Tooltip title="More Option">
                    <Button
                      startIcon={<MoreVertIcon />}
                      sx={{
                        display: "grid",
                        placeContent: "center",
                        placeItems: "center",
                        minWidth: "auto",
                        padding: "12px",
                        "& .css-1d6wzja-MuiButton-startIcon": {
                          margin: "0",
                        },
                      }}
                    ></Button>
                  </Tooltip>
                </Box>
                <Box></Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </LayoutAdmin>
      <Snackbar
        key={snack.id}
        open={snack.open}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {snack.message}
      </Snackbar>
    </LayoutPage>
  );
}

export default PageProjectsDetail;
