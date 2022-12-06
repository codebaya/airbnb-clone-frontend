import {
    Text,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement, Modal, ModalBody, ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack, useToast
} from "@chakra-ui/react";
import {FaLock, FaUserNinja} from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
import {useState} from "react";
import { useForm } from "react-hook-form";
import {Simulate} from "react-dom/test-utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogin} from "../api";
interface LoginModalProps {
    isOpen:boolean;
    onClose: () => void;
}

interface IForm {
    username: string,
    password:string,
}

export default function LogInModal({isOpen, onClose}:LoginModalProps) {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(usernameLogin,
        {
            onMutate: () => {
                console.log("mutation starting");
            },
            onSuccess: () => {
                toast({
                    title: "Welcome Back!",
                    status: "success",
                });
                onClose();
                queryClient.refetchQueries(['me']);
                reset();
            },
        });
    const onSubmit = ({username, password}:IForm) => {
        mutation.mutate({username, password})
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} >
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader>Log In</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                                <VStack>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaUserNinja/>
                                        </Box>}/>
                                        <Input isInvalid={Boolean(errors.username?.message)}{...register("username", {
                                            required: "Please write a username"
                                        })} variant={"filled"} placeholder={"Username"}></Input>
                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaLock />
                                        </Box>}/>
                                        <Input type="password" isInvalid={Boolean(errors.password?.message)}{...register("password", {
                                            required: "Please write a password"
                                        })} variant={"filled"} placeholder={"Password"}></Input>

                                    </InputGroup>
                                </VStack>
                                {mutation.isError ? ( <Text textAlign="center" mt="4" fontSize="sm" color="red.500" >Username or Password is wrong</Text>) : null}
                                <Button isLoading={mutation.isLoading} type="submit"  mt={4} mb={3} colorScheme={"red"} w={"100%"} >
                                    Log In
                                </Button>
                                <SocialLogIn />


                            </ModalBody>
                            {/*<ModalFooter>*/}
                            {/*    <Button colorScheme={"red"} w={"100%"}>Log In</Button>*/}
                            {/*</ModalFooter>*/}
                        </ModalContent>
                    </ModalOverlay>
                </Modal>

    )
}