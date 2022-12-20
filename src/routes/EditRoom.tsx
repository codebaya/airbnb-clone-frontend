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
import {
    getAmenities,
    getCategories,
    getRoom,
    getRoomReviews,
    IUploadRoomVarious,
    editRoom,
    IEditRoomVariables
} from "../api";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IAmenity, ICategory, IReview, IRoomDetail} from "../types";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import useUser from "../lib/useUser";
import {useState} from "react";

export default function EditRoom() {
    const { register, handleSubmit } = useForm<IEditRoomVariables>();
    const { roomPk } = useParams();
    const { user } = useUser();
    const { data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);

    // const { data: reviewsData} = useQuery<
    //     IReview[]
    // >([`rooms`, roomPk, `reviews`], getRoomReviews);
    // console.log("dataEdit", data);

    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(editRoom, {
        onSuccess:(data:IRoomDetail) => {
            toast({
                status: "success",
                title: "Room updated!",
                position: "bottom-right",
            });
            navigate(`/rooms/${roomPk}`);
        }
    });

    const { data:amenities, isLoading:isAmenitiesLoading} = useQuery<IAmenity[]>(["amenities"], getAmenities)
    const {data:categories, isLoading:isCategoriesLoading} = useQuery<ICategory[]>(["categories"], getCategories)
    useHostOnlyPage();
    const onSubmit = (data:IEditRoomVariables) => {
        if (roomPk) {
            data['roomPk'] = roomPk;
            mutation.mutate(data);
            console.log("datacol", data)
        }
    }

    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{base: 10, lg:40,}} >
                <Container>
                    <Heading textAlign={"center"} >Edit Room</Heading>
                    <VStack spacing={5} as={"form"} onSubmit={handleSubmit(onSubmit)}>
                        {/*<FormControl>*/}
                        {/*    <FormLabel>test</FormLabel>*/}
                        {/*    <input*/}
                        {/*    onChange={onChange}*/}
                        {/*    name="name"*/}
                        {/*    value={data?.name}*/}
                        {/*    placeholder="Name"*/}
                        {/*  />*/}
                        {/*    <FormHelperText>Write the name of your room</FormHelperText>*/}
                        {/*</FormControl>*/}
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input defaultValue={data?.name} {...register("name", {required:true})} type="text" >
                                {/*{data?.name}*/}
                            </Input>
                            <FormHelperText>Write the name of your room</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input defaultValue={data?.country} {...register("country", {required:true})} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input defaultValue={data?.city} {...register("city", {required:true})} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input defaultValue={data?.address} {...register("address", {required:true})} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children="$USD" />
                                <Input defaultValue={data?.price} {...register("price", {valueAsNumber:true})} required type="number" />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Room</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input defaultValue={data?.rooms} {...register("rooms", {required:true})} required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input defaultValue={data?.rooms} {...register("toilets", {required:true})} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea defaultValue={data?.description} {...register("description", {required:true})}></Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Pet friendly</FormLabel>
                            <Checkbox  {...register("pet_friendly", {required:true})} checked={data?.pet_friendly} />
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