import "@/styles/globals.css";
import { Montserrat, Hind } from "next/font/google";
import { Box, ChakraProvider, Heading, extendTheme } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/next-js";
import Colors from "@/Colors";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";

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
    const [currPage, setCurrPage] = useState("/");
    const router = useRouter();
    const appTheme = extendTheme({
        fonts: {
            heading: monserratFont.style.fontFamily,
            body: hindFont.style.fontFamily,
        },
    });
    useEffect(() => {
        if (router.isReady) {
            const newCurrPage = router.pathname.split("/");
            setCurrPage(newCurrPage && newCurrPage[1]);
        }
    }, [router]);
    return (
        <Provider store={store}>
            <ChakraProvider theme={appTheme}>
                <Box h={"100%"} px={currPage != "post" && px}>
                    {currPage != "post" && <Header />}
                    <Component {...pageProps} />
                </Box>
            </ChakraProvider>
        </Provider>
    );
}

export const Logo = () => {
    const appName = useSelector((state) => state.app.appName);
    return (
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
};
