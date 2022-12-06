import {Heading, Progress, Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {githubLogIn} from "../api";
import { useQueryClient} from "@tanstack/react-query";

export default function GithubConfirm() {
    const {search} = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const confirmLogin = async() => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        // console.log("testcode", code);
        if (code) {
            console.log("testcode", code)
            const status = await githubLogIn(code)
            console.log("teststatus", status)
            if (status === 200) {
                toast({
                    status: "success",
                    title: "Welcome",
                    position: "bottom-right",
                    description: "Good to See you Again",
                });
                queryClient.refetchQueries(["me"]);
                navigate("/")
            }
        }

    }
    useEffect(() => {
        confirmLogin();
    }, [])
    return (
        <VStack  justifyContent={"center"} mt={"10"} >
            <Heading  >
                Processing log in...
            </Heading>
            <Text>
                Stay with me yo~
            </Text>
            <Spinner size="lg" />
            <Progress color={"white"} size='xs'  />
        </VStack>
    )
}