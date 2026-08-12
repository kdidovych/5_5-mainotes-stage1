import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {useState} from 'react';
import {PAGES} from './Header';
import {useLocation} from "react-router";
import {useTranslation} from "react-i18next";

function Footer() {
    const {t} = useTranslation();

    const location = useLocation();
    const path = location.pathname;
    // @todo must be another way to get current path without params
    const currentIndex = PAGES.findIndex((page) => path.startsWith(page.url)) || -1;

    const [pageIndex, setPageIndex] = useState(currentIndex);
    return (
        <BottomNavigation
            showLabels
            value={pageIndex}
            onChange={(event, newValue) => {
                setPageIndex(newValue);
            }}
        >
            {PAGES.map((page) => (
                <BottomNavigationAction
                    key={'footer-' + page.text}
                    label={t(page.text)}
                    // @TODO href is working, but it leads to full page reload
                    href={page.url}
                    icon={page.icon} />
            ))}
        </BottomNavigation>
    );
}

export default Footer;
