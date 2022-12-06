import {Heading, Progress, Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {githubLogIn, ISignUPForm, userSignUp} from "../api";
import { useQueryClient} from "@tanstack/react-query";
export default function SignUpConfirm() {
    const {search} = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // const signupLogin = async() => {
    //     if ((name, username, email, password1, password2) :ISignUPForm) {
    //         console.log("testcode", code)
    //         const status = await userSignUp({name, username, email, password1, password2 }:ISignUPForm)
    //         console.log("teststatus", status)
    //         if (status === 200) {
    //             toast({
    //                 status: "success",
    //                 title: "Welcome",
    //                 position: "bottom-right",
    //                 description: "Good to See you Again",
    //             });
    //             queryClient.refetchQueries(["me"]);
    //             navigate("/")
    //         }
    //     }
    //
    // }
    useEffect(() => {
        // userSignUp();
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