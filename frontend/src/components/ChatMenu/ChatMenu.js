import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axiosApi from "../../services/axiosInstance";
import { useEffect, useState } from "react";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "../Common/ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "./components/SideDrawer";

const ChatMenu = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosApi.get("/api/chat", config);
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
      bg="brand.darkBg"
      w={{ base: "100%", md: "32%" }}
      borderRight={"1px solid #2b353a"}
    >
      <SideDrawer />

      <Box
        d="flex"
        flexDir="column"
        bg="brand.darkBg"
        w="100%"
        h="100%"
        pt="10px"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "brand.lightBg" : "brand.darkBg"}
                color={"white"}
                _hover={{ background: "brand.lightBg" }}
                px={3}
                py={2}
                pl={"25px"}
                key={chat._id}
                colorScheme="brand"
                borderBottom={"1px solid #2b353a"}
                display="flex"
                alignItems="center"
                justifyContent={"flex-start"}
                gap="20px"
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
