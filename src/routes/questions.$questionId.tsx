import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/questions/$questionId")({
  component: QuestionComponent,
  notFoundComponent: () => {
    return <p>Question not found</p>;
  },
});

const question = {
  id: "1",
  title: "Question title 1",
  content: "Questions content",
  creator: {
    username: "Bartoszeeek",
  },
};

const answersData = [
  {
    id: "1",
    content: "Answer content",
    creator: {
      username: "Bartoszeeek",
    },
  },
  {
    id: "2",
    content: "Answer content 2",
    creator: {
      username: "Bartoszeeek",
    },
  },
];

function QuestionComponent() {
  return (
    <Flex
      mt={"60px"}
      direction={"column"}
      mb={"100px"}
      w={"1000px"}
      mx={"auto"}
    >
      <Box fontWeight={"bold"} fontSize={"2xl"} mb={"20px"}>
        {question.title}
      </Box>
      <Box minHeight={"200px"}>{question.content}</Box>
      <Box color={"gray.400"} mb={"20px"}>
        {question.creator.username}
      </Box>
      <Divider borderColor={"gray.400"} mt={"40px"} />
      <Box
        fontWeight={"bold"}
        fontSize={"2xl"}
        mt={"20px"}
        mb={"20px"}
        color={"gray.700"}
      >
        Answers
      </Box>
      <VStack spacing={"20px"}>
        {answersData.map((answer) => (
          <Box
            w={"1000px"}
            borderRadius={"15px"}
            boxShadow={"md"}
            p={"20px"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            key={answer.id}
          >
            <Box color={"gray.400"} mb={"20px"}>
              {answer.creator.username}
            </Box>
            <Box minHeight={"100px"}>{answer.content}</Box>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}
