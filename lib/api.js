import Butter from "buttercms";

const butter = Butter(process.env.BUTTER_CMS_API_KEY);

const defaultPageSize = 2;

export async function getRecipesData(page = 1, pageSize = defaultPageSize) {
    const response = await butter.page.list("recipe", {
        page_size: pageSize,
        page: page,
        locale: "en",
    });

    return {
        recipes: response?.data?.data,
        prevPage: response?.data?.meta.previous_page,
        nextPage: response?.data?.meta.next_page,
    };
}

export async function getAllRecipesPaginated(pageSize = defaultPageSize) {
    const allRecipes = [];
    const maxPageSize = 100; // defined in the API of CMS
    let currentPage = 1;
    while (!!currentPage) {
        const recipeData = await getRecipesData(currentPage, maxPageSize);
        allRecipes.concat(recipeData.recipes);
        currentPage = recipeData.nextPage;
    }
    const paginatedRecipes = chunkArray(allRecipes, pageSize);
    return paginatedRecipes;
}

export async function getRecipe(slug) {
    const page = await butter.page.retrieve("recipe", slug, { locale: "en" });
    return page?.data?.data;
}

export async function getCollectionsItems(collectionsSlugs, params) {
    const collectionsItems = await butter.content.retrieve(
        collectionsSlugs,
        params
    );
    return collectionsItems?.data?.data;
}

function chunkArray(array, chunkSize) {
    return [...Array(Math.ceil(array.length / chunkSize))].map((_, i) =>
        array.slice(i * chunkSize, (i + 1) * chunkSize)
    );
}
