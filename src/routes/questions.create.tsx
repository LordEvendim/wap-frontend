import { Box, Flex, Input } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/questions/create")({
  component: QuestionCreationComponent,
});

function QuestionCreationComponent() {
  return (
    <Flex
      mt={"60px"}
      direction={"column"}
      mb={"100px"}
      w={"1000px"}
      mx={"auto"}
    >
      <Box>
        <Box>Title</Box>
        <Input />
      </Box>
      <Box>
        <Box>Question</Box>
        <Input />
      </Box>
      <Box>
        <Box>Category</Box>
        <Input />
      </Box>
    </Flex>
  );
}
