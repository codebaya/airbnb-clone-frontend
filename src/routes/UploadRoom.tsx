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
    Input, Text,
    InputGroup,
    InputLeftAddon, Select, Textarea,
    VStack, useToast
} from "@chakra-ui/react";
import {FaBed, FaMoneyBill, FaToilet,} from "react-icons/fa";
import {getAmenities, getCategories, IUploadRoomVarious, uploadRoom} from "../api";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IAmenity, ICategory, IRoomDetail} from "../types";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export default function UploadRoom() {
    const { register, handleSubmit } = useForm<IUploadRoomVarious>();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(uploadRoom, {
        onSuccess:(data:IRoomDetail) => {
            toast({
                status: "success",
                title: "Room Created",
                position: "bottom-right",
            });
            navigate(`/rooms/${data.id}`);
        }
    });
    const { data:amenities, isLoading:isAmenitiesLoading} = useQuery<IAmenity[]>(["amenities"], getAmenities)
    const {data:categories, isLoading:isCategoriesLoading} = useQuery<ICategory[]>(["categories"], getCategories)
    useHostOnlyPage();
    const onSubmit = (data:IUploadRoomVarious) => {
        mutation.mutate(data);
        console.log("data_from uploadRoom", data)
    }
    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{base: 10, lg:40,}} >
                <Container>
                    <Heading textAlign={"center"} >Upload Room</Heading>
                    <VStack spacing={5} as={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input {...register("name", {required:true})} required type="text" />
                            <FormHelperText>Write the name of your room</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input {...register("country", {required:true})} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input {...register("city", {required:true})} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input {...register("address", {required:true})} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children="$USD" />
                                <Input {...register("price", {required:true})} required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Room</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input {...register("rooms", {required:true})} required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input {...register("toilets", {required:true})} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea {...register("description", {required:true})}></Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Pet friendly</FormLabel>
                            <Checkbox {...register("pet_friendly", {required:true})} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of room</FormLabel>
                            <Select {...register("kind", {required:true})} placeholder="Choose a kind">
                                <option value="entire_place">Entire Place</option>
                                <option value="private_room">Private Room</option>
                                <option value="shared_room">Shared Room</option>
                            </Select>
                            <FormHelperText>What kind of room are you renting?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select {...register("category", {required:true})}placeholder="Choose a category">
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
                                        <Checkbox value={amenity.pk} {...register("amenities", {required:true})}> {amenity.name}</Checkbox>
                                        <FormHelperText>{amenity.description}</FormHelperText>
                                    </Box>
                                ))}
                            </Grid>
                        </FormControl>
                        {mutation.isError ? <Text color="red.500">Something went worng</Text> : null}
                        <Button isLoading={mutation.isLoading} type="submit"  mt={4} mb={3} colorScheme={"red"} size="lg" w={"100%"}>Upload Room</Button>

                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    )
}