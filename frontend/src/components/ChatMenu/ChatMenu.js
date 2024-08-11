import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { get } from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "../Common/ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "./components/SideDrawer";

const ChatMenu = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const data = await get("/api/chat");
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      // bg="brand.darkBg"
      w={{ base: "100%", md: "32%" }}
      borderRadius={20}
      overflow={"hidden"}
      padding={4}
      bg="rgba(29, 31, 43, 0.8)"
      backdropBlur={5}
    >
      <SideDrawer />

      <Box
        d="flex"
        flexDir="column"
        // bg="brand.darkBg"
        w="100%"
        h="100%"
        pt="10px"
        overflowY="hidden"
        margin={1}
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "brand.vlightBg" : "brand.darkBg"}
                color={"white"}
                _hover={{ background: "brand.vlightBg" }}
                px={3}
                py={2}
                pl={"25px"}
                key={chat._id}
                colorScheme="brand"
                display="flex"
                alignItems="center"
                justifyContent={"flex-start"}
                gap="20px"
                borderRadius={10}
                transition={0.2}
              >
                <Box
                  borderRadius={"50%"}
                  bg={"brand.vlightBg"}
                  textAlign="center"
                  py="13px"
                  w="50px"
                  h="50px"
                >
                  {chat?.chatName?.split("")[0].toUpperCase()}
                </Box>
                <Box>
                  <Text color="brand.secondaryText">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text color="brand.secondaryText" fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default ChatMenu;
