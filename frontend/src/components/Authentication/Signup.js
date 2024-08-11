import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useHistory } from "react-router";
import axiosApi from "../../api/axiosInstance";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axiosApi.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="30px" width={"400px"} marginBottom={"30px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel
          position={"relative"}
          zIndex={10}
          marginBottom={"-35px"}
          marginLeft={"20px"}
          color="brand.secondaryText"
        >
          Name
        </FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
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
      <FormControl id="email" isRequired>
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
          color="brand.secondaryText"
        >
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
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
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel
          position={"relative"}
          zIndex={10}
          marginBottom={"-35px"}
          marginLeft={"20px"}
          color="brand.secondaryText"
        >
          Confirm Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
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
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}
      <Button
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
        bg="brand.vlightBg"
        marginBottom={"20px"}
        borderRadius={"25px"}
        outline={"none"}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
