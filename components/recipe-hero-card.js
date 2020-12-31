import Image from "next/image";

export default function RecipeHeroCard({
    headline,
    subheadline,
    image,
    description,
}) {
    return (
        <div>
            <h1>{headline}</h1>
            {subheadline && (
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight px-4 mb-20 mt-8">
                    {subheadline}
                </h2>
            )}
            <div className="mb-4 md:mb-8 sm:mx-0">
                {image && (
                    <div style={{ position: "relative", height: "300px" }}>
                        <Image
                            alt={headline}
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            className="rounded-lg"
                        />
                    </div>
                )}
            </div>

            <div
                className="prose max-w-none mb-4 md:mb-8 text-lg text-justify"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
}
