import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import {Box, Button, Container, FormControl, Heading, Input, useToast, VStack} from "@chakra-ui/react";
import {useMutation} from "@tanstack/react-query";
import {createPhoto, getUploadURL, uploadImage} from "../api";

interface IForm {
    file:FileList;
}

interface IUploadURLResponse {
    id:string;
    uploadURL:string;
}

export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess:() => {
            toast({
                status: "success",
                title: "Image Upload Success",
                isClosable:true,
                description: "Feel free to upload"
            })
            reset();
        }
    });
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess:({ result }:any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                description: "I love Django",
                file: `https://imagedelivery.net/yYO5MCCCpFi5XyrevSAPbw/${result.id}/public`,
                roomPk,
            })
            }
        }
    });
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess:(data:IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
        }
    });

    useHostOnlyPage();
    const onSubmit = (data:any) => {
        console.log(data)
        uploadURLMutation.mutate();
    }
    console.log(watch())
    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{base: 10, lg:40,}} >
                <Container>
                    <Heading textAlign="center" >
                        Upload Photos
                    </Heading>
                    <VStack as={"form"} onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10} >
                        <FormControl>
                            <Input {...register("file")} type="file" accept="image/*" />
                        </FormControl>
                        <Button isLoading={
                            createPhotoMutation.isLoading ||
                            uploadURLMutation.isLoading ||
                            uploadURLMutation.isLoading
                        } type="submit" w="full" colorScheme={"red"} >
                            Upload Photos
                        </Button>
                    </VStack>
                </Container>

            </Box>
        </ProtectedPage>
    )
}