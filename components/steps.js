import Image from "next/image";

export default function Steps({ steps }) {
    return (
        <div>
            <h3>Steps</h3>

            <ol className="list-decimal px-5 text-justify">
                {steps.map(({ description, photo }, key) => (
                    <li key={key} className="py-2">
                        <div className="flex flex-col md:flex-row items-center">
                            <div
                                className="prose max-w-none pr-5"
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />

                            {photo && (
                                <div style={{ minWidth: "300px" }}>
                                    <Image
                                        height={200}
                                        width={300}
                                        src={photo}
                                    ></Image>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
