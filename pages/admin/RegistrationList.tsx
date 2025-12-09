
import React, { useState, useEffect } from 'react';
import { Search, Download, Check, X, Filter, RefreshCw, UserCheck, ShieldCheck, AlertCircle, Edit2, RotateCcw, Save, User } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const RegistrationList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get('competitionId');

  const [activeTab, setActiveTab] = useState<'manual_review' | 'auto_approved' | 'manual_approved' | 'rejected'>('manual_review');
  const [filterCompetition, setFilterCompetition] = useState(competitionId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReg, setEditingReg] = useState<any>(null);

  // Mock Registrations
  const [registrations, setRegistrations] = useState([
      { id: 'R001', name: '王小明', photo: 'https://ui-avatars.com/api/?name=Ming&background=random', idCard: '110105201201011234', grade: '五年级', institution: '', group: '小学A组', competitionId: '202503', competition: '第五届“讲好中国故事”演讲大赛', status: '待审核', auditType: 'manual', school: '海淀实验小学' },
      { id: 'R002', name: '李小红', photo: 'https://ui-avatars.com/api/?name=Hong&background=random', idCard: '110105201305055678', grade: '三年级', institution: '新东方', group: '小学B组', competitionId: '202502', competition: '经典诗文诵读挑战赛', status: '已晋级', auditType: 'system', school: '中关村一小' },
      { id: 'R003', name: '张小刚', photo: 'https://ui-avatars.com/api/?name=Gang&background=random', idCard: '110105201106069999', grade: '初一', institution: '', group: '初中组', competitionId: '202503', competition: '第五届“讲好中国故事”演讲大赛', status: '已通过', auditType: 'manual', school: '人大附中' },
      { id: 'R004', name: '赵小七', photo: '', idCard: '110105201107078888', grade: '初二', institution: '', group: '初中组', competitionId: '202503', competition: '第五届“讲好中国故事”演讲大赛', status: '待审核', auditType: 'manual', school: '十一学校' },
      { id: 'R005', name: '陈美丽', photo: '', idCard: '110105200808087777', grade: '高一', institution: '学而思', group: '高中组', competitionId: '202503', competition: '第五届“讲好中国故事”演讲大赛', status: '已通过', auditType: 'system', school: '北京四中' },
      { id: 'R006', name: '钱多多', photo: '', idCard: '110105201409096666', grade: '二年级', institution: '', group: '小学A组', competitionId: '202503', competition: '第五届“讲好中国故事”演讲大赛', status: '已驳回', auditType: 'manual', school: '朝阳实验' },
  ]);

  const filteredRegistrations = registrations.filter(reg => {
      // Tab Filtering
      let tabMatch = false;
      if (activeTab === 'manual_review') tabMatch = reg.status === '待审核';
      else if (activeTab === 'auto_approved') tabMatch = reg.auditType === 'system' && (reg.status === '已通过' || reg.status === '已晋级');
      else if (activeTab === 'manual_approved') tabMatch = reg.auditType === 'manual' && (reg.status === '已通过' || reg.status === '已晋级');
      else if (activeTab === 'rejected') tabMatch = reg.status === '已驳回';

      const matchComp = filterCompetition === 'all' || reg.competitionId === filterCompetition;
      const matchSearch = reg.name.includes(searchQuery) || reg.id.includes(searchQuery) || reg.school.includes(searchQuery);
      return tabMatch && matchComp && matchSearch;
  });

  // Competitions List for Dropdown
  const competitions = [
      { id: '202503', title: '第五届“讲好中国故事”演讲大赛' },
      { id: '202502', title: '经典诗文诵读挑战赛' },
      { id: '202504', title: '“金话筒”青少年主持人大赛' },
  ];

  useEffect(() => {
      if (competitionId) {
          setFilterCompetition(competitionId);
      }
  }, [competitionId]);

  // Reset selected on tab change
  useEffect(() => {
      setSelectedIds([]);
  }, [activeTab]);

  const resetFilters = () => {
      setFilterCompetition('all');
      setSearchQuery('');
  };

  // Selection Handlers
  const toggleSelectAll = () => {
      if (selectedIds.length === filteredRegistrations.length) {
          setSelectedIds([]);
      } else {
          setSelectedIds(filteredRegistrations.map(r => r.id));
      }
  };

  const toggleSelectOne = (id: string) => {
      setSelectedIds(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };

  // Batch Actions
  const handleBatchApprove = () => {
      if (selectedIds.length === 0) return;
      if (window.confirm(`确定要批量通过选中的 ${selectedIds.length} 条报名申请吗？`)) {
          setRegistrations(prev => prev.map(r => selectedIds.includes(r.id) ? { ...r, status: '已通过', auditType: 'manual' } : r));
          setSelectedIds([]);
          alert('批量审核通过成功');
      }
  };

  const handleBatchReject = () => {
      if (selectedIds.length === 0) return;
      if (window.confirm(`确定要批量驳回选中的 ${selectedIds.length} 条报名申请吗？\n驳回后用户可修改信息并再次提交。`)) {
          setRegistrations(prev => prev.map(r => selectedIds.includes(r.id) ? { ...r, status: '已驳回', auditType: 'manual' } : r));
          setSelectedIds([]);
          alert('批量驳回成功，等待用户重新提交');
      }
  };

  const handleSingleAction = (id: string, action: 'approve' | 'reject' | 'revert') => {
      let newStatus = '';
      if (action === 'approve') newStatus = '已通过';
      else if (action === 'reject') newStatus = '已驳回';
      else if (action === 'revert') newStatus = '待审核';
      
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, auditType: 'manual' } : r));
  };

  // Edit Handlers
  const handleEditClick = (reg: any) => {
      setEditingReg({ ...reg });
      setShowEditModal(true);
  };

  const handleSaveEdit = () => {
      if (!editingReg) return;
      setRegistrations(prev => prev.map(r => r.id === editingReg.id ? editingReg : r));
      setShowEditModal(false);
      setEditingReg(null);
  };

  return (
    <div className="space-y-6 h-full flex flex-col relative">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">报名管理</h1>
            <div className="flex space-x-3">
                {selectedIds.length > 0 ? (
                    <div className="flex space-x-2 animate-fade-in bg-stone-800 p-1 rounded-xl">
                        <button onClick={handleBatchApprove} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center">
                            <Check size={14} className="mr-1.5" /> 批量通过 ({selectedIds.length})
                        </button>
                        <button onClick={handleBatchReject} className="bg-stone-600 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center">
                            <X size={14} className="mr-1.5" /> 批量驳回
                        </button>
                    </div>
                ) : (
                    <>
                        <button className="bg-white border border-stone-200 text-stone-600 px-4 py-2.5 rounded-xl font-bold shadow-sm hover:bg-stone-50 transition-colors flex items-center text-xs">
                            <RefreshCw size={16} className="mr-2" /> 同步数据
                        </button>
                        <button className="bg-stone-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-stone-900 transition-colors flex items-center text-xs">
                            <Download size={16} className="mr-2" /> 导出Excel
                        </button>
                    </>
                )}
            </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-stone-100 p-1 rounded-xl flex gap-1 w-fit">
            {[
                { id: 'manual_review', label: '待人工审核', icon: AlertCircle },
                { id: 'auto_approved', label: '自动通过', icon: ShieldCheck },
                { id: 'manual_approved', label: '人工通过', icon: UserCheck },
                { id: 'rejected', label: '已驳回', icon: X }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-all ${
                        activeTab === tab.id 
                        ? 'bg-white text-stone-800 shadow-sm' 
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    <tab.icon size={14} className={`mr-2 ${activeTab === tab.id ? 'text-[#7f1d1d]' : 'text-stone-400'}`} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索姓名、证件号、报名编号..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium outline-none focus:border-[#7f1d1d]" 
                />
            </div>
            
            <div className="relative group">
                <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <select 
                    value={filterCompetition}
                    onChange={(e) => setFilterCompetition(e.target.value)}
                    className="pl-10 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-600 outline-none focus:border-[#7f1d1d] appearance-none cursor-pointer hover:bg-stone-100 min-w-[250px]"
                >
                    <option value="all">所有赛事</option>
                    {competitions.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>
            </div>

            <button 
                onClick={resetFilters}
                className="text-xs font-bold text-stone-400 hover:text-[#7f1d1d] px-2"
            >
                重置
            </button>
        </div>

        {/* List Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50 sticky top-0 z-10">
                        <tr>
                            <th className="p-5 border-b border-stone-200 w-16 text-center">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 accent-[#7f1d1d] cursor-pointer"
                                    checked={selectedIds.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">选手信息</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">学校/机构</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">申报赛事</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase border-b border-stone-200">当前状态</th>
                            <th className="p-5 text-xs font-bold text-stone-500 uppercase text-right border-b border-stone-200">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                        {filteredRegistrations.length > 0 ? filteredRegistrations.map((reg) => (
                            <tr key={reg.id} className={`hover:bg-stone-50 transition-colors group ${selectedIds.includes(reg.id) ? 'bg-[#7f1d1d]/5' : ''}`}>
                                <td className="p-5 text-center">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 accent-[#7f1d1d] cursor-pointer"
                                        checked={selectedIds.includes(reg.id)}
                                        onChange={() => toggleSelectOne(reg.id)}
                                    />
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden mr-3 border border-stone-100 flex-shrink-0">
                                            {reg.photo ? <img src={reg.photo} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-stone-400"><User size={20}/></div>}
                                        </div>
                                        <div>
                                            <div className="font-bold text-stone-800">{reg.name}</div>
                                            <div className="text-xs text-stone-400 mt-0.5">{reg.idCard}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="text-sm font-medium text-stone-800">{reg.school}</div>
                                    <div className="text-xs text-stone-500 mt-0.5">{reg.grade} {reg.institution && `· ${reg.institution}`}</div>
                                </td>
                                <td className="p-5">
                                    <div className="text-sm text-stone-800 font-bold mb-0.5">{reg.competition}</div>
                                    <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded border border-stone-200">
                                        {reg.group}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                                            reg.status === '待审核' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            reg.status === '已驳回' ? 'bg-red-50 text-red-600 border-red-100' :
                                            'bg-green-50 text-green-600 border-green-100'
                                        }`}>
                                            {reg.status}
                                        </span>
                                        {reg.status === '已驳回' && <span className="text-[9px] text-red-400">等待用户修改</span>}
                                        {reg.auditType === 'system' && reg.status !== '已驳回' && reg.status !== '待审核' && (
                                            <span className="text-[9px] text-stone-400 flex items-center">
                                                <ShieldCheck size={10} className="mr-1"/> 自动通过
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-5 text-right">
                                    <div className="flex justify-end space-x-2">
                                        {/* Allow modifying status regardless of current state */}
                                        
                                        <button 
                                            onClick={() => handleEditClick(reg)}
                                            className="p-1.5 bg-stone-100 text-stone-600 rounded hover:bg-stone-200 transition-colors" 
                                            title="修改信息"
                                        >
                                            <Edit2 size={16}/>
                                        </button>
                                        
                                        {/* Approve: Show if not Approved or Promoted */}
                                        {reg.status !== '已通过' && reg.status !== '已晋级' && (
                                            <button 
                                                onClick={() => handleSingleAction(reg.id, 'approve')}
                                                className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors" 
                                                title="通过"
                                            >
                                                <Check size={16}/>
                                            </button>
                                        )}
                                        
                                        {/* Reject: Show if not Rejected */}
                                        {reg.status !== '已驳回' && (
                                            <button 
                                                onClick={() => handleSingleAction(reg.id, 'reject')}
                                                className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors" 
                                                title="驳回"
                                            >
                                                <X size={16}/>
                                            </button>
                                        )}

                                        {/* Reset/Withdraw: Show if not Pending */}
                                        {reg.status !== '待审核' && (
                                            <button 
                                                onClick={() => handleSingleAction(reg.id, 'revert')}
                                                className="p-1.5 bg-amber-50 text-amber-600 rounded hover:bg-amber-100 transition-colors" 
                                                title="撤回/重置"
                                            >
                                                <RotateCcw size={16}/>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="p-10 text-center text-stone-400 text-sm">
                                    当前分类暂无相关记录
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center text-xs font-bold text-stone-500">
                <span>共 {filteredRegistrations.length} 条记录 {selectedIds.length > 0 && `(已选 ${selectedIds.length})`}</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-stone-200 rounded hover:bg-stone-100 disabled:opacity-50" disabled>上一页</button>
                    <button className="px-3 py-1 bg-white border border-stone-200 rounded hover:bg-stone-100 disabled:opacity-50" disabled>下一页</button>
                </div>
            </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && editingReg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-lg rounded-3xl p-6 relative animate-slide-up shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-stone-800 font-serif">编辑报名信息</h3>
                        <button onClick={() => setShowEditModal(false)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-center mb-2">
                            <div className="w-24 h-24 bg-stone-100 rounded-full overflow-hidden border-4 border-white shadow-sm relative group">
                                {editingReg.photo ? <img src={editingReg.photo} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-stone-300"><User size={40}/></div>}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="text-xs text-white font-bold">更换照片</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">姓名</label>
                                <input 
                                    value={editingReg.name}
                                    onChange={e => setEditingReg({...editingReg, name: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">身份证号</label>
                                <input 
                                    value={editingReg.idCard}
                                    onChange={e => setEditingReg({...editingReg, idCard: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">所属学校</label>
                                <input 
                                    value={editingReg.school}
                                    onChange={e => setEditingReg({...editingReg, school: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">年级</label>
                                <input 
                                    value={editingReg.grade}
                                    onChange={e => setEditingReg({...editingReg, grade: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">培训机构 (选填)</label>
                                <input 
                                    value={editingReg.institution}
                                    onChange={e => setEditingReg({...editingReg, institution: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                    placeholder="无"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">组别</label>
                                <select 
                                    value={editingReg.group}
                                    onChange={e => setEditingReg({...editingReg, group: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                >
                                    <option>小学A组</option>
                                    <option>小学B组</option>
                                    <option>初中组</option>
                                    <option>高中组</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">状态</label>
                                <select 
                                    value={editingReg.status}
                                    onChange={e => setEditingReg({...editingReg, status: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                >
                                    <option>待审核</option>
                                    <option>已通过</option>
                                    <option>已驳回</option>
                                    <option>已晋级</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200">取消</button>
                        <button onClick={handleSaveEdit} className="flex-1 py-3 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg hover:bg-[#991b1b] flex items-center justify-center">
                            <Save size={16} className="mr-2" /> 保存修改
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default RegistrationList;
