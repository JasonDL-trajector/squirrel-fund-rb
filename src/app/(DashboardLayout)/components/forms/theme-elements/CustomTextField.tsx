import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";

interface CustomTextFieldProps extends Omit<TextInputProps, "styles"> {
  // Add any additional props if needed
}

const CustomTextField = React.forwardRef<
  HTMLInputElement,
  CustomTextFieldProps
>(({ ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      styles={{
        input: {
          padding: "12px 14px",
          "&::placeholder": {
            color: "var(--mantine-color-gray-6)",
            opacity: 0.8,
          },
          "&:disabled::placeholder": {
            color: "var(--mantine-color-gray-6)",
            opacity: 1,
          },
          borderRadius: "10px",
          border: "1px solid var(--mantine-color-gray-2)",
          backgroundColor: "#fff",
          transition: "box-shadow 150ms ease, border-color 120ms ease",
          outline: "none",
          boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          "&:focus": {
            borderColor: "var(--mantine-color-blue-5)",
            boxShadow: "0 0 0 3px rgba(10,132,255,0.15)",
          },
        },
      }}
      radius="md"
      size="md"
      {...props}
    />
  );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
