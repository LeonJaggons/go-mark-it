import {
    getSubcategories,
    getTopLevelCategories,
} from "@/services/itemServices";
import {
    Box,
    Button,
    Divider,
    HStack,
    Heading,
    Icon,
    IconButton,
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Select,
    Switch,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { find } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { IoArchive, IoArrowBack, IoRocket } from "react-icons/io5";

const Post = () => {
    const router = useRouter();
    const returnToHome = () => router.push("/");
    return (
        <Box maxH={"100vh"} bg={"gray.100"} h={"100vh"}>
            <HStack w={"full"} h={"full"} align={"flex-start"}>
                <PostForm />
            </HStack>
        </Box>
    );
};

const PostForm = () => {
    const router = useRouter();
    const formRef = useRef();
    const backToBrowse = () => {
        if (router.isReady) {
            router.back();
        }
    };
    const handleSubmit = (e) => {
        console.log(e.target.elements);
    };
    const submitForm = () => {
        const { title, price, description } = formRef.current.elements;
        console.log(title.value, price.value, description.value);
        // formRef.current && formRef.current.submit();
    };
    return (
        <Box w={"400px"} h={"100vh"} bg={"white"}>
            <VStack
                alignItems={"flex-start"}
                w={"full"}
                h={"full"}
                borderRight={"1px solid rgba(0,0,0,.1)"}
                spacing={0}
            >
                <Box p={4} borderBottom={"1px solid rgba(0,0,0,.1)"} w={"full"}>
                    <Button
                        p={0}
                        onClick={backToBrowse}
                        mb={2}
                        leftIcon={<Icon as={IoArrowBack} />}
                        variant={"link"}
                        
                    >
                        Back to Browse
                    </Button>
                    <Heading size={"md"}>Post New Item</Heading>
                </Box>
                <Box h={"100%"} w={"full"} flex={1} overflowY={"scroll"}>
                    <form ref={formRef} onChange={submitForm}>
                        <VStack align={"flex-start"} p={4}>
                            <Heading size={"md"} fontWeight={700}>
                                Required
                            </Heading>
                            <Text fontSize={14} mb={2}>
                                Be as descriptive as possible
                            </Text>
                            <Input
                                py={6}
                                id={"title"}
                                placeholder={"Title"}
                            ></Input>
                            <Input
                                id={"price"}
                                placeholder={"Price"}
                                py={6}
                            ></Input>
                            <Textarea
                                placeholder={"Description"}
                                id={"description"}
                            />
                            <CategorySelect />
                            <Divider my={4} />
                            <BoostListing />
                        </VStack>
                    </form>
                </Box>
                <Box p={4} borderTop={"1px solid rgba(0,0,0,.1)"} w={"full"}>
                    <Button
                        onClick={submitForm}
                        w={"full"}
                        colorScheme={"blackAlpha"}
                        bg={"black"}
                    >
                        Continue
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

const BoostListing = () => {
    return (
        <HStack align={"start"}>
            <Icon as={IoRocket} boxSize={"28px"} mt={1} mr={2} />
            <Box>
                <Heading size={"sm"} mb={1}>
                    Boost Listing
                </Heading>
                <Text fontSize={14} color={"blackAlpha.600"}>
                    Add a step to boost your listing to reach more potential
                    buyers by having it appear towards the top of searches and
                    item categories.
                </Text>
            </Box>
            <Switch alignSelf={"center"} />
        </HStack>
    );
};
const CategorySelect = () => {
    const [categories, setCategories] = useState();
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const [categoryChain, setCategoryChain] = useState({});
    const [prevCategory, setPrevCategory] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const handleBack = () => {
        const vals = Object.keys(categoryChain).length;
        let newChain = categoryChain;
        if (vals === 0) return;
        if (vals <= 1) {
            console.log("INDEX TO USE", vals);
            setCategoryChain({});
            setSelectedCategory(newChain[vals]);
            getTopLevelCategories(setCategories);
        } else {
            console.log(newChain);
            console.log("INDEX TO DELETE", vals);
            const newSelected = newChain[vals - 1];
            delete newChain[vals];

            console.log("VALS", vals);
            console.table(newChain);
            // setSelectedCategoryId(newSelected.Id);

            getSubcategories(
                newSelected.CategoryName,
                newSelected.CategoryLevel,
                setCategories
            );
            setSelectedCategory({ ...newSelected });
            setCategoryChain({ ...newChain });
        }
    };
    useEffect(() => {
        if (!selectedCategoryId) {
            getTopLevelCategories(setCategories);
        } else {
            const newCat = find(categories, (o) => o.Id === selectedCategoryId);
            if (!newCat) return;
            console.log(newCat);

            getSubcategories(
                newCat.CategoryName,
                newCat.CategoryLevel,
                setCategories
            );
            setSelectedCategory({ ...newCat });

            console.log(newCat);
            setCategoryChain({
                ...categoryChain,
                [newCat.CategoryLevel]: newCat,
            });
        }
    }, [selectedCategoryId]);
    useEffect(() => {
        console.log(categoryChain);
    }, [categoryChain]);
    return (
        <Popover placement={"bottom-end"}>
            <PopoverTrigger>
                <Button
                    w={"full"}
                    justifyContent={"flex-start"}
                    bg={"white"}
                    borderWidth={1}
                    fontWeight={400}
                    color={selectedCategory ? "black" : "gray.500"}
                >
                    {selectedCategory
                        ? selectedCategory.CategoryName
                        : "Category..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent maxH={"400px"} overflowY={"scroll"}>
                <PopoverBody>
                    <IconButton
                        onClick={handleBack}
                        variant={"ghost"}
                        leftIcon={<Icon as={IoArrowBack} />}
                    ></IconButton>
                    {categories?.map((c) => (
                        <Button
                            fontWeight={400}
                            justifyContent={"flex-start"}
                            variant={"ghost"}
                            onClick={() => setSelectedCategoryId(c.Id)}
                            fontSize={14}
                            w={"full"}
                            bg={selectedCategoryId == c.Id && "blue.100"}
                        >
                            {c.CategoryName}
                        </Button>
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default Post;
