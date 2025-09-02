import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import UploadPage from '../pages/upload-page'
import CarouselPage from '../pages/carousel-page'


export const router = createBrowserRouter([
{ path: '/', element: <App />, children: [
{ index: true, element: <UploadPage /> },
{ path: 'carousel', element: <CarouselPage /> },
]}
])