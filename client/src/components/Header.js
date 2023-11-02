import {
    Box,
    Button,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/next-js";
import Colors from "@/Colors";
import { getTopLevelCategories } from "@/services/itemServices";
import React, { useEffect, useState } from "react";
import {
    IoAddSharp,
    IoApps,
    IoChatboxOutline,
    IoHeartOutline,
    IoLogInOutline,
    IoPricetagOutline,
    IoSearch,
} from "react-icons/io5";
import { Logo } from "../pages/_app";
import { useRouter } from "next/router";

export const Header = () => (
    <Box
        mb={4}
        py={2}
        pb={4}
        borderBottom={"1px solid rgba(0,0,0,.05)"}
        position={"sticky"}
        top={0}
        left={0}
        bg={"white"}
        zIndex={999}
    >
        <HStack align={"center"} justify={"space-between"} mb={4} spacing={8}>
            <Logo />
            <Search />
            <Menu />
        </HStack>
        <HStack justify={"space-between"}>
            <CategoriesList />
        </HStack>
    </Box>
);
const Search = () => {
    const [urlParams, setUrlParams] = useState();
    const router = useRouter();
    const handleChange = (e) => {
        setUrlParams({
            ...urlParams,
            q: e.target.value,
        });
    };
    useEffect(() => {
        if (router.isReady) {
            const { category } = router.query;
            setUrlParams({
                ...urlParams,
                category: category,
            });
        }
    }, [router]);

    return (
        <InputGroup
            maxW={"35vw"}
            display={"flex"}
            alignItems={"center"}
            position={"relative"}
        >
            <Input
                pl={"20px"}
                h={"52px"}
                onChange={handleChange}
                pt={1}
                fontSize={"16px"}
                _placeholder={{ color: "blackAlpha.600", fontWeight: "500" }}
                rounded={"full"}
                placeholder={"Search..."}
                bg={"blackAlpha.100"}
                variant={"filled"}
                _focus={{
                    borderColor: Colors.primary,
                }}
            />
            <IconButton
                pos={"absolute"}
                right={1}
                zIndex={999}
                bg={"black"}
                color={"whiteAlpha.800"}
                rounded={"full"}
                icon={<Icon as={IoSearch} />}
            >
                Search
            </IconButton>
        </InputGroup>
    );
};

const Menu = () => {
    return (
        <HStack spacing={"4px"}>
            <MenuButton icon={IoAddSharp} href={"/post"} main>
                Post a Listing
            </MenuButton>
            <MenuButton icon={IoPricetagOutline} href={"/selling"}>
                Selling
            </MenuButton>
            <MenuButton icon={IoHeartOutline} href={"/saved"}>
                Saved
            </MenuButton>
            <MenuButton icon={IoChatboxOutline} href={"/inbox"}>
                Inbox
            </MenuButton>
            <MenuButton icon={IoLogInOutline}>Sign In</MenuButton>
        </HStack>
    );
};

const SignIn = () => {
    return (
        <>
            <MenuButton icon={IoLogInOutline}>Sign In</MenuButton>
        </>
    );
};
const MenuButton = ({ icon, children, main, href, ...props }) => {
    return (
        <Button
            as={NextLink}
            href={href ?? "/"}
            h={"fit-content"}
            minW={"60px"}
            display={"inline-block"}
            p={2}
            px={5}
            variant={main ? "solid" : "ghost"}
            bg={main && "black"}
            color={main ? "whiteAlpha.800" : "blackAlpha.700"}
            _hover={{
                color: main ? "whiteAlpha.900" : "blackAlpha.900",
            }}
            {...props}
        >
            <VStack spacing={"4px"}>
                <Icon as={icon} boxSize={"20px"} />
                <Text
                    fontFamily={"body"}
                    fontWeight={main ? 600 : "500"}
                    fontSize={14}
                >
                    {children}
                </Text>
            </VStack>
        </Button>
    );
};
const MenuItem = ({ children, href, navType }) => {
    const router = useRouter();
    const handleNavigate = () => {
        switch (navType) {
            case "category":
                router.push({
                    pathname: "/browse",
                    query: { category: children },
                });
                return;
            default:
                router.push({ pathname: `/${children}` });
                return;
        }
    };
    return (
        <Button
            variant={"link"}
            onClick={handleNavigate}
            letterSpacing={"0px"}
            fontSize={14}
            fontFamily={"body"}
            fontWeight={"500"}
            color={"blackAlpha.700"}
            textDecor={"none !important"}
            _hover={{ color: "blackAlpha.500" }}
            noOfLines={1}
        >
            {children}
        </Button>
    );
};
const CategoriesList = () => {
    const router = useRouter();
    const [categories, setCategories] = useState();
    const catsToShow = 5;
    useEffect(() => {
        getTopLevelCategories(setCategories);
    }, []);

    return (
        categories && (
            <HStack spacing={10} align={"center"} overflowX={"auto"} w={"full"}>
                <MoreCategoriesDropdown
                    shownCats={catsToShow}
                    categories={categories}
                />
                {categories.map(
                    (c, i) =>
                        i < catsToShow && (
                            <MenuItem navType={"category"}>
                                {c.CategoryName}
                            </MenuItem>
                        )
                )}
            </HStack>
        )
    );
};
const MoreCategoriesDropdown = ({ categories, shownCats }) => {
    return (
        <Popover placement={"bottom-end"}>
            <PopoverTrigger>
                <Button
                    color={Colors.primary}
                    filter={"brightness(.6)"}
                    variant={"link"}
                    fontWeight={600}
                    fontFamily={"body"}
                    fontSize={14}
                    leftIcon={<Icon as={IoApps} />}
                    p={0}
                >
                    All
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody maxH={"500px"} overflow={"scroll"}>
                    <VStack alignItems={"flex-start"} spacing={4}>
                        {categories?.map((c, i) => (
                            <MenuItem navType={"category"}>
                                {c.CategoryName}
                            </MenuItem>
                        ))}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
