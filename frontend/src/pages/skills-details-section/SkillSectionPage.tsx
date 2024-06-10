import React, { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
  Button
} from "@mui/material";
import {
  CheckboxesGroup,
  EducationForm,
  AddFieldButton,
  WorkExperienceForm,
  SocialLinksForm,
  LanguageForm
} from "@components/common/index";
import AddIcon from "@mui/icons-material/Add";
import { StyledBox, StyledContainer } from "./skillsSection.styles";
import { ImageUploader } from "./Dropzone";
import { CustomDivider } from "@components/common/divider/Divider";
import { useTheme } from "styled-components";
import styled from "styled-components";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { useAppStore } from "@zustand-store/userStore/useAppStore";

interface DeleteIconButtonProps {
  top?: string;
  right?: string;
  smallTop?: string;
  smallRight?: string;
}

const DeleteIconButton = styled(IconButton)<DeleteIconButtonProps>`
  position: absolute;
  top: ${(props) => props.top || "2.5rem"};
  right: ${(props) => props.right || "2.5rem"};
  color: "none";
  ${(props) => props.theme.breakpoints.down("sm")} {
    top: ${(props) => props.smallTop || "1rem"};
    right: ${(props) => props.smallRight || "1rem"};
  }
`;

const FieldContainer = styled.div`
  position: relative;
`;

interface EducationData {
  institution: string;
  concentration: string;
  degree: string;
}

interface WorkExperienceData {
  employerName: string;
  startDate: string | number;
  endDate: string | number;
  role: string;
  currentlyWorking: boolean;
}

interface LanguageData {
  language: string;
  fluency: string;
}

export const SkillSectionPage: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { formData, setFormdata, setIsFormValid } = useAppStore();
  const [educationData, setEducationData] = useState<EducationData[]>([
    { institution: "", concentration: "", degree: "" }
  ]);
  const [isEducationFormValid, setIsEducationFormValid] =
  useState<boolean>(false);
const [isWorkExperienceFormValid, setIsWorkExperienceFormValid] =
  useState<boolean>(false);
const [isLanguageFormValid, setIsLanguageFormValid] =
  useState<boolean>(false);
  const [workExperienceData, setWorkExperienceData] = useState<
    WorkExperienceData[]
  >([
    {
      employerName: "",
      startDate: "",
      endDate: "",
      role: "",
      currentlyWorking: false
    }
  ]);
  const [languageData, setLanguageData] = useState<LanguageData[]>([
    { language: "", fluency: "" }
  ]);
  const [socialAccounts, setSocialAccounts] = useState<string[]>([""]);
  const [selectedSkills, setSelectedSkills] = useState<{
    [key: string]: boolean;
  }>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    setEducationData(
      formData.education || [{ institution: "", concentration: "", degree: "" }]
    );
    setWorkExperienceData(
      formData.workExperience || [
        {
          employerName: "",
          startDate: "",
          endDate: "",
          role: "",
          currentlyWorking: false
        }
      ]
    );
    setLanguageData(formData.languages || [{ language: "", fluency: "" }]);
    setSocialAccounts(formData.socialAccounts || [""]);
  }, [formData]);

  useEffect(() => {
    setIsFormValid(isEducationFormValid && isWorkExperienceFormValid && isLanguageFormValid);
  }, [isEducationFormValid, isWorkExperienceFormValid, isLanguageFormValid, setIsFormValid]);

  const handleEducationSubmit = useCallback(
    (data: EducationData[]) => {
      setEducationData(data);
      setFormdata("education", data, "array");
    },
    [setFormdata]
  );

  const handleWorkExperienceSubmit = useCallback(
    (data: WorkExperienceData[]) => {
      setWorkExperienceData(data);
      setFormdata("workExperience", data, "array");
    },
    [setFormdata]
  );

  const handleLanguageSubmit = useCallback(
    (data: LanguageData[]) => {
      setLanguageData(data);
      setFormdata("languages", data, "array");
    },
    [setFormdata]
  );

  const handleSocialLinksSubmit = useCallback(
    (data: string[]) => {
      setSocialAccounts(data);
      setFormdata("socialAccounts", data, "array");
    },
    [setFormdata]
  );

  const handleFileUpload = (file: File | null) => {
    console.log("File ---- ", file);
    setUploadedFile(file);
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }
    const payload = {
      skills: Object.keys(selectedSkills).filter((key) => selectedSkills[key]),
      education: educationData,
      workExperience: workExperienceData,
      languages: languageData,
      socialAccounts
    };
    formData.append("userSkillsInput", JSON.stringify(payload));
    console.log("Payload to be submitted:", payload);

    // Assuming you have a function to handle the form submission
    // submitFormData(formData);
  };

  return (
    <StyledBox>
      <StyledContainer>
        <Stack mt={5}>
          <Stack mb={5} direction={"column"}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              Enter your skills
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              To pair you with the projects where you can have the most impact
              we need to learn more about you.
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              variant="subtitle1"
              sx={{ color: theme.palette.text.primary }}
            >
              Select roles that suit your profile
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Learn more about the current roles on the Alignerr website
            </Typography>
            <CheckboxesGroup onChange={setSelectedSkills} />
          </Stack>

          <CustomDivider />
          {/* Image Upload here */}
          <ImageUploader handleFileUpload={handleFileUpload} />
          <CustomDivider />
          {/* Education details here */}
          <Stack spacing={2}>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: theme.spacing(2)
              }}
            >
              Education
            </Typography>
            <EducationForm
              handleEducationSubmit={handleEducationSubmit}
              validEducationForm={setIsEducationFormValid}
            />
          </Stack>

          <CustomDivider />
          {/* Work experience details here */}
          <Stack spacing={2}>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                marginBottom: theme.spacing(2)
              }}
            >
              Work experience
            </Typography>
            <WorkExperienceForm
              handleWorkExperienceSubmit={handleWorkExperienceSubmit}
              validWorkExperience={setIsWorkExperienceFormValid} 
            />
          </Stack>

          <CustomDivider />
          {/* Languages section here */}
          <Stack spacing={2}>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                marginBottom: theme.spacing(2)
              }}
            >
              Language
            </Typography>
            <LanguageForm handleLanguageSubmit={handleLanguageSubmit} validLanguageForm={setIsLanguageFormValid} />
          </Stack>

          <CustomDivider />
          {/* Social Media details here */}
          <Stack spacing={2}>
            <Stack>
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.text.secondary,
                  marginTop: "-20px",
                  marginBottom: theme.spacing(2)
                }}
              >
                Social accounts
              </Typography>
            </Stack>
            <SocialLinksForm
              handleSocialLinksSubmit={handleSocialLinksSubmit}
            />
          </Stack>
          <CustomDivider />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </Stack>
      </StyledContainer>
    </StyledBox>
  );
};

export default SkillSectionPage;
