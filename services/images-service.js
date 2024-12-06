class imagesService {
  async uploadImage(temporaryName) {
    const result = await cloudinary.uploader.upload(temporaryName, {
      folder: "images"
    });

    return result.secure_url;
  }

  async deleteImage(image) {
    const publicId = image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`images/${publicId}`)
  }
};

export default new imagesService();