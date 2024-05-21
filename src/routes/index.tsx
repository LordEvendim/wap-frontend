import { Box, Flex, VStack } from "@chakra-ui/react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const questionsData = [
  {
    id: "1",
    title: "Question title 1",
    content: "Questions content",
    creator: {
      username: "Bartoszeeek",
    },
  },
  {
    id: "2",
    title: "Question title 2",
    content: "Questions content",
    creator: {
      username: "Bartoszeeek",
    },
  },
  {
    id: "3",
    title: "Question title 3",
    content: "Questions content",
    creator: {
      username: "Bartoszeeek",
    },
  },
];

function HomeComponent() {
  return (
    <Flex mt={"60px"} direction={"column"} alignItems={"center"} mb={"100px"}>
      <Box fontWeight={"bold"} fontSize={"2xl"} mb={"20px"}>
        Q&A Knowledgebase
      </Box>
      <VStack spacing={"20px"}>
        {questionsData.map((question) => (
          <Box
            w={"1000px"}
            borderRadius={"20px"}
            boxShadow={"md"}
            p={"20px"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            key={question.id}
          >
            <Box fontWeight={"bold"} fontSize={"2xl"} color={"gray.700"}>
              {question.title}
            </Box>
            <Box color={"gray.400"} mb={"20px"}>
              {question.creator.username}
            </Box>
            <Box minHeight={"200px"}>{question.content}</Box>
            <Link to={"/questions" + "/" + question.id}>
              Go to question {">>"}
            </Link>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}
