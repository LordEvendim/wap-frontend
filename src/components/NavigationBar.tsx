import { Box, Button, Flex, HStack, Input } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

export const NavigationBar = () => {
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
          <Link to="/about">
            <Button variant={"ghost"}>About</Button>
          </Link>
          <Link to="/">
            <Button variant={"ghost"}>Questions</Button>
          </Link>
          <Link to="/">
            <Button variant={"ghost"}>Profile</Button>
          </Link>
          <Input borderColor={"gray.300"} />
          <Button w={"300px"} borderWidth={"1px"} borderColor={"gray.300"}>
            Set userId
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
