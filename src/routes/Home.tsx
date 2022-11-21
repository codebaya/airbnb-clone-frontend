import {Box, Grid, Skeleton, SkeletonText} from "@chakra-ui/react";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import {useQuery} from "@tanstack/react-query";
import {getRooms} from "../components/api";

interface IPhoto {
    pk: string;
    file: string;
    description: string;
}

interface IRoom {
    pk: number,
    name: string;
    city: string;
    country: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IPhoto[];

}

export default function Home() {
    const {isLoading, data} = useQuery<IRoom[]>(["rooms"], getRooms);
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
            {data?.map((room)=>(
                <Room
                    imageURL={room.photos[0].file}
                    // imageURL={
                    // room.photos[0]?.file ??
                    // `https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/5a06ec14-3591-459f-86ec-dfe5be7c203c.jpeg`
                    // }

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