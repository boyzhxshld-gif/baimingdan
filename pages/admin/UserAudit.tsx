
import React, { useState } from 'react';
import { Check, X, Search, LayoutGrid, List, UserCheck, Shield, FileText, School, Image as ImageIcon } from 'lucide-react';

const UserAudit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teacher' | 'parent'>('teacher');
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedAuditId, setSelectedAuditId] = useState<number | null>(null);

  // Mock Audit Data
  const audits = [
      { id: 1, type: 'teacher', name: '李华', school: '海淀实验小学', idCard: '110105199001011234', submitTime: '2025-08-20 10:30', status: 'pending', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop&q=60' }, // Fake cert image
      { id: 2, type: 'teacher', name: '张老师', school: '新东方', idCard: '110108198805055678', submitTime: '2025-08-20 11:15', status: 'pending', image: 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?w=400&auto=format&fit=crop&q=60' },
      { id: 3, type: 'parent', name: '王大锤', childCount: 1, idCard: '310105198506069999', submitTime: '2025-08-19 16:20', status: 'pending', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=60' }, // Fake ID/Household
      { id: 4, type: 'parent', name: '陈美丽', childCount: 2, idCard: '440105199209091234', submitTime: '2025-08-19 14:00', status: 'pending', image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&auto=format&fit=crop&q=60' },
  ];

  const filteredAudits = audits.filter(a => a.type === activeTab && a.status === 'pending' && a.name.includes(searchQuery));

  const handleApprove = (id: number) => {
      if (window.confirm('确认通过该用户认证申请吗？')) {
          alert('审核已通过');
          // In real app, update status
      }
  };

  const handleRejectClick = (id: number) => {
      setSelectedAuditId(id);
      setShowRejectModal(true);
  };

  const confirmReject = () => {
      if (!rejectReason) return alert('请输入驳回原因');
      alert(`审核已驳回，原因：${rejectReason}`);
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedAuditId(null);
  };

  return (
    <div className="space-y-6 h-full flex flex-col relative">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">用户审核</h1>
            <div className="flex space-x-3">
                <div className="flex bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                        <List size={16} />
                    </button>
                    <button 
                        onClick={() => setViewMode('gallery')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'gallery' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                        <LayoutGrid size={16} />
                    </button>
                </div>
            </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col flex-1">
            <div className="flex border-b border-stone-200 bg-stone-50/50 justify-between items-center px-6">
                <div className="flex">
                    <button 
                        onClick={() => setActiveTab('teacher')}
                        className={`px-6 py-4 text-sm font-bold flex items-center border-b-2 transition-colors ${activeTab === 'teacher' ? 'text-[#7f1d1d] border-[#7f1d1d]' : 'text-stone-500 border-transparent hover:text-stone-700'}`}
                    >
                        <School size={16} className="mr-2" /> 教师认证审核
                        <span className="ml-2 bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full">{audits.filter(a => a.type === 'teacher' && a.status === 'pending').length}</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('parent')}
                        className={`px-6 py-4 text-sm font-bold flex items-center border-b-2 transition-colors ${activeTab === 'parent' ? 'text-[#7f1d1d] border-[#7f1d1d]' : 'text-stone-500 border-transparent hover:text-stone-700'}`}
                    >
                        <Shield size={16} className="mr-2" /> 家长身份审核
                        <span className="ml-2 bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full">{audits.filter(a => a.type === 'parent' && a.status === 'pending').length}</span>
                    </button>
                </div>
                <div className="relative w-64">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索申请人姓名..." 
                        className="w-full pl-9 pr-4 py-1.5 bg-stone-100 border border-transparent rounded-lg text-xs font-bold outline-none focus:bg-white focus:border-stone-200 transition-all" 
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-stone-50/30 p-6">
                {viewMode === 'list' ? (
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-stone-50 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">
                                <tr>
                                    <th className="p-4">申请人</th>
                                    <th className="p-4">证件号码</th>
                                    <th className="p-4">{activeTab === 'teacher' ? '所属学校/机构' : '关联孩子'}</th>
                                    <th className="p-4">提交时间</th>
                                    <th className="p-4">证明材料</th>
                                    <th className="p-4 text-right">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 text-sm">
                                {filteredAudits.map(item => (
                                    <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="p-4 font-bold text-stone-800">{item.name}</td>
                                        <td className="p-4 font-mono text-stone-600">{item.idCard}</td>
                                        <td className="p-4 text-stone-600">
                                            {activeTab === 'teacher' ? item.school : `${item.childCount}个`}
                                        </td>
                                        <td className="p-4 text-stone-500 text-xs">{item.submitTime}</td>
                                        <td className="p-4">
                                            <a href={item.image} target="_blank" className="text-blue-600 text-xs font-bold flex items-center hover:underline">
                                                <ImageIcon size={14} className="mr-1"/> 查看图片
                                            </a>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => handleApprove(item.id)} className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100">通过</button>
                                            <button onClick={() => handleRejectClick(item.id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100">驳回</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-6">
                        {filteredAudits.map(item => (
                            <div key={item.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
                                <div className="h-48 bg-stone-100 relative group cursor-pointer">
                                    <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold">点击放大</span>
                                    </div>
                                </div>
                                <div className="p-5 flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-lg text-stone-800">{item.name}</h3>
                                            <p className="text-xs text-stone-500 font-mono mt-1">{item.idCard}</p>
                                        </div>
                                        <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded border border-amber-100">待审核</span>
                                    </div>
                                    <div className="text-sm text-stone-600 mb-4">
                                        <div className="flex items-center mb-1">
                                            {activeTab === 'teacher' ? <School size={14} className="mr-2 text-stone-400"/> : <UserCheck size={14} className="mr-2 text-stone-400"/>}
                                            {activeTab === 'teacher' ? item.school : `关联 ${item.childCount} 个孩子`}
                                        </div>
                                        <div className="flex items-center text-xs text-stone-400">
                                            <FileText size={12} className="mr-2"/> {item.submitTime}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100">
                                        <button onClick={() => handleRejectClick(item.id)} className="py-2 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50">驳回</button>
                                        <button onClick={() => handleApprove(item.id)} className="py-2 rounded-xl bg-green-500 text-white font-bold text-xs hover:bg-green-600 shadow-sm">通过</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative animate-slide-up shadow-2xl">
                    <h3 className="font-bold text-lg text-stone-800 mb-4 font-serif">确认驳回申请</h3>
                    <textarea 
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="w-full h-24 bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#7f1d1d] resize-none mb-4"
                        placeholder="请输入驳回原因 (必填)"
                    ></textarea>
                    <div className="flex gap-3">
                        <button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200">取消</button>
                        <button onClick={confirmReject} className="flex-1 py-3 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg hover:bg-[#991b1b]">确认驳回</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default UserAudit;
