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

                    <HStack>
                        <Button
                            bg={Colors.primary}
                            color={"blackAlpha.600"}
                            leftIcon={<Icon as={IoLocation} />}
                            fontWeight={500}
                            mr={2}
                            _hover={{ color: "blackAlpha.800" }}
                            colorScheme={"blackAlpha"}
                        >
                            Location
                        </Button>
                        <Button
                            bg={Colors.primary}
                            color={"blackAlpha.600"}
                            leftIcon={<Icon as={IoFilterSharp} />}
                            fontWeight={500}
                            mr={2}
                            colorScheme={"blackAlpha"}
                            _hover={{ color: "blackAlpha.800" }}
                        >
                            Filters
                        </Button>
                    </HStack>
                </HStack>
            </div>
        </>
    );
};

export default Home;
