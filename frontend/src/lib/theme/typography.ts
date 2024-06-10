import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography = (fontFamily: string): TypographyOptions => ({
  body2: {
    fontFamily: fontFamily,
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
  },
  caption: {
    fontFamily: fontFamily,
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px",
  },
  body1: {
    fontFamily: fontFamily,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
  },
  h5: {
    fontFamily: fontFamily,
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "36px",
  },
  h6: {
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "32px",
  },
  subtitle1: {
    fontFamily: '"IBM Plex Sans"',
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "28px",
  },
});
