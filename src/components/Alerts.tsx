import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

type statusType =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "loading"
  | undefined;

interface alertState {
  status: statusType;
  title: string;
  descript: string;
}

const Alerts = (props: alertState) => {
  return (
    <div>
      <Alert status={props.status}>
        <AlertIcon />
        <AlertTitle>{props.title}</AlertTitle>
      </Alert>
    </div>
  );
};

export default Alerts;
