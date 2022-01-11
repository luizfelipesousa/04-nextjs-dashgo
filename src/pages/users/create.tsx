import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import Sidebar from "../../components/Sidebar";

type createUserData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const handleCreateUser: SubmitHandler<createUserData> = (values) => {
    console.log(values);
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Usuários
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register("name")}
                error={errors.name}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register("password")}
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack>
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" isLoading={isSubmitting} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
