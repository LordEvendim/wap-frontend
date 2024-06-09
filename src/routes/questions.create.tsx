import { Box, Button, Textarea, VStack, useToast } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { SERVER_URL } from "../config/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../types/types";
import Select from "react-select";
import { useUser } from "../useUser";

export const Route = createFileRoute("/questions/create")({
  component: QuestionCreationComponent,
});

function QuestionCreationComponent() {
  const toast = useToast();
  const [question, setQuestion] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedOption, setSelectedOption] = useState();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const fetchCategories = async () => {
    try {
      const result = await axios.get(`${SERVER_URL}/categories/`);

      setCategories(result.data);
    } catch (e: unknown) {
      toast({
        status: "error",
        description: JSON.stringify(e),
      });
    }
  };

  const options = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  useEffect(() => {
    fetchCategories();
  }, []);

  const postQuestion = async () => {
    try {
      if (!selectedOption)
        return toast({ status: "error", description: "Category not selected" });

      const user = useUser.getState().user;

      if (!user)
        return toast({ status: "error", description: "User not selected" });

      await axios.post(`${SERVER_URL}/questions/`, {
        content: question,
        creatorId: user.value,
        categoryId: (selectedOption as { value: string; label: string }).value,
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
        {/* <Input
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value)
            )
          }
        /> */}
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
      </Box>
      <Button w={"full"} onClick={() => postQuestion()}>
        Submit
      </Button>
    </VStack>
  );
}
