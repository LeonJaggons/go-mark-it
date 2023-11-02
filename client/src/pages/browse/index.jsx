import Colors from "@/Colors";
import { Box, Button, HStack, Heading, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoFilterSharp, IoLocation } from "react-icons/io5";

const Browse = () => {
    const [currCat, setCurrCat] = useState();
    const router = useRouter();
    useEffect(() => {
        if (router.isReady) {
            const { category } = router.query;
            setCurrCat(category);
        }
    }, [router]);
    return (
        <Box>
            <HStack justify={"space-between"}>
                <Heading size={"lg"}>{currCat}</Heading>
                <HStack>
                    <Button
                        bg={Colors.primary}
                        color={"blackAlpha.700"}
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
                        color={"blackAlpha.700"}
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
            <Box h={"300vh"} />
        </Box>
    );
};

const NoCategoryBrowse = () => {
    return <></>;
};

export default Browse;
