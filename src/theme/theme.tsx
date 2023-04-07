// import { red } from '@mui/material/colors';
import { grey } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeMode } from '../assests/icons/icons';
import Button from '@mui/material/Button';

import {

  PaletteColorOptions,

} from '@mui/material/styles';

// A custom theme for this app

const primaryColor = '#232360';

const primaryMain = "#1DA7FF";
const primaryDark = "#232360";
const primaryLight = "#F0F9FF";


const successMain = "#2DD36F";
const successDark = "#1F944E";
const successLight = "#E7FFF0";

const warningMain = "#FFC409";
const warningDark = "#B38906";
const warningLight = "#FFF3CE";


const errorMain = "#EB445A";
const errorDark = "#A5303F";
const errorLight = "#FBDADE";



declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    selectSmall: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    approved: true;
    submited: true;
    hold: true;
    progress: true;
    review: true;
    new: true;
    todo: true;
  }

}

const defaultTheme = createTheme();
const theme = createTheme({
  typography: {
    //  fontFamily: 'GT Walsheim Pro, sans-serif',
    fontFamily: 'Hanken Grotesk, sans-serif',

    // fontSize: 12,
  },

  palette: {
    // mode: 'dark',
    background: {
      default: "#F5F5F5",
    },
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
      contrastText: '#fff'
    },
    secondary: {
      main: "#5F6388",
      dark: "#232360",
      light: "#B5B5B9",
      contrastText: '#fff'
    },
    success: {
      main: successMain,
      dark: successDark,
      light: successLight,
    },
    warning: {
      main: "#FFC409",
      dark: "#B38906",
      light: "#FFF3CE",
    },
    error: {
      main: errorMain,
      dark: errorDark,
      light: errorLight,



    },

  },
  shape: {
    borderRadius: 4,
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxShadow: 'none',
          textTransform: 'capitalize',
          '&:hover': {
            boxShadow: 'none',

          },
        },
        sizeMedium: {
          // Some CSS
          paddingLeft: '20px',
          paddingRight: '20px',
          height: '45px',
          fontWeight: 500,
          borderRadius: 5,
          fontSize: '1rem',
          textTransform: 'capitalize',
          whiteSpace: 'nowrap',


        },
      },
      variants: [
        {
          props: { variant: 'selectSmall', color: 'primary' },
          style: {
            padding: '4px 6px',
            minWidth: 'max-content',
            color: primaryMain,
            fontSize: '0.9rem',
            height: 30,
            '&:hover': {
              backgroundColor: primaryLight,
            }
          },
        },
        {
          props: { variant: 'selectSmall', color: 'secondary' },
          style: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'new', color: 'default' },
          style: {
            borderRadius: 5,
            backgroundColor: successLight,
            color: successMain,
            border: '1px solid',
            borderColor: successMain,
            fontWeight: 500,
            height: "25px",
            lineHeight: '25px',
            minWidth: "120px"
          }
        },
        {
          props: { variant: 'approved', color: 'default' },
          style: {
            borderRadius: 5,
            backgroundColor: successLight,
            color: successMain,
            border: '1px solid',
            borderColor: successMain,
            fontWeight: 500,
            height: "25px",
            lineHeight: '25px',
            minWidth: "120px"
          }
        },
        {
          props: { variant: 'submited', color: 'default' },
          style: {
            borderRadius: 5,
            backgroundColor: warningLight,
            color: warningMain,
            border: '1px solid',
            borderColor: warningMain,
            fontWeight: 500,
            height: "25px",
            lineHeight: '25px',
            minWidth: "120px"
          }
        },
        {
          props: { variant: 'hold', color: 'default' },
          style: {
            borderRadius: 5,
            backgroundColor: errorLight,
            color: errorMain,
            border: '1px solid',
            borderColor: errorMain,
            fontWeight: 500,
            height: "25px",
            lineHeight: '25px',
            minWidth: "120px"
          }
        },
        {
          props: { variant: 'progress', color: 'default' },
          style: {
            borderRadius: 5,
            backgroundColor: primaryLight,
            color: primaryMain,
            border: '1px solid',
            borderColor: primaryMain,
            fontWeight: 500,
            height: "25px",
            lineHeight: '25px',
            minWidth: "120px"

          }
        },
        {
          props: { variant: 'review', color: 'default' },
          style: {
            borderRadius: 5,
            backgroundColor: warningLight,
            color: warningMain,
            border: '1px solid',
            borderColor: warningMain,
            fontWeight: 500,
            height: "25px",
            lineHeight: '25px',
            minWidth: "120px"

          }
        },
        {
          props: { variant: 'todo', color: 'default' },
          style: {
            borderRadius: 5,
            backgroundColor: '#DDDDDD',
            color:'#757575',
            border: '1px solid',
            borderColor: '#757575',
            fontWeight: 500,
            height: "25px",
            lineHeight: '25px',
            minWidth: "120px"

          }
        }
      ]
    },

    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fff",
          color: "#000",
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: '0.75em',
          lineHeight: '0.75em',
          borderColor: '#EEEEEE'
        },
        input: {

          height: '0.75em',
          '&::placeholder': {
            opacity: 1,
            color: "#424242",
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {

        },
        notchedOutline: {
          borderColor: '#EEEEEE'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {

        root: {
          lineHeight: '0.75em',
          overflow: 'inherit'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: '0.75em',
          // fontSize: '0.75em'
        }

      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            color: primaryColor,
            fontWeight: 600,
          }
        },

      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontWeight: 500,
          fontSize: 16,

        },

      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiButtonBase-root ": {
            color: '#757575'
          }

        },

      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '& .MuiTypography-noWrap': {
            whiteSpace: "normal"
          }
        }
      }
      // defaultProps: {
      //   // The props to change the default for.
      //   noWrap: true
      // },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {

          '& .MuiFormControlLabel-label':
          {
            whiteSpace: "nowrap"
          }
        },

      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          padding: "0 4px",
          '& .MuiBreadcrumbs-li': {
            fontSize: 14
          },
          '& .MuiTypography-body1': {
            fontSize: 14
          }
        },

      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-asterisk': {
            fontSize: 19
          },

        },

      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          textTransform: "uppercase"
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableHead-root": {
            whiteSpace: "nowrap"
          }
        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap"
        }
      }
    }
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       fontWeight: 500,
    //       fontSize: '16px',
    //     }
    //   }
    // }

    // MuiAvatar:{
    //   styleOverrides: {
    //     root: {
    //       fontFamily:'sans-serif'    

    //     },

    //   }
    // }
  },

});

export default theme;