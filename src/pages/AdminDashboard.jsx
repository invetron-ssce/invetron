import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import emailjs from '@emailjs/browser';
import { LogOut, Plus, Trash2, Edit, Users, BookOpen, Calendar, CircuitBoard, Save, X, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('coordinators');
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null); // { message, type: 'success'|'error' }

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const isAdmin = currentUser?.role === 'admin';

    // Helper: Ensure URL has https://
    const ensureProtocol = (url) => {
        if (!url) return '';
        if (!url.startsWith('http')) return `https://${url}`;
        return url;
    };

    // Helper: Convert Google Drive Link to Direct View Link
    const convertDriveLink = (url) => {
        if (!url) return '';
        try {
            if (url.includes('drive.google.com')) {
                const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (idMatch && idMatch[1]) {
                    // Using the standard export=view format which works best for Public files
                    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
                }
            }
            return url;
        } catch (e) { return url; }
    };



    // Real Firestore Subscription
    useEffect(() => {
        const q = query(collection(db, activeTab)); // orderBy can be added if timestamp exists
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setItems(data);
        }, (error) => {
            console.error("Error fetching data:", error);
        });

        return () => unsubscribe();
    }, [activeTab]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const storageRef = ref(storage, `uploads/${activeTab}/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Optional: You can track progress here
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.error("Upload error:", error);
                    showToast("Image upload failed.", "error");
                    setUploading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setNewItem({ ...newItem, image: downloadURL });
                        showToast("Image uploaded!", "success");
                        setUploading(false);
                    });
                }
            );
        } catch (error) {
            console.error("Error uploading image:", error);
            showToast("Error starting upload.", "error");
            setUploading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Remove id if it somehow got in there
            const { id, ...dataToSave } = newItem;

            // Timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Network timeout. Please check your connection.")), 15000)
            );

            await Promise.race([
                addDoc(collection(db, activeTab), {
                    ...dataToSave,
                    createdAt: new Date().toISOString()
                }),
                timeoutPromise
            ]);

            // --- ONBOARDING EMAIL LOGIC ---
            // Only send for Coordinators and Faculty if they have an email
            if ((activeTab === 'coordinators' || activeTab === 'faculty') && newItem.mail) {
                try {
                    // NOTE: You need to replace these with your actual EmailJS Service/Template IDs
                    const serviceID = 'YOUR_SERVICE_ID';
                    const templateID = 'YOUR_TEMPLATE_ID';
                    const publicKey = 'YOUR_PUBLIC_KEY';

                    const emailParams = {
                        to_name: newItem.name,
                        to_email: newItem.mail,
                        role: newItem.role || newItem.designation || 'Member',
                        // You can customize the message or link here
                        message: `Welcome to Invetron! We are thrilled to have you onboard as a ${newItem.role || newItem.designation}.`
                    };

                    // Only attempt to send if keys are configured (simple check)
                    if (serviceID !== 'YOUR_SERVICE_ID') {
                        await emailjs.send(serviceID, templateID, emailParams, publicKey);
                        showToast("Onboarding email sent!", 'success');
                    } else {
                        console.log("EmailJS not configured. Skipping email.");
                    }
                } catch (emailError) {
                    console.error("Failed to send onboarding email:", emailError);
                    // Don't block the UI, just log it. The entry was already added.
                    showToast("Entry added, but email failed.", 'warning');
                }
            }
            // -----------------------------

            setNewItem({});
            showToast("Entry added successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
            showToast(error.message, 'error');
        }
        setLoading(false);
    };

    const handleUpdate = async (id) => {
        setLoading(true);
        try {
            // Sanitize payload: remove ID to prevent overwriting/redundancy
            const { id: _, ...dataToUpdate } = newItem;

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Network timeout. Please check your connection.")), 15000)
            );

            await Promise.race([
                updateDoc(doc(db, activeTab, id), dataToUpdate),
                timeoutPromise
            ]);

            setEditingId(null);
            setNewItem({});
            showToast("Entry updated successfully!");
        } catch (error) {
            console.error("Error updating document: ", error);
            showToast(error.message, 'error');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item? THIS CANNOT BE UNDONE.")) return;
        try {
            await deleteDoc(doc(db, activeTab, id));
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Error deleting entry: " + error.message);
        }
    };

    const startEditing = (item) => {
        setEditingId(item.id);
        setNewItem(item);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setNewItem({});
    };

    const tabs = [
        { id: 'coordinators', label: 'Coordinators', icon: Users },
        { id: 'faculty', label: 'Faculty', icon: BookOpen },
        { id: 'activities', label: 'Activities', icon: Calendar },
        { id: 'projects', label: 'Projects', icon: CircuitBoard },
    ];

    const renderFormFields = () => {
        const commonClass = "bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none w-full";
        return (
            <>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon size={14} /> Profile/Cover Image
                    </label>

                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 hover:border-cyan-500/50 transition-all relative overflow-hidden group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                                    {uploading ? (
                                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-2" />
                                    ) : (
                                        <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors" />
                                    )}
                                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                                {uploading && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />}
                            </label>
                        </div>

                        {newItem.image && (
                            <div className="w-32 h-32 relative group rounded-lg overflow-hidden border border-white/20">
                                <img
                                    src={newItem.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setNewItem({ ...newItem, image: '' })}
                                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {activeTab === 'coordinators' && (
                    <>
                        <input placeholder="Name" className={commonClass} value={newItem.name || ''} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                        <input placeholder="Role" className={commonClass} value={newItem.role || ''} onChange={e => setNewItem({ ...newItem, role: e.target.value })} />
                        <select className={commonClass} value={newItem.branch || ''} onChange={e => setNewItem({ ...newItem, branch: e.target.value })}>
                            <option value="">Select Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="AIML">AIML</option>
                        </select>
                        <input placeholder="Year" className={commonClass} value={newItem.year || ''} onChange={e => setNewItem({ ...newItem, year: e.target.value })} />

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                            <input placeholder="Social: LinkedIn URL" className={commonClass} value={newItem.linkedin || ''} onChange={e => setNewItem({ ...newItem, linkedin: e.target.value })} onBlur={e => setNewItem({ ...newItem, linkedin: ensureProtocol(e.target.value) })} />
                            <input placeholder="Social: GitHub URL" className={commonClass} value={newItem.github || ''} onChange={e => setNewItem({ ...newItem, github: e.target.value })} onBlur={e => setNewItem({ ...newItem, github: ensureProtocol(e.target.value) })} />
                            <input placeholder="Social: Email Address" className={commonClass} value={newItem.mail || ''} onChange={e => setNewItem({ ...newItem, mail: e.target.value })} />
                        </div>
                    </>
                )}

                {activeTab === 'faculty' && (
                    <>
                        <input placeholder="Name" className={commonClass} value={newItem.name || ''} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                        <input placeholder="Designation" className={commonClass} value={newItem.designation || ''} onChange={e => setNewItem({ ...newItem, designation: e.target.value })} />
                        <input placeholder="Department" className={commonClass} value={newItem.dept || ''} onChange={e => setNewItem({ ...newItem, dept: e.target.value })} />
                    </>
                )}

                {activeTab === 'activities' && (
                    <>
                        <input placeholder="Title" className={commonClass} value={newItem.title || ''} onChange={e => setNewItem({ ...newItem, title: e.target.value })} />
                        <textarea placeholder="Description" rows="3" className="md:col-span-2 bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none w-full" value={newItem.desc || ''} onChange={e => setNewItem({ ...newItem, desc: e.target.value })} />
                    </>
                )}

                {activeTab === 'projects' && (
                    <>
                        <input placeholder="Title" className={commonClass} value={newItem.title || ''} onChange={e => setNewItem({ ...newItem, title: e.target.value })} />
                        <input placeholder="Category" className={commonClass} value={newItem.category || ''} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
                        <textarea placeholder="Description" rows="3" className="md:col-span-2 bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none w-full" value={newItem.desc || ''} onChange={e => setNewItem({ ...newItem, desc: e.target.value })} />
                    </>
                )}
            </>
        );
    };

    return (
        <section className="min-h-screen pt-28 pb-12 px-6 bg-[#030014]">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-[Orbitron] font-bold text-white uppercase">
                        {currentUser?.role || 'User'} <span className="text-cyan-400">DASHBOARD</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm hidden sm:inline">{currentUser?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Tabs */}
                    <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-2 h-fit">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); cancelEditing(); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                <tab.icon size={18} />
                                <span className="font-bold tracking-wide">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3 glass-card p-6 border border-white/10 min-h-[500px]">
                        <div className="mb-6 border-b border-white/10 pb-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white capitalize">{activeTab} Management</h2>
                            {isAdmin && !editingId && (
                                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">Admin Access: Full Control</span>
                            )}
                        </div>

                        {/* Add/Edit Form (Only for Admin) */}
                        {isAdmin && (
                            <div className={`bg-white/5 p-6 rounded-xl border ${editingId ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10'} mb-8 transition-colors`}>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    {editingId ? <><Edit size={18} className="text-yellow-400" /> Edit Entry</> : <><Plus size={18} className="text-green-400" /> Add New {activeTab.slice(0, -1)}</>}
                                </h3>
                                <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(editingId); } : handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renderFormFields()}
                                    <div className="md:col-span-2 flex gap-3">
                                        <button disabled={loading} className={`flex-1 py-3 rounded-lg text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${editingId ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-green-600 hover:bg-green-500'}`}>
                                            {editingId ? <Save size={18} /> : <Plus size={18} />}
                                            {loading ? 'Saving...' : (editingId ? 'Update Entry' : 'Add Entry')}
                                        </button>
                                        {editingId && (
                                            <button type="button" onClick={cancelEditing} className="px-4 py-3 rounded-lg bg-gray-600 text-white font-bold hover:bg-gray-500 transition-all">
                                                <X size={18} /> Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* List Area */}
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 group">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.name || item.title}
                                                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                                                    referrerPolicy="no-referrer"
                                                />
                                            )}
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{item.name || item.title || "Untitled"}</h4>

                                                {/* Tailored Info based on Tab */}
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {activeTab === 'coordinators' && (
                                                        <>
                                                            {item.role && <span className="text-xs text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/30">{item.role}</span>}
                                                            {item.branch && <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/30">{item.branch}</span>}
                                                            {item.year && <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">{item.year}</span>}
                                                        </>
                                                    )}

                                                    {activeTab === 'faculty' && (
                                                        <>
                                                            {item.designation && <span className="text-xs text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/30">{item.designation}</span>}
                                                            {item.dept && <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/30">{item.dept}</span>}
                                                        </>
                                                    )}

                                                    {activeTab === 'activities' && (
                                                        <>
                                                            {item.desc && <span className="text-xs text-gray-400 italic max-w-md truncate block">{item.desc}</span>}
                                                        </>
                                                    )}

                                                    {activeTab === 'projects' && (
                                                        <>
                                                            {item.category && <span className="text-xs text-pink-400 bg-pink-900/30 px-2 py-0.5 rounded border border-pink-500/30">{item.category}</span>}
                                                            {item.desc && <span className="text-xs text-gray-400 italic max-w-md truncate hidden sm:block">{item.desc}</span>}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons (Only for Admin) */}
                                    {isAdmin && (
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => startEditing(item)}
                                                className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {items.length === 0 && <p className="text-gray-500 text-center py-8">No items found in {activeTab}. Admin should add some!</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-center gap-3 z-50 animate-slide-in ${toast.type === 'error'
                    ? 'bg-red-500/20 border-red-500/50 text-red-200'
                    : 'bg-green-500/20 border-green-500/50 text-green-200'
                    }`}>
                    <div className={`w-3 h-3 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                    <span className="font-bold tracking-wide">{toast.message}</span>
                </div>
            )}
        </section>
    );
};

export default AdminDashboard;
