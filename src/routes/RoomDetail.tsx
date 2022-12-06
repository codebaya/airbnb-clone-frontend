import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getRoom, getRoomReviews} from "../api";
import {IRoomDetail, IReview} from "../types";
import {Avatar, Box, Container, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack} from "@chakra-ui/react";
import RoomSkeleton from "../components/RoomSkeleton";
import {FaStar} from "react-icons/fa";

export default function RoomDetail() {
    const {roomPk} = useParams();
    const {isLoading, data} = useQuery<IRoomDetail>(
        [`rooms`, roomPk], getRoom);
    const {data:reviewsData, isLoading:isReviewsLoading} = useQuery<IReview[]>([`rooms`, roomPk, `reviews`], getRoomReviews)
    return (
        <Box my={10} px={{
            base: 10, lg: 40,
        }} >
            <Skeleton height={"43px"} width={"35%"} isLoaded={!isLoading}>
                <Heading>{data?.name}</Heading>
            </Skeleton>
            <Grid mt={6} gap={3} height={"60vh"}
                  rounded="lg" overflow={"hidden"}
                  templateRows={"1fr, 1fr"}
                templateColumns={"repeat(4, 1fr)"}>
                {[0, 1, 2, 3, 4].map((index)=> (
                    <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1}overflow={"hidden"} key={index}>
                        <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
                            <Image objectFit={"cover"} w={"100%"} h={"100%"} src={data?.photos[index].file}/>

                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <HStack w="60%" justifyContent={"space-between"} mt={10}>
                <VStack alignItems={"flex-start"} >
                    <Skeleton isLoaded={!isLoading}  height={"30px"}>
                        <Heading fontSize={"2xl"}>
                        House hosted by {data?.owner.username}
                    </Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading}  height={"30px"}>
                        <HStack justifyContent={"flex-start"} w={"100%"} >
                            <Text>
                                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                            </Text>
                            <Text>•</Text>
                            <Text>
                                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                            </Text>


                        </HStack>
                    </Skeleton>

                </VStack>
                <Avatar size="xl" src={data?.owner.avatar} />
            </HStack>
            <Box mt={10}>
                <Heading fontSize={"2xl"} >
                    <HStack mb={10}>
                        <FaStar /><Text>{data?.rating}</Text>
                        <Text>•</Text>
                        <Text>{reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}</Text>
                    </HStack>
                </Heading>
                <Container maxW="container.lg" marginX="none">
                    <Grid gap={10} templateColumns={"1fr, 1fr"}>
                        {reviewsData?.map((review, index) => (
                            <VStack alignItems={"flex-start"} key={index}>
                                <HStack>
                                    <Avatar name={review.user.name}
                                    src={review.user.avatar}
                                        size="md"/>
                                    <VStack spacing={0} alignItems={"flex-start"}>
                                        <Heading fontSize={"md"} >
                                            {review.user.name}</Heading>
                                        <HStack spacing={4}>
                                            <FaStar size="12px" />
                                            <Text>{review.rating}</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                                <Text>{review.payload}</Text>
                            </VStack>
                        ))}
                    </Grid>
                </Container>



            </Box>



        </Box>
    )
}