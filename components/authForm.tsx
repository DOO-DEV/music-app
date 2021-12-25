import { Box, Button, Input, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";
import NextImage from "next/image";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    auth(mode, { email, password });
    console.log(email, password);
    setLoading(false);
    router.push("/");
  };
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
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={loading}
              sx={{
                "&:hover": {
                  bg: "green.400",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
