import { Box, Button, Flex, HStack, useToast } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useUser } from "../useUser";
import { useEffect, useState } from "react";
import { Creator } from "../types/types";
import Select from "react-select";
import { SERVER_URL } from "../config/url";
import axios from "axios";

type UserOption = {
  label: string;
  value: string;
};

export const NavigationBar = () => {
  // const [userId, setUserId] = useState<number>(1);
  const [users, setUsers] = useState<Creator[]>([]);
  const toast = useToast();
  const selectedUser = useUser((state) => state.user);

  const handleChange = (selectedUser: UserOption) => {
    console.log("changing user");
    console.log(selectedUser);
    useUser.setState({ user: selectedUser });
  };

  const options = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const fetchUsers = async () => {
    try {
      const result = await axios.get<Creator[]>(`${SERVER_URL}/users/`);

      setUsers(result.data);

      if (result.data.length > 0)
        useUser.setState({
          user: {
            label: result.data[0].username,
            value: result.data[0].id.toString(),
          },
        });
    } catch (e: unknown) {
      toast({
        status: "error",
        description: JSON.stringify(e),
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          {/* <Input
            borderColor={"gray.300"}
            value={userId}
            onChange={(e) =>
              setUserId(
                isNaN(parseInt(e.target.value ?? "1"))
                  ? 1
                  : parseInt(e.target.value ?? "1")
              )
            }
          /> */}
          <Select
            value={selectedUser}
            onChange={handleChange}
            options={options}
          />
          {/* <Button
            w={"300px"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            onClick={() => {
              useUser.setState({ userId });
            }}
          >
            Set userId
          </Button> */}
        </HStack>
      </Flex>
    </Box>
  );
};
