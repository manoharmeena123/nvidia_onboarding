import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Spinner } from "@components/common/loading/circularProgress";
import { getUserSkills } from "@services/api/userSkills";
import { WhiteFormControlLabel } from "./style";

interface Skill {
  [key: string]: string;
}

type CheckboxState = {
  [key: string]: boolean;
};

interface CheckboxesGroupProps {
  onChange: (state: CheckboxState) => void;
}

export const CheckboxesGroup: React.FC<CheckboxesGroupProps> = ({
  onChange
}) => {
  const [state, setState] = useState<CheckboxState>({});
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await getUserSkills();
        const fetchedSkills = response.data.skills;

        const initialState: CheckboxState = fetchedSkills.reduce(
          (acc: CheckboxState, skill) => {
            const key = Object.keys(skill)[0];
            acc[key] = false;
            return acc;
          },
          {}
        );

        setSkills(fetchedSkills);
        setState(initialState);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedState = {
      ...state,
      [event.target.name]: event.target.checked
    };
    setState(updatedState);
    onChange(updatedState);
  };

  return (
    <Box sx={{ display: "flex", mt: 1.5 }}>
      <FormControl component="fieldset" variant="standard">
        {loading ? (
          <div style={{padding: "2rem"}}>
            <Spinner size={25} color={"primary.contrastText"} />
          </div>
        ) : (
          <FormGroup>
            {skills?.map((skill) => {
              const key = Object.keys(skill)[0];
              return (
                <WhiteFormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={state[key]}
                      onChange={handleChange}
                      name={key}
                      sx={(theme) => ({
                        color: theme.palette.text.primary,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main
                        }
                      })}
                    />
                  }
                  label={skill[key]}
                />
              );
            })}
          </FormGroup>
        )}
      </FormControl>
    </Box>
  );
};
