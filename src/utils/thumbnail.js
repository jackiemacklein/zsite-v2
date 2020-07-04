import imageCompression from "browser-image-compression";

var options = {
  maxSizeMB: 2,
  maxWidthOrHeight: 800,
  useWebWorker: false,
};

export const createPreviewImage = image => {
  try {
    return image ? window.URL.createObjectURL(image) : image;
  } catch (err) {
    return image;
  }
};

export const compress = async images => {
  let compressedImages = [];
  if (images) {
    for (var i = 0; i < images.length; i++) {
      const imageFile = images[i];
      //  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      try {
        const compressedFile = await imageCompression(imageFile, options);
        //  console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        compressedImages.push({ blob: compressedFile, file: imageFile });
        //await uploadToServer(compressedFile); // write your own logic
      } catch (error) {
        compressedImages.push({ blob: null, file: imageFile });
      }
    }
    return compressedImages;
  } else {
    return compressedImages;
  }
};
