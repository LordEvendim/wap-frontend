import { Box, Flex } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <Flex mt={"60px"} direction={"column"} alignItems={"center"} mb={"100px"}>
      <Box fontWeight={"bold"} fontSize={"2xl"} mb={"20px"}>
        Q&A Knowledgebase
      </Box>
      <Box w={"1000px"}>
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Q&A Knowledgebase</strong>, your premier
          destination for reliable and comprehensive answers to all your
          questions. Whether you're seeking insights on everyday topics,
          professional advice, or in-depth explanations, our knowledge base is
          designed to provide you with accurate and timely information.
        </p>

        <h2>Our Mission</h2>
        <p>
          At <strong>Q&A Knowledgebase</strong>, our mission is to make
          knowledge accessible to everyone. We believe that every question
          deserves a clear, precise, and well-researched answer. Our team of
          experts and contributors works diligently to ensure that you have the
          information you need at your fingertips.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Comprehensive Coverage</strong>: Our knowledge base spans a
            wide range of topics, from technology and science to health and
            lifestyle. No matter what you're curious about, you'll find the
            answers here.
          </li>
          <li>
            <strong>Expert Contributors</strong>: Our content is crafted by
            professionals and enthusiasts who are passionate about sharing their
            knowledge. Each answer is meticulously researched and verified to
            ensure accuracy.
          </li>
          <li>
            <strong>User-Friendly Interface</strong>: We prioritize ease of use,
            with a clean and intuitive design that makes finding information
            simple and straightforward.
          </li>
          <li>
            <strong>Community Engagement</strong>: We value our community's
            input. Users can contribute by asking questions, providing feedback,
            and even submitting answers. Together, we create a dynamic and
            ever-evolving repository of knowledge.
          </li>
        </ul>

        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Accuracy</strong>: We are committed to providing precise and
            reliable information. Every piece of content goes through a rigorous
            review process.
          </li>
          <li>
            <strong>Accessibility</strong>: Knowledge should be available to
            everyone. Our platform is designed to be easy to navigate, ensuring
            that you can find the information you need quickly.
          </li>
          <li>
            <strong>Community</strong>: We believe in the power of collective
            knowledge. Our community of users plays a vital role in enriching
            our content and helping each other learn.
          </li>
        </ul>

        <h2>Join Us</h2>
        <p>
          Become a part of the <strong>Q&A Knowledgebase</strong> community
          today! Whether you're here to find answers or to share your expertise,
          we welcome you with open arms. Together, we can build a smarter and
          more informed world.
        </p>
        <p>
          For any questions or feedback, feel free to contact us at{" "}
          <a href="mailto:email@email.com">email@email.com</a>.
        </p>

        <p>
          Thank you for choosing <strong>Q&A Knowledgebase</strong> as your
          trusted knowledge base. Let's explore the world of information
          together!
        </p>
      </Box>
    </Flex>
  );
}
