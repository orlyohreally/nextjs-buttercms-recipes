import Head from "next/head";

import Header from "@/components/header";
import Layout from "@/components/layout";
import Container from "@/components/container";
import RecipePreviews from "@/components/recipe-previews";

import { getAllRecipes } from "@/lib/api";

export default function Index({ pages }) {
    return (
        <Layout>
            <Container>
                <Head>
                    <title>Recipes for everyone</title>
                </Head>
                <Header title="Recipes for everyone"></Header>
                <RecipePreviews recipes={pages}></RecipePreviews>
            </Container>
        </Layout>
    );
}

export async function getStaticProps() {
    const pages = await getAllRecipes();
    return { props: { pages } };
}
