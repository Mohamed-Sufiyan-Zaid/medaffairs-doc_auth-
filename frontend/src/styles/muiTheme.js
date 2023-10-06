import createTheme from "@mui/material/styles/createTheme";
import themeFile from "./theme.json";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 1280, // small laptop
      md: 1440, // desktop
      lg: 1920 // large screens
    }
  },
  palette: {
    primary: {
      main: themeFile.colors.primary
    },
    secondary: {
      main: themeFile.colors.secondary1,
      dark: themeFile.colors.secondary3,
      light: themeFile.colors.secondary2
    },
    error: {
      main: themeFile.colors.statusError
    },
    success: {
      main: themeFile.colors.statusSuccess
    },
    warning: {
      main: themeFile.colors.statusInProgress
    },
    info: {
      main: themeFile.colors.neutral2,
      light: themeFile.colors.neutral3,
      dark: themeFile.colors.neutral1
    },
    progressBar: {
      main: themeFile.colors.progressBar
    },
    mode: themeFile.mode
  },
  typography: {
    fontFamily: themeFile.font.fontFamilies.fontFamily1,
    button: {
      textTransform: "none"
    },
    h1: {
      fontSize: themeFile.font.fontSizes.heading1
    },
    h2: {
      fontSize: themeFile.font.fontSizes.heading2
    },
    h3: {
      fontSize: themeFile.font.fontSizes.heading3,
      fontWeight: 600
    },
    h4: {
      fontSize: themeFile.font.fontSizes["2xl"]
    },
    h5: {
      fontSize: themeFile.font.fontSizes.xl
    },
    h6: {
      fontSize: themeFile.font.fontSizes.l
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: themeFile.font.fontSizes.l,
          minWidth: themeFile.button.dimensions.widthBasic,
          minHeight: themeFile.button.dimensions.heightBasic
        },
        outlinedPrimary: {
          backgroundColor: themeFile.colors.white,
          borderRadius: themeFile.button.dimensions.radius
        },
        containedPrimary: {
          borderRadius: themeFile.button.dimensions.radius
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: themeFile.colors.secondary2
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          "fontSize": themeFile.font.fontSizes.l,
          "&:first-of-type": {
            paddingLeft: 0
          }
        },
        head: {
          fontWeight: themeFile.font.fontWeights.bold
        }
      }
    },
    MuiInputBase: {
      defaultProps: {
        sx: {
          backgroundColor: themeFile.input.background
        },
        inputProps: {
          sx: {
            paddingY: {
              xs: themeFile.input.dimensions.paddingSmY,
              md: themeFile.input.dimensions.paddingMdY
            }
          }
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          ".select-placeholder": {
            color: themeFile.select.placeholderColor
          }
        },
        inputProps: {
          sx: {
            paddingY: {
              xs: themeFile.input.dimensions.paddingSmY,
              md: themeFile.input.dimensions.paddingMdY
            }
          }
        }
      }
    },
    MuiList: {
      defaultProps: {
        sx: {
          maxHeight: "200px"
        }
      }
    },
    MuiMenuItem: {
      defaultProps: {
        sx: {
          minHeight: "1rem",
          paddingY: 0
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          sx: {
            borderRadius: "1rem"
          }
        }
      }
    }
  }
});

export default theme;
