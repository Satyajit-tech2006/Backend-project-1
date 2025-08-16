import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            return null;

            const response= await cloudinary.uploader.upload(filePath,{
                resource_type: "auto"
            })
            console.log("Image uploaded successfully:", response.url);
            return response.url;
        }
    } catch (error) {
        fs.unlinkSync(filePath); // Delete the file if upload fails
        return null;
    }
}



cloudinary.v2.uploader.upload("public/images/sample.jpg",
    {
        public_id: "sample_image"
    },function(error, result) {
        if (error) {
            console.error("Error uploading image:", error);
        } else {
            console.log("Image uploaded successfully:", result);
        }
    }
)

export default uploadOnCloudinary;