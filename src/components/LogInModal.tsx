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
import {FaLock, FaUserNinja} from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
interface LoginModalProps {
    isOpen:boolean;
    onClose: () => void;
}

export default function LogInModal({isOpen, onClose}:LoginModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} >
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader>Log In</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <VStack>
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
                                            <FaLock />
                                        </Box>}/>
                                        <Input variant={"filled"} placeholder={"Password"}></Input>
                                    </InputGroup>
                                </VStack>
                                <Button mt={4} mb={3} colorScheme={"red"} w={"100%"} >
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