import Butter from "buttercms";

const butter = Butter(process.env.BUTTER_CMS_API_KEY);

const defaultPageSize = 5;

export async function getAllRecipesData(page = 1, pageSize = defaultPageSize) {
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
    const paginatedRecipes = [];
    let currentPage = 1;
    while (!!currentPage) {
        const recipeData = await getAllRecipesData(currentPage, pageSize);
        paginatedRecipes[currentPage - 1] = recipeData.recipes;
        currentPage = recipeData.nextPage;
    }
    return paginatedRecipes;
}

export async function getAllRecipes() {
    const pages = await butter.page.list("recipe", { locale: "en" });
    return pages?.data?.data;
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
