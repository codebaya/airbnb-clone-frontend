import {createBrowserRouter} from "react-router-dom";
import Root from "./components/Root";
import EditRoom from "./routes/EditRoom";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import RoomBookChecking from "./routes/RoomBookChecking";
import RoomDetail from "./routes/RoomDetail";
import UploadPhotos from "./routes/UploadPhotos";
import UploadRoom from "./routes/UploadRoom";

const router = createBrowserRouter(

    [{
        path: "/",
        element: <Root />,
        errorElement: <NotFound/>,
        children: [
            {
                path:"",
                element: <Home />
            },
            {
                path:"rooms/upload",
                element: <UploadRoom />
            },

            {
                path:"rooms/:roomPk",
                element: <RoomDetail />
            },
            {
                path:"rooms/:roomPk/edit",
                element: <EditRoom />
            },
            {
                path:"rooms/:roomPk/bookings",
                element: <RoomBookChecking />
            },
            {
                path:"rooms/:roomPk/photos",
                element: <UploadPhotos />
            },
            {
                path:"social",
                children: [
                    {
                        path:"github",
                        element: <GithubConfirm />
                    },
                    {
                        path:"kakao",
                        element: <KakaoConfirm />
                    }
                ],


            }

        ]

    }]
)

export default router;