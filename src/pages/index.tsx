import { Flex, Button, Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import withSSRGuest from "../utils/withSSRGuest";

type SignInData = {
  email: string;
  password: string;
};

const signInDataSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha é obrigatória"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(signInDataSchema),
  });

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInData> = async (values) => {
    await signIn(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        maxWidth={360}
        w="100%"
        bg="gray.800"
        flexDir="column"
        p={8}
        borderRadius={8}
        as="form"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            autoComplete="email"
            type="email"
            name="email"
            label="E-mail"
            {...register("email")}
            error={errors.email}
          />
          <Input
            autoComplete="current-password"
            type="password"
            name="password"
            label="Senha"
            {...register("password")}
            error={errors.password}
          />
        </Stack>
        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});
