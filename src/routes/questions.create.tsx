import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { SERVER_URL } from "../config/url";
import axios from "axios";
import { useUser } from "../useUser";
import { useState } from "react";

export const Route = createFileRoute("/questions/create")({
  component: QuestionCreationComponent,
});

function QuestionCreationComponent() {
  const toast = useToast();
  const [question, setQuestion] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(1);

  const postQuestion = async () => {
    try {
      await axios.post(`${SERVER_URL}/questions/`, {
        content: question,
        creatorId: useUser.getState().userId,
        categoryId: categoryId,
      });

      toast({
        status: "success",
        description: "Question added",
      });
    } catch (e: unknown) {
      toast({
        status: "error",
        description: JSON.stringify(e),
      });
    }
  };

  return (
    <VStack
      mt={"60px"}
      direction={"column"}
      mb={"100px"}
      w={"500px"}
      mx={"auto"}
      spacing={"20px"}
    >
      <Box fontWeight={"bold"} fontSize={"2xl"} mb={"20px"}>
        Create a new question
      </Box>
      <Box w={"full"}>
        <Box ml={"10px"} mb={"5px"} fontWeight={"bold"} color={"gray.600"}>
          Question
        </Box>
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value ?? "")}
        />
      </Box>
      <Box w={"full"}>
        <Box ml={"10px"} mb={"5px"} fontWeight={"bold"} color={"gray.600"}>
          Category ID
        </Box>
        <Input
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value)
            )
          }
        />
      </Box>
      <Button w={"full"} onClick={() => postQuestion()}>
        Submit
      </Button>
    </VStack>
  );
}
