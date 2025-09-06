import { Box, Text, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export const Upgrade = () => {
  return (
    <Box
      m="md"
      p="md"
      bg="blue.1"
      style={{
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <>
        <Box>
          <Text size="lg" fw={500} style={{ width: 80 }} mb={1}>
            Haven&apos;t account ?
          </Text>
          <Button
            color="blue"
            target="_blank"
            component={Link}
            href="/authentication/register"
            variant="filled"
            aria-label="logout"
            size="small"
          >
            Sign Up
          </Button>
        </Box>
        <Box mt="-35px">
          <Image
            alt="Remy Sharp"
            src="/images/backgrounds/rocket.png"
            width={100}
            height={100}
          />
        </Box>
      </>
    </Box>
  );
};
