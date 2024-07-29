import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/ChatBox/ChatBox";
import ChatMenu from "../components/ChatMenu/ChatMenu";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        w="90%"
        h="90vh"
        margin={"3% auto 0%"}
        gap={10}
      >
        {user && (
          <>
            <ChatMenu fetchAgain={fetchAgain} />
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </>
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
