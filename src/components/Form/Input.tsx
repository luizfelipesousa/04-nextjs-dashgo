import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputChakra,
  InputElementProps,
  InputProps as InputPropsChakra,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputPropsChakra {
  name: string;
  label?: string;
  error?: FieldError;
}

const customInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputChakra
        id={name}
        name={name}
        bg="gray.900"
        variant="filled"
        size="lg"
        focusBorderColor="pink.500"
        _hover={{
          bg: "gray.900",
        }}
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(customInput);
