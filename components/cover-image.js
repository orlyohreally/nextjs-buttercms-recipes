import Link from "next/link";
import Image from "next/image";

export default function CoverImage({
    title,
    url,
    linkUrl,
    previewType = "big",
}) {
    const imageHeight = previewType === "big" ? "300px" : "150px";

    return (
        <div className="sm:mx-0">
            {linkUrl ? (
                <Link href={linkUrl}>
                    <a aria-label={title}>
                        <div
                            style={{
                                position: "relative",
                                height: imageHeight,
                            }}
                        >
                            <Image
                                alt={title}
                                src={url}
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                    </a>
                </Link>
            ) : (
                <div style={{ position: "relative", height: imageHeight }}>
                    <Image
                        alt={title}
                        src={url}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </div>
            )}
        </div>
    );
}
