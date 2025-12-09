
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Layers, Users, MapPin, CheckSquare, Square, X, Map, ChevronDown, ChevronRight, FileBadge, Image as ImageIcon, Type, LayoutTemplate, Medal, TrendingUp, Check, Flame, Megaphone, Link as LinkIcon, Video, Layout, AlignLeft, Bold, Italic, List, UploadCloud, Eye, MonitorPlay, ChevronUp, Mic, BookOpen, User, Globe, MessageCircle, PenTool, Music } from 'lucide-react';

const PlatformConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracks' | 'groups' | 'regions' | 'certificates' | 'hotsearch' | 'banners'>('tracks');
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);

  // --- Track & Group Data ---
  const [tracks, setTracks] = useState([
      { id: 1, name: '演讲', code: 'speech', description: '个人演讲，考察语言表达能力', icon: 'Mic' },
      { id: 2, name: '朗诵', code: 'reading', description: '经典诵读，考察发音与情感', icon: 'BookOpen' },
      { id: 3, name: '主持', code: 'host', description: '模拟主持，考察控场与应变', icon: 'User' },
      { id: 4, name: '英语', code: 'english', description: '英语风采，国际视野', icon: 'Globe' },
  ]);
  const [trackForm, setTrackForm] = useState({ id: 0, name: '', code: '', description: '', icon: 'Mic' });

  // Icon Map for Tracks
  const iconMap: Record<string, any> = { 
      Mic, BookOpen, User, Globe, MessageCircle, PenTool, Music, Video 
  };

  const [groups, setGroups] = useState([
      { id: 1, name: '小学A组', code: 'primary_a', grade: '一年级, 二年级, 三年级' },
      { id: 2, name: '小学B组', code: 'primary_b', grade: '四年级, 五年级, 六年级' },
      { id: 3, name: '初中组', code: 'junior', grade: '初一, 初二, 初三' },
      { id: 4, name: '高中组', code: 'senior', grade: '高一, 高二, 高三' },
  ]);

  // --- Region Data ---
  const [regions, setRegions] = useState([
      { id: 1, name: '北京赛区', cities: ['北京市/海淀区', '北京市/朝阳区'] },
      { id: 2, name: '华东赛区', cities: ['上海市', '苏州市', '杭州市'] },
      { id: 3, name: '华南赛区', cities: ['广州市', '深圳市'] },
  ]);

  const areaData: Record<string, { name: string, cities: string[] }[]> = {
      '华北': [
          { name: '北京市', cities: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区'] },
          { name: '天津市', cities: ['和平区', '河西区', '南开区'] },
          { name: '河北省', cities: ['石家庄市', '唐山市', '秦皇岛市'] }
      ],
      '华东': [
          { name: '上海市', cities: ['黄浦区', '徐汇区', '长宁区', '静安区', '浦东新区'] },
          { name: '江苏省', cities: ['南京市', '无锡市', '苏州市', '常州市'] },
          { name: '浙江省', cities: ['杭州市', '宁波市', '温州市'] }
      ],
      '华南': [
          { name: '广东省', cities: ['广州市', '深圳市', '珠海市', '佛山市'] }
      ]
  };

  // --- Certificate Data ---
  const [certificates, setCertificates] = useState([
      { id: 1, name: '通用获奖证书', type: 'award', orientation: 'landscape', bg: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=60' },
      { id: 2, name: '晋级通知书', type: 'promotion', orientation: 'portrait', bg: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&auto=format&fit=crop&q=60' },
      { id: 3, name: '参赛证明', type: 'award', orientation: 'landscape', bg: 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?w=400&auto=format&fit=crop&q=60' }
  ]);

  // --- Hot Search Data ---
  const [hotSearches, setHotSearches] = useState([
      { id: 1, keyword: '讲好中国故事', tag: 'HOT', isActive: true, sort: 1 },
      { id: 2, keyword: '英语演讲', tag: 'NEW', isActive: true, sort: 2 },
      { id: 3, keyword: '主持人初赛', tag: '', isActive: false, sort: 3 },
  ]);
  const [newKeyword, setNewKeyword] = useState('');

  // --- Banner Data ---
  const [banners, setBanners] = useState([
      { id: 1, title: '2025赛季正式启动', status: 'published', type: 'custom', img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&auto=format&fit=crop&q=60' },
      { id: 2, title: '赛制规则解读', status: 'published', type: 'link', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop&q=60' },
  ]);
  const [bannerForm, setBannerForm] = useState<any>({
      id: 0,
      title: '',
      img: '',
      status: 'draft',
      type: 'custom', // 'link' | 'custom'
      linkUrl: '',
      contentConfig: {
          mode: 'richtext',
          richText: '',
          modules: []
      }
  });

  // --- Form States ---
  const [newRegion, setNewRegion] = useState<{name: string, selectedItems: string[]}>({ name: '', selectedItems: [] });
  const [expandedProvinces, setExpandedProvinces] = useState<string[]>([]);
  const [certConfig, setCertConfig] = useState({ name: '', type: 'award', orientation: 'landscape', fields: ['name', 'award', 'date', 'code'] });
  const [groupForm, setGroupForm] = useState<{id: number, name: string, code: string, selectedGrades: string[]}>({ id: 0, name: '', code: '', selectedGrades: [] });

  const ALL_GRADES = [
      '一年级', '二年级', '三年级', '四年级', '五年级', '六年级',
      '初一', '初二', '初三',
      '高一', '高二', '高三',
      '职高一年级', '职高二年级', '职高三年级'
  ];

  // --- Handlers: Track ---
  const handleAddTrack = () => {
      setTrackForm({ id: 0, name: '', code: '', description: '', icon: 'Mic' });
      setShowTrackModal(true);
  };

  const handleEditTrack = (track: any) => {
      setTrackForm(track);
      setShowTrackModal(true);
  };

  const handleSaveTrack = () => {
      if (!trackForm.name || !trackForm.code) return alert('请完善赛道信息');
      const newTrack = { ...trackForm, id: trackForm.id || Date.now() };
      if (trackForm.id === 0) {
          setTracks([...tracks, newTrack]);
      } else {
          setTracks(tracks.map(t => t.id === trackForm.id ? newTrack : t));
      }
      setShowTrackModal(false);
  };

  const handleDeleteTrack = (id: number) => {
      if(confirm('确定删除该赛道吗？')) setTracks(tracks.filter(t => t.id !== id));
  };

  // --- Handlers: Region ---
  const toggleProvinceExpand = (provName: string) => {
      setExpandedProvinces(prev => prev.includes(provName) ? prev.filter(p => p !== provName) : [...prev, provName]);
  };

  const toggleProvinceSelect = (provName: string, cities: string[]) => {
      const allCityKeys = cities.map(c => `${provName}/${c}`);
      const allSelected = allCityKeys.every(k => newRegion.selectedItems.includes(k));
      let newSelection = [...newRegion.selectedItems];
      if (allSelected) {
          newSelection = newSelection.filter(k => !allCityKeys.includes(k));
      } else {
          allCityKeys.forEach(k => {
              if (!newSelection.includes(k)) newSelection.push(k);
          });
      }
      setNewRegion({ ...newRegion, selectedItems: newSelection });
  };

  const toggleCitySelect = (provName: string, cityName: string) => {
      const key = `${provName}/${cityName}`;
      let newSelection = [...newRegion.selectedItems];
      if (newSelection.includes(key)) {
          newSelection = newSelection.filter(k => k !== key);
      } else {
          newSelection.push(key);
      }
      setNewRegion({ ...newRegion, selectedItems: newSelection });
  };

  const handleSaveRegion = () => {
      if (!newRegion.name || newRegion.selectedItems.length === 0) return alert('请完善赛区信息');
      const displayCities = newRegion.selectedItems.map(item => item.split('/')[1] || item);
      setRegions([...regions, { id: Date.now(), name: newRegion.name, cities: displayCities }]);
      setShowRegionModal(false);
      setNewRegion({ name: '', selectedItems: [] });
  };

  // --- Handlers: Certificate ---
  const handleSaveCert = () => {
      if (!certConfig.name) return alert('请输入模板名称');
      setCertificates([...certificates, { id: Date.now(), name: certConfig.name, type: certConfig.type, orientation: certConfig.orientation, bg: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=60' }]);
      setShowCertModal(false);
  };

  // --- Handlers: Group ---
  const handleAddGroup = () => {
      setGroupForm({ id: 0, name: '', code: '', selectedGrades: [] });
      setShowGroupModal(true);
  };

  const handleEditGroup = (group: any) => {
      const grades = group.grade ? group.grade.split(',').map((s: string) => s.trim()) : [];
      setGroupForm({ id: group.id, name: group.name, code: group.code, selectedGrades: grades });
      setShowGroupModal(true);
  };

  const toggleGroupGrade = (grade: string) => {
      setGroupForm(prev => {
          const current = prev.selectedGrades;
          if (current.includes(grade)) return { ...prev, selectedGrades: current.filter(g => g !== grade) };
          return { ...prev, selectedGrades: [...current, grade] };
      });
  };

  const handleSaveGroup = () => {
      if (!groupForm.name || groupForm.selectedGrades.length === 0) return alert('请完善组别信息');
      const newGroupData = { id: groupForm.id, name: groupForm.name, code: groupForm.code, grade: groupForm.selectedGrades.join(', ') };
      if (groupForm.id === 0) {
          setGroups([...groups, { ...newGroupData, id: Date.now() }]);
      } else {
          setGroups(groups.map(g => g.id === groupForm.id ? newGroupData : g));
      }
      setShowGroupModal(false);
  };

  const handleDeleteGroup = (id: number) => {
      if(confirm('确定删除该组别吗？')) setGroups(groups.filter(g => g.id !== id));
  };

  // --- Handlers: Hot Search ---
  const handleAddKeyword = () => {
      if (!newKeyword.trim()) return;
      setHotSearches([...hotSearches, { id: Date.now(), keyword: newKeyword, tag: '', isActive: true, sort: hotSearches.length + 1 }]);
      setNewKeyword('');
  };

  const handleDeleteKeyword = (id: number) => {
      setHotSearches(hotSearches.filter(h => h.id !== id));
  };

  const moveKeyword = (index: number, direction: 'up' | 'down') => {
      const newList = [...hotSearches];
      if (direction === 'up' && index > 0) {
          [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
      } else if (direction === 'down' && index < newList.length - 1) {
          [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      }
      setHotSearches(newList);
  };

  // --- Handlers: Banner ---
  const handleEditBanner = (banner: any) => {
      setBannerForm({
          id: banner.id,
          title: banner.title,
          img: banner.img,
          status: banner.status,
          type: banner.type,
          linkUrl: banner.linkUrl || '',
          contentConfig: banner.contentConfig || { mode: 'richtext', richText: '', modules: [] }
      });
      setShowBannerModal(true);
  };

  const handleCreateBanner = () => {
      setBannerForm({
          id: 0, title: '', img: '', status: 'draft', type: 'custom', linkUrl: '',
          contentConfig: { mode: 'richtext', richText: '', modules: [] }
      });
      setShowBannerModal(true);
  };

  const handleSaveBanner = () => {
      if (!bannerForm.title) return alert('请输入Banner标题');
      const newBanner = { ...bannerForm, id: bannerForm.id || Date.now() };
      
      if (bannerForm.id === 0) {
          setBanners([...banners, newBanner]);
      } else {
          setBanners(banners.map(b => b.id === bannerForm.id ? newBanner : b));
      }
      setShowBannerModal(false);
  };

  // --- Banner Content Editor Helpers ---
  const addDetailModule = (type: 'text' | 'image' | 'video') => {
      const newModule = { id: Date.now(), type, content: '', url: '' };
      setBannerForm({
          ...bannerForm,
          contentConfig: {
              ...bannerForm.contentConfig,
              modules: [...(bannerForm.contentConfig.modules || []), newModule]
          }
      });
  };

  const updateDetailModule = (id: number, field: string, value: string) => {
      const modules = bannerForm.contentConfig.modules.map((m: any) =>
          m.id === id ? { ...m, [field]: value } : m
      );
      setBannerForm({ ...bannerForm, contentConfig: { ...bannerForm.contentConfig, modules } });
  };

  const removeDetailModule = (id: number) => {
      const modules = bannerForm.contentConfig.modules.filter((m: any) => m.id !== id);
      setBannerForm({ ...bannerForm, contentConfig: { ...bannerForm.contentConfig, modules } });
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">平台配置</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="flex border-b border-stone-200 overflow-x-auto no-scrollbar">
                {[
                    { id: 'tracks', label: '赛道配置', icon: Layers },
                    { id: 'groups', label: '组别配置', icon: Users },
                    { id: 'regions', label: '赛区配置', icon: MapPin },
                    { id: 'certificates', label: '证书模板', icon: FileBadge },
                    { id: 'hotsearch', label: '热门搜索', icon: Flame },
                    { id: 'banners', label: '轮播配置', icon: Megaphone },
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-4 text-sm font-bold flex items-center whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-[#7f1d1d] border-b-2 border-[#7f1d1d] bg-stone-50' : 'text-stone-500 hover:bg-stone-50'}`}
                    >
                        <tab.icon size={18} className="mr-2" /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-6">
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={() => {
                            if (activeTab === 'tracks') handleAddTrack();
                            else if (activeTab === 'regions') setShowRegionModal(true);
                            else if (activeTab === 'certificates') setShowCertModal(true);
                            else if (activeTab === 'groups') handleAddGroup();
                            else if (activeTab === 'banners') handleCreateBanner();
                            else if (activeTab === 'hotsearch') document.getElementById('keywordInput')?.focus();
                            else alert('功能开发中');
                        }}
                        className="bg-[#7f1d1d] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center shadow-md hover:bg-[#991b1b]"
                    >
                        <Plus size={16} className="mr-2" /> 
                        {activeTab === 'tracks' ? '新增赛道' : activeTab === 'groups' ? '新增组别' : activeTab === 'certificates' ? '新增模板' : activeTab === 'hotsearch' ? '添加热词' : activeTab === 'banners' ? '新增轮播图' : '新增赛区'}
                    </button>
                </div>

                {/* Tracks Tab */}
                {activeTab === 'tracks' && (
                    <table className="w-full text-left">
                        <thead className="bg-stone-50 border-b border-stone-200">
                            <tr>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase">赛道名称</th>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase">编码</th>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase">图标</th>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase">描述</th>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {tracks.map(t => {
                                const IconComponent = iconMap[t.icon] || Mic;
                                return (
                                    <tr key={t.id} className="hover:bg-stone-50">
                                        <td className="p-4 font-bold text-stone-800">{t.name}</td>
                                        <td className="p-4 text-sm font-mono text-stone-500">{t.code}</td>
                                        <td className="p-4 text-sm text-stone-600">
                                            <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600">
                                                <IconComponent size={16} />
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-stone-600">{t.description}</td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleEditTrack(t)} className="p-2 text-stone-400 hover:text-blue-600"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDeleteTrack(t.id)} className="p-2 text-stone-400 hover:text-red-600"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )} 
                
                {/* Groups Tab */}
                {activeTab === 'groups' && (
                    <table className="w-full text-left">
                        <thead className="bg-stone-50 border-b border-stone-200">
                            <tr>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase">组别名称</th>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase">编码</th>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase">适用年级</th>
                                <th className="p-4 text-xs font-bold text-stone-500 uppercase text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {groups.map(g => (
                                <tr key={g.id} className="hover:bg-stone-50">
                                    <td className="p-4 font-bold text-stone-800">{g.name}</td>
                                    <td className="p-4 text-sm font-mono text-stone-500">{g.code}</td>
                                    <td className="p-4 text-sm text-stone-600">{g.grade}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleEditGroup(g)} className="p-2 text-stone-400 hover:text-blue-600"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDeleteGroup(g.id)} className="p-2 text-stone-400 hover:text-red-600"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Regions Tab */}
                {activeTab === 'regions' && (
                    <div className="grid grid-cols-3 gap-4">
                        {regions.map(r => (
                            <div key={r.id} className="border border-stone-200 rounded-xl p-4 hover:shadow-md transition-shadow relative group overflow-hidden">
                                <div className="absolute right-0 top-0 w-24 h-24 opacity-5 pointer-events-none">
                                    <Map size={96} />
                                </div>
                                <div className="flex justify-between items-start mb-3 relative z-10">
                                    <h3 className="font-bold text-stone-800 text-lg">{r.name}</h3>
                                    <div className="flex space-x-1">
                                        <button className="p-1 text-stone-400 hover:text-blue-600"><Edit2 size={14} /></button>
                                        <button className="p-1 text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {r.cities.slice(0, 6).map(c => (
                                        <span key={c} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded border border-stone-200">
                                            {c}
                                        </span>
                                    ))}
                                    {r.cities.length > 6 && <span className="text-xs text-stone-400 self-center">...</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Certificates Tab */}
                {activeTab === 'certificates' && (
                    <div className="grid grid-cols-3 gap-6">
                        {certificates.map(cert => (
                            <div key={cert.id} className="border border-stone-200 rounded-2xl p-4 hover:shadow-md transition-all group bg-white">
                                <div className={`w-full ${cert.orientation === 'landscape' ? 'aspect-[1.414/1]' : 'aspect-[1/1.414]'} bg-stone-100 rounded-xl mb-4 overflow-hidden relative border border-stone-100`}>
                                    <img src={cert.bg} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 flex gap-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${cert.type === 'award' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'}`}>
                                            {cert.type === 'award' ? '获奖证书' : '晋级证书'}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                                        <button className="bg-white/90 text-stone-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            预览 / 编辑
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-stone-800 text-sm">{cert.name}</h3>
                                        <span className="text-[10px] text-stone-400">{cert.orientation === 'landscape' ? '横版' : '竖版'} A4</span>
                                    </div>
                                    <button className="p-2 text-stone-400 hover:text-[#7f1d1d] bg-stone-50 rounded-lg">
                                        <Edit2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Hot Search Tab */}
                {activeTab === 'hotsearch' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6 flex gap-3">
                            <input 
                                id="keywordInput"
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-[#7f1d1d] font-bold text-stone-700"
                                placeholder="输入推荐词..."
                                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                            />
                            <button onClick={handleAddKeyword} className="bg-[#7f1d1d] text-white px-6 rounded-xl font-bold hover:bg-[#991b1b]">添加</button>
                        </div>
                        
                        <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
                            {hotSearches.map((item, idx) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border-b border-stone-200 last:border-0 bg-white hover:bg-stone-50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${idx < 3 ? 'bg-red-100 text-[#7f1d1d]' : 'bg-stone-100 text-stone-400'}`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="font-bold text-stone-800">{item.keyword}</div>
                                            <div className="flex gap-1 mt-0.5">
                                                {/* Auto HOT tag */}
                                                {idx < 3 && <span className="text-[10px] text-white bg-red-500 px-1.5 py-0.5 rounded font-bold">HOT</span>}
                                                {/* Manual tag */}
                                                {item.tag && item.tag !== 'HOT' && <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 font-bold">{item.tag}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col gap-1 mr-2">
                                            <button onClick={() => moveKeyword(idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-stone-200 rounded text-stone-400 hover:text-stone-600 disabled:opacity-20 transition-colors">
                                                <ChevronUp size={14}/>
                                            </button>
                                            <button onClick={() => moveKeyword(idx, 'down')} disabled={idx === hotSearches.length - 1} className="p-1 hover:bg-stone-200 rounded text-stone-400 hover:text-stone-600 disabled:opacity-20 transition-colors">
                                                <ChevronDown size={14}/>
                                            </button>
                                        </div>
                                        <div className="flex items-center cursor-pointer" onClick={() => {
                                            setHotSearches(hotSearches.map(h => h.id === item.id ? {...h, isActive: !h.isActive} : h));
                                        }}>
                                            <div className={`w-10 h-5 rounded-full p-1 transition-colors ${item.isActive ? 'bg-green-500' : 'bg-stone-300'}`}>
                                                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${item.isActive ? 'translate-x-5' : ''}`}></div>
                                            </div>
                                            <span className="ml-2 text-xs font-bold text-stone-500 w-8 text-center">{item.isActive ? '启用' : '停用'}</span>
                                        </div>
                                        <button onClick={() => handleDeleteKeyword(item.id)} className="p-2 text-stone-400 hover:text-red-500 bg-stone-100 rounded-lg hover:bg-red-50 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {hotSearches.length === 0 && <div className="p-8 text-center text-stone-400">暂无推荐词</div>}
                        </div>
                    </div>
                )}

                {/* Banners Tab */}
                {activeTab === 'banners' && (
                    <div className="grid grid-cols-2 gap-6">
                        {banners.map(banner => (
                            <div key={banner.id} className="border border-stone-200 rounded-2xl p-4 bg-white hover:shadow-md transition-all group relative">
                                <div className="aspect-[2/1] w-full bg-stone-100 rounded-xl overflow-hidden mb-3 relative">
                                    <img src={banner.img} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold">
                                        {banner.type === 'link' ? '外链跳转' : '自定义详情页'}
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <button onClick={() => handleEditBanner(banner)} className="bg-white text-stone-800 px-4 py-2 rounded-lg text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center">
                                            <Edit2 size={14} className="mr-1.5"/> 编辑
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-stone-800 text-sm truncate pr-2">{banner.title}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${banner.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-stone-100 text-stone-500'}`}>
                                        {banner.status === 'published' ? '已发布' : '草稿'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Track Edit Modal */}
        {showTrackModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-slide-up overflow-hidden">
                    <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                        <h3 className="font-bold text-stone-800">{trackForm.id === 0 ? '新增赛道' : '编辑赛道'}</h3>
                        <button onClick={() => setShowTrackModal(false)} className="p-1 rounded-full hover:bg-stone-200 text-stone-400"><X size={20} /></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-1.5 block">赛道名称</label>
                            <input 
                                value={trackForm.name}
                                onChange={e => setTrackForm({...trackForm, name: e.target.value})}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                placeholder="例如：演讲赛道"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-1.5 block">赛道编码</label>
                            <input 
                                value={trackForm.code}
                                onChange={e => setTrackForm({...trackForm, code: e.target.value})}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                placeholder="例如：speech"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-1.5 block">描述</label>
                            <textarea
                                value={trackForm.description}
                                onChange={e => setTrackForm({...trackForm, description: e.target.value})}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d] resize-none h-20"
                                placeholder="赛道简短描述..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-2 block">图标</label>
                            <div className="grid grid-cols-4 gap-2">
                                {Object.keys(iconMap).map(iconKey => {
                                    const IconComp = iconMap[iconKey];
                                    const isSelected = trackForm.icon === iconKey;
                                    return (
                                        <button
                                            key={iconKey}
                                            onClick={() => setTrackForm({...trackForm, icon: iconKey})}
                                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                                isSelected 
                                                ? 'bg-[#7f1d1d] text-white border-[#7f1d1d] shadow-sm' 
                                                : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                                            }`}
                                        >
                                            <IconComp size={20} />
                                            <span className="text-[10px] mt-1">{iconKey}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
                        <button onClick={() => setShowTrackModal(false)} className="px-6 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm">取消</button>
                        <button onClick={handleSaveTrack} className="px-6 py-2.5 rounded-xl bg-[#7f1d1d] text-white font-bold text-sm shadow-lg">保存</button>
                    </div>
                </div>
            </div>
        )}

        {/* Group Edit Modal */}
        {showGroupModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-slide-up overflow-hidden">
                    <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                        <h3 className="font-bold text-stone-800">{groupForm.id === 0 ? '新增组别' : '编辑组别'}</h3>
                        <button onClick={() => setShowGroupModal(false)} className="p-1 rounded-full hover:bg-stone-200 text-stone-400"><X size={20} /></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-1.5 block">组别名称</label>
                            <input 
                                value={groupForm.name}
                                onChange={e => setGroupForm({...groupForm, name: e.target.value})}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                placeholder="例如：小学A组"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-1.5 block">组别编码</label>
                            <input 
                                value={groupForm.code}
                                onChange={e => setGroupForm({...groupForm, code: e.target.value})}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                placeholder="例如：primary_a"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-1.5 block">适用年级 (多选)</label>
                            <div className="flex flex-wrap gap-2">
                                {ALL_GRADES.map(grade => {
                                    const isSelected = groupForm.selectedGrades.includes(grade);
                                    return (
                                        <button
                                            key={grade}
                                            onClick={() => toggleGroupGrade(grade)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                                isSelected 
                                                ? 'bg-[#7f1d1d] text-white border-[#7f1d1d] shadow-sm' 
                                                : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                                            }`}
                                        >
                                            {grade}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
                        <button onClick={() => setShowGroupModal(false)} className="px-6 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm">取消</button>
                        <button onClick={handleSaveGroup} className="px-6 py-2.5 rounded-xl bg-[#7f1d1d] text-white font-bold text-sm shadow-lg">保存</button>
                    </div>
                </div>
            </div>
        )}

        {/* Add Region Modal */}
        {showRegionModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl animate-slide-up overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                        <h3 className="font-bold text-stone-800">新增赛区</h3>
                        <button onClick={() => setShowRegionModal(false)} className="p-1 rounded-full hover:bg-stone-200 text-stone-400"><X size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-hidden flex">
                        <div className="w-2/3 p-6 overflow-y-auto border-r border-stone-100">
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-stone-500 mb-2">赛区名称</label>
                                <input value={newRegion.name} onChange={e => setNewRegion({...newRegion, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]" placeholder="例如：华东赛区" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-3">覆盖区域 (精确到市/区)</label>
                                <div className="space-y-4">
                                    {Object.entries(areaData).map(([regionName, provList]) => (
                                        <div key={regionName}>
                                            <h4 className="text-[10px] font-bold text-stone-400 uppercase mb-2">{regionName}地区</h4>
                                            <div className="grid grid-cols-1 gap-2">
                                                {provList.map(prov => {
                                                    const isExpanded = expandedProvinces.includes(prov.name);
                                                    const provCityKeys = prov.cities.map(c => `${prov.name}/${c}`);
                                                    const selectedCount = provCityKeys.filter(k => newRegion.selectedItems.includes(k)).length;
                                                    const isFullySelected = selectedCount === prov.cities.length;
                                                    const isPartiallySelected = selectedCount > 0 && !isFullySelected;
                                                    return (
                                                        <div key={prov.name} className="border border-stone-200 rounded-xl overflow-hidden">
                                                            <div className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 cursor-pointer" onClick={() => toggleProvinceExpand(prov.name)}>
                                                                <div className="flex items-center">
                                                                    <div onClick={(e) => { e.stopPropagation(); toggleProvinceSelect(prov.name, prov.cities); }} className={`w-4 h-4 mr-3 border rounded flex items-center justify-center transition-colors ${isFullySelected ? 'bg-[#7f1d1d] border-[#7f1d1d]' : isPartiallySelected ? 'bg-[#7f1d1d] border-[#7f1d1d]' : 'bg-white border-stone-300'}`}>
                                                                        {isFullySelected && <CheckSquare size={12} className="text-white"/>}
                                                                        {isPartiallySelected && <div className="w-2 h-0.5 bg-white"></div>}
                                                                    </div>
                                                                    <span className="text-sm font-bold text-stone-700">{prov.name}</span>
                                                                    {selectedCount > 0 && <span className="ml-2 text-xs text-[#7f1d1d] font-bold">({selectedCount})</span>}
                                                                </div>
                                                                <ChevronDown size={16} className={`text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                            </div>
                                                            {isExpanded && (<div className="p-3 bg-white grid grid-cols-4 gap-2 border-t border-stone-100">{prov.cities.map(city => {const key = `${prov.name}/${city}`; const isSelected = newRegion.selectedItems.includes(key); return (<div key={city} onClick={() => toggleCitySelect(prov.name, city)} className={`text-xs px-2 py-1.5 rounded cursor-pointer border text-center transition-colors font-medium ${isSelected ? 'bg-[#7f1d1d]/10 border-[#7f1d1d] text-[#7f1d1d]' : 'bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100'}`}>{city}</div>)})}</div>)}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 bg-stone-50 p-6 flex flex-col items-center justify-center text-center border-l border-stone-100">
                            <div className="relative w-full h-72 mb-4">
                                <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 drop-shadow-md">
                                    <path d="M20,50 Q30,20 50,30 T80,50 T50,80 T20,50" fill="#e7e5e4" stroke="#7f1d1d" strokeWidth="0.5"/>
                                    {newRegion.selectedItems.map((_, i) => { const x = 30 + (i * 7) % 40; const y = 30 + (i * 5) % 40; return <circle key={i} cx={x} cy={y} r="1.5" fill="#7f1d1d" /> })}
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><span className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold text-stone-500 border border-stone-200 shadow-sm">区域覆盖示意图</span></div>
                            </div>
                            <p className="text-xs text-stone-400 font-medium">已选择 {newRegion.selectedItems.length} 个城市/区域</p>
                            <div className="mt-4 flex flex-wrap gap-1 justify-center max-h-32 overflow-y-auto">{newRegion.selectedItems.map(k => (<span key={k} className="text-[10px] bg-white border border-stone-200 px-2 py-1 rounded text-stone-600">{k.split('/')[1]}</span>))}</div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-stone-100 flex justify-end gap-3 bg-stone-50">
                        <button onClick={() => setShowRegionModal(false)} className="px-6 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm">取消</button>
                        <button onClick={handleSaveRegion} className="px-6 py-2.5 rounded-xl bg-[#7f1d1d] text-white font-bold text-sm shadow-lg">确认添加</button>
                    </div>
                </div>
            </div>
        )}

        {/* Certificate Modal */}
        {showCertModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-slide-up overflow-hidden">
                    <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                        <h3 className="font-bold text-stone-800">新增证书模板</h3>
                        <button onClick={() => setShowCertModal(false)} className="p-1 rounded-full hover:bg-stone-200 text-stone-400"><X size={20} /></button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">模板名称</label>
                                <input 
                                    value={certConfig.name}
                                    onChange={e => setCertConfig({...certConfig, name: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                    placeholder="例如：2025总决赛获奖证书"
                                />
                            </div>
                            
                            {/* Certificate Type */}
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-stone-500 mb-2 block">证书类型</label>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setCertConfig({...certConfig, type: 'award'})}
                                        className={`flex-1 py-3 border rounded-xl text-xs font-bold flex items-center justify-center ${certConfig.type === 'award' ? 'border-[#7f1d1d] bg-amber-50 text-[#7f1d1d]' : 'border-stone-200 text-stone-500'}`}
                                    >
                                        <Medal size={16} className="mr-2" /> 获奖证书 (一二三等奖)
                                    </button>
                                    <button 
                                        onClick={() => setCertConfig({...certConfig, type: 'promotion'})}
                                        className={`flex-1 py-3 border rounded-xl text-xs font-bold flex items-center justify-center ${certConfig.type === 'promotion' ? 'border-[#7f1d1d] bg-blue-50 text-[#7f1d1d]' : 'border-stone-200 text-stone-500'}`}
                                    >
                                        <TrendingUp size={16} className="mr-2" /> 晋级证书 (初赛/复赛)
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">版式方向</label>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setCertConfig({...certConfig, orientation: 'landscape'})}
                                        className={`flex-1 py-3 border rounded-xl text-xs font-bold ${certConfig.orientation === 'landscape' ? 'border-[#7f1d1d] bg-[#7f1d1d]/5 text-[#7f1d1d]' : 'border-stone-200 text-stone-500'}`}
                                    >
                                        <LayoutTemplate size={16} className="mx-auto mb-1 rotate-90" /> 横版
                                    </button>
                                    <button 
                                        onClick={() => setCertConfig({...certConfig, orientation: 'portrait'})}
                                        className={`flex-1 py-3 border rounded-xl text-xs font-bold ${certConfig.orientation === 'portrait' ? 'border-[#7f1d1d] bg-[#7f1d1d]/5 text-[#7f1d1d]' : 'border-stone-200 text-stone-500'}`}
                                    >
                                        <LayoutTemplate size={16} className="mx-auto mb-1" /> 竖版
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">底纹/背景图</label>
                                <div className="w-full h-[86px] bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 cursor-pointer hover:bg-stone-100">
                                    <ImageIcon size={20} className="mb-1" />
                                    <span className="text-[10px] font-bold">点击上传图片</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-2 block">包含字段 (显示在证书上的信息)</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['姓名', '证件号', '奖项名称', '赛事名称', '组别', '编号', '日期', '二维码', '主办方章'].map(field => (
                                    <label key={field} className="flex items-center p-3 bg-stone-50 rounded-xl border border-stone-100 cursor-pointer hover:bg-white transition-colors">
                                        <input type="checkbox" defaultChecked={['姓名','奖项名称','日期','编号'].includes(field)} className="mr-2 w-4 h-4 accent-[#7f1d1d] rounded" />
                                        <span className="text-xs font-bold text-stone-700">{field}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-stone-500 mb-2 block">样式设置</label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <select className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-600 outline-none">
                                        <option>思源宋体 (默认)</option>
                                        <option>黑体</option>
                                        <option>楷体</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <select className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-600 outline-none">
                                        <option>主要文字颜色: #000000</option>
                                        <option>#7f1d1d (品牌红)</option>
                                        <option>#d97706 (金色)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
                        <button onClick={() => setShowCertModal(false)} className="px-6 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm">取消</button>
                        <button onClick={handleSaveCert} className="px-6 py-2.5 rounded-xl bg-[#7f1d1d] text-white font-bold text-sm shadow-lg">保存模板</button>
                    </div>
                </div>
            </div>
        )}

        {/* Banner Edit Modal */}
        {showBannerModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-4xl rounded-3xl h-[85vh] shadow-2xl animate-slide-up flex flex-col overflow-hidden">
                    <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                        <h3 className="font-bold text-stone-800 font-serif">{bannerForm.id === 0 ? '新增轮播图' : '编辑轮播图'}</h3>
                        <button onClick={() => setShowBannerModal(false)} className="p-1 rounded-full hover:bg-stone-200 text-stone-400"><X size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">标题</label>
                                <input 
                                    value={bannerForm.title}
                                    onChange={e => setBannerForm({...bannerForm, title: e.target.value})}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                    placeholder="请输入轮播图标题"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">状态</label>
                                <div className="flex bg-stone-50 p-1 rounded-xl">
                                    <button onClick={() => setBannerForm({...bannerForm, status: 'published'})} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${bannerForm.status === 'published' ? 'bg-white text-green-600 shadow-sm' : 'text-stone-500'}`}>已发布</button>
                                    <button onClick={() => setBannerForm({...bannerForm, status: 'draft'})} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${bannerForm.status === 'draft' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>草稿</button>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-stone-500 mb-1.5 block">封面图 (推荐尺寸 16:9)</label>
                                <div className="w-full h-32 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 cursor-pointer hover:bg-stone-100 relative overflow-hidden">
                                    {bannerForm.img ? (
                                        <div className="relative w-full h-full">
                                            <img src={bannerForm.img} className="w-full h-full object-cover" />
                                            <button onClick={() => setBannerForm({...bannerForm, img: ''})} className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full"><X size={14}/></button>
                                        </div>
                                    ) : (
                                        <>
                                            <ImageIcon size={24} className="mb-2" />
                                            <span className="text-xs font-bold">点击上传图片</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Link Type Config */}
                        <div className="border-t border-stone-100 pt-6">
                            <label className="text-xs font-bold text-stone-500 mb-3 block">跳转配置</label>
                            <div className="flex gap-4 mb-4">
                                <label className="flex items-center cursor-pointer p-3 bg-stone-50 rounded-xl border border-stone-200 flex-1 hover:bg-stone-100">
                                    <input type="radio" checked={bannerForm.type === 'link'} onChange={() => setBannerForm({...bannerForm, type: 'link'})} className="mr-3 accent-[#7f1d1d] w-4 h-4"/>
                                    <span className="text-sm font-bold text-stone-700 flex items-center"><LinkIcon size={14} className="mr-2"/> 外部链接 / 内部路径</span>
                                </label>
                                <label className="flex items-center cursor-pointer p-3 bg-stone-50 rounded-xl border border-stone-200 flex-1 hover:bg-stone-100">
                                    <input type="radio" checked={bannerForm.type === 'custom'} onChange={() => setBannerForm({...bannerForm, type: 'custom'})} className="mr-3 accent-[#7f1d1d] w-4 h-4"/>
                                    <span className="text-sm font-bold text-stone-700 flex items-center"><LayoutTemplate size={14} className="mr-2"/> 自定义详情页</span>
                                </label>
                            </div>

                            {bannerForm.type === 'link' ? (
                                <div>
                                    <input 
                                        value={bannerForm.linkUrl}
                                        onChange={e => setBannerForm({...bannerForm, linkUrl: e.target.value})}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]"
                                        placeholder="例如：https://example.com 或 /competitions/123"
                                    />
                                </div>
                            ) : (
                                <div className="border border-stone-200 rounded-xl overflow-hidden animate-fade-in">
                                    <div className="bg-stone-50 p-2 flex border-b border-stone-200 justify-between items-center">
                                        <div className="flex gap-1">
                                            <button onClick={() => setBannerForm({...bannerForm, contentConfig: {...bannerForm.contentConfig, mode: 'richtext'}})} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${bannerForm.contentConfig.mode === 'richtext' ? 'bg-white shadow text-[#7f1d1d]' : 'text-stone-500'}`}>富文本</button>
                                            <button onClick={() => setBannerForm({...bannerForm, contentConfig: {...bannerForm.contentConfig, mode: 'modular'}})} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${bannerForm.contentConfig.mode === 'modular' ? 'bg-white shadow text-[#7f1d1d]' : 'text-stone-500'}`}>模块化</button>
                                        </div>
                                        <span className="text-[10px] text-stone-400 px-2">详情页内容编辑器</span>
                                    </div>
                                    
                                    <div className="p-4 bg-white min-h-[300px]">
                                        {bannerForm.contentConfig.mode === 'richtext' ? (
                                            <div className="h-full flex flex-col">
                                                <div className="flex gap-2 mb-2 pb-2 border-b border-stone-100">
                                                    <button className="p-1.5 hover:bg-stone-100 rounded"><Bold size={14}/></button>
                                                    <button className="p-1.5 hover:bg-stone-100 rounded"><Italic size={14}/></button>
                                                    <button className="p-1.5 hover:bg-stone-100 rounded"><List size={14}/></button>
                                                    <button className="p-1.5 hover:bg-stone-100 rounded"><AlignLeft size={14}/></button>
                                                </div>
                                                <textarea 
                                                    value={bannerForm.contentConfig.richText}
                                                    onChange={e => setBannerForm({...bannerForm, contentConfig: {...bannerForm.contentConfig, richText: e.target.value}})}
                                                    className="w-full flex-1 outline-none text-sm resize-none"
                                                    placeholder="在此输入详情页内容..."
                                                ></textarea>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {bannerForm.contentConfig.modules.map((mod: any, idx: number) => (
                                                    <div key={mod.id} className="border border-stone-200 rounded-xl p-3 relative group">
                                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
                                                            <button onClick={() => removeDetailModule(mod.id)} className="p-1 bg-red-50 text-red-500 rounded"><Trash2 size={12}/></button>
                                                        </div>
                                                        <div className="mb-2 text-[10px] font-bold text-stone-400 uppercase">{mod.type}</div>
                                                        {mod.type === 'text' ? (
                                                            <textarea 
                                                                value={mod.content}
                                                                onChange={e => updateDetailModule(mod.id, 'content', e.target.value)}
                                                                className="w-full bg-stone-50 rounded-lg p-2 text-sm outline-none" 
                                                                rows={2} 
                                                                placeholder="输入文本..."
                                                            />
                                                        ) : (
                                                            <div className="flex gap-3">
                                                                <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center text-stone-300">
                                                                    {mod.type === 'image' ? <ImageIcon size={20}/> : <Video size={20}/>}
                                                                </div>
                                                                <input 
                                                                    value={mod.url}
                                                                    onChange={e => updateDetailModule(mod.id, 'url', e.target.value)}
                                                                    className="flex-1 bg-stone-50 rounded-lg p-2 text-xs outline-none h-fit" 
                                                                    placeholder={`输入${mod.type === 'image' ? '图片' : '视频'}链接`}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="flex justify-center gap-2 py-4 border-2 border-dashed border-stone-100 rounded-xl bg-stone-50/50">
                                                    <button onClick={() => addDetailModule('text')} className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:text-[#7f1d1d] flex items-center"><Type size={12} className="mr-1"/> 文本</button>
                                                    <button onClick={() => addDetailModule('image')} className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:text-[#7f1d1d] flex items-center"><ImageIcon size={12} className="mr-1"/> 图片</button>
                                                    <button onClick={() => addDetailModule('video')} className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:text-[#7f1d1d] flex items-center"><Video size={12} className="mr-1"/> 视频</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
                        <button onClick={() => setShowBannerModal(false)} className="px-6 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm">取消</button>
                        <button onClick={handleSaveBanner} className="px-6 py-2.5 rounded-xl bg-[#7f1d1d] text-white font-bold text-sm shadow-lg">保存配置</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default PlatformConfig;
