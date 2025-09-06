import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Anchor, Text } from "@mantine/core";

const Logo = () => {
  const [failed, setFailed] = React.useState(false);

  return (
    <Anchor
      component={Link}
      href="/"
      aria-label="Home"
      underline="never"
      style={{
        height: "clamp(32px, 5vw, 60px)",
        width: "auto",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 0,
      }}
    >
      {failed ? (
        <Text
          fw={700}
          style={{
            fontSize: "clamp(14px, 3.5vw, 18px)",
            whiteSpace: "nowrap",
          }}
        >
          Squirrel Fund
        </Text>
      ) : (
        <Image
          src="/images/logos/dark-logo-2.svg"
          alt="Squirrel Fund logo"
          height={35}
          width={87}
          priority
          sizes="(max-width: 62em) 140px, 180px"
          style={{ height: "75%", width: "auto" }}
          onError={() => setFailed(true)}
        />
      )}
    </Anchor>
  );
};

export default Logo;
