import React from "react";
import { Center, Text, useMantineTheme } from "@mantine/core";

type Props = {
  title?: string;
  description?: string;
};

const EmptyState = ({ title, description }: Props) => {
  const theme = useMantineTheme();
  return (
    <Center style={{ padding: theme.spacing.md }}>
      <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.xs, alignItems: "center" }}>
        <Text size="lg" fw={700}>
          {title ?? "No data yet"}
        </Text>
        {description && (
          <Text size="sm" c="dimmed" ta="center" style={{ maxWidth: 420 }}>
            {description}
          </Text>
        )}
      </div>
    </Center>
  );
};

export default EmptyState;