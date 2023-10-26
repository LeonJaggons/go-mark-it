import axios from "axios";

const apiURL = "http://localhost:8080/";

const apiCategoryURL = apiURL + "item/category";

export const getTopLevelCategories = async (callback) => {
    const res = await axios.get(apiCategoryURL, {
        params: {
            level: 1,
        },
    });
    callback([...res.data]);
    return res.data;
};
