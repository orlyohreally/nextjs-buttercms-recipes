import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import Container from "@/components/container";
import RecipeHeroCard from "@/components/recipe-hero-card";
import Layout from "@/components/layout";
import Ingredients from "@/components/ingredients";
import Steps from "@/components/steps";
import RecipePreviews from "@/components/recipe-previews";

import { getAllRecipes, getRecipe } from "@/lib/api";

export default function Recipe({ recipe }) {
    const router = useRouter();
    if (!router.isFallback && !recipe?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <Layout>
            <Container>
                {router.isFallback ? (
                    <div>Loading…</div>
                ) : (
                    <>
                        <article>
                            <Head>
                                <title>
                                    {recipe.fields.twitter_card.title}
                                </title>
                                <meta
                                    name="description"
                                    content={
                                        recipe.fields.twitter_card.description
                                    }
                                />
                                <meta
                                    name="og:image"
                                    content={recipe.fields.twitter_card.image}
                                />
                            </Head>

                            <RecipeHeroCard
                                headline={recipe.fields.hero.headline}
                                subheadline={recipe.fields.hero.subheadline}
                                image={recipe.fields.hero.image}
                                description={recipe.fields.hero.description}
                            ></RecipeHeroCard>

                            <div className="flex flex-col justify-center sm:flex-row sm:content-center md:justify-start">
                                <div className="py-2 sm:py-5">
                                    <div>Level</div>
                                    <div className="capitalize font-semibold">
                                        {recipe.fields.level}
                                    </div>
                                </div>

                                <div className="py-2 sm:p-5">
                                    <div>Yield</div>
                                    <div className="font-semibold">
                                        {recipe.fields.yield}
                                    </div>
                                </div>

                                <div className="py-2 sm:p-5">
                                    <div>Total time</div>
                                    <div className="font-semibold">
                                        {recipe.fields.total_time.hours && (
                                            <>
                                                {recipe.fields.total_time.hours}{" "}
                                                hours
                                            </>
                                        )}
                                        {recipe.fields.total_time.minutes && (
                                            <>
                                                {
                                                    recipe.fields.total_time
                                                        .minutes
                                                }{" "}
                                                minutes
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="py-2 sm:py-5">
                                    <div>Active time</div>
                                    <div className="font-semibold">
                                        {recipe.fields.active_time.hours && (
                                            <>
                                                {
                                                    recipe.fields.active_time
                                                        .hours
                                                }{" "}
                                                hours
                                            </>
                                        )}
                                        {recipe.fields.active_time.minutes && (
                                            <>
                                                {
                                                    recipe.fields.active_time
                                                        .minutes
                                                }{" "}
                                                minutes
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Ingredients
                                    ingredients={recipe.fields.ingredients}
                                ></Ingredients>

                                <Steps steps={recipe.fields.steps}></Steps>

                                <div className="my-10 flex flex-row flex-wrap">
                                    {recipe.fields.categories.map(
                                        ({ name }) => (
                                            <a
                                                href="#"
                                                key={name}
                                                className="bg-purple-100 text-purple-700 text-base font-semibold px-6 py-2 rounded-lg mr-2 mb-2"
                                            >
                                                {name}
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                            {recipe.fields.related_recipes.length > 0 && (
                                <div>
                                    <h3>Try these amazing recipes</h3>
                                    <RecipePreviews
                                        recipes={recipe.fields.related_recipes}
                                        previewType="small"
                                    ></RecipePreviews>
                                </div>
                            )}
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const recipe = await getRecipe(params.slug);
    return {
        props: {
            recipe,
        },
    };
}

export async function getStaticPaths() {
    const allRecipes = await getAllRecipes();
    const paths = allRecipes.map(({ slug }) => `/recipes/${slug}`);

    return {
        paths,
        fallback: true,
    };
}
