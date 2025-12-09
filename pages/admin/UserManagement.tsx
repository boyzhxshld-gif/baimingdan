
import React, { useState } from 'react';
import { Search, MoreHorizontal, Filter, User, Users, School, Gavel, Briefcase, Crown, UserCog, Eye, Plus, X, Upload } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Add User Form State
  const [newUser, setNewUser] = useState({
      role: 'JUDGE',
      name: '',
      phone: '',
      gender: '男',
      recommender: '',
      tracks: [] as string[]
  });

  const [showRecommenderSuggestions, setShowRecommenderSuggestions] = useState(false);
  const availableTracks = ['演讲', '朗诵', '主持', '英语', '辩论', '戏剧', '写作'];
  const recommenders = ['市语协', '省作协', '区教委', '传媒大学', '电视台', '新东方', '学而思', '外研社'];

  // Mock System Users (Accounts)
  const users = [
    { id: 1, name: 'Administrator', username: 'admin', role: 'SUPER_ADMIN', status: 'active', lastLogin: 'Just now' },
    { id: 2, name: '王代理', username: 'agent_bj', role: 'AGENT', region: '北京赛区', status: 'active', lastLogin: '2025-03-10' },
    { id: 3, name: '李华', username: '13800138000', role: 'TEACHER', school: '海淀实验小学', status: 'verified', lastLogin: '2025-03-09' },
    { id: 4, name: '张三', username: '13900139000', role: 'PARENT', children: 2, status: 'verified', lastLogin: '2025-03-08' },
    { id: 5, name: '赵评委', username: 'judge_01', role: 'JUDGE', tag: '演讲, 朗诵', recommender: '语言协会', status: 'active', lastLogin: '2025-03-05' },
    { id: 6, name: '新东方素质中心', username: 'xdf_org', role: 'SCHOOL', type: '培训机构', status: 'verified', lastLogin: '2025-03-01' },
    { id: 7, name: '王小明', username: 'stu_001', role: 'STUDENT', grade: '五年级', status: 'active', lastLogin: '2025-03-10' },
  ];

  const roleConfig: Record<string, { label: string, icon: any, color: string, bg: string }> = {
      'SUPER_ADMIN': { label: '超级管理员', icon: Crown, color: 'text-purple-600', bg: 'bg-purple-50' },
      'ADMIN': { label: '管理员', icon: UserCog, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      'AGENT': { label: '区域代理', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
      'JUDGE': { label: '评审老师', icon: Gavel, color: 'text-amber-600', bg: 'bg-amber-50' },
      'TEACHER': { label: '指导老师', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      'SCHOOL': { label: '学校/机构', icon: School, color: 'text-cyan-600', bg: 'bg-cyan-50' },
      'PARENT': { label: '家长', icon: User, color: 'text-rose-600', bg: 'bg-rose-50' },
      'STUDENT': { label: '学生', icon: User, color: 'text-stone-600', bg: 'bg-stone-100' },
  };

  const getFilteredUsers = () => {
      return users.filter(u => {
          const matchRole = roleFilter === 'all' || u.role === roleFilter;
          const matchSearch = u.name.includes(searchQuery) || u.username.includes(searchQuery);
          return matchRole && matchSearch;
      });
  };

  const handleTrackToggle = (track: string) => {
      setNewUser(prev => {
          const current = prev.tracks;
          if (current.includes(track)) return { ...prev, tracks: current.filter(t => t !== track) };
          return { ...prev, tracks: [...current, track] };
      });
  };

  const handleAddUser = () => {
      if (!newUser.name || !newUser.phone) return alert('请完善基本信息');
      if (newUser.role === 'JUDGE' && newUser.tracks.length === 0) return alert('请至少选择一个评审赛道');
      
      alert('用户创建成功');
      setShowAddModal(false);
      // In real app, update list
  };

  const handleBatchImport = () => {
      // Simulate file selection
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.xlsx, .xls, .csv';
      input.onchange = () => {
          alert('文件已上传，正在解析...');
          setTimeout(() => alert('批量导入成功！成功导入 15 位评委。'), 1000);
      };
      input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-stone-800 font-serif">用户账号管理</h1>
          <div className="flex space-x-3">
              <button 
                onClick={handleBatchImport}
                className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-stone-50 transition-colors flex items-center"
              >
                  <Upload size={16} className="mr-2" /> 批量导入评委/用户
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-[#7f1d1d] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-[#991b1b] transition-colors flex items-center"
              >
                  <Plus size={16} className="mr-1" /> 新增用户
              </button>
          </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
          <div className="p-6 flex-1 flex flex-col">
              {/* Search & Filter */}
              <div className="flex flex-wrap gap-4 mb-6">
                  <div className="relative flex-1 min-w-[300px] max-w-md">
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索账号、姓名、手机号..." 
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-[#7f1d1d] transition-all" 
                      />
                  </div>
                  
                  <div className="relative group">
                      <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                      <select 
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="pl-10 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-600 outline-none focus:border-[#7f1d1d] appearance-none cursor-pointer hover:bg-stone-100"
                      >
                          <option value="all">所有角色</option>
                          {Object.entries(roleConfig).map(([key, conf]) => (
                              <option key={key} value={key}>{conf.label}</option>
                          ))}
                      </select>
                  </div>
              </div>

              {/* Table Content */}
              <div className="flex-1 overflow-auto rounded-xl border border-stone-200">
                  <table className="w-full text-left border-collapse">
                      <thead className="bg-stone-50 sticky top-0 z-10">
                          <tr>
                              <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">用户/账号</th>
                              <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">角色权限</th>
                              <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">关联信息</th>
                              <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">推荐方</th>
                              <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">状态</th>
                              <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">最近登录</th>
                              <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-right">操作</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 bg-white">
                          {getFilteredUsers().map(u => {
                              const conf = roleConfig[u.role] || roleConfig['STUDENT'];
                              const Icon = conf.icon;
                              return (
                                  <tr key={u.id} className="hover:bg-stone-50 transition-colors group">
                                      <td className="p-4">
                                          <div className="font-bold text-stone-800">{u.name}</div>
                                          <div className="text-xs text-stone-400 font-mono mt-0.5">{u.username}</div>
                                      </td>
                                      <td className="p-4">
                                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${conf.bg} ${conf.color}`}>
                                              <Icon size={14} className="mr-1.5" /> {conf.label}
                                          </span>
                                      </td>
                                      <td className="p-4 text-sm text-stone-600">
                                          {u.school || u.region || (u.children ? `${u.children}个孩子` : u.tag || '-')}
                                      </td>
                                      <td className="p-4 text-sm text-stone-600">
                                          {u.recommender || '-'}
                                      </td>
                                      <td className="p-4">
                                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${u.status === 'active' || u.status === 'verified' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                                              {u.status === 'active' ? '正常' : u.status === 'verified' ? '已认证' : u.status}
                                          </span>
                                      </td>
                                      <td className="p-4 text-xs text-stone-400">{u.lastLogin}</td>
                                      <td className="p-4 text-right">
                                          <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <button className="p-1.5 hover:bg-stone-100 rounded text-stone-500" title="查看详情"><Eye size={16}/></button>
                                              <button className="p-1.5 hover:bg-stone-100 rounded text-stone-500" title="更多操作"><MoreHorizontal size={16}/></button>
                                          </div>
                                      </td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
              <div className="bg-white w-full max-w-lg rounded-3xl p-6 relative animate-slide-up shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-stone-800 font-serif">新增用户</h3>
                      <button onClick={() => setShowAddModal(false)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
                  </div>
                  
                  <div className="space-y-4 mb-6 max-h-[70vh] overflow-y-auto">
                      <div>
                          <label className="text-xs font-bold text-stone-500 mb-1.5 block">用户角色</label>
                          <select 
                              value={newUser.role}
                              onChange={e => setNewUser({...newUser, role: e.target.value})}
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                          >
                              {Object.entries(roleConfig).map(([key, conf]) => (
                                  <option key={key} value={key}>{conf.label}</option>
                              ))}
                          </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-bold text-stone-500 mb-1.5 block">姓名</label>
                              <input 
                                  value={newUser.name}
                                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                  placeholder="请输入姓名"
                              />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-stone-500 mb-1.5 block">手机号 (登录账号)</label>
                              <input 
                                  value={newUser.phone}
                                  onChange={e => setNewUser({...newUser, phone: e.target.value})}
                                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                  placeholder="请输入手机号"
                              />
                          </div>
                      </div>

                      {/* Judge Specific Fields */}
                      {newUser.role === 'JUDGE' && (
                          <div className="space-y-4 border-t border-stone-100 pt-4 mt-2">
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="text-xs font-bold text-stone-500 mb-1.5 block">性别</label>
                                      <select 
                                          value={newUser.gender}
                                          onChange={e => setNewUser({...newUser, gender: e.target.value})}
                                          className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                      >
                                          <option>男</option>
                                          <option>女</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="text-xs font-bold text-stone-500 mb-1.5 block">推荐方 (机构/协会)</label>
                                      <div className="relative">
                                          <input 
                                              value={newUser.recommender}
                                              onChange={e => setNewUser({...newUser, recommender: e.target.value})}
                                              onFocus={() => setShowRecommenderSuggestions(true)}
                                              onBlur={() => setTimeout(() => setShowRecommenderSuggestions(false), 200)}
                                              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                              placeholder="选择或输入推荐方"
                                          />
                                          {showRecommenderSuggestions && (
                                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-100 rounded-xl shadow-lg z-20 max-h-40 overflow-y-auto p-1 animate-fade-in">
                                                  {recommenders.map(r => (
                                                      <div 
                                                          key={r}
                                                          onClick={() => setNewUser({...newUser, recommender: r})}
                                                          className="px-3 py-2 hover:bg-stone-50 rounded-lg text-xs font-bold text-stone-600 cursor-pointer"
                                                      >
                                                          {r}
                                                      </div>
                                                  ))}
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              </div>
                              
                              <div>
                                  <label className="text-xs font-bold text-stone-500 mb-2 block">评审赛道 (多选)</label>
                                  <div className="flex flex-wrap gap-2">
                                      {availableTracks.map(track => (
                                          <button
                                              key={track}
                                              onClick={() => handleTrackToggle(track)}
                                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                                  newUser.tracks.includes(track) 
                                                  ? 'bg-[#7f1d1d] text-white border-[#7f1d1d] shadow-sm' 
                                                  : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                                              }`}
                                          >
                                              {track}
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="flex gap-3">
                      <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-colors">取消</button>
                      <button onClick={handleAddUser} className="flex-1 py-3 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg hover:bg-[#991b1b] transition-colors">确认添加</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default UserManagement;
