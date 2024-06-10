import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AddFieldButtonProps } from "./interface";
import { addButtonStyle } from "./style";

export const AddFieldButton = ({
  label,
  icon,
  onClick,
}: AddFieldButtonProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        sx={addButtonStyle}
        startIcon={icon}
        onClick={onClick}
      >
        {label}
      </Button>
    </Stack>
  );
};
