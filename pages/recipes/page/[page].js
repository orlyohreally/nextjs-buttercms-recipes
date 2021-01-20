import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Layout from "@/components/layout";
import Header from "@/components/header";
import Container from "@/components/container";
import RecipePreviews from "@/components/recipe-previews";
import { getAllRecipesPaginated, getRecipesData } from "@/lib/api";

export default function Recipes({ recipes, prevPage, nextPage }) {
    const router = useRouter();
    if (!router.isFallback && !recipes) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <Layout>
            <Container>
                {router.isFallback ? (
                    <div>Loading…</div>
                ) : (
                    <>
                        <Head>
                            <title>Recipes</title>
                            <meta name="description" content="Recipes" />
                        </Head>

                        <Header title="Recipes"></Header>

                        <RecipePreviews
                            recipes={recipes}
                            className="flex flex-col"
                        ></RecipePreviews>

                        {(prevPage || nextPage) && (
                            <div className="text-right mb-10">
                                <nav
                                    className="relative z-0 inline-flex shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    {prevPage && (
                                        <Link
                                            href={`/recipes/page/${prevPage}`}
                                        >
                                            <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">
                                                    Previous
                                                </span>
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </Link>
                                    )}
                                    {nextPage && (
                                        <Link
                                            href={`/recipes/page/${nextPage}`}
                                        >
                                            <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </Link>
                                    )}
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const page = parseInt(params.page, 10);
    const { recipes, prevPage, nextPage } = await getRecipesData(page);

    return {
        props: { recipes, prevPage, nextPage },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const allRecipes = await getAllRecipesPaginated();
    const paths = allRecipes.map(
        (_, pageIndex) => `/recipes/page/${parseInt(pageIndex, 10) + 1}`
    );

    return {
        paths,
        fallback: true,
    };
}
