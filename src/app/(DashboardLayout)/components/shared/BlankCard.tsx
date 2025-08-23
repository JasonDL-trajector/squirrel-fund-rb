import { Paper } from "@mantine/core";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const BlankCard = ({ children, className }: Props) => {
  return (
    <Paper
      shadow="xl"
      p={0}
      style={{ position: "relative" }}
      className={className}
    >
      {children}
    </Paper>
  );
};

export default BlankCard;
