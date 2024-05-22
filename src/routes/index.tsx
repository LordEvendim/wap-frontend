import { Box, Flex, VStack, useToast } from "@chakra-ui/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config/url";
import axios from "axios";
import { Question } from "../types/types";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [questionsData, setQuestionsData] = useState<Question[]>();
  const toast = useToast();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const result = await axios.get(`${SERVER_URL}/questions/`);

      setQuestionsData(result.data);
    } catch (e: unknown) {
      toast({
        status: "error",
        description: JSON.stringify(e),
      });
    }
  };

  return (
    <Flex mt={"60px"} direction={"column"} alignItems={"center"} mb={"100px"}>
      <Box fontWeight={"bold"} fontSize={"2xl"} mb={"20px"}>
        Q&A Knowledgebase
      </Box>
      <VStack spacing={"20px"}>
        {questionsData?.map((question) => (
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
              {question.content}
            </Box>
            <Box color={"gray.300"} fontWeight={"bold"} mt={"10px"}>
              {question.creator.username}
            </Box>
            <Box color={"gray.300"} fontWeight={"bold"} mb={"10px"}>
              {new Date(question.createdAt * 1000).toLocaleString()}
            </Box>
            {/* <Box minHeight={"200px"}>{question.content}</Box> */}
            <Link to={"/questions" + "/" + question.id}>
              Go to question {">>"}
            </Link>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}
