import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import * as Icons from "../../assests/icons/icons";
import IconButton from "@mui/material/IconButton";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import AppConstants from "../../config/AppConstants";
import { Button, Box } from "@mui/material";
import Typography from "@material-ui/core";
import theme from "../../theme/theme";
import { useEffect } from "react";
import { text } from "@fortawesome/fontawesome-svg-core";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  // border: "1px solid",
  borderColor: theme.palette.grey[200],
  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },

  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: "0",
  "& svg": {
    marginRight: "8px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 1, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "15px",
    paddingRight: "50px",
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up('sm')]: {
    //     width: '18ch',
    //     '&:focus': {
    //         width: '24ch',
    //     },
    // },
  },
}));

export default function CommentBox(props: {
  setcomment?: any;
  commentvalue?: any;
  validationmsg?: any;
  handleEditorQuillTag?: any;
}) {
  // useEffect(() => {
  //   onEditorChange("");
  // }, []);
  const delta = { ops: [{ insert: text }] };
  const onEditorChange = (event: any) => {
   // console.log(event, "event of onEditorChange Props");
    props.setcomment(event);
    checkFunction(event);
  };

  const checkFunction = (value: any) => {
    if (value === "<p><br></p>" || value === "") {
      props.setcomment("");
      props.validationmsg("");
    }
  };

  return (
    <>
      <Search>
        {/* <StyledInputBase fullWidth value={props.commentvalue} onChange={(e) => { props.setcomment(e.currentTarget.value) }}
                    placeholder="Post an update"
                    inputProps={{ 'aria-label': 'search' }}
                /> */}
        <ReactQuill
          modules={AppConstants.EditorSetting}
          theme="snow"
          value={props.commentvalue.replace(/^\s+|\s+$/gm, "")}
          onChange={onEditorChange}
        />
        <Box sx={{ color: theme.palette.error.main, fontSize: 16 }}>
          {props.validationmsg}{" "}
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Button
            sx={{
              mt: 0.5,
              ml: "auto",
              textAlign: "right",
            }}
            variant="contained"
            type="submit"
            className="small"
            endIcon={<SendIcon />}
          >
            Post an update
          </Button>
        </Box>
        {/* <IconButton  color='default' sx={{
                    position: 'absolute',                  
                    top: '3px',
                    right: '40px',
                }}><AttachFileIcon /></IconButton> */}
        {/* <IconButton type='submit' color='primary' sx={{
                    position: 'absolute',
                    top: '3px',
                    right: '4px',
                }}><SendIcon /></IconButton> */}
      </Search>
    </>
  );
}
function handleEditorQuillTag(): any {
  throw new Error("Function not implemented.");
}
