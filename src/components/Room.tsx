import {Box, Button, color, Grid, HStack, Image, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {FaCamera, FaRegHeart, FaStar} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

interface IRoomProps {
    imageURL: string;
    name: string;
    isOwner: boolean;
    rating: number;
    city: string;
    country: string;
    price: number;
    pk:number;
}

export default function Room({pk, isOwner, imageURL, name, rating, city, country, price}: IRoomProps) {

    const gray = useColorModeValue("gray.600", "gray.300");
    const navigate = useNavigate();
    const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`)
    }
    return (
        <Link to={`/rooms/${pk}`}>
            <VStack spacing={-0.5} alignItems="flex-start">
                    <Box position={"relative"} mb={3} overflow={"hidden"} rounded={"3xl"}>
                        <Image objectFit={"cover"} minH="280" src={imageURL} />
                        <Button onClick={onCameraClick} variant="unstyled" position={"absolute"} top="0" right={-2} color="white" >
                            {isOwner ? <FaCamera size="20px" /> : <FaRegHeart />}</Button>
                    </Box>
                    <Box>
                        <Grid gap="2" templateColumns={"4fr 1fr"}>
                            <Text as={"b"} noOfLines={1} fontSize="sm" >{name}</Text>
                            <HStack _hover={{color:"red.700"}} spacing={2} alignItems="center">
                                <FaStar size="12px"/>
                                <Text>{rating}</Text>
                            </HStack>
                        </Grid>
                        <Text noOfLines={1} fontSize="sm" color={gray} >{city}, {country}</Text>

                    </Box>
                    <Text noOfLines={1} fontSize="sm" color={gray} >
                        <Text as={"b"}>{price}</Text> / night
                    </Text>

            </VStack>
        </Link>

    )
}