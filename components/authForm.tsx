import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, ReactNode, useState } from "react";
import NextImage from "next/image";
import NextLink from "next/link";

interface Props {
  mode: "signin" | "signup";
  children: ReactNode;
}

const AuthForm: FC<Props> = ({ mode, children }) => {
  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" width={120} height={60} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box
          padding="50px"
          bg="gray.900"
          borderRadius="6px"
          width={{ base: "100%", md: "70%", lg: "50%" }}
        >
          {children}
          <Flex align="center">
            <Text marginRight={2}>
              {mode !== "signin"
                ? "Already have an account?"
                : "Create new account"}
            </Text>
            <NextLink
              href={`/${mode === "signin" ? "signup" : "signin"}`}
              passHref
            >
              <a style={{ textDecoration: "underline", color: "#5974ee" }}>
                {mode === "signin" ? "Signup" : "Signin"}
              </a>
            </NextLink>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
