import { createTheme } from '@mui/material/styles';
import '@fontsource/anton/400.css';
import '@fontsource/inter';
import '@fontsource/roboto/400.css';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            "2xl": 1728,
        },
    },
    palette: {
        mode: 'light',
        primary: { main: '#2963E8' },
        secondary: { main: '#616460' },
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h1: { fontFamily: "'Anton', 'Inter', sans-serif", fontWeight: 400 },
        h2: { fontFamily: "'Anton', 'Inter', sans-serif", fontWeight: 400 },
        h3: { fontFamily: "'Anton', 'Inter', sans-serif", fontWeight: 400 },
        h4: { fontFamily: "'Anton', 'Inter', sans-serif", fontWeight: 400 },
        h5: { fontFamily: "'Anton', 'Inter', sans-serif", fontWeight: 400 },
        h6: { fontFamily: "'Anton', 'Inter', sans-serif", fontWeight: 400 },
        subtitle1: { fontFamily: "'Inter', sans-serif" },
        subtitle2: { fontFamily: "'Inter', sans-serif" },
        body1: { fontFamily: "'Inter', sans-serif" },
        body2: { fontFamily: "'Inter', sans-serif" },
        button: { fontFamily: "'Inter', sans-serif" },
        caption: { fontFamily: "'Inter', sans-serif" },
        overline: { fontFamily: "'Inter', sans-serif" },
    },
})

export default theme;
