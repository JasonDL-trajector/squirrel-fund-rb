import React from "react";
import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "clamp(32px, 5vw, 60px)",
  width: "auto",
  overflow: "hidden",
  display: "inline-flex",
  alignItems: "center",
  lineHeight: 0,
}));

const Fallback = styled("span")(() => ({
  fontWeight: 700,
  fontSize: "clamp(14px, 3.5vw, 18px)",
  color: "var(--mantine-color-text, #111)",
  whiteSpace: "nowrap",
}));

const Logo = () => {
  const [failed, setFailed] = React.useState(false);

  return (
    <LinkStyled href="/" aria-label="Home">
      {failed ? (
        <Fallback>Squirrel Fund</Fallback>
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
    </LinkStyled>
  );
};

export default Logo;
