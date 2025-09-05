import { Paper } from "@mantine/core";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const BlankCard = ({ children, className }: Props) => {
  return (
    <Paper
      shadow="sm"
      p={0}
      withBorder
      style={{ position: "relative", background: "#fff" }}
      className={["ios-card", className].filter(Boolean).join(" ")}
    >
      {children}
    </Paper>
  );
};

export default BlankCard;
