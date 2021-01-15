import React, { useState } from "react";

import CenterBanner from "./centered-banner";

export default function Banner({
    banner: {
        headline,
        text,
        button_text: buttonText,
        button_link: buttonLink,
        width,
        max_width: maxWidth,
        height,
        max_height: maxHeight,
        type,
        background_color: backgroundColor,
    },
}) {
    const [displayBanner, setDisplayBanner] = useState(true);
    const centeredBanner = (
        <CenterBanner
            headline={headline}
            text={text}
            buttonText={buttonText}
            buttonLink={buttonLink}
            width={width}
            maxWidth={maxWidth}
            height={height}
            maxHeight={maxHeight}
            backgroundColor={backgroundColor}
            closeButtonClicked={() => setDisplayBanner(false)}
        ></CenterBanner>
    );
    if (!displayBanner) return "";
    if (type === "center") {
        return centeredBanner;
    }
    return <></>;
}
