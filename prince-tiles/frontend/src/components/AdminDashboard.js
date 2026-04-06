import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://prince-tiles-0fxc.onrender.com/api';
const BASE_URL = 'https://prince-tiles-0fxc.onrender.com';

export default function AdminDashboard() {
  const [designs, setDesigns] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [activeTab, setActiveTab] = useState('designs');
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const navigate = useNavigate();

  // Design form states
  const [designTitle, setDesignTitle] = useState('');
  const [designDesc, setDesignDesc] = useState('');
  const [designPdf, setDesignPdf] = useState(null);

  // Gallery form states
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('floor');
  const [galleryLoc, setGalleryLoc] = useState('');
  const [galleryTag, setGalleryTag] = useState('');
  const [galleryImage, setGalleryImage] = useState(null);
  const [galleryLarge, setGalleryLarge] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const dRes = await axios.get(`${API_URL}/designs`);
      const gRes = await axios.get(`${API_URL}/gallery`);
      setDesigns(dRes.data);
      setGallery(gRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const handleDesignUpload = async (e) => {
    e.preventDefault();
    if (!designPdf) return alert('Please select a PDF file');

    const formData = new FormData();
    formData.append('title', designTitle);
    formData.append('desc', designDesc);
    formData.append('pdf', designPdf);

    try {
      await axios.post(`${API_URL}/designs/upload`, formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
      });
      alert('Design uploaded successfully!');
      setDesignTitle('');
      setDesignDesc('');
      setDesignPdf(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || 'Upload failed');
    }
  };

  const handleGalleryUpload = async (e) => {
    e.preventDefault();
    if (!galleryImage) return alert('Please select an image file');

    const formData = new FormData();
    formData.append('title', galleryTitle);
    formData.append('category', galleryCategory);
    formData.append('loc', galleryLoc);
    formData.append('tag', galleryTag);
    formData.append('image', galleryImage);
    formData.append('large', galleryLarge);

    try {
      await axios.post(`${API_URL}/gallery/upload`, formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
      });
      alert('Gallery item uploaded successfully!');
      setGalleryTitle('');
      setGalleryLoc('');
      setGalleryTag('');
      setGalleryImage(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || 'Upload failed');
    }
  };

  const handleDeleteDesign = async (id) => {
    if (!window.confirm('Are you sure you want to delete this design?')) return;
    try {
      await axios.delete(`${API_URL}/designs/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-dashboard" style={{ padding: '120px 20px', minHeight: '80vh', background: '#f5f5f5', cursor: 'auto' }}>
      <div className="container">
        <button 
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600' }}
        >
          <i className="fas fa-arrow-left" /> Back to Home
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#333' }}>Developer Dashboard</h2>
          <button onClick={handleLogout} style={{ background: '#ff4444', border: 'none', padding: '10px 20px', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
        </div>

        <div className="admin-tabs" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <button onClick={() => setActiveTab('designs')} style={{ padding: '10px 20px', borderRadius: '6px', border: activeTab === 'designs' ? 'none' : '1px solid #ddd', background: activeTab === 'designs' ? '#c9a96e' : '#fff', color: activeTab === 'designs' ? '#fff' : '#333', cursor: 'pointer', fontWeight: '600' }}>Manage Designs</button>
          <button onClick={() => setActiveTab('gallery')} style={{ padding: '10px 20px', borderRadius: '6px', border: activeTab === 'gallery' ? 'none' : '1px solid #ddd', background: activeTab === 'gallery' ? '#c9a96e' : '#fff', color: activeTab === 'gallery' ? '#fff' : '#333', cursor: 'pointer', fontWeight: '600' }}>Manage Gallery</button>
        </div>

        {activeTab === 'designs' ? (
          <div className="admin-section">
            <div className="admin-card" style={{ background: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#333', marginBottom: '20px' }}>Upload New Design PDF</h3>
              <form onSubmit={handleDesignUpload} style={{ display: 'grid', gap: '15px' }}>
                <input type="text" placeholder="Design Title" value={designTitle} onChange={(e) => setDesignTitle(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'text' }} required />
                <textarea placeholder="Description" value={designDesc} onChange={(e) => setDesignDesc(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', minHeight: '100px', cursor: 'text' }} required />
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '0.9rem' }}>PDF File</label>
                  <input type="file" accept="application/pdf" onChange={(e) => setDesignPdf(e.target.files[0])} style={{ width: '100%', cursor: 'pointer' }} required />
                </div>
                <button type="submit" style={{ padding: '12px', borderRadius: '6px', border: 'none', background: '#c9a96e', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s' }}>Upload Design</button>
              </form>
            </div>

            <h3 style={{ color: '#333', marginBottom: '20px' }}>Existing Designs</h3>
            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {designs.map(d => (
                <div key={d._id} className="admin-item-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#f0f0f0', width: '40px', height: '40px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4444' }}>
                      <i className="fas fa-file-pdf" />
                    </div>
                    <div>
                      <h4 style={{ margin: '0', color: '#333' }}>{d.title}</h4>
                      <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#666' }}>{d.desc.substring(0, 50)}...</p>
                      <a href={`${BASE_URL}/${d.pdfPath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#c9a96e', textDecoration: 'underline', cursor: 'pointer' }}>View PDF</a>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteDesign(d._id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '1.2rem' }}><i className="fas fa-trash" /></button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="admin-section">
            <div className="admin-card" style={{ background: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#333', marginBottom: '20px' }}>Upload New Gallery Image</h3>
              <form onSubmit={handleGalleryUpload} style={{ display: 'grid', gap: '15px' }}>
                <input type="text" placeholder="Title" value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'text' }} required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <select value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'pointer' }}>
                    <option value="floor">Flooring</option>
                    <option value="wall">Wall Tiles</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="kitchen">Kitchen</option>
                  </select>
                  <input type="text" placeholder="Tag (e.g. Flooring)" value={galleryTag} onChange={(e) => setGalleryTag(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'text' }} required />
                </div>
                <input type="text" placeholder="Location (e.g. Villa, Chennai)" value={galleryLoc} onChange={(e) => setGalleryLoc(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'text' }} required />
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '0.9rem' }}>Gallery Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setGalleryImage(e.target.files[0])} style={{ width: '100%', cursor: 'pointer' }} required />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="large" checked={galleryLarge} onChange={(e) => setGalleryLarge(e.target.checked)} style={{ cursor: 'pointer' }} />
                  <label htmlFor="large" style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#666' }}>Large Card (Highlight)</label>
                </div>
                <button type="submit" style={{ padding: '12px', borderRadius: '6px', border: 'none', background: '#c9a96e', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s' }}>Upload Gallery Item</button>
              </form>
            </div>

            <h3 style={{ color: '#333', marginBottom: '20px' }}>Existing Gallery Items</h3>
            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {gallery.map(item => (
                <div key={item._id} className="admin-item-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={`${BASE_URL}/${item.imagePath}`} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <h4 style={{ margin: '0', color: '#333' }}>{item.title}</h4>
                      <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#666' }}>{item.category} | {item.loc}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteGallery(item._id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '1.2rem' }}><i className="fas fa-trash" /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
