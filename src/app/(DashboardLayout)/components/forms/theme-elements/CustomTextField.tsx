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
          padding: "10px 14px",
          "&::placeholder": {
            color: "var(--mantine-color-gray-6)",
            opacity: 0.8,
          },
          "&:disabled::placeholder": {
            color: "var(--mantine-color-gray-6)",
            opacity: 1,
          },
        },
      }}
      {...props}
    />
  );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
