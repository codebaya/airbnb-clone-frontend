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
    VStack, useToast, Table, Th, Thead, Tr, Tbody, Td, Tfoot, TableContainer, TableCaption
} from "@chakra-ui/react";
import {FaBed, FaMoneyBill, FaToilet,} from "react-icons/fa";
import {
    getAmenities,
    getCategories,
    getRoom,
    getRoomReviews,
    IUploadRoomVarious,
    editRoom,
    IEditRoomVariables, getBookings
} from "../api";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IAmenity, ICategory, IReview, IRoomBooking, IRoomDetail} from "../types";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import useUser from "../lib/useUser";
import {useState} from "react";
import Booking from "../components/Booking";

export default function RoomBookChecking() {
    const { roomPk } = useParams();
    const { user } = useUser();
    const { isLoading, data } = useQuery<IRoomBooking[]>([`rooms`, roomPk], getBookings);

    console.log("booking data", data);
    console.log("booking isLoading", isLoading);


    return (

        <Grid>
            {data?.map((booking) => (
                <>
                    <Booking
                        key={booking.pk}
                        pk={booking.pk}
                         check_in={booking.check_in}
                         check_out={booking.check_out}
                         guests={booking.guests}
                         kind={booking.kind}
                         name={booking.name}
                    />
                </>


            ))}
        </Grid>






    )
}