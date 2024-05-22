import { Box, Button, Flex, HStack, Input } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useUser } from "../useUser";
import { useState } from "react";

export const NavigationBar = () => {
  const [userId, setUserId] = useState<number>(1);

  return (
    <Box background={"gray.50"} boxShadow={"md"}>
      <Flex
        w={"90%"}
        mx={"auto"}
        justifyContent={"space-between"}
        h={"80px"}
        alignItems={"center"}
      >
        <Box fontWeight={"bold"}>WAP PROJECT</Box>
        <HStack spacing={"50px"}>
          <Link to="/">
            <Button variant={"ghost"}>Home</Button>
          </Link>
          <Link to="/questions/create">
            <Button variant={"ghost"}>Ask</Button>
          </Link>
          <Link to="/about">
            <Button variant={"ghost"}>About</Button>
          </Link>
          <Link to="/">
            <Button variant={"ghost"}>Profile</Button>
          </Link>
          <Input
            borderColor={"gray.300"}
            value={userId}
            onChange={(e) =>
              setUserId(
                isNaN(parseInt(e.target.value ?? "1"))
                  ? 1
                  : parseInt(e.target.value ?? "1")
              )
            }
          />
          <Button
            w={"300px"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            onClick={() => {
              useUser.setState({ userId });
            }}
          >
            Set userId
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
