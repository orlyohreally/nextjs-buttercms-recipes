import CoverImage from "./cover-image";
import Link from "next/link";

export default function RecipePreview({
    title,
    coverImage,
    slug,
    previewType,
}) {
    return (
        <div className="p-5 md:w-2/4 w-full">
            <div className="mb-5">
                {coverImage && (
                    <CoverImage
                        previewType={previewType}
                        slug={slug}
                        title={title}
                        url={coverImage}
                        linkUrl={`/recipes/${slug}`}
                    />
                )}
            </div>

            <h4>
                <Link href={`/recipes/${slug}`}>
                    <a className="hover:underline">{title}</a>
                </Link>
            </h4>
        </div>
    );
}
