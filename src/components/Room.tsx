import {Box, Button, color, Grid, HStack, Image, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {FaRegHeart, FaStar} from "react-icons/fa";

interface IRoomProps {
    imageURL: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
}

export default function Room({imageURL, name, rating, city, country, price}: IRoomProps) {
    // print("imageURL: ", imageURL);
    const gray = useColorModeValue("gray.600", "gray.300");

    return (
        // print(imageURL)
        <VStack spacing={-0.5} alignItems="flex-start">
                <Box position={"relative"} mb={3} overflow={"hidden"} rounded={"3xl"}>
                    <Image minH="280" src={imageURL} />
                    <Button variant="unstyled" position={"absolute"} top="0" right={-2} color="white" ><FaRegHeart /></Button>
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

    )
}