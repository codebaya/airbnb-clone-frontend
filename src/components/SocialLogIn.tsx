import {Box, Button, Divider, HStack, Text, VStack} from "@chakra-ui/react";
import {FaComment, FaGithub} from "react-icons/fa";

export default function SocialLogIn() {
    return (
        <Box mb={4}>
            <HStack my={5}>
            <Divider />
            <Text textTransform="uppercase" fontSize="xs" color={"gray.500"} as={"b"} >Or</Text>
            <Divider />
        </HStack>
        <VStack>
            <Button leftIcon={<FaGithub />} colorScheme={"telegram"} w={"100%"}>Continue to GitHub</Button>
            <Button leftIcon={<FaComment />} colorScheme={"yellow"} w={"100%"}>Continue to Kakao</Button>
        </VStack>
        </Box>
    )
}
