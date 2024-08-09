import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axiosApi from "../../api/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axiosApi.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px" width={"400px"} marginBottom={"30px"}>
      <FormControl id="email" isRequired marginBottom={"30px"}>
        <FormLabel
          position={"relative"}
          zIndex={10}
          marginBottom={"-35px"}
          marginLeft={"20px"}
          color="brand.secondaryText"
        >
          Email Address
        </FormLabel>
        <Input
          variant="unstyled"
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          border="none"
          height="70px"
          padding={"35px 20px 15px"}
          borderRadius={"15px"}
          backgroundColor="rgba(29, 31, 43, 0.4) !important"
          _focus={{
            outlineColor: "brand.vlightBg",
            outlineOffset: "0px",
            color: "brand.primaryText",
            outlineWidth: "3px",
          }}
          outline={"none"}
          backdropBlur={5}
          boxShadow={
            "0 4px 30px rgba(0, 0, 0, 0.15), inset 0 0 100px rgba(29, 31, 43, 0.4)"
          }
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel
          position={"relative"}
          zIndex={10}
          marginBottom={"-35px"}
          marginLeft={"20px"}
          maxWidth={"100px"}
          color="brand.secondaryText"
        >
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            variant="unstyled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            height="70px"
            border="none"
            padding={"35px 20px 15px"}
            borderRadius={"15px"}
            bg="rgba(29, 31, 43, 0.4) !important"
            _focus={{
              outlineColor: "brand.vlightBg",
              outlineOffset: "0px",
              color: "brand.primaryText",
              outlineWidth: "3px",
            }}
            outline={"none"}
            backdropBlur={5}
            boxShadow={
              "0 4px 30px rgba(0, 0, 0, 0.15), inset 0 0 100px rgba(29, 31, 43, 0.4)"
            }

            // backdropBlur={5}
            // boxShadow={
            //   "0 4px 30px rgba(0, 0, 0, 0.15), inset 0 0 100px rgba(29, 31, 43, 0.4)"
            // }
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        bg="brand.vlightBg"
        marginBottom={"20px"}
        borderRadius={"25px"}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
