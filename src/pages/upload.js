import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Upload = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log('Image uploaded successfully!');
        // Reset the form after successful upload
        setFormData({
          name: '',
          description: '',
          file: null,
        });
      } else {
        console.error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Choose an image:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
