import RecipePreview from "./recipe-preview";

export default function RecipePreviews({ recipes, previewType }) {
    return (
        <div className="flex flex-wrap">
            {recipes.map((recipe) => (
                <RecipePreview
                    key={recipe.slug}
                    title={recipe.fields.hero.headline}
                    coverImage={recipe.fields.hero.image}
                    slug={recipe.slug}
                    previewType={previewType}
                ></RecipePreview>
            ))}
        </div>
    );
}
