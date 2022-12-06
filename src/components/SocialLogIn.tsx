import {Box, Button, Divider, HStack, Text, VStack} from "@chakra-ui/react";
import {FaComment, FaGithub} from "react-icons/fa";

export default function SocialLogIn() {

    const kakaoParams = {
        client_id : "c2d2fc16a7e706d9736a0f3a418c4513",
        redirect_uri : "http://127.0.0.1:3000/social/kakao",
        response_type : "code",
    }
    const params = new URLSearchParams(kakaoParams).toString();
    console.log(params)

    return (
        <Box mb={4}>
            <HStack my={5}>
            <Divider />
            <Text textTransform="uppercase" fontSize="xs" color={"gray.500"} as={"b"} >Or</Text>
            <Divider />
        </HStack>
        <VStack>
            <Button as="a"
                    href="https://github.com/login/oauth/authorize?client_id=12e7a8d1afb97c8c42d7&scope=read:user,user:email"

                    leftIcon={<FaGithub />}  w={"100%"}>
                Continue to GitHub</Button>
            <Button as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${params}`}
                leftIcon={<FaComment />} colorScheme={"yellow"} w={"100%"}>
                Continue to Kakao</Button>
        </VStack>
        </Box>
    )
}
