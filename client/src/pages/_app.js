import "@/styles/globals.css";
import { Montserrat, Hind } from "next/font/google";
import { Box, ChakraProvider, Heading, extendTheme } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/next-js";
import Colors from "@/Colors";
import React from "react";
import {
    IoAdd,
    IoAirplane,
    IoArrowBackCircleOutline,
    IoChatbox,
    IoFilterSharp,
    IoLocation,
    IoLogIn,
    IoMap,
    IoMapOutline,
    IoPricetag,
    IoRocket,
    IoRocketOutline,
} from "react-icons/io5";
import { Header } from "../components/Header";

const monserratFont = Montserrat({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
});
const hindFont = Hind({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});
const px = "8%";
export default function App({ Component, pageProps }) {
    const appTheme = extendTheme({
        fonts: {
            heading: monserratFont.style.fontFamily,
            body: hindFont.style.fontFamily,
        },
    });
    return (
        <ChakraProvider theme={appTheme}>
            <Box h={"100%"} px={px}>
                <Header />
                <Component {...pageProps} />
            </Box>
        </ChakraProvider>
    );
}

export const Logo = () => (
    <Link
        as={NextLink}
        href={"/"}
        textDecor={"none !important"}
        _hover={{ color: "blackAlpha.600" }}
    >
        <Heading letterSpacing={-1} fontWeight={"800"}>
            MK.
            <span
                style={{
                    color: Colors.primary,
                    filter: "brightness(.7)",
                }}
            >
                IT
            </span>
        </Heading>
    </Link>
);
