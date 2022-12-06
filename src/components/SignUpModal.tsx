import {
    Box,
    Button,
    Input, Text,
    InputGroup,
    InputLeftElement, Modal, ModalBody, ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, useToast,
    VStack
} from "@chakra-ui/react";
import {FaEnvelope, FaLock, FaLockOpen, FaUserNinja, FaUserSecret} from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ISignUPForm, userSignUp} from "../api";
interface SignUpModalProps {
    isOpen:boolean;
    onClose: () => void;
}
export default function SignUpModal({isOpen, onClose}:SignUpModalProps) {
    const { register, watch, handleSubmit, formState: {errors}, reset } = useForm<ISignUPForm>();
    // console.log(watch())
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(userSignUp,
        {
            onMutate: () => {
                console.log("mutation starting");
            },
            onSuccess: () => {
                toast({
                    title: "Create Account Successfully!",
                    status: "success",
                    variant: "left-accent",
                    position: "top",
                });
                onClose();
                queryClient.refetchQueries(['me']);
                reset();
            },
            onError:(error)=>{
                console.log(error);
            }
        }
        )
    const onSubmit = ({name, username, email, password1, password2}:ISignUPForm) => {
        if (!email.includes('@')) {
            console.log("it's not email")
            return false
        } else if (password1 !== password2){
            console.log("It does not match")
            return Error
        }
        console.log("test2 : ", email)
        mutation.mutate({name, username, email, password1, password2})
    }
    return (
        <Modal onClose={onClose} isOpen={isOpen} >
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader>Sign Up</ModalHeader>
                            <ModalCloseButton/>
                            {/*<ModalBody as="form" >*/}
                            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                                <VStack>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaUserSecret />
                                        </Box>}/>
                                        <Input isInvalid={Boolean(errors.name?.message)}{...register("name", {
                                            required: "Please write a name"
                                        })} variant={"filled"} placeholder={"Name"}></Input>
                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaUserNinja/>
                                        </Box>}/>
                                        <Input isInvalid={Boolean(errors.username?.message)}{...register("username", {
                                            required: "Please write a username"
                                        })} variant={"filled"} placeholder={"username"}>
                                        </Input>

                                        {/*<Text color={"blue.500"}>{errors.username?.message}</Text>*/}
                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaEnvelope />
                                        </Box>}/>
                                        {/*validate_value = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;"*/}
                                        {/*<Input type="email" isInvalid={Boolean(errors.email?.message)}{...register("email", {*/}
                                        {/*    required: "Please write a email", { */}
                                        {/*        pattern: { */}
                                        {/*            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;,*/}
                                        {/*        message: 'error message: not valid email address' }}*/}
                                        {/*})} variant={"filled"} placeholder={errors ? errors.email?.message : "Email"}></Input>*/}
                                        <Input type="email" isInvalid={Boolean(errors.email?.message)}
                                               {...register("email", {
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: "not valid email",
                                            },
                                            required: "Please write a email",
                                            minLength: {
                                                value: 4,
                                                message: "Write email at least 4 words"
                                            },

                                        })} placeholder="email" variant="filled"
                                                />

                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaLockOpen />
                                        </Box>}/>
                                        <Input type="password" isInvalid={Boolean(errors.password1?.message)}{...register("password1", {
                                            required: "Please write a password"
                                        })} variant={"filled"} placeholder={"Password"}></Input>

                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaLock />
                                        </Box>}/>
                                        {/*<Input type="password" isInvalid={Boolean(errors.password2?.message)}{...register("password2", {*/}
                                        {/*    required: "Password does not match"*/}
                                        {/*})} variant={"filled"} placeholder={errors ? errors.password2?.message : "Password"}></Input>*/}
                                        <Input type="password" isInvalid={Boolean(errors.password2?.message)}

                                               {...register("password2", {
                                                   required: 'Password verification is required',
                                                   minLength: {
                                                           value: 4, message: "Password must be at least 4 characters long"
                                                       },
                                                   validate: value => value != watch('password1') ? "The password fields don't match" : undefined
                                               })}
                                            variant={"filled"} placeholder={"Password"}
                                        />
                                    </InputGroup>

                                </VStack>
                                <Button isLoading={mutation.isLoading} type="submit"  mt={4} mb={3} colorScheme={"red"} w={"100%"} >
                                    Sign Up
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