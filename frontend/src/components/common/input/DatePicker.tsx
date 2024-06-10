import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme, Box, useMediaQuery } from "@mui/material";

interface DatePickerComponentProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  onBlur: () => void; // Add onBlur prop
  maximumDate: Dayjs | undefined;
}

export const DatePickerComponent = ({
  value,
  onChange,
  onBlur, // Destructure onBlur prop
  maximumDate,
}: DatePickerComponentProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const eighteenYearsAgo = dayjs().subtract(18, "year");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Box
          sx={{
            ".MuiFormControl-root": {
              width: "100%", // Ensuring the form control takes full width
            },
            ".MuiInputBase-root": {
              width: isSmallScreen ? "358px" : "368px", // Adjusting the width of the input base
            },
          }}
        >
          <DatePicker
            value={value}
            onChange={onChange}
            maxDate={eighteenYearsAgo}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 10],
                    },
                  },
                ],
                sx: {
                  "& .MuiPaper-root": {
                    backgroundColor: "#282c34",
                    color: "text.primary",
                    border:"1px solid #00000066"
                  },
                  "& .MuiPickersDay-root": {
                    color: "text.primary",
                  
                  },
                  "& .MuiPickersDay-root.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "text.primary",
                  },
                  "& .MuiTypography-root": {
                    color: "text.primary",
                  },
                  "& .MuiPickersCalendarHeader-label": {
                    color: "text.primary",
                  },
                  "& .MuiIconButton-root": {
                    color: "text.primary",
                  },
                  "& .MuiPickersArrowSwitcher-root": {
                    color: "text.primary",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "text.primary"
                  },
                },
              },
            }}
          />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
};
