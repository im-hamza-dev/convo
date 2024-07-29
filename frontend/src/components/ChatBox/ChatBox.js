import { Box } from "@chakra-ui/layout";
import SingleChat from "./components/SingleChat";
import { ChatState } from "../../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      w={{ base: "100%", md: "68%" }}
      borderRadius={20}
      padding={4}
      bg="rgba(29, 31, 43, 0.4)"
      backdropBlur={5}
      boxShadow={
        "0 4px 30px rgba(0, 0, 0, 0.15), inset 0 0 100px rgba(29, 31, 43, 0.4)"
      }
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
