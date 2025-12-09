
import React, { useState } from 'react';
import { Search, Plus, Megaphone, Image as ImageIcon, Type, Eye, Edit2, Trash2, Calendar, CheckCircle2, Save, X, Clock } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  status: string;
  date: string;
  views: number;
  isPermanent: boolean;
  endDate?: string;
  content?: string;
}

const AnnouncementManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'published' | 'draft'>('published');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Editor State
  const [form, setForm] = useState({
      id: 0,
      title: '',
      subtitle: '',
      type: 'text', // 'text' | 'image'
      content: '', // Text content or Image URL
      status: 'draft',
      publishDate: '',
      endDate: '',
      isPermanent: true
  });

  // Mock Data
  const [announcements, setAnnouncements] = useState<Announcement[]>([
      { id: 1, title: '关于举办第五届“讲好中国故事”大赛的通知', subtitle: '赛事启动公告', type: 'text', status: 'published', date: '2025-03-01', views: 12500, isPermanent: true },
      { id: 2, title: '初赛作品上传指南', subtitle: '操作手册', type: 'image', status: 'published', date: '2025-03-05', views: 8900, isPermanent: false, endDate: '2025-06-30' },
      { id: 3, title: '复赛晋级名单公示', subtitle: '第一批次', type: 'text', status: 'draft', date: '2025-03-15', views: 0, isPermanent: true },
  ]);

  const filteredList = announcements.filter(a => a.status === activeTab && a.title.includes(searchQuery));

  const handleEdit = (item: Announcement) => {
      setForm({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          type: item.type,
          content: item.content || '',
          status: item.status,
          publishDate: item.date,
          endDate: item.endDate || '',
          isPermanent: item.isPermanent
      });
      setShowModal(true);
  };

  const handleCreate = () => {
      setForm({ 
          id: 0, 
          title: '', 
          subtitle: '', 
          type: 'text', 
          content: '', 
          status: 'draft', 
          publishDate: new Date().toISOString().split('T')[0],
          endDate: '',
          isPermanent: true
      });
      setShowModal(true);
  };

  const handleSave = (status: string) => {
      if (!form.title) return alert('请输入主标题');
      
      let views = 0;
      if (form.id) {
          const existing = announcements.find(a => a.id === form.id);
          if (existing) views = existing.views;
      }

      const newItem: Announcement = { 
          id: form.id || Date.now(),
          title: form.title,
          subtitle: form.subtitle,
          type: form.type,
          content: form.content,
          status: status,
          date: form.publishDate,
          views: views,
          isPermanent: form.isPermanent,
          endDate: form.isPermanent ? undefined : form.endDate
      };
      
      if (form.id) {
          setAnnouncements(prev => prev.map(a => a.id === form.id ? newItem : a));
      } else {
          setAnnouncements(prev => [newItem, ...prev]);
      }
      setShowModal(false);
  };

  const handleDelete = (id: number) => {
      if (confirm('确定删除此公告吗？')) {
          setAnnouncements(prev => prev.filter(a => a.id !== id));
      }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">公告管理</h1>
            <button 
                onClick={handleCreate}
                className="bg-[#7f1d1d] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#991b1b] flex items-center text-xs transition-colors"
            >
                <Plus size={16} className="mr-2" /> 发布新公告
            </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col flex-1">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <div className="flex bg-stone-100 p-1 rounded-xl">
                    <button 
                        onClick={() => setActiveTab('published')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'published' ? 'bg-white text-[#7f1d1d] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                        已发布
                    </button>
                    <button 
                        onClick={() => setActiveTab('draft')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'draft' ? 'bg-white text-[#7f1d1d] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                        草稿箱
                    </button>
                </div>

                <div className="relative w-72">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索公告标题..." 
                        className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:border-[#7f1d1d] transition-all" 
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <div className="space-y-4">
                    {filteredList.map(item => (
                        <div key={item.id} className="border border-stone-200 rounded-2xl p-5 hover:shadow-md transition-all group bg-white flex justify-between items-center">
                            <div className="flex items-start">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 ${item.type === 'text' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                    {item.type === 'text' ? <Type size={24} /> : <ImageIcon size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-stone-800 group-hover:text-[#7f1d1d] transition-colors">{item.title}</h3>
                                    {item.subtitle && <p className="text-sm text-stone-500 mt-0.5">{item.subtitle}</p>}
                                    <div className="flex items-center gap-4 mt-2 text-xs text-stone-400">
                                        <span className="flex items-center"><Calendar size={12} className="mr-1"/> 发布: {item.date}</span>
                                        {!item.isPermanent && item.endDate && (
                                            <span className="flex items-center text-amber-500"><Clock size={12} className="mr-1"/> 截止: {item.endDate}</span>
                                        )}
                                        {item.isPermanent && (
                                            <span className="flex items-center text-green-600"><CheckCircle2 size={12} className="mr-1"/> 永久有效</span>
                                        )}
                                        {item.status === 'published' && <span className="flex items-center"><Eye size={12} className="mr-1"/> {item.views} 阅读</span>}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-2 bg-stone-50 text-stone-600 rounded-lg hover:bg-stone-100 hover:text-[#7f1d1d]"><Edit2 size={18}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-stone-50 text-stone-600 rounded-lg hover:bg-red-50 hover:text-red-600"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    ))}
                    {filteredList.length === 0 && <div className="text-center py-20 text-stone-400">暂无相关公告</div>}
                </div>
            </div>
        </div>

        {/* Editor Modal */}
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-2xl rounded-3xl flex flex-col max-h-[90vh] shadow-2xl animate-slide-up">
                    <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50 rounded-t-3xl">
                        <h3 className="font-bold text-lg text-stone-800 font-serif">{form.id ? '编辑公告' : '发布新公告'}</h3>
                        <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-stone-500 mb-1.5">主标题 <span className="text-red-500">*</span></label>
                            <input 
                                value={form.title}
                                onChange={e => setForm({...form, title: e.target.value})}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                placeholder="请输入公告主标题"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 mb-1.5">副标题</label>
                            <input 
                                value={form.subtitle}
                                onChange={e => setForm({...form, subtitle: e.target.value})}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                placeholder="请输入副标题 (可选)"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-2">内容类型</label>
                                <div className="flex bg-stone-50 p-1 rounded-xl border border-stone-200">
                                    <button 
                                        onClick={() => setForm({...form, type: 'text'})}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${form.type === 'text' ? 'bg-white text-blue-600 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                                    >
                                        <Type size={14} className="inline mr-1"/> 纯文本
                                    </button>
                                    <button 
                                        onClick={() => setForm({...form, type: 'image'})}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${form.type === 'image' ? 'bg-white text-purple-600 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                                    >
                                        <ImageIcon size={14} className="inline mr-1"/> 图片/长图
                                    </button>
                                </div>
                            </div>
                            
                            {/* Date Settings */}
                            <div className="col-span-2 grid grid-cols-2 gap-6 bg-stone-50 p-4 rounded-xl border border-stone-100">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-2">发布时间</label>
                                    <input 
                                        type="date"
                                        value={form.publishDate}
                                        onChange={e => setForm({...form, publishDate: e.target.value})}
                                        className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-sm font-medium outline-none focus:border-[#7f1d1d]"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-xs font-bold text-stone-500">截止时间</label>
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={form.isPermanent} 
                                                onChange={(e) => setForm({...form, isPermanent: e.target.checked})}
                                                className="w-3 h-3 accent-[#7f1d1d] mr-1.5 rounded cursor-pointer" 
                                            />
                                            <span className={`text-xs font-bold ${form.isPermanent ? 'text-[#7f1d1d]' : 'text-stone-400'}`}>永久有效</span>
                                        </label>
                                    </div>
                                    <input 
                                        type="date"
                                        value={form.endDate}
                                        onChange={e => setForm({...form, endDate: e.target.value})}
                                        disabled={form.isPermanent}
                                        className={`w-full border rounded-xl p-2.5 text-sm font-medium outline-none transition-colors ${
                                            form.isPermanent 
                                            ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed' 
                                            : 'bg-white border-stone-200 text-stone-800 focus:border-[#7f1d1d]'
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 mb-2">公告内容</label>
                            {form.type === 'text' ? (
                                <textarea 
                                    value={form.content}
                                    onChange={e => setForm({...form, content: e.target.value})}
                                    className="w-full h-48 bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-[#7f1d1d] resize-none"
                                    placeholder="在此输入公告正文内容..."
                                ></textarea>
                            ) : (
                                <div className="w-full h-48 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 cursor-pointer hover:bg-stone-100 transition-colors">
                                    <ImageIcon size={32} className="mb-2 opacity-50" />
                                    <span className="text-xs font-bold">点击上传图片 (支持 JPG/PNG)</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 border-t border-stone-100 flex justify-end gap-3 bg-stone-50/50 rounded-b-3xl">
                        <button onClick={() => handleSave('draft')} className="px-6 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-50">存为草稿</button>
                        <button onClick={() => handleSave('published')} className="px-6 py-2.5 rounded-xl bg-[#7f1d1d] text-white font-bold text-sm shadow-lg hover:bg-[#991b1b] flex items-center">
                            <Megaphone size={16} className="mr-2" /> 立即发布
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default AnnouncementManagement;
