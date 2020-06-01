const { createMuiTheme } = require('@material-ui/core/styles') // must require not import, since this file is invoked by node directly

const SPACING_BASE = 8
const MAX_CONTAINER_WIDTH = 1200
const spacingPx = (factor) => (`${SPACING_BASE * factor}px`)

const COLORS = {
  common: {
    black: "#090909",
    white: "#F0f0f0"
  },
  primary: {
    main: '#fac54c',  // logo yellow,
    light: '#f6cc6c',
    dark: '#d5a435',
  },
  secondary: {
    main: '#0099ff',
    light: '#5fb8ff', // desaturaed logo blue per Material recommendations for dark mode
    dark: '#0077ff',
  },
}

const GREY_SHADES = [
  COLORS.common.black,  // zero'th element, so paper elevations match indices
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

const createPaperElevations = () => {
  const result = {}
    // start at index: 1, because of how Paper elevations work
  for(let i = 1; i < GREY_SHADES.length; i++) {
    result[`elevation${i}`] = {
      backgroundColor:  GREY_SHADES[i],
      '& MuiInput': {
        root: {
          backgroundColor: GREY_SHADES[ i + 1 ]
        }
      }
    }
  }
  return result
}


module.exports = createMuiTheme({

    // https://uxplanet.org/responsive-design-best-practices-c6d3f5fd163b
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 780,
      lg: 1080,
      xl: 1366
    }
  },
  
  spacing: spacingPx,

  palette: {
    type: "dark",
    ...COLORS,
    text: {
      primary: "rgba(255, 255, 255, 0.95)",   // "white" (from Jeff's spec)
      secondary: "rgba(255, 255, 255, 0.65)",
      disabled: "rgba(255, 255, 255, 0.40)",
      hint: "#47caa9", // teal as per spec
    },
    divider: "rgba(255, 255, 255, 0.20)",
    background: {
      default: GREY_SHADES[0], 
      paper: GREY_SHADES[1]
    },
  },
  typography: {
    fontFamily: "BWHaasGroteskTF-55Roman-Web, sans-serif",
    useNextVariants: true
  },

  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
    MuiInputLabel: {
        // display labels above the control by default
        // (no animation behavior)
      shrink: true
    }
  },

  ext: {
    spacing: SPACING_BASE,
    maxContainerWidth: MAX_CONTAINER_WIDTH,
    greys: GREY_SHADES,
  },

  overrides: {

    MuiButton: {
      root: {
        lineHeight: 1.2,
        whiteSpace: 'nowrap' 
      },
      containedPrimary: {
        '&:hover': {
          color: '#fff', // true white, so it pops more
          backgroundColor: COLORS.primary.dark,
        },
      },
      containedSizeLarge: {
        padding: '12px 24px',
      },
      outlinedSizeLarge: {
        padding: '11px 24px', // account for border
      },
      containedSizeSmall: {
        padding: '8px 18px',
      },
      outlinedSizeSmall: {
        padding: '7px 18px', // account for border
      },
      
      outlined: {
        boxSizing: 'border-box',
        borderColor: COLORS.common.white,
        color: COLORS.common.white,
        opacity: 0.8,
        '&:hover': {
          opacity: 1,
        }
      },

      outlinedPrimary: {
        borderColor: COLORS.primary.dark,
        color: `${COLORS.primary.dark} !important`,
        '&:hover': {
          borderColor: COLORS.primary.dark,
          color: `${COLORS.primary.main} !important`,
        },
      },
    },

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

    MuiContainer: {
      root: {
        // impl in styles/responsivePadding.scss due to bug in MUI
      },
    },

    MuiRadio: {
      root: {
        padding: '2px',
        paddingRight: '4px',
      }
    },

    MuiTableRow: {
      root: {
        verticalAlign: 'top',
      },
      head: {
        borderBottom: '1px solid #aaa',
      }
    },

    MuiTableCell: {
      root: {
        borderBottom: 'none'
      },
      head: {
        paddingBottom: '15px'
      }

    },

    
    MuiPaper: {
      ...createPaperElevations()
    }
  }
})

