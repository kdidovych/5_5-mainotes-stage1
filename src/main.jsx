import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router";
import './i18n';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import store from './store';
import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/Landing";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import Contacts from "./pages/Contacts";
import Passwords from "./pages/Passwords";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    colorSchemes: {
        light: true,
        dark: {
            palette: {
                primary: { main: '#90caf9' },
                background: { default: '#121212' },
            },
        },
    }
});

createRoot(document.body).render(
    <StrictMode>
        <ThemeProvider
            theme={theme}
            disableTransitionOnChange
        >
            <CssBaseline/>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<RootLayout/>}>
                            <Route index element={<Landing/>}/>
                            <Route path="/notes/:id?" element={<Notes/>}/>
                            <Route path="contacts" element={<Contacts/>}/>
                            <Route path="passwords" element={<Passwords/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StrictMode>
);