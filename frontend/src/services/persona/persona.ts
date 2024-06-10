//persona
type Field = any;

export interface InlineInquiryProps {
  onLoad: () => void;
  onReady: () => void;
  onComplete: ({
    inquiryId,
    status,
    fields,
  }: {
    inquiryId: string;
    status: string;
    fields: Record<string, string> | Record<string, Field>;
  }) => void;
  onError: (error: any) => void;
}