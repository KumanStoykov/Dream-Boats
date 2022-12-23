export const mixedContent = (image) => {

   return image.startsWith('https')
          ? image
          : image.replace('http', 'https');
}
