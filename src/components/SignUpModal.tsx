import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement, Modal, ModalBody, ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import {FaEnvelope, FaLock, FaLockOpen, FaUserNinja, FaUserSecret} from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
interface SignUpModalProps {
    isOpen:boolean;
    onClose: () => void;
}

export default function SignUpModal({isOpen, onClose}:SignUpModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} >
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader>Sign Up</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <VStack>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaUserSecret />
                                        </Box>}/>
                                        <Input variant={"filled"} placeholder={"Name"}></Input>
                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaUserNinja/>
                                        </Box>}/>
                                        <Input variant={"filled"} placeholder={"Username"}></Input>
                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaEnvelope />
                                        </Box>}/>
                                        <Input variant={"filled"} placeholder={"Email"}></Input>
                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaLockOpen />
                                        </Box>}/>
                                        <Input variant={"filled"} placeholder={"Password "}></Input>
                                    </InputGroup>
                                    <InputGroup>
                                    <InputLeftElement children={
                                        <Box color={"gray.500"}>
                                            <FaLock />
                                        </Box>}/>
                                        <Input variant={"filled"} placeholder={"Password Confirmation"}></Input>
                                    </InputGroup>

                                </VStack>
                                <Button mt={4} mb={3} colorScheme={"red"} w={"100%"} >
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