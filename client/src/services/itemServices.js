import { setCategories } from "@/redux/reducers/itemSlice";
import store from "@/redux/store";
import axios from "axios";

const apiURL = "http://localhost:8080/";

const apiCategoryURL = apiURL + "item/category";

export const loadTopCategories = async () => {
    const cats = await getTopLevelCategories();
    store.dispatch(setCategories(cats));
};
export const getTopLevelCategories = async (callback = null) => {
    const res = await axios.get(apiCategoryURL, {
        params: {
            level: 1,
        },
    });
    callback && callback([...res.data]);
    return res.data;
};

export const getSubcategories = async (parent, level, callback) => {
    console.log(parent, level);
    const res = await axios.get(apiCategoryURL, {
        params: {
            parent: parent,
            level: parseInt(level) + 1,
        },
    });
    if (res.data && res.data.length > 0) callback([...res.data]);
    return res.data;
};
