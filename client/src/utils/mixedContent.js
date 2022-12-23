export const mixedContent = (image) => {

    return image
        .slice(0, 4) + 's' + image
        .slice(4, image.length);
}
