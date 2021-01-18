import React, { useState } from "react";

import CenterBanner from "./centered-banner";
import BottomBanner from "./bottom-banner";
import TopBanner from "./top-banner";

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
        button_background_color: buttonBackgroundColor,
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
            buttonBackgroundColor={buttonBackgroundColor}
            closeButtonClicked={() => setDisplayBanner(false)}
        ></CenterBanner>
    );

    const bottomBanner = (
        <BottomBanner
            headline={headline}
            text={text}
            buttonText={buttonText}
            buttonLink={buttonLink}
            height={height}
            maxHeight={maxHeight}
            backgroundColor={backgroundColor}
            buttonBackgroundColor={buttonBackgroundColor}
            closeButtonClicked={() => setDisplayBanner(false)}
        ></BottomBanner>
    );

    const topBanner = (
        <TopBanner
            headline={headline}
            text={text}
            buttonText={buttonText}
            buttonLink={buttonLink}
            height={height}
            maxHeight={maxHeight}
            backgroundColor={backgroundColor}
            buttonBackgroundColor={buttonBackgroundColor}
            closeButtonClicked={() => setDisplayBanner(false)}
        ></TopBanner>
    );

    if (!displayBanner) {
        return null;
    }

    switch (type) {
        case "bottom":
            return bottomBanner;
        case "top":
            return topBanner;
        default:
            return centeredBanner;
    }
}
