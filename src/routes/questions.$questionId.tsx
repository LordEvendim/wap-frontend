import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config/url";
import { Question } from "../types/types";
import { useUser } from "../useUser";

export const Route = createFileRoute("/questions/$questionId")({
  component: QuestionComponent,
  notFoundComponent: () => {
    return <p>Question not found</p>;
  },
});

function QuestionComponent() {
  const toast = useToast();
  const { questionId } = useParams({ strict: false }) as { questionId: string };
  const [questionData, setQuestionData] = useState<Question>();
  const [answer, setAnswer] = useState<string>("");

  const fetchQuestion = async () => {
    try {
      const result = await axios.get(`${SERVER_URL}/questions/${questionId!}`);

      setQuestionData(result.data);
    } catch (e: unknown) {
      toast({
        status: "error",
        description: JSON.stringify(e),
      });
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const postAnswer = async () => {
    try {
      const user = useUser.getState().user;

      if (!user)
        return toast({ status: "error", description: "User not selected" });

      await axios.post(`${SERVER_URL}/answers/`, {
        content: answer,
        creatorId: user.value,
        parentQuestionId: questionId!,
      });

      toast({
        status: "success",
        description: "Answer added",
      });
      setAnswer("");
    } catch (e: unknown) {
      toast({
        status: "error",
        description: JSON.stringify(e),
      });
    }
  };

  return (
    <Flex
      mt={"60px"}
      direction={"column"}
      mb={"100px"}
      w={"1000px"}
      mx={"auto"}
    >
      <Box>
        <Badge variant="subtle" colorScheme="green">
          {questionData?.category?.name}
        </Badge>
      </Box>
      <Box fontWeight={"bold"} color={"gray.300"}>
        {questionData &&
          new Date(questionData.createdAt * 1000).toLocaleString()}
      </Box>
      <Box fontWeight={"bold"} fontSize={"2xl"} mb={"20px"}>
        {questionData?.content}
      </Box>
      <Box color={"gray.400"} mb={"20px"}>
        {questionData?.creator.username}
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
        {questionData?.answers.map((answer) => (
          <Box
            w={"1000px"}
            p={"20px"}
            borderRadius={"15px"}
            boxShadow={"md"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            key={answer.id}
          >
            <Box minHeight={"50px"}>{answer.content}</Box>
            <Box fontWeight={"bold"} color={"gray.300"}>
              {answer.creator.username}
            </Box>
            <Box fontWeight={"bold"} color={"gray.300"} fontSize={"small"}>
              {new Date(answer.createdAt * 1000).toLocaleString()}
            </Box>
          </Box>
        ))}
      </VStack>
      <Divider borderColor={"gray.400"} mt={"40px"} mb={"40px"} />
      <Box>
        <Box ml={"10px"} mb={"10px"} fontWeight={"bold"} color={"gray.600"}>
          Write your answer:
        </Box>
        <Textarea
          borderRadius={"15px"}
          boxShadow={"md"}
          borderWidth={"1px"}
          borderColor={"gray.300"}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button
          mt={"10px"}
          w={"200px"}
          h={"60px"}
          borderRadius={"15px"}
          boxShadow={"md"}
          borderWidth={"1px"}
          borderColor={"gray.200"}
          onClick={() => postAnswer()}
        >
          Submit
        </Button>
      </Box>
    </Flex>
  );
}
