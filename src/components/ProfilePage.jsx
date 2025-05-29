import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  PencilIcon, 
  PlusIcon, 
  UserCircleIcon,
  CodeBracketIcon,
  BookmarkIcon,
  TrashIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import CreatePost from './CreatePost';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeTab, setActiveTab] = useState('problems');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, []);

  useEffect(() => {
    if (profile) {
      setEditedProfile(profile);
    }
  }, [profile]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/posts/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/auth/profile',
        editedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(editedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/posts/${editingPost.id}`,
        editingPost,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p));
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:5000/api/posts/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Photo */}
      <div className="h-80 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <button className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <CameraIcon className="h-5 w-5" />
          <span>Edit Cover Photo</span>
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-32">
        <div className="relative z-10">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="h-40 w-40 rounded-full bg-white p-1 shadow-lg">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                    {profile?.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt={profile.username}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-full w-full text-white" />
                    )}
                  </div>
                </div>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                {editMode ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editedProfile.username}
                      onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={editedProfile.bio || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                      placeholder="Write something about yourself..."
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={handleUpdateProfile}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setEditedProfile(profile);
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">{profile.username}</h1>
                    <p className="text-gray-600 mt-1">{profile.email}</p>
                    <p className="text-gray-700 mt-4 text-lg">{profile.bio || 'No bio yet'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{posts.length}</div>
                <div className="text-sm text-gray-600">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('problems')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'problems'
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <CodeBracketIcon className="h-5 w-5" />
                  <span>Problems</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'saved'
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <BookmarkIcon className="h-5 w-5" />
                  <span>Saved</span>
                </button>
              </div>
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Problem</span>
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
                {editingPost?.id === post.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={editingPost.description}
                        onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                      <textarea
                        value={editingPost.code}
                        onChange={(e) => setEditingPost({ ...editingPost, code: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                        rows="6"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                      <select
                        value={editingPost.difficulty}
                        onChange={(e) => setEditingPost({ ...editingPost, difficulty: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editingPost.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => {
                                const newTags = [...editingPost.tags];
                                newTags.splice(index, 1);
                                setEditingPost({ ...editingPost, tags: newTags });
                              }}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (tagInput.trim() && !editingPost.tags?.includes(tagInput.trim())) {
                                setEditingPost({
                                  ...editingPost,
                                  tags: [...(editingPost.tags || []), tagInput.trim()]
                                });
                                setTagInput('');
                              }
                            }
                          }}
                          placeholder="Add a tag and press Enter"
                          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (tagInput.trim() && !editingPost.tags?.includes(tagInput.trim())) {
                              setEditingPost({
                                ...editingPost,
                                tags: [...(editingPost.tags || []), tagInput.trim()]
                              });
                              setTagInput('');
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setEditingPost(null)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdatePost}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        post.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        post.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {post.difficulty}
                      </span>
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default ProfilePage;
