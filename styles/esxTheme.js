import { createMuiTheme } from "@material-ui/core/styles"

const SPACING_BASE = 8
const spacingPx = (factor) => (`${SPACING_BASE * factor}px`)

const COLORS = {
  common: {
    black: "#090909",
    white: "#F0f0f0"
  },
  primary: {
    main: '#0099ff',
    light: '#5fb8ff', // desaturaed logo blue per Material recommendations for dark mode
  },
  secondary: {
    main: "#fac54c",  // logo yellow
  },
}

const PAPER_SHADES = [
  COLORS.common.black,  // zeroth el, so paper elevations match
  '#222',
  '#333',
  '#3f3f3f',
  '#444',
  '#4f4f4f',
  '#555',
  '#5f5f5f',
  '#666',
  '#6f6f6f',
]

export default createMuiTheme({

  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  },

  spacing: spacingPx,

  palette: {
    type: "dark",
    ...COLORS,
    /*
    common: {
      black: "#090909",
      white: "#F0f0f0"
    },
    primary: {
      main: '#0099ff',
      light: '#5fb8ff', // desaturaed logo blue per Material recommendations for dark mode
    },
    secondary: {
      main: "#fac54c",  // logo yellow
    },
    */
    text: {
      primary: "rgba(255, 255, 255, 0.95)",   // "white" (from Jeff's spec)
      secondary: "rgba(255, 255, 255, 0.65)",
      disabled: "rgba(255, 255, 255, 0.40)",
      hint: "#47caa9", // teal as per spec
    },
    divider: "rgba(255, 255, 255, 0.20)",
    background: {
      default: PAPER_SHADES[0], 
      paper: PAPER_SHADES[1]
    },
  },
  typography: {
    fontFamily: "‘BWHaasGroteskTF-55Roman-Web, sans-serif’, sans-serif",
    useNextVariants: true
  },

  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiInputLabel: {
        // display labels above the control by default
        // (no animation behavior)
      shrink: true
    }
  },

  overrides: {

    MuiInputLabel: {
      formControl: {
        position: 'static'
      },
    },

    MuiFormLabel: {
      root: {
        fontSize: '0.8rem', // to somewhat match the MuiInputLabel-shrink labels  
        lineHeight: '1rem',
        '&.MuiInputLabel-shrink': {
          fontSize: '1.1rem',
          lineHeight: '1.3rem',
        },
        '&.Mui-focused': {
          color: 'inherit'  
        },
      },
    },

    MuiInput: {
      formControl: {
        marginTop: '0 !important',
      },
      input: {
        padding: '4px 6px'
      }
    },

    MuiSelect: {
      select: {
        padding: '4px 6px'
      }
    },

    MuiFormControl: {
      root: {
        display: 'flex', // not 'inline-flex'
        '& legend': {
          marginBottom: '3px'
        }
      },
    },

    MuiFormControlLabel: {
      root: {
        marginLeft: 0,
        marginRight: 0,
      },
      label: {
        fontSize: '0.8rem'
      }
    },

    MuiRadio: {
      root: {
        padding: '2px',
        paddingRight: '4px',
      }
    },

    MuiPaper: {
      root: {
        //padding: spacingPx(4)
      },
      elevation1: {
        backgroundColor:  PAPER_SHADES[1],
        '& MuiInput': {
          root: {
            backgroundColor: PAPER_SHADES[2]            
          }
        }
      },
      elevation2: {
        backgroundColor:  PAPER_SHADES[2],
        '& MuiInput': {
          root: {
            backgroundColor: PAPER_SHADES[3]            
          }
        }
      },
      elevation3: {
        backgroundColor:  PAPER_SHADES[3],
        '& MuiInput': {
          root: {
            backgroundColor: PAPER_SHADES[4]            
          }
        }
      },
      elevation4: {
        backgroundColor:  PAPER_SHADES[4],
        '& MuiInput': {
          root: {
            backgroundColor: PAPER_SHADES[5]            
          }
        }
      },
      elevation5: {
        backgroundColor:  PAPER_SHADES[5],
        '& MuiInput': {
          root: {
            backgroundColor: PAPER_SHADES[6]            
          }
        }
      },
      elevation6: {
        backgroundColor:  PAPER_SHADES[6],
        '& MuiInput': {
          root: {
            backgroundColor: PAPER_SHADES[7]            
          }
        }
      }
    }
  },

  defaultSVGColor: "#F0f0f0",
})

