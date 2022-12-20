import {Box, Grid, Skeleton, SkeletonText} from "@chakra-ui/react";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import {useQuery} from "@tanstack/react-query";
import {getRooms} from "../api";
import {IRoomList} from "../types";
import {useEffect} from "react";

export default function Home() {
    useEffect(() => {
        console.log("home!")
    }, [])
    const {isLoading, data} = useQuery<IRoomList[]>(["rooms"], getRooms);
    return (
        <Grid mt={10} px={40} columnGap={4} rowGap={5} templateColumns={{
            sm: "1fr",
            md:"1fr 1fr",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
            "2xl": "repeat(5, 1fr)",

        }}>
            {isLoading ? (
                <>
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                </>
            ): null }
            {/*<Link to="/assa">404</Link>*/}
            {data?.map((room)=>(
                <Room
                    key={room.pk}
                    pk={room.pk}
                    isOwner={room.is_owner}
                    imageURL={
                    room.photos[0]?.file ??
                    `https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg`
                    }

                    name={room.name}
                    rating={room.rating}
                    city={room.city}
                    country={room.country}
                    price={room.price}

                />
            ))}
        </Grid>
    );
}