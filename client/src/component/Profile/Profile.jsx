import React, { useEffect, useState, useContext } from 'react';
import { Camera, Save, Edit3, X } from 'lucide-react';
import { AccountContext } from '../../contest/AccountProvider';

const Profile = () => {
  const { account } = useContext(AccountContext);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    imageUrl: '',
    gender: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserData(data.profile);
        setEditForm({
          name: data.profile.name,
          bio: data.profile.bio,
          imageUrl: data.profile.imageUrl,
          gender: data.profile.gender
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append text fields
      formData.append('name', editForm.name);
      formData.append('bio', editForm.bio);
      formData.append('gender', editForm.gender);
      
      // Append image file if it exists
      if (editForm.imageFile) {
        formData.append('image', editForm.imageFile);
      }
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      console.log("form data",formData);
      const response = await fetch('http://localhost:8000/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          // Don't set Content-Type when sending FormData
          // The browser will set it automatically with the correct boundary
        },
        body: formData
      });
      console.log("after calling api");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      
      // Update the local state with the response from the server
      setUserData(updatedData.profile);
      setPreviewImage(null);
      setIsEditing(false);
      
      // Show success message
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src={previewImage || userData.imageUrl || '/api/placeholder/128/128'}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-6 pb-6">
          <div className="text-center mb-6">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="text-2xl font-bold text-center w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold">{userData.name}</h1>
            )}
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">Bio</h2>
            {isEditing ? (
              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700">{userData.bio || 'No bio added yet'}</p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500">Problems Solved</h3>
              <p className="text-2xl font-bold text-blue-600">{userData.problemsSolved}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500">Gender</h3>
              {isEditing ? (
                <select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-2xl font-bold text-blue-600">{userData.gender}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            {isEditing ? (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;