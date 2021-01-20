import Head from "next/head";

import Layout from "@/components/layout";
import Header from "@/components/header";
import Container from "@/components/container";

import { getCollectionsItems } from "@/lib/api";

export default function Categories({ categories }) {
    return (
        <Layout>
            <Container>
                <Head>
                    <title>Recipes categories</title>
                </Head>
                <Header title="Recipes categories"></Header>
                <ul>
                    {categories.map(({ name }, key) => {
                        return (
                            <li key={key} className="mb-5">
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </Layout>
    );
}

export async function getStaticProps() {
    const categories = (
        await getCollectionsItems(["recipe_category"], {
            locale: "en",
        })
    ).recipe_category;
    return { props: { categories } };
}
