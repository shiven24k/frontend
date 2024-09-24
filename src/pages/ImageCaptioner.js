import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/Button.js';
import { Input } from '../components/ui/Input.js';
import { Card, CardContent } from '../components/ui/Card.js';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ImageCaptionerPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState(null);
  const [previousImages, setPreviousImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsLoading(true);
      setError('');
      setCaption(null);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('/api/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setCaption(response.data.caption);
        setPreviousImages(prev => [...prev, { image: URL.createObjectURL(file), caption: response.data.caption }]);
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Error uploading image: ' + (error.response?.data?.message || error.message));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='mt-5 mb-5'>
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 ">
        <div className="w-full lg:w-2/3">
          <Card className="h-full p-5">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              {imagePreview ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img src={imagePreview} alt="Uploaded" className="max-w-full max-h-[500px] object-contain rounded-lg" />
                </div>
              ) : (
                <div className="w-full h-[500px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500">
                  <ImageIcon className="w-16 h-16 mb-4" />
                  <p className="text-xl mb-4">No image uploaded</p>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button onClick={() => document.getElementById('image-upload').click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </label>
                </div>
              )}
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Generated Caption</h2>
              {isLoading ? (
                <p className="text-lg">Generating caption...</p>
              ) : caption ? (
                <p className="text-lg">{caption}</p>
              ) : (
                <p className="text-lg text-gray-500">Upload an image to generate a caption.</p>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 w-full">
        <h2 className="text-2xl font-semibold mb-4">Previous Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previousImages.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <img src={item.image} alt={`Previous ${index}`} className="w-full h-32 object-cover rounded-lg mb-2" />
                <p className="text-sm">{item.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCaptionerPage;