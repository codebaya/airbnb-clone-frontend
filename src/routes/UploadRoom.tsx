import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../components/HostOnlyPage";
import {
    Box, Button,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel, Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon, Select, Textarea,
    VStack
} from "@chakra-ui/react";
import {FaBed, FaMoneyBill, FaToilet,} from "react-icons/fa";
import {getAmenities, getCategories} from "../api";
import {useQuery} from "@tanstack/react-query";
import {IAmenity, ICategory} from "../types";
export default function UploadRoom() {
    const { data:amenities, isLoading:isAmenitiesLoading} = useQuery<IAmenity[]>(["amenities"], getAmenities)
    // console.log(data:amenities )
    const {data:categories, isLoading:isCategoriesLoading} = useQuery<ICategory[]>(["categories"], getCategories)
    useHostOnlyPage();
    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{base: 10, lg:40,}} >
                <Container>
                    <Heading textAlign={"center"} >Upload Room</Heading>
                    <VStack spacing={5} as={"form"} mt={5}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input  required type="text" />
                            <FormHelperText>Write the name of your room</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input  required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input  required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input  required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children="$USD" />
                                <Input  required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaMoneyBill />} />
                                <Input  required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Room</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input  required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input  type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea></Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Pet friendly</FormLabel>
                            <Checkbox />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of room</FormLabel>
                            <Select placeholder="Choose a kind">
                                <option value="entire_place">Entire Place</option>
                                <option value="private_room">Private Room</option>
                                <option value="shared_room">Shared Room</option>
                            </Select>
                            <FormHelperText>What kind of room are you renting?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select placeholder="Choose a category">
                                {categories?.map((category) => (
                                    <option key={category.pk} value={category.pk}>
                                    {category.name}</option>
                                ))}

                            </Select>
                            <FormHelperText>What category describes your rooms?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Amenities</FormLabel>
                            <Grid templateColumns={"1fr 1fr"} gap={5}>
                                {amenities?.map((amenity) => (
                                    <Box key={amenity.pk}>
                                        <Checkbox>{amenity.name}</Checkbox>
                                        <FormHelperText>{amenity.description}</FormHelperText>
                                    </Box>
                                ))}
                            </Grid>
                        </FormControl>
                        <Button colorScheme={"red"} size="lg" w={"100%"}>Upload Room</Button>

                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    )
}