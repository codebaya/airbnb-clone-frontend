import {
  Avatar,
  Badge,
  Box, Button,
  Card,
  CardBody,
  Container, Divider, FormControl, FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image, Input, InputGroup, MenuItem, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField,
  NumberInputStepper, position,
  Skeleton,
  Stack,
  StackDivider,
  Text, useToast,
  VStack,
} from "@chakra-ui/react";
import {FaMapMarkerAlt, FaStar} from "react-icons/fa";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Link, useNavigate, useParams} from "react-router-dom";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../calendar.css";
import {checkBooking, getRoom, getRoomReviews, IRoomBookingVariables, IUploadRoomVarious, roomBooking} from "../api";
import {IReview, IRoomBooking, IRoomDetail} from "../types";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import useUser from "../lib/useUser";
import {useForm} from "react-hook-form";
import {formatDate} from "../lib/formatDate";

export default function RoomDetail() {
  const { register, handleSubmit, reset, watch } = useForm<IRoomBookingVariables>();
  const { roomPk } = useParams();
  const { user } = useUser();
  console.log("watch", watch())
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData} = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);
  // console.log("dataFetched", data);
    const [dates, setDates] = useState<Date[]>();
    const toast = useToast();
    // const user = useUser();
    const navigate = useNavigate();
  const { data:checkBookingData, isLoading: isCheckingBooking } = useQuery([
      "check", roomPk, dates], checkBooking,
      {
            cacheTime: 0,
            enabled: dates !== undefined,
            });
  console.log("roomdetail", data, checkBookingData)

  const mutation = useMutation(roomBooking, {
      onSuccess:(data) => {
        toast({
          status: 'success',
          title: 'Room Booking Completed',
          position: "bottom-right",
        })
        navigate(`bookings`)
      }

    })

  const onSubmit = () => {
    if (!user) {
      toast({
        status: "error",
        title: "LogIn Error",
        description: "Please log in now",
        position: "bottom-right",
      })
    }
    if (roomPk && dates && user && data) {
      const [firstDate, secondDate] = dates;
      const check_in = formatDate(firstDate);
      const check_out = formatDate(secondDate);
      const guests = watch("guests");
      const name = data?.name;
      mutation.mutate({check_in, check_out, roomPk, name, guests, }, {
        onSuccess:() => {
            toast({
                status: "success",
                title: "Room Booking Success",
                isClosable:true,
                description: "Enjoy your staying"
            })
            reset();
        }
      })
      console.log(check_in, check_out, roomPk, guests, user)
    }
    reset()

    }
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data?data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} minW="25%" isLoaded={!isLoading}>
        <HStack>
          <Heading mr={5}>{data?.name} </Heading>

          {user?.is_host ?
              <Link to="edit">
            <Text fontSize="24px" color={"grey"}>edit</Text>
          </Link>
              : null }
        </HStack>
      </Skeleton>
      <HStack my={5}>
          <FaMapMarkerAlt />
          <Text>{data?.address}</Text>
        </HStack>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 4 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={"2fr 1fr"} >
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} minW="25%" height={"30px"}>
                <Heading fontSize={"2xl"} >
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>∙</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text>∙</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size="md"
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
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
        <Box  pt={10}>
          {/*<VStack>*/}

          {/*</VStack>*/}
          <VStack as={"form"} onSubmit={handleSubmit(onSubmit)} id={"hstack"}  mt={3} >
              <Calendar
                onChange={setDates}
                prev2Label={null}
                next2Label={null}
                minDetail="month"
                minDate={new Date()}
                maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
                selectRange

              />
            {/*<Divider mt={3}/>*/}

              <Box id={"hstack2"} >
                <HStack mt={3} justifyContent={"space-between"}>
                  <Text  fontSize='lg' fontWeight='thin'>
                    Guests
                  </Text>
                  <NumberInput mt={4} maxW={40} defaultValue={1} min={1} >
                  <NumberInputField {...register("guests", {
                                          required: true,
                                      })} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                  </NumberInput>
                </HStack>

              </Box>


              <Button type="submit"
                  disabled={!checkBookingData?.ok}
                  // isLoading={isCheckingBooking}
                      mt={10} w={"100%"} colorScheme={"red"}
              >
                Make Booking
              </Button  >
              {!isCheckingBooking && !checkBookingData?.ok ? (
                  <Text color={"red.500"} mt={5} textAlign={"center"}>Can't book on those dates !</Text>
              ) : null }
            </VStack>

        </Box>
      </Grid>
    </Box>
  );
}