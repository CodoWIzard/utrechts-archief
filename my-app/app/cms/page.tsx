"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PanoramaPage } from '../data/panorama-data';

function EditModal({ page, onSave, onClose }: {
  page: PanoramaPage | null;
  onSave: (updatedPage: PanoramaPage) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<PanoramaPage | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (page) {
      setFormData({ ...page });
    }
  }, [page]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      
      const response = await fetch('/api/cms/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      
      if (response.ok) {
        const { imageUrl } = await response.json();
        setFormData({ ...formData, imageUrl });
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  if (!page || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Edit Page</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catalog Number
              </label>
              <input
                type="text"
                value={formData.catalogNumber}
                onChange={(e) => setFormData({ ...formData, catalogNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="Image URL or upload a new image below"
                  required
                />
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                  />
                  {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                </div>
                {formData.imageUrl && (
                  <div className="mt-4 relative">
                    <img
                      src={(() => {
                        const imageMap: { [key: string]: string } = {
                          'page1': '/images/page1.png',
                          'page2': '/images/page2.png',
                          'page3': '/images/page3.png',
                          'page5': '/images/page5.png',
                          'page6': '/images/page6.png',
                          'page7': '/images/page7.png',
                          'page8': '/images/page8.png',
                          'page9': '/images/page9.png',
                          'page10': '/images/page10-1.png',
                          'page11': '/images/page11.png',
                          'page12': '/images/page12.png',
                          'page13': '/images/page13.png',
                          'page14': '/images/page14.png',
                          'page15': '/images/page15.png',
                          'page16': '/images/page16.png',
                          'page17': '/images/page17.png',
                          'page19': '/images/page19.png',
                          'page20': '/images/page20.png',
                          'page21': '/images/page21.png',
                          'page22': '/images/page22.png',
                          'page23': '/images/page23.png',
                          'page24': '/images/page24.png',
                          'page25': '/images/page25.png',
                          'page26': '/images/page26.png',
                          'page27': '/images/page27.jpg',
                          'page28': '/images/page28.png',
                          'page29': '/images/page29.png',
                          'page30': '/images/page30.png',
                          'page31': '/images/page31.png',
                          'page32': '/images/page32.png',
                          'page33': '/images/page33.png'
                        };
                        return imageMap[formData.id] || formData.imageUrl;
                      })()}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Info (Optional)
              </label>
              <textarea
                value={formData.additionalInfo || ''}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CMSPage() {
  const [pages, setPages] = useState<PanoramaPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<PanoramaPage | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [archivedPages, setArchivedPages] = useState<any[]>([]);
  const [showArchive, setShowArchive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPages();
    fetchArchivedPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/cms/pages');
      const data = await response.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedPages = async () => {
    try {
      const response = await fetch('/api/cms/archive');
      const data = await response.json();
      setArchivedPages(data.archivedPages || []);
    } catch (error) {
      console.error('Failed to fetch archived pages:', error);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newPages = [...pages];
    [newPages[index], newPages[index - 1]] = [newPages[index - 1], newPages[index]];
    setPages(newPages);
  };

  const moveDown = (index: number) => {
    if (index === pages.length - 1) return;
    const newPages = [...pages];
    [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    setPages(newPages);
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      const pageIds = pages.map(page => page.id);
      await fetch('/api/cms/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageIds }),
      });
      alert('Order saved successfully!');
    } catch (error) {
      alert('Failed to save order');
    } finally {
      setSaving(false);
    }
  };

  const savePageEdit = async (updatedPage: PanoramaPage) => {
    try {
      const updatedPages = pages.map(page => 
        page.id === updatedPage.id ? updatedPage : page
      );
      
      await fetch('/api/cms/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: updatedPages }),
      });
      
      setPages(updatedPages);
      setEditingPage(null);
      alert('Page updated successfully!');
    } catch (error) {
      alert('Failed to update page');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/cms/login');
  };

  const addNewPage = () => {
    const newPage: PanoramaPage = {
      id: `page_${Date.now()}`,
      catalogNumber: '',
      title: '',
      description: '',
      imageUrl: '',
    };
    setEditingPage(newPage);
    setShowAddModal(true);
  };

  const saveNewPage = async (newPage: PanoramaPage) => {
    try {
      const updatedPages = [...pages, newPage];
      
      await fetch('/api/cms/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: updatedPages }),
      });
      
      setPages(updatedPages);
      setEditingPage(null);
      setShowAddModal(false);
      alert('Page added successfully!');
    } catch (error) {
      alert('Failed to add page');
    }
  };

  const deletePage = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page? It will be moved to archive.')) return;
    
    try {
      const response = await fetch('/api/cms/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId }),
      });
      
      if (response.ok) {
        setPages(pages.filter(page => page.id !== pageId));
        fetchArchivedPages();
        alert('Page moved to archive successfully!');
      } else {
        alert('Failed to delete page');
      }
    } catch (error) {
      alert('Failed to delete page');
    }
  };

  const restorePage = async (pageId: string) => {
    try {
      const response = await fetch('/api/cms/archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const updatedPages = [...pages, data.restoredPage];
        
        await fetch('/api/cms/pages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pages: updatedPages }),
        });
        
        setPages(updatedPages);
        fetchArchivedPages();
        alert('Page restored successfully!');
      } else {
        alert('Failed to restore page');
      }
    } catch (error) {
      alert('Failed to restore page');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-amber-900">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-900 text-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-white">Panorama CMS</h1>
          <div className="flex gap-3">
            <button
              onClick={addNewPage}
              className="bg-amber-700 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Add Page
            </button>
            <button
              onClick={() => setShowArchive(!showArchive)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              {showArchive ? 'Hide Archive' : `Archive (${archivedPages.length})`}
            </button>
            <button
              onClick={saveOrder}
              disabled={saving}
              className="bg-amber-800 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : 'Save Order'}
            </button>
            <button
              onClick={handleLogout}
              className="text-amber-200 hover:text-white px-3 py-2.5 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            Manage Pages ({pages.length} total)
          </h2>
          <p className="text-slate-600 text-lg">
            Drag pages to reorder, then click "Save Order". Click "Edit" to modify page content.
          </p>
        </div>

        <div className="space-y-4">
          {pages.map((page, index) => (
            <div 
              key={page.id} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-move"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', index.toString());
                e.currentTarget.style.opacity = '0.5';
              }}
              onDragEnd={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = '#fef3c7';
              }}
              onDragLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = 'white';
                const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const hoverIndex = index;
                if (dragIndex !== hoverIndex) {
                  const newPages = [...pages];
                  const draggedItem = newPages[dragIndex];
                  newPages.splice(dragIndex, 1);
                  newPages.splice(hoverIndex, 0, draggedItem);
                  setPages(newPages);
                }
              }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center cursor-grab hover:bg-amber-200 transition-colors">
                    <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={(() => {
                      const imageMap: { [key: string]: string } = {
                        'page1': '/images/page1.png',
                        'page2': '/images/page2.png',
                        'page3': '/images/page3.png',
                        'page5': '/images/page5.png',
                        'page6': '/images/page6.png',
                        'page7': '/images/page7.png',
                        'page8': '/images/page8.png',
                        'page9': '/images/page9.png',
                        'page10': '/images/page10-1.png',
                        'page11': '/images/page11.png',
                        'page12': '/images/page12.png',
                        'page13': '/images/page13.png',
                        'page14': '/images/page14.png',
                        'page15': '/images/page15.png',
                        'page16': '/images/page16.png',
                        'page17': '/images/page17.png',
                        'page19': '/images/page19.png',
                        'page20': '/images/page20.png',
                        'page21': '/images/page21.png',
                        'page22': '/images/page22.png',
                        'page23': '/images/page23.png',
                        'page24': '/images/page24.png',
                        'page25': '/images/page25.png',
                        'page26': '/images/page26.png',
                        'page27': '/images/page27.jpg',
                        'page28': '/images/page28.png',
                        'page29': '/images/page29.png',
                        'page30': '/images/page30.png',
                        'page31': '/images/page31.png',
                        'page32': '/images/page32.png',
                        'page33': '/images/page33.png'
                      };
                      return imageMap[page.id] || `/images/${page.id}.png`;
                    })()}
                    alt={page.title}
                    className="w-32 h-20 object-cover rounded-lg shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{page.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{page.catalogNumber}</p>
                  <p className="text-slate-600 leading-relaxed line-clamp-2">{page.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingPage(page)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePage(page.id)}
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showArchive && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Archived Pages ({archivedPages.length})
            </h2>
            <div className="space-y-4">
              {archivedPages.map((page) => (
                <div key={page.id} className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200">
                  <div className="flex items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{page.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{page.catalogNumber}</p>
                      <p className="text-slate-600 leading-relaxed line-clamp-2 mb-2">{page.description}</p>
                      <p className="text-xs text-red-600">Deleted: {new Date(page.deletedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => restorePage(page.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {archivedPages.length === 0 && (
                <p className="text-slate-500 text-center py-8">No archived pages</p>
              )}
            </div>
          </div>
        )}
      </main>

      <EditModal
        page={editingPage}
        onSave={showAddModal ? saveNewPage : savePageEdit}
        onClose={() => {
          setEditingPage(null);
          setShowAddModal(false);
        }}
      />
    </div>
  );
}