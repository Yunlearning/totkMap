import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import ResponsiveAppBar from './MyAppBar';
// NavLink:可以在className或ˋstyle傳入函式來控制該組件，規定的參數為isActive
// end:這表明該鏈接僅應被視為活動鏈接。 如果當前活動路由在 URL 後以此路徑結束。此連結才被視為active
// 一般情況下router會將url底下的鏈視為活動連結，所以相關的鏈的action會一起活動，導致導覽按鍵一起被點亮，所以需要用end來表示當前活動的路由是該路由的結尾時才會觸發active效果
const MainNavigation = () => {
    return (
        <ResponsiveAppBar />
        // <header className={classes.header}>
        //     <nav>
        //         <ul className={classes.list}>
        //             <li>
        //                 <ResponsiveAppBar />
        //             </li>
        //             <li>
        //                 <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
        //                     Game Map
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to="/products" className={({ isActive }) => (isActive ? classes.active : undefined)}>
        //                     Products
        //                 </NavLink>
        //             </li>
        //         </ul>
        //     </nav>
        // </header>
    );
};

export default MainNavigation;
