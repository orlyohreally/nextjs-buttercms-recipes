import Head from "next/head";
import Link from "next/link";

import Header from "@/components/header";
import Layout from "@/components/layout";
import Container from "@/components/container";
import RecipePreviews from "@/components/recipe-previews";

import { getRecipesData } from "@/lib/api";

export default function Index({ pages }) {
    return (
        <Layout>
            <Container>
                <Head>
                    <title>Recipes for everyone</title>
                </Head>

                <Header title="Recipes for everyone"></Header>

                <RecipePreviews recipes={pages}></RecipePreviews>

                <div className="flex justify-end">
                    <Link href="/recipes">
                        <a className="bg-purple-100 text-purple-700 text-base font-semibold px-6 py-2 rounded-lg mr-2 mb-2">
                            All recipes
                        </a>
                    </Link>
                </div>
            </Container>
        </Layout>
    );
}

export async function getStaticProps() {
    const pages = (await getRecipesData()).recipes;
    return { props: { pages } };
}
