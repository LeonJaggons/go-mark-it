import Colors from "@/Colors";
import { Box, Button, HStack, Heading, Icon } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { IoFilterSharp, IoLocation } from "react-icons/io5";

const Home = () => {
    return (
        <>
            <Head>
                <title>Buy & Sell Everything - MK.IT</title>
            </Head>
            <div>
                <HStack justify={"space-between"}>
                    <Heading size={"md"} letterSpacing={"-1px"}>
                        Today's Picks
                    </Heading>
                </HStack>
            </div>
        </>
    );
};

export default Home;
