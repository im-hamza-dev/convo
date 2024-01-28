import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import GroupChatModal from "../../Common/GroupChatModal";

import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axiosApi from "../../../services/axiosInstance";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../../Common/ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "../../Common/ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../../config/ChatLogics";
import UserListItem from "../../UserAvatar/UserListItem";
import { ChatState } from "../../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosApi.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axiosApi.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        bg="brand.lightBg"
        w="100%"
        p="5px 10px 5px 10px"
        h="70px"
      >
        <div>
          <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              outline="none"
              _hover={{ backgroundColor: "transparent" }}
              _active={{ backgrounColor: "transparent" }}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>{" "}
        <Tooltip
          label="Search Users to chat"
          hasArrow
          placement="bottom-end"
          flex="1"
        >
          <Button
            w={"90%"}
            variant="ghost"
            onClick={onOpen}
            bg="brand.darkBg"
            color="brand.secondaryText"
            _hover={{ backgroundColor: "#2a3942" }}
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Menu>
          <MenuButton p={1}>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
              style={{ color: "white", cursor: "pointer" }}
            />
            <BellIcon fontSize="2xl" m={1} color="brand.secondaryText" />
          </MenuButton>
          <MenuList pl={3} variant="dark">
            {!notification.length && "No New Messages"}
            {notification.map((notif) => (
              <MenuItem
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}
                pl="10px"
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Box pb={3} px={3} pt={2}>
          <GroupChatModal>
            <AddIcon style={{ color: "#D6D6D6", cursor: "pointer" }} />
          </GroupChatModal>
        </Box>
      </Flex>

      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        size="md"
        style={{ width: "39%" }}
      >
        <DrawerOverlay />
        <DrawerContent bg="brand.darkBg">
          <DrawerHeader
            borderBottomWidth="0.5px"
            borderColor="#2b353a"
            color="brand.secondaryText"
          >
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <br />
            <Box display="flex" pb={2}>
              <Input
                color="brand.secondaryText"
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
