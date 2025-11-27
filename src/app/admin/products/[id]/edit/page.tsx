'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_price: number;
  cost_price: number;
  sku: string;
  barcode: string;
  quantity: number;
  track_quantity: boolean;
  is_active: boolean;
  is_featured: boolean;
  category_id: number;
  brand: string;
  images: string[];
  features: string[];
  specifications: string[];
  weight: number;
  dimensions: string;
  is_digital: boolean;
  meta_title: string;
  meta_description: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

const API_BASE_URL = 'https://api.sylviegarbagecollection.co.ke';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    price: '',
    compare_price: '',
    cost_price: '',
    sku: '',
    barcode: '',
    quantity: '0',
    track_quantity: true,
    is_active: true,
    is_featured: false,
    category_id: '',
    brand: '',
    weight: '',
    dimensions: '',
    is_digital: false,
    meta_title: '',
    meta_description: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>(['']);
  const [specifications, setSpecifications] = useState<string[]>(['']);

  useEffect(() => {
    checkAuth();
    fetchCategories();
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const checkAuth = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return false;
      }
      
      // Verify token is still valid
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
          return false;
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return false;
      }
      
      return true;
    }
    return false;
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to fetch categories');
    }
  };

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      console.log('Fetching product with ID:', productId);

      const response = await fetch(`${API_BASE_URL}/api/admin/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      console.log('Product response status:', response.status);

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        console.error('Failed to fetch product, status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setProduct(null);
        setLoading(false);
        return;
      }

      const productData = await response.json();
      console.log('Product data received:', productData);
      
      setProduct(productData);
      
      // Populate form data
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        short_description: productData.short_description || '',
        price: productData.price?.toString() || '',
        compare_price: productData.compare_price?.toString() || '',
        cost_price: productData.cost_price?.toString() || '',
        sku: productData.sku || '',
        barcode: productData.barcode || '',
        quantity: productData.quantity?.toString() || '0',
        track_quantity: productData.track_quantity ?? true,
        is_active: productData.is_active ?? true,
        is_featured: productData.is_featured ?? false,
        category_id: productData.category_id?.toString() || '',
        brand: productData.brand || '',
        weight: productData.weight?.toString() || '',
        dimensions: productData.dimensions || '',
        is_digital: productData.is_digital ?? false,
        meta_title: productData.meta_title || '',
        meta_description: productData.meta_description || '',
      });

      // Handle images
      setExistingImages(productData.images || []);
      
      // Handle features
      const productFeatures = productData.features || [];
      setFeatures(Array.isArray(productFeatures) && productFeatures.length > 0 ? productFeatures : ['']);
      
      // Handle specifications
      const productSpecs = productData.specifications || [];
      setSpecifications(Array.isArray(productSpecs) && productSpecs.length > 0 ? productSpecs : ['']);

    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imagePath: string) => {
    setExistingImages(prev => prev.filter(img => img !== imagePath));
  };

  const addFeature = () => {
    setFeatures(prev => [...prev, '']);
  };

  const updateFeature = (index: number, value: string) => {
    setFeatures(prev => prev.map((feature, i) => i === index ? value : feature));
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    setSpecifications(prev => [...prev, '']);
  };

  const updateSpecification = (index: number, value: string) => {
    setSpecifications(prev => prev.map((spec, i) => i === index ? value : spec));
  };

  const removeSpecification = (index: number) => {
    setSpecifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('Please log in again');
        router.push('/admin/login');
        return;
      }

      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.quantity) {
        alert('Please fill in all required fields');
        setSaving(false);
        return;
      }

      const formDataToSend = new FormData();

      // Append basic fields
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof typeof formData];
        if (value !== '' && value !== null && value !== undefined) {
          if (typeof value === 'boolean') {
            formDataToSend.append(key, value ? '1' : '0');
          } else {
            formDataToSend.append(key, value.toString());
          }
        }
      });

      // Append images
      images.forEach(image => {
        formDataToSend.append('images[]', image);
      });

      // Append features as JSON string
      const validFeatures = features.filter(f => f.trim() !== '');
      if (validFeatures.length > 0) {
        formDataToSend.append('features', JSON.stringify(validFeatures));
      }

      // Append specifications as JSON string
      const validSpecifications = specifications.filter(s => s.trim() !== '');
      if (validSpecifications.length > 0) {
        formDataToSend.append('specifications', JSON.stringify(validSpecifications));
      }

      // Append removed images
      if (product?.images) {
        const removedImages = product.images.filter(img => !existingImages.includes(img));
        removedImages.forEach(img => {
          formDataToSend.append('remove_images[]', img);
        });
      }

      console.log('Updating product with ID:', productId);

      const response = await fetch(`${API_BASE_URL}/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        alert('Session expired. Please log in again.');
        router.push('/admin/login');
        return;
      }

      if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation errors:', errorData);
        const errorMessage = errorData.errors 
          ? Object.values(errorData.errors).flat().join(', ')
          : 'Validation failed';
        alert(`Validation error: ${errorMessage}`);
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        let errorMessage = 'Failed to update product';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        
        alert(errorMessage);
        return;
      }

      const result = await response.json();
      console.log('Product updated successfully:', result);
      alert('Product updated successfully!');
      router.push('/admin/products');
      
    } catch (error) {
      console.error('Error updating product:', error);
      if (error instanceof TypeError) {
        alert('Network error: Cannot connect to server. Please check your internet connection and try again.');
      } else {
        alert('Failed to update product. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder-product.jpg';
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${API_BASE_URL}/storage/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-6">The product you're trying to edit doesn't exist or you don't have permission to access it.</p>
          <button
            onClick={() => router.push('/admin/products')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product: {product.name}</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Product SKU"
            />
          </div>

          <div>
            <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-2">
              Barcode
            </label>
            <input
              type="text"
              id="barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Product barcode"
            />
          </div>

          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Product brand"
            />
          </div>

          {/* Pricing */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (KES) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="compare_price" className="block text-sm font-medium text-gray-700 mb-2">
              Compare Price (KES)
            </label>
            <input
              type="number"
              id="compare_price"
              name="compare_price"
              step="0.01"
              min="0"
              value={formData.compare_price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700 mb-2">
              Cost Price (KES)
            </label>
            <input
              type="number"
              id="cost_price"
              name="cost_price"
              step="0.01"
              min="0"
              value={formData.cost_price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              required
              min="0"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0"
            />
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <textarea
              id="short_description"
              name="short_description"
              rows={3}
              value={formData.short_description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Brief description for product listings"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Full Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Detailed product description"
            />
          </div>

          {/* Images */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Existing Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={getImageUrl(image)}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.jpg';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(image)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add New Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter product feature"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Add Feature
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
            <div className="space-y-2">
              {specifications.map((spec, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => updateSpecification(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter specification (e.g., Material: Steel)"
                  />
                  {specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSpecification}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Add Specification
              </button>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Physical Attributes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  step="0.01"
                  min="0"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions (L×W×H)
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 10×5×2"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="track_quantity"
                  checked={formData.track_quantity}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Track Quantity</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_digital"
                  checked={formData.is_digital}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Digital Product</span>
              </label>
            </div>
          </div>

          {/* SEO */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="meta_title"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Meta title for SEO"
                />
              </div>
              <div>
                <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  id="meta_description"
                  name="meta_description"
                  rows={3}
                  value={formData.meta_description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Meta description for SEO"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}