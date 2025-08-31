import React from "react";
import { Card, Text, Group, Stack, useMantineTheme, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: React.ReactNode;
  middlecontent?: string | JSX.Element;
  borderless?: boolean;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  borderless,
}: Props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Card
    
      shadow={isMobile ? "sm" : "md"}
      radius={isMobile ? 0 : "lg"}
      p={'md'}
     
    >
      {cardheading ? (
        <Stack gap="xs">
          <Text size="xl" fw={600}>
            {headtitle}
          </Text>
          <Text size="sm" c="dimmed">
            {headsubtitle}
          </Text>
        </Stack>
      ) : (
        <Stack gap="lg">
          {title ? (
            <Group
              justify="space-between"
              align="center"
              style={{
                borderBottom: `1px solid ${theme.colors.gray[1]}`,
                paddingBottom: isMobile ? theme.spacing.sm : theme.spacing.md,
                paddingTop: isMobile ? theme.spacing.sm : theme.spacing.md,
                // Always keep a consistent inner gutter so content doesn't touch edges
                paddingLeft: theme.spacing.md,
                paddingRight: theme.spacing.md,
              }}
            >
              <Stack gap="xs">
                {title && (
                  <Text size="xl" fw={600}>
                    {title}
                  </Text>
                )}
                {subtitle && (
                  <Text size="sm" c="dimmed">
                    {subtitle}
                  </Text>
                )}
              </Stack>
              {action}
            </Group>
          ) : null}
 
          <Box style={{ padding: theme.spacing.md }}>
            {children}
          </Box>
        </Stack>
      )}
 
      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
