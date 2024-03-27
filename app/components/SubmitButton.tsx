import { Button } from "@radix-ui/themes";
import React from "react";
import Spinner from "./Spinner";

interface Props {
  isSubmitting: boolean,
  defaultText: string,
  submittingText: string
}

const SubmitButton = ({isSubmitting, defaultText, submittingText} : Props) => {
  return (
    <Button data-cy="submit-button" disabled={isSubmitting} type="submit">
      {isSubmitting && <Spinner />}
      {isSubmitting ? submittingText : defaultText}
    </Button>
  );
};

export default SubmitButton;
