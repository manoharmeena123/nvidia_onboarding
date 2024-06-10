// InlineInquiry.tsx
import React from "react";
import PersonaReact from "persona-react";
import { Box } from "@mui/material";
import { InlineInquiryProps } from "./persona";
import { useNavigate } from "react-router-dom";

const InlineInquiry = ({
  onLoad,
  onReady,
  onComplete,
  onError,
}: InlineInquiryProps) => {
  const navigate = useNavigate();

  const handleComplete = ({
    inquiryId,
    status,
    fields,
  }: {
    inquiryId: string;
    status: string;
    fields: Record<string, any>;
  }) => {
    // Call the provided onComplete handler if it exists
    if (onComplete) {
      onComplete({ inquiryId, status, fields });
    }
    // Redirect to the skill endpoint
    navigate("/identity-confirm");
  };

  return (
    <Box style={{ width: "100%", height: "100%" }}>
      <PersonaReact
        templateId="itmpl_mnYkGBF72xVSMu7Ln7F8ykaeGzH4"
        environmentId="env_AA6hpF7SVKbRojN1hwey1eLyyoBR"
        onLoad={onLoad}
        onReady={onReady}
        onComplete={handleComplete}
        onError={onError}
      />
    </Box>
  );
};

export default InlineInquiry;
