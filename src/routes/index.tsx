import { Badge, Box, Flex, Spacer, VStack, useToast } from "@chakra-ui/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config/url";
import axios from "axios";
import { Category, Question } from "../types/types";
import Select from "react-select";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [questionsData, setQuestionsData] = useState<Question[]>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    | {
        value: string;
        label: string;
      }
    | undefined
  >();
  const toast = useToast();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const options = [
    {
      value: undefined,
      label: "All categories",
    },
    ...categories.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
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

  return (
    <Flex mt={"60px"} direction={"column"} alignItems={"center"} mb={"100px"}>
      <Box fontWeight={"bold"} fontSize={"2xl"} mb={"20px"}>
        Q&A Knowledgebase
      </Box>
      <Flex
        fontWeight={"bold"}
        fontSize={"xl"}
        mb={"50px"}
        w={"1000px"}
        p={"20px"}
        borderWidth={"1px"}
        borderRadius={"10px"}
        borderColor={"gray.300"}
        boxShadow={"md"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"gray.700"}
      >
        <Box>Category</Box>
        <Spacer />
        <Box
          w={"300px"}
          fontWeight={"normal"}
          color={"gray.600"}
          fontSize={"medium"}
        >
          <Select
            value={selectedOption}
            onChange={handleChange}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options={options}
          />
        </Box>
      </Flex>
      <VStack spacing={"20px"}>
        {questionsData
          ?.sort((a, b) => b.createdAt - a.createdAt)
          .filter((question) =>
            selectedOption && selectedOption.value
              ? question?.category?.id === parseInt(selectedOption.value)
              : true
          )
          .map((question) => (
            <Box
              w={"1000px"}
              borderRadius={"20px"}
              boxShadow={"md"}
              p={"20px"}
              borderWidth={"1px"}
              borderColor={"gray.300"}
              key={question.id}
            >
              <Badge variant="subtle" colorScheme="green">
                {question.category?.name}
              </Badge>
              <Box fontWeight={"bold"} fontSize={"2xl"} color={"gray.700"}>
                {question.content}
              </Box>
              <Box color={"gray.300"} fontWeight={"bold"} mt={"10px"}>
                {question.creator.username}
              </Box>
              <Box
                color={"gray.300"}
                fontWeight={"bold"}
                mb={"10px"}
                fontSize={"small"}
              >
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
