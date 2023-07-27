import { Outlet } from 'react-router-dom';
// Outlet:將該path底下的children path渲染到此組件的標記
import MainNavigation from '../components/navigation/MainNavigation';
const RootLayout = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
