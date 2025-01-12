import React, { useEffect, useState } from 'react';
import { Camera, Save, Edit3, X, Trophy, Star, Code2, Users } from 'lucide-react';
import Nav from './LeftNav';

const Profile = () => {
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
        setEditForm(prev => ({
          ...prev,
          imageFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: editForm.name,
        bio: editForm.bio,
        gender: editForm.gender,
        imageUrl: previewImage || editForm.imageUrl
      };

      const response = await fetch('http://localhost:8000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedData = await response.json();
      setUserData(updatedData.profile);
      setPreviewImage(null);
      setIsEditing(false);
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
    
    <div className=" mx-auto bg-gray-50 min-h-screen">
      <Nav />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <div className="relative flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <img
                src={previewImage || userData.imageUrl || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png'}
                alt="profile"
                className="w-full h-full rounded-full object-cover ring-4 ring-blue-100"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="text-2xl font-bold text-center w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none mb-2"
              />
            ) : (
              <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
            )}

            {/* Quick Stats */}
            <div className="flex gap-4 mb-6 text-gray-600">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>Rank 42</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>2.5k</span>
              </div>
            </div>

            {/* Bio Section */}
            <div className="w-full mb-6">
              <h2 className="text-sm font-semibold text-gray-500 mb-2">About Me</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700">{userData.bio || 'No bio added yet'}</p>
              )}
            </div>

            {/* Gender Selection */}
            <div className="w-full mb-6">
              <h2 className="text-sm font-semibold text-gray-500 mb-2">Gender</h2>
              {isEditing ? (
                <select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="w-full flex justify-center gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
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

        {/* Right Column - Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Problems Solved Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Code2 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Problems Solved</p>
                  <p className="text-2xl font-bold text-blue-600">{userData.problemsSolved}</p>
                </div>
              </div>
            </div>

            {/* Contest Rating Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contest Rating</p>
                  <p className="text-2xl font-bold text-green-600">1842</p>
                </div>
              </div>
            </div>

            {/* Global Rank Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Global Rank</p>
                  <p className="text-2xl font-bold text-purple-600">#425</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Solved "Two Sum" in Python</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;