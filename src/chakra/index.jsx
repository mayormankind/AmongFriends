import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        Button: {
            // baseStyle: {
            // },
            defaultProps: {
                _hover: {bg:'lightgray'},
                // colorScheme: 'wh',
            }
        },
    },
    breakpoints:{
        xs: "480px",
        sm: "600px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px"
    },
    colors:{
        mongbg: {
            100: "#252588",
            700: "#070722"
        }
    }
})

export default theme;