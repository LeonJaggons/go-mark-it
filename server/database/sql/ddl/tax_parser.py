inserts = []
categories = []
top_cats = []
with open("product_taxonomy.txt", "r") as f:
    for cat_chain in f.readlines():
        cat_chain = cat_chain.strip()
        cat_chain = cat_chain.split(" > ")
        if len(cat_chain) == 1:
            top_cats.append(
                {
                    "categoryName": cat_chain[0].replace("'", "''"),
                    "parentCategoryName": None,
                    "categoryLevel": 1,
                }
            )
        else:
            for i in range(len(cat_chain)):
                parent_i = i
                child_i = i + 1
                if parent_i > len(cat_chain) or child_i > len(cat_chain) - 1:
                    break
                parent_cat = cat_chain[parent_i]
                child_cat = cat_chain[child_i]
                category = {
                    "categoryLevel": child_i + 1,
                    "categoryName": child_cat.replace("'", "''"),
                    "parentCategoryName": parent_cat.replace("'", "''"),
                }

                exists = False
                for cat in categories:
                    if (
                        cat["categoryName"] == category["categoryName"]
                        and cat["parentCategoryName"] == category["parentCategoryName"]
                    ):
                        exists = True
                        break
                if not exists:
                    categories.append(category)

with open("cat_insert.sql", "w") as j:
    for c in top_cats:
        inserts.append(
            f"INSERT INTO category (categoryLevel, parentCategoryName, categoryName) VALUES ({c['categoryLevel']}, '{c['parentCategoryName']}', '{c['categoryName']}');"
        )
    for c in categories:
        inserts.append(
            f"INSERT INTO category (categoryLevel, parentCategoryName, categoryName) VALUES ({c['categoryLevel']}, '{c['parentCategoryName']}', '{c['categoryName']}');"
        )

    j.write(str("\n".join(inserts)))
