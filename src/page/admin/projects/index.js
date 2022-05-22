import LayoutAdmin from "src/layout/admin";
import LayoutPage from "src/layout/page";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { projectsActions } from "src/store/projects";

function PageProjects(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectMode, setSelectMode] = useState(false);
  const handleNavigate = (name) => () => {
    navigate(name);
  };
  const handleCreateProject = () => {
    navigate("Project Name");
  };
  const handleSelect = () => {
    dispatch(projectsActions.reselect());
    setSelectMode(!selectMode);
  };
  const handleSelection = (index) => (event) => {
    if (event.target.checked) {
      dispatch(projectsActions.select(index));
    } else {
      dispatch(projectsActions.unselect(index));
    }
  };
  const projects = useSelector((state) => state.projects.value);

  return (
    <LayoutPage>
      <LayoutAdmin pageTitle="Projects">
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
          <Box display="flex" justifyContent="space-between">
            {/* <Typography variant="h4">Tasks</Typography> */}
            <ButtonGroup
              variant="contained"
              disableElevation
              aria-label="outlined primary button group"
            >
              <Tooltip title="Create Project">
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
                  onClick={handleCreateProject}
                ></Button>
              </Tooltip>
              <Tooltip title="Selection Mode">
                <Button
                  startIcon={<CheckIcon />}
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
                  onClick={handleSelect}
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
          <Box
            display="grid"
            gridTemplateColumns={{
              mobile: "1fr",
              tablet: "1fr 1fr",
              laptop: "1fr 1fr 1fr",
            }}
            gridTemplateRows="auto"
            gap={{
              mobile: "16px",
              tablet: "32px",
            }}
          >
            {projects.map((project, index) => (
              <Card variant="outlined" key={project.id}>
                <CardActionArea onClick={handleNavigate(project.name)}>
                  {selectMode && (
                    <Checkbox
                      sx={{ position: "absolute", right: 0, top: 0 }}
                      onChange={handleSelection(index)}
                    />
                  )}
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    image={project.image}
                    alt={project.name}
                  />
                  <CardContent>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {project.companyName}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        height: "4rem",
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                      gutterBottom
                    >
                      {project.name}
                    </Typography>
                    <Box display="grid" gap="8px">
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                      ></LinearProgress>
                      <Typography variant="body2">
                        Progress: {project.progress}%
                      </Typography>
                      <Typography variant="body2">
                        Status: {project.status}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
              // <Paper variant="outlined" key={item.id}>
              //   <Box
              //     display="grid"
              //     gap="16px"
              //     paddingBottom={{
              //       mobile: "16px",
              //     }}
              //   >
              //     <Box display="flex" gap="16px">
              //       <Avatar
              //         variant="rounded"
              //         alt={item.name}
              //         src={item.image}
              //         sx={{
              //           width: "100%",
              //           height: "auto",
              //           aspectRatio: "4 / 3",
              //           objectFit: "cover",
              //           objectPosition: "center",
              //         }}
              //       ></Avatar>
              //     </Box>
              //     <Box
              //       display="grid"
              //       paddingX={{
              //         mobile: "16px",
              //       }}
              //     >
              //       <Typography
              //         variant="overline"
              //         sx={{
              //           textAlign: "left",
              //           overflow: "hidden",
              //           textOverflow: "ellipsis",
              //           display: "-webkit-box",
              //           WebkitLineClamp: "1",
              //           WebkitBoxOrient: "vertical",
              //         }}
              //       >
              //         {item.subtitle}
              //       </Typography>
              //       <Typography
              //         variant="h6"
              //         sx={{
              //           height: "4rem",
              //           textAlign: "left",
              //           overflow: "hidden",
              //           textOverflow: "ellipsis",
              //           display: "-webkit-box",
              //           WebkitLineClamp: "2",
              //           WebkitBoxOrient: "vertical",
              //         }}
              //       >
              //         {item.title}
              //       </Typography>
              //     </Box>
              //     {/* <Box
              //       paddingX={{
              //         mobile: "16px",
              //       }}
              //       sx={{}}
              //     >
              //       <Typography
              //         variant="body1"
              //         sx={{
              //           textAlign: "justify",
              //           overflow: "hidden",
              //           textOverflow: "ellipsis",
              //           display: "-webkit-box",
              //           WebkitLineClamp: "3",
              //           WebkitBoxOrient: "vertical",
              //         }}
              //       >
              //         {item.description}
              //       </Typography>
              //     </Box> */}
              //     <Box
              //       display="grid"
              //       paddingX={{
              //         mobile: "16px",
              //       }}
              //       gap="8px"
              //     >
              //       <LinearProgress
              //         variant="determinate"
              //         value={item.progress}
              //       ></LinearProgress>
              //       <Typography variant="body2">
              //         Progress: {item.progress}%
              //       </Typography>
              //       <Typography variant="body2">
              //         Status: {item.status}
              //       </Typography>
              //     </Box>
              //   </Box>
              // </Paper>
            ))}
          </Box>
        </Box>
      </LayoutAdmin>
    </LayoutPage>
  );
}

export default PageProjects;
