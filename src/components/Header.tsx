import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    ToastId,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import {FaAirbnb, FaMoon, FaSun} from "react-icons/fa";
import { Link } from "react-router-dom";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import {logOut} from "../api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useRef } from "react";

interface LoginModalProps {
    isOpen:boolean;
    onClose:() => void;
    onOpen:() => void;
}


export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const {isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure();
    const {isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen} = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const queryClient = useQueryClient();
    const toastId = useRef<ToastId>();
    const mutation = useMutation(logOut, {
        onMutate:() => {
            toastId.current = toast({
                title: "Good Bye",
                description: "It's on the process!",
                status: "loading",
                position: "bottom-right",
            });
        },
        onSuccess:() => {
            if(toastId.current) {
                queryClient.refetchQueries(["me"])
                toast.update(toastId.current, {
                    status: "success",
                    title: "Done",
                    description: "See you later"
                });
            }
        },
    });
    const onLogOut = async() => {
        mutation.mutate()
    }
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
            <Link to="/">
                <Box color={logoColor}>
                    <FaAirbnb size={"48px"} />
                </Box>
            </Link>
            <HStack spacing="2">
                <IconButton onClick={toggleColorMode} icon={<Icon />}
                    variant={"ghost"} aria-label="Toggle dark mode" />
                {!userLoading ? (!isLoggedIn ? (
                    <>
                      <Button onClick={onLoginOpen}>Log in</Button>
                      <LightMode>
                        <Button onClick={onSignUpOpen} colorScheme={"red"}>
                          Sign up
                        </Button>
                      </LightMode>
                    </>
                ) : (
                    <Menu>
                        <MenuButton>
                            <Avatar name={user?.name} src={user?.avatar} size={"md"} />
                        </MenuButton>
                        <MenuList>
                            {user?.is_host ? <Link to="/rooms/upload/"><MenuItem>Upload room</MenuItem></Link> : null }
                            <MenuItem onClick={onLogOut} >Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                    )
                ) : null}


            </HStack>
            <LogInModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <LightMode>
                <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
            </LightMode>
        </Stack>
    )
}