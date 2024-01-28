import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack mx="20px">
      <Skeleton height="45px" bg="brand.lightBg" mx="0px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
      <Skeleton height="45px" bg="brand.lightBg" mx="20px" />
    </Stack>
  );
};

export default ChatLoading;
