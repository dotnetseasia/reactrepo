import Button from "@mui/material/Button";
import * as Icons from "../../assests/icons/icons";
import { toast } from "material-react-toastify";
import theme from "../../theme/theme";
import React from "react";
// startIcon={<Icons.Upload />}
const styles = {
  InputStyle: {
    maxWidth: "100%",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    borderStyle: "dashed",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function FileUpload(props: { selectFile?: any; index?: any }) {
  return (
    <Button
      variant="outlined"
      sx={styles.InputStyle}
      component="label"
      startIcon={<Icons.Upload />}
    >
      Upload
      <input
        onChange={(event) => {
          var files = event.target.files ?? new FileList();
          let extension =
            files.length > 0
              ? files[0]?.name
                  .split(".")
                  [files[0].name.split(".").length - 1].toLowerCase()
              : "";
          if (
            ![
              "jpg",
              "jpeg",
              "pdf",
              "jfif",
              "png",
              "xlsm",
              "xlsx",
              "xls",
              "docx",
              "txt",
              "doc",
              "docm",
              "pptx",
            ].includes(extension)
          ) {
            // alert("Please select accurate format");
            toast.warning("Please Select excel,doc,image or pdf File.");
            event.target.value = "";
          } else {
            props.selectFile(files, props.index);
          }
        }}
        hidden
        accept=".doc,.docx,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
             text/plain, application/pdf, image/*"
        
        type="file"
      />
    </Button>
  );
}
