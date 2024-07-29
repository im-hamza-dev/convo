import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack mx="">
      {new Array(8).fill("1").map((x) => (
        <Skeleton
          height="55px"
          bg="#1d1f2b"
          mx="0px"
          borderRadius={10}
          opacity={0.1}
        />
      ))}
    </Stack>
  );
};

export default ChatLoading;
