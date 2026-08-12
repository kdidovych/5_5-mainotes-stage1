import {useState} from "react";
import {NavLink} from "react-router";
import {useTranslation} from "react-i18next";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Select from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import {useTheme} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GlobeIcon from '@mui/icons-material/Language';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContactsIcon from '@mui/icons-material/Contacts';
import PasswordIcon from '@mui/icons-material/Password';

import ThemeSwitcher from "./ThemeSwitcher";
import {LANGS, STORAGE_LANG_KEY} from "../constants";


export const PAGES = [
    {
        url: '/',
        text: 'home',
        icon: <HomeIcon/>
    },
    {
        url: '/notes',
        text: 'notes',
        icon: <EditNoteIcon/>
    },
    {
        url: '/contacts',
        text: 'contacts',
        icon: <ContactsIcon/>
    },
    {
        url: '/passwords',
        text: 'passwords',
        icon: <PasswordIcon/>
    }
];

function Header() {
    const {t, i18n} = useTranslation();
    const lang = i18n.resolvedLanguage;
    const onLangChange = (event) => {
        const newLang = event.target.value;
        if (newLang !== i18n.resolvedLanguage) i18n.changeLanguage(newLang);
        if (newLang !== localStorage.getItem(STORAGE_LANG_KEY)) localStorage.setItem(STORAGE_LANG_KEY, newLang);
    }

    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = (newOpen) => () => {
        setMenuOpened(newOpen);
    };

    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const handleOpenAccountMenu = (event) => {
        setAnchorElAccount(event.currentTarget);
    };
    const handleCloseAccountMenu = () => {
        setAnchorElAccount(null);
    };

    const [anchorElSetting, setAnchorElSetting] = useState(null);
    const handleOpenSettingMenu = (event) => {
        setAnchorElSetting(event.currentTarget);
    };
    const handleCloseSettingMenu = () => {
        setAnchorElSetting(null);
    };

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;
    const contrastTextColor = theme.palette.primary.contrastText;
    const SETTINGS = ['account', 'logout'];

    return (
        <AppBar position="static">
            <Container maxWidth="false">
                <Toolbar disableGutters>
                    {/* Mobile Menu */}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', sm: 'none'}}}>
                        <Tooltip title={t("Menu")}>
                            <IconButton
                                size="large"
                                aria-label={t('Menu')}
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleMenu(true)}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Tooltip>
                        <Drawer open={menuOpened} onClose={toggleMenu(false)}>
                            <Box role="presentation" onClick={toggleMenu(false)}>
                                <List sx={{my: 1, mr: 3, ml: 1}}>
                                    {PAGES.map((page) => (
                                        <ListItem key={'header-menu-' + page.text} disablePadding>
                                            <NavLink
                                                to={page.url}
                                                style={({isActive}) => ({
                                                    color: isActive ? secondaryColor : primaryColor,
                                                    display: 'flex',
                                                    pointerEvents: isActive ? 'none' : 'auto',
                                                    textDecoration: 'none',
                                                    flexGrow: 1
                                                })}
                                            >
                                                <ListItemIcon>
                                                    {page.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={t(page.text)}
                                                              sx={{textTransform: "capitalize"}}/>
                                            </NavLink>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    </Box>

                    {/* PAGES DESKTOP */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}, justifyContent: 'space-between'}}>
                        {PAGES.map((page, index) => (
                            <NavLink
                                key={'header-desktop-' + page.text}
                                to={page.url}
                                style={({isActive}) => ({
                                    pointerEvents: isActive ? 'none' : 'auto',
                                    textDecoration: 'none',
                                    flexGrow: index === 0 ? 1 : 0,
                                    marginRight: '16px'
                                })}
                            >
                                {({isActive}) => (
                                    <Button
                                        key={'header-button-' + page.text}
                                        variant='contained'
                                        color={isActive ? 'inherit' : 'primary'}
                                        size='small'
                                        startIcon={page.icon}
                                    >
                                        {t(page.text)}
                                    </Button>
                                )}
                            </NavLink>
                        ))}
                    </Box>

                    {/* Theme and Locale */}
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title={t("Global Settings")}>
                            <IconButton onClick={handleOpenSettingMenu} sx={{mr: 1, color: contrastTextColor}}>
                                <GlobeIcon alt={t("Global Settings")}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px', flexGrow: 0}}
                            id="menu-world-setting"
                            anchorEl={anchorElSetting}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElSetting)}
                            onClose={handleCloseSettingMenu}
                        >
                            <MenuItem sx={{justifyContent: 'center'}}>
                                <ThemeSwitcher/>
                            </MenuItem>
                            <MenuItem>
                                {/*LocaleSwitch*/}
                                <FormControl sx={{m: 1}} size="small">
                                    <Select
                                        autoWidth
                                        value={lang}
                                        onChange={onLangChange}
                                        variant='outlined'
                                        sx={{display: 'flex'}}
                                    >
                                        {LANGS.map(lang => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* ACCOUNT @TODO */}
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title={t("Account")}>
                            <IconButton
                                onClick={handleOpenAccountMenu}
                                sx={{p: 0}}
                                aria-label={t("Account")}
                                aria-haspopup="true"
                            >
                                <AccountCircleIcon alt={t("Account")} sx={{color: contrastTextColor}}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="account-appbar"
                            anchorEl={anchorElAccount}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElAccount)}
                            onClose={handleCloseAccountMenu}
                        >
                            <div style={{color: "red"}}>@TODO:</div>
                            {/*@TODO For next stage*/}
                            {SETTINGS.map((setting) => (
                                <MenuItem key={'header-setting-' + setting} onClick={handleCloseAccountMenu}>
                                    <Typography sx={{textAlign: 'center'}}>{t(setting)}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={handleCloseAccountMenu}>
                                <LoginIcon/>
                                <Typography sx={{textAlign: 'center'}}>{t('login')}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAccountMenu}>
                                <LogoutIcon/>
                                <Typography sx={{textAlign: 'center'}}>{t('logout')}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAccountMenu}>
                                <DarkModeIcon/>
                                <DarkModeOutlinedIcon/>
                                <GlobeIcon/>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAccountMenu}></MenuItem>
                            <MenuItem onClick={handleCloseAccountMenu}></MenuItem>
                            <SettingsIcon/>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;