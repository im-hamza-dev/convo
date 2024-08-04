import {
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const homeViews = {
  LOGIN: <Login />,
  SIGNUP: <Signup />,
};

function Homepage() {
  const history = useHistory();
  const [selectedView, setSelectedView] = useState(homeViews.LOGIN);
  const authCardRef = useRef();
  useEffect(() => {
    let authCardElem = authCardRef.current;
    if (authCardElem) {
      setTimeout(() => {
        authCardElem.style.opacity = 1;
      }, 1000);
    }

    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");

    return () => {
      if (authCardElem) {
        authCardElem.style.opacity = 0;
      }
    };
  }, [history]);

  return (
    <Container
      maxW="xl"
      marginLeft={20}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignContent={"center"}
      height={"100vh"}
    >
      <Box
        bg="brand.lightBlurBg"
        w="100%"
        p={4}
        borderRadius="20px"
        height="80vh"
        display={"flex"}
        flexDir={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        opacity={0}
        transition="1s"
        ref={authCardRef}
      >
        <Box
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Box
            as="h1"
            fontSize={"40px"}
            fontStyle={"italic"}
            color="brand.primaryText"
            marginBottom="80px"
            opacity={"0.8"}
            transition={"0.2s"}
            _hover={{
              color: "brand.vlightBg",
            }}
          >
            Convo
          </Box>
          {selectedView}
          {selectedView === homeViews.SIGNUP ? (
            <Button
              _selected={{
                backgroundColor: "brand.vlightBg",
                color: "white",
                outline: "none !important",
              }}
              onClick={() => setSelectedView(homeViews.LOGIN)}
            >
              <Box as="span" marginRight={"10px"} fontWeight={"thin"}>
                I already have an account.{" "}
              </Box>{" "}
              Login
            </Button>
          ) : (
            <Button
              _selected={{
                backgroundColor: "brand.vlightBg",
                color: "white",
                outline: "none !important",
              }}
              _hover={{
                opacity: "1",
              }}
              opacity={"0.7"}
              onClick={() => setSelectedView(homeViews.SIGNUP)}
            >
              <Box as="span" marginRight={"10px"} fontWeight={"thin"}>
                I don't have an account.{" "}
              </Box>{" "}
              Signup{" "}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Homepage;
