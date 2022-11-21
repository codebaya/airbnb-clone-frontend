import {
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import {FaAirbnb, FaMoon, FaSun} from "react-icons/fa";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
interface LoginModalProps {
    isOpen:boolean;
    onClose:() => void;
    onOpen:() => void;
}
export default function Header() {
    const {isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure();
    const {isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen} = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    return (
        <Stack justifyContent={"space-between"}
            py={"5"} px={"40"}
            borderBottomWidth={1}
            alignItems={"center"}
            direction={{
                sm:"column",
                md:"row",
            }}
               spacing={{
                   sm:"4",
                   md: "2",
               }}

        >
            <Box color={logoColor}>
                <FaAirbnb size={"48px"} />
            </Box>
            <HStack spacing="2">
                <IconButton onClick={toggleColorMode} icon={<Icon />}
                    variant={"ghost"} aria-label="Toggle dark mode" />
                <Button onClick={onLoginOpen}>Log In</Button>
                <LightMode>
                    <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign Up</Button>
                </LightMode>
            </HStack>
            <LogInModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <LightMode>
                <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
            </LightMode>
        </Stack>
    )
}