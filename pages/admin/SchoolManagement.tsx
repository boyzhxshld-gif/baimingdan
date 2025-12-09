
import React, { useState } from 'react';
import { Search, Plus, Building2, School, MapPin, Phone, User, Filter, X, Edit2, Trash2, Globe } from 'lucide-react';

const SchoolManagement: React.FC = () => {
  const [activeType, setActiveType] = useState<'all' | 'school' | 'institution'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
      id: 0,
      name: '',
      type: 'school', // 'school' | 'institution'
      category: '',
      address: '',
      contactName: '',
      contactPhone: '',
      website: ''
  });

  // Mock Data
  const [schools, setSchools] = useState([
      { id: 1, name: '北京市海淀区实验小学', type: 'school', category: '公立学校', address: '北京市海淀区西三环北路', contactName: '李校长', contactPhone: '13800138000', website: 'www.hdsy.edu.cn' },
      { id: 2, name: '新东方素质教育中心', type: 'institution', category: '培训机构', address: '北京市海淀区海淀中街', contactName: '张主管', contactPhone: '13900139000', website: 'www.xdf.cn' },
      { id: 3, name: '人大附中', type: 'school', category: '公立学校', address: '北京市海淀区中关村大街', contactName: '王主任', contactPhone: '13700137000', website: 'www.rdfz.cn' },
      { id: 4, name: '雅思贝尔钢琴艺术中心', type: 'institution', category: '器乐', address: '北京市朝阳区朝阳北路', contactName: '刘老师', contactPhone: '13600136000', website: '' },
      { id: 5, name: '北京爱迪国际学校', type: 'school', category: '私立学校', address: '北京市朝阳区楼梓庄路', contactName: '赵校长', contactPhone: '13500135000', website: 'www.aidi.edu.cn' },
  ]);

  const schoolCategories = ['公立学校', '私立学校', '国际学校', '职业学校'];
  const institutionCategories = ['培训机构', '器乐', '美术', '语言', '体育', '科技'];

  const filteredSchools = schools.filter(s => {
      const matchType = activeType === 'all' || s.type === activeType;
      const matchSearch = s.name.includes(searchQuery) || s.contactName.includes(searchQuery) || s.address.includes(searchQuery);
      return matchType && matchSearch;
  });

  const handleEdit = (school: any) => {
      setFormData(school);
      setShowModal(true);
  };

  const handleAdd = () => {
      setFormData({
          id: 0,
          name: '',
          type: 'school',
          category: '公立学校',
          address: '',
          contactName: '',
          contactPhone: '',
          website: ''
      });
      setShowModal(true);
  };

  const handleSave = () => {
      if (!formData.name || !formData.category) return alert('请完善基本信息');
      
      if (formData.id === 0) {
          setSchools([...schools, { ...formData, id: Date.now() }]);
      } else {
          setSchools(schools.map(s => s.id === formData.id ? formData : s));
      }
      setShowModal(false);
  };

  const handleDelete = (id: number) => {
      if (window.confirm('确定要删除该条目吗？')) {
          setSchools(schools.filter(s => s.id !== id));
      }
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">学校/机构管理</h1>
            <button 
                onClick={handleAdd}
                className="bg-[#7f1d1d] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-[#991b1b] transition-colors flex items-center"
            >
                <Plus size={16} className="mr-1" /> 新增单位
            </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col min-h-[600px]">
            {/* Filter Bar */}
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/30">
                <div className="flex bg-stone-100 p-1 rounded-xl">
                    {[
                        { id: 'all', label: '全部' },
                        { id: 'school', label: '学校' },
                        { id: 'institution', label: '机构' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveType(tab.id as any)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                activeType === tab.id 
                                ? 'bg-white text-stone-800 shadow-sm' 
                                : 'text-stone-500 hover:text-stone-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-72">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索名称、负责人或地址..." 
                        className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:border-[#7f1d1d] transition-all" 
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50 text-xs font-bold text-stone-500 uppercase sticky top-0 z-10">
                        <tr>
                            <th className="p-4 pl-6">单位名称</th>
                            <th className="p-4">性质/类型</th>
                            <th className="p-4">地址</th>
                            <th className="p-4">负责人</th>
                            <th className="p-4 text-right pr-6">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-sm">
                        {filteredSchools.map(item => (
                            <tr key={item.id} className="hover:bg-stone-50 transition-colors group">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${item.type === 'school' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {item.type === 'school' ? <School size={20} /> : <Building2 size={20} />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-stone-800 flex items-center">
                                                {item.name}
                                                {item.website && (
                                                    <a href={`http://${item.website}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-stone-400 hover:text-blue-600" title="访问官网" onClick={e => e.stopPropagation()}>
                                                        <Globe size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col items-start">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded mb-1 ${item.type === 'school' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {item.type === 'school' ? '学校' : '机构'}
                                        </span>
                                        <span className="text-xs text-stone-500">{item.category}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-stone-600">
                                    <div className="flex items-center">
                                        <MapPin size={14} className="mr-1 text-stone-400" />
                                        {item.address}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-stone-700 flex items-center"><User size={12} className="mr-1"/>{item.contactName}</span>
                                        <span className="text-xs text-stone-400 flex items-center mt-0.5"><Phone size={10} className="mr-1"/>{item.contactPhone}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right pr-6">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(item)} className="p-2 bg-white border border-stone-200 rounded-lg text-stone-500 hover:text-blue-600 hover:border-blue-200 transition-colors">
                                            <Edit2 size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-white border border-stone-200 rounded-lg text-stone-500 hover:text-red-600 hover:border-red-200 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredSchools.length === 0 && (
                            <tr><td colSpan={5} className="p-10 text-center text-stone-400">暂无相关数据</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-lg rounded-3xl p-6 relative animate-slide-up shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-stone-800 font-serif">{formData.id === 0 ? '新增单位' : '编辑信息'}</h3>
                        <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-2 block">单位性质</label>
                            <div className="flex gap-4">
                                <label className="flex items-center cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="type" 
                                        checked={formData.type === 'school'} 
                                        onChange={() => setFormData({...formData, type: 'school', category: schoolCategories[0]})}
                                        className="mr-2 accent-[#7f1d1d]"
                                    />
                                    <span className="text-sm font-bold text-stone-700">学校</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="type" 
                                        checked={formData.type === 'institution'} 
                                        onChange={() => setFormData({...formData, type: 'institution', category: institutionCategories[0]})}
                                        className="mr-2 accent-[#7f1d1d]"
                                    />
                                    <span className="text-sm font-bold text-stone-700">教育/培训机构</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">单位名称</label>
                                <input 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                    placeholder="请输入全称"
                                />
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">类型细分</label>
                                <select 
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                >
                                    {(formData.type === 'school' ? schoolCategories : institutionCategories).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">官网地址</label>
                                <input 
                                    value={formData.website}
                                    onChange={e => setFormData({...formData, website: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                    placeholder="例如：www.example.com"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">负责人姓名</label>
                                <input 
                                    value={formData.contactName}
                                    onChange={e => setFormData({...formData, contactName: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">联系电话</label>
                                <input 
                                    value={formData.contactPhone}
                                    onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">详细地址</label>
                                <input 
                                    value={formData.address}
                                    onChange={e => setFormData({...formData, address: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                    placeholder="省市区 + 详细地址"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-colors">取消</button>
                        <button onClick={handleSave} className="flex-1 py-3 bg-[#7f1d1d] text-white font-bold rounded-xl shadow-lg hover:bg-[#991b1b] transition-colors">保存</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default SchoolManagement;
