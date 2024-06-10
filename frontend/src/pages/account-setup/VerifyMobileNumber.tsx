import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { generateOtp, checkOtp } from "@services/api/auth";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useSnackbar } from "notistack";
import { OTPInput } from "./OtpInput";
import { Spinner } from "@components/common/loading/circularProgress";
import { useAppStore } from "@zustand-store/userStore/useAppStore";

const StyledMuiPhoneNumber = styled(MuiPhoneNumber)(({ theme }) => ({
  marginTop: "4px",
  padding: "8px 0px",
  "& .MuiInputBase-root": {
    color: "text.primary",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "primary.contrastTe00066",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main.white,
    },
  },
}));

export const Label = styled("label")<{ className?: string }>(
  ({ className, theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 0px;
  margin-top: 0px;
  line-height: 0px;
  font-weight: 400;
  font-size: 12px;
  color:${theme.palette.text.secondary};
  &.invalid {
    color: red;
  }
  `
);

const VerifyMobileNumber = () => {
  const { formData } = useAppStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [hover, setHover] = useState(false);
  const [hovers, setHovers] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState<boolean>(false);
  const [requestOtpLoad, setRequestOtpLoad] = useState<boolean>(false);
  const [otpValidateLoad, setOtpValidateLoad] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isOtpComplete, setIsOtpComplete] = useState<boolean>(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  const [otpRequestCount, setOtpRequestCount] = useState<number>(0);
  const [firstRequestTime, setFirstRequestTime] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const validatePhoneNumber = (value: string) => {
    const isValid = isValidPhoneNumber(value);
    setIsPhoneNumberValid(isValid);
  };

  const handleVerification = async () => {
    const currentTime = Date.now();
    if (firstRequestTime && currentTime - firstRequestTime < 60000 && otpRequestCount >= 3) {
      enqueueSnackbar("You can only request OTP 3 times per minute. Please wait.", { variant: "warning" });
      return;
    }

    if (!firstRequestTime || currentTime - firstRequestTime >= 60000) {
      setFirstRequestTime(currentTime);
      setOtpRequestCount(0);
    }

    setRequestOtpLoad(true);
    try {
      const response = await generateOtp(phoneNumber);
      console.log("response otp g=================================>", response);
      setVerifyOtp(true);
      enqueueSnackbar("OTP sent successfully!", { variant: "success" });
      setOtpRequestCount(prevCount => prevCount + 1);
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", {
        variant: "error",
      });
      console.error("Error requesting OTP", error);
    } finally {
      setRequestOtpLoad(false);
    }
  };

  const handleOtpVerification = async () => {
    try {
      setOtpValidateLoad(true);
      const response = await checkOtp(phoneNumber, otp.join(""));
      if (response) {
        enqueueSnackbar("OTP verification successful!", { variant: "success" });
        navigate("/identity-verification");
      } else {
        enqueueSnackbar(
          "OTP is not correct. Please fill in the correct OTP again.",
          {
            variant: "error",
          }
        );
        console.log("OTP verification failed");
      }
    } catch (error) {
      enqueueSnackbar("OTP verification failed. Please try again.", {
        variant: "error",
      });
      console.log("OTP verification failed");
    } finally {
      setOtpValidateLoad(false);
    }
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleMouseEnterButton = () => {
    setHovers(true);
  };

  const handleMouseLeaveButton = () => {
    setHovers(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d*$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp.concat(Array(6 - newOtp.length).fill("")));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newOtp = [...otp];
      if (newOtp[index] === "") {
        if (index > 0) {
          const prevInput = document.getElementById(`otp-input-${index - 1}`);
          if (prevInput) {
            prevInput.focus();
          }
        }
      }
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  useEffect(() => {
    if (formData?.verifyForm?.phone_number) {
      setPhoneNumber(formData?.verifyForm?.phone_number);
      validatePhoneNumber(formData?.verifyForm?.phone_number);
    }
  }, [formData]);

  useEffect(() => {
    setIsOtpComplete(otp.every((digit) => digit !== ""));
  }, [otp]);

  const handleResendOtp = async () => {
    const currentTime = Date.now();
    if (firstRequestTime && currentTime - firstRequestTime < 60000 && otpRequestCount >= 3) {
      enqueueSnackbar("You can only request OTP 3 times per minute. Please wait.", { variant: "warning" });
      return;
    }

    if (!firstRequestTime || currentTime - firstRequestTime >= 60000) {
      setFirstRequestTime(currentTime);
      setOtpRequestCount(0);
    }

    console.log("resend otp");
    setRequestOtpLoad(true);
    try {
      await generateOtp(phoneNumber);
      enqueueSnackbar("OTP sent successfully!", { variant: "success" });
      setOtpRequestCount(prevCount => prevCount + 1);
    } catch (error) {
      enqueueSnackbar("Error requesting OTP. Please try again.", {
        variant: "error",
      });
      console.error("Error requesting OTP", error);
    } finally {
      setRequestOtpLoad(false);
    }
  };

  return (
    <Box
      sx={{
        color: "text.main",
        height: "100vh",
        paddingTop: theme.spacing(5),
      }}
    >
      <Container>
        <Stack direction="column" spacing={theme.spacing(5)}>
          <Stack
            direction="column"
            sx={{
              marginTop: theme.spacing(5),
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
              }}
            >
              Verify your phone number
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
              }}
            >
              As part of verifying your identity, we want to verify your phone
              number. Make sure your phone number is correct and request an OTP.
            </Typography>
          </Stack>
          <Stack width={"100%"}>
            {!verifyOtp ? (
              <Stack width={368}>
                <Label>Phone Number</Label>
                <StyledMuiPhoneNumber
                  defaultCountry="us"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  regions={[
                    "north-america",
                    "south-america",
                    "europe",
                    "asia",
                    "oceania",
                    "africa",
                  ]}
                  InputLabelProps={{ shrink: true }}
                />
                <Label>
                  The One Time Password (OTP) will be sent as a text to this
                  number
                </Label>
              </Stack>
            ) : (
              <Stack direction="column" spacing={isSmallScreen ? 5 : 3}>
                <Typography variant="subtitle2">
                  You should receive a code on the number ending with 1234.{" "}
                  <Link
                    href="/edit-number"
                    color="primary.main"
                    sx={{ textDecoration: "none" }}
                  >
                    Edit number
                  </Link>
                </Typography>
                <OTPInput
                  otp={otp}
                  handleChange={handleChange}
                  handlePaste={handlePaste}
                  handleKeyDown={handleKeyDown}
                />
              </Stack>
            )}
            <Stack mt={2}>
              {!verifyOtp ? (
                <Button
                  variant="contained"
                  disabled={!isPhoneNumberValid && phoneNumber.length === 0}
                  sx={{
                    display: "inline-flex",
                    marginTop: theme.spacing(3),
                    height: theme.spacing(6),
                    fontSize: theme.spacing(1.75),
                    color: "primary.contrastText",
                    width: theme.spacing(18),
                    fontWeight: 500,
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "primary.main",
                    },
                  }}
                  onClick={handleVerification}
                >
                  <Typography
                    fontSize={13}
                    fontWeight={500}
                    lineHeight={1.5}
                    textTransform={"none"}
                    color={
                      isPhoneNumberValid ? "#000" : "rgba(255, 255, 255, 0.30)"
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "48px",
                      }}
                    >
                      {requestOtpLoad ? (
                        <Spinner size={20} color={"primary.contrastText"} />
                      ) : (
                        "Request OTP"
                      )}
                    </Box>
                  </Typography>
                </Button>
              ) : (
                <Stack
                  direction={"row"}
                  spacing={2}
                  marginTop={theme.spacing(3)}
                >
                  <Button
                    variant="contained"
                    disabled={!isOtpComplete}
                    sx={{
                      display: "inline-flex",
                      marginTop: theme.spacing(3),
                      height: theme.spacing(6),
                      fontSize: theme.spacing(1.75),
                      color: "primary.contrastText",
                      fontWeight: 500,
                      backgroundColor: isOtpComplete
                        ? "primary.main"
                        : "rgba(255, 255, 255, 0.12)",
                      "&:hover": {
                        backgroundColor: isOtpComplete
                          ? "primary.main"
                          : "rgba(255, 255, 255, 0.12)",
                      },
                    }}
                    onClick={handleOtpVerification}
                    onMouseEnter={handleMouseEnterButton}
                    onMouseLeave={handleMouseLeaveButton}
                  >
                    <Typography
                      fontSize={13}
                      fontWeight={500}
                      lineHeight={1.5}
                      textTransform={"none"}
                      color={
                        isOtpComplete
                          ? "primary.contrastText"
                          : "rgba(255, 255, 255, 0.30)"
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "48px",
                        }}
                      >
                        {otpValidateLoad ? (
                          <Spinner size={20} color={"primary.contrastText"} />
                        ) : (
                          "Verify your phone number"
                        )}
                      </Box>
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      marginTop: theme.spacing(3),
                      height: theme.spacing(6),
                      fontSize: theme.spacing(1.75),
                      color: hover ? "primary.contrastText" : "primary.main",
                      fontWeight: 500,
                      backgroundColor: hover ? "primary.main" : "transparent",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleResendOtp}
                  >
                    <Typography
                      fontSize={13}
                      fontWeight={500}
                      lineHeight={1.5}
                      textTransform={"none"}
                    >
                      I didn't receive a code
                    </Typography>
                  </Button>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default VerifyMobileNumber