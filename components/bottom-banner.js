export default function BottomBanner({
    headline,
    text,
    buttonText,
    buttonLink,
    height,
    maxHeight,
    backgroundColor,
    closeButtonClicked,
    buttonBackgroundColor,
}) {
    return (
        <div
            className="banner_bottom bottom-0 left-0 right-0 w-full z-50 fixed p-2"
            style={{
                backgroundColor: backgroundColor || "#fecaca",
                height: height || "150px",
                maxHeight: maxHeight || "350px",
            }}
        >
            <div className="flex flex-row justify-center items-baseline h-full">
                <div
                    className="cursor-pointer m-3 text-center absolute top-0 right-0 px-2 py-1"
                    onClick={() => closeButtonClicked()}
                >
                    X
                </div>
                <div className="flex items-center h-full justify-center flex-col md:flex-row">
                    <div className="flex items-center sm:mr-5  flex-col sm:flex-row">
                        <h4 className="my-0 uppercase sm:mr-5">{headline}</h4>
                        <h5
                            className="my-0 text-center uppercase"
                            dangerouslySetInnerHTML={{ __html: text }}
                        ></h5>
                    </div>
                    <a
                        className="block p-1 my-1"
                        href={buttonLink}
                        style={{
                            backgroundColor:
                                buttonBackgroundColor || "transparent",
                        }}
                    >
                        {buttonText}
                    </a>
                </div>
            </div>
        </div>
    );
}
