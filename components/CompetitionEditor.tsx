
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, MapPin, Locate, Image as ImageIcon, Type, ToggleLeft, ToggleRight, PlusCircle, Award, TrendingUp, Save, FileText, Monitor, Check, Video, Layout, AlignLeft, Bold, Italic, List, UploadCloud, Users, User, Globe } from 'lucide-react';

interface CompetitionEditorProps {
  initialData?: any;
  occupiedTracks?: string[]; // List of track IDs that already have active competitions
  onSave: (data: any, isDraft: boolean) => void;
  onClose: () => void;
}

const CompetitionEditor: React.FC<CompetitionEditorProps> = ({ initialData, occupiedTracks = [], onSave, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [compData, setCompData] = useState<any>({
      track: '',
      title: '',
      structure: 'single', 
      participationTypes: ['individual'] as string[], 
      regionMode: 'global', // 'global' | 'stage'
      groups: [] as string[],
      groupDescriptions: {} as Record<string, string>,
      autoAudit: false,
      regions: [] as string[],
      stages: [{ 
          name: '正赛流程', 
          mode: 'online', 
          submissionType: 'video',
          regions: [] as string[], // Stage-specific regions
          address: '', 
          latitude: '',
          longitude: '',
          offlineNotes: '', 
          regStart: '', regEnd: '', 
          submitStart: '', submitEnd: '', 
          reviewStart: '', reviewEnd: '', 
          certificateId: '', 
          promotionMethod: 'ratio', promotionValue: '30',
          awardRule: 'ratio', 
          awards: [{ name: '一等奖', value: '10' }] 
      }],
      detailConfig: {
          banner: '',
          mode: 'richtext', // 'richtext' | 'modular'
          richTextContent: '', 
          modules: [] // { id, type, content, url }
      }
  });

  const [expandedStageIdx, setExpandedStageIdx] = useState<number | null>(0);
  const [showMapModal, setShowMapModal] = useState(false);
  const [currentMapStageIdx, setCurrentMapStageIdx] = useState<number | null>(null);

  useEffect(() => {
      if (initialData) {
          setCompData((prev: any) => ({ 
              ...prev, 
              ...initialData,
              regionMode: initialData.regionMode || 'global',
              participationTypes: initialData.participationTypes || prev.participationTypes,
              groupDescriptions: initialData.groupDescriptions || prev.groupDescriptions || {},
              detailConfig: {
                  banner: initialData.detailConfig?.banner || prev.detailConfig.banner,
                  mode: initialData.detailConfig?.mode || prev.detailConfig.mode,
                  richTextContent: initialData.detailConfig?.richTextContent || prev.detailConfig.richTextContent,
                  modules: initialData.detailConfig?.modules || prev.detailConfig.modules
              },
              stages: initialData.stages ? initialData.stages.map((s: any) => ({...s, regions: s.regions || []})) : prev.stages
          }));
      }
  }, [initialData]);

  const tracks = [
      { id: 't1', name: '中文演讲赛道' },
      { id: 't2', name: '经典诵读赛道' },
      { id: 't3', name: '英文演讲赛道' },
      { id: 't4', name: '主持人赛道' },
      { id: 't5', name: '辩论赛道' },
  ];
  const groupOptions = ['小学A组 (1-3年级)', '小学B组 (4-6年级)', '初中组', '高中组', '职高组'];
  const availableRegions = ['北京赛区', '华东赛区', '华南赛区', '线上赛区', '西部赛区'];

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const url = URL.createObjectURL(file);
          setCompData((prev: any) => ({
              ...prev,
              detailConfig: { ...prev.detailConfig, banner: url }
          }));
      }
  };

  const handleStructureChange = (type: 'single' | 'promotion') => {
      setCompData((prev: any) => ({
          ...prev,
          structure: type,
          stages: type === 'single' ? [prev.stages[0]] : prev.stages
      }));
  };

  const toggleParticipationType = (type: string) => {
      setCompData((prev: any) => {
          const current = prev.participationTypes || [];
          if (current.includes(type)) {
              if (current.length <= 1) return prev;
              return { ...prev, participationTypes: current.filter((t: string) => t !== type) };
          }
          return { ...prev, participationTypes: [...current, type] };
      });
  };

  const addStage = () => {
      setCompData({...compData, stages: [...compData.stages, { 
          name: `阶段 ${compData.stages.length + 1}`, 
          mode: 'online', 
          submissionType: 'video',
          regions: [],
          address: '', latitude: '', longitude: '', offlineNotes: '',
          regStart: '', regEnd: '', 
          submitStart: '', submitEnd: '',
          reviewStart: '', reviewEnd: '', 
          promotionMethod: 'ratio', promotionValue: '30',
          awardRule: 'ratio',
          awards: [{ name: '一等奖', value: '10' }]
      }]});
      setExpandedStageIdx(compData.stages.length); 
  };

  const removeStage = (idx: number) => {
      if (compData.stages.length > 1) {
          const newStages = [...compData.stages];
          newStages.splice(idx, 1);
          setCompData({...compData, stages: newStages});
          if (expandedStageIdx === idx) setExpandedStageIdx(null);
      }
  };

  const updateStage = (idx: number, field: string, value: any) => {
      const newStages = [...compData.stages];
      newStages[idx] = { ...newStages[idx], [field]: value };
      setCompData({...compData, stages: newStages});
  };

  const addAward = (stageIdx: number) => {
      const newStages = [...compData.stages];
      const currentAwards = newStages[stageIdx].awards || [];
      newStages[stageIdx].awards = [...currentAwards, { name: '', value: '' }];
      setCompData({...compData, stages: newStages});
  };

  const removeAward = (stageIdx: number, awardIdx: number) => {
      const newStages = [...compData.stages];
      const currentAwards = newStages[stageIdx].awards || [];
      newStages[stageIdx].awards = currentAwards.filter((_: any, i: number) => i !== awardIdx);
      setCompData({...compData, stages: newStages});
  };

  const updateAward = (stageIdx: number, awardIdx: number, field: string, value: any) => {
      const newStages = [...compData.stages];
      newStages[stageIdx].awards[awardIdx] = { ...newStages[stageIdx].awards[awardIdx], [field]: value };
      setCompData({...compData, stages: newStages});
  };

  const addDetailModule = (type: 'text' | 'image' | 'video') => {
      const newModule = { id: Date.now(), type, content: '', url: '' };
      setCompData({
          ...compData,
          detailConfig: {
              ...compData.detailConfig,
              modules: [...(compData.detailConfig.modules || []), newModule]
          }
      });
  };

  const updateDetailModule = (id: number, field: string, value: string) => {
      const modules = compData.detailConfig.modules.map((m: any) =>
          m.id === id ? { ...m, [field]: value } : m
      );
      setCompData({ ...compData, detailConfig: { ...compData.detailConfig, modules } });
  };

  const removeDetailModule = (id: number) => {
      const modules = compData.detailConfig.modules.filter((m: any) => m.id !== id);
      setCompData({ ...compData, detailConfig: { ...compData.detailConfig, modules } });
  };

  const openMap = (idx: number) => {
      setCurrentMapStageIdx(idx);
      setShowMapModal(true);
  };

  const handleMapSelect = (e: React.MouseEvent<HTMLDivElement>) => {
      if (currentMapStageIdx !== null) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const mockLat = (39.9 + (y / rect.height) * 0.1).toFixed(6);
          const mockLng = (116.3 + (x / rect.width) * 0.1).toFixed(6);
          
          const newStages = [...compData.stages];
          newStages[currentMapStageIdx] = { 
              ...newStages[currentMapStageIdx], 
              latitude: mockLat, 
              longitude: mockLng,
              address: newStages[currentMapStageIdx].address || '北京市海淀区中关村大街1号'
          };
          setCompData({...compData, stages: newStages});
          setShowMapModal(false);
      }
  };

  const toggleRegion = (region: string) => {
      const current = compData.regions;
      if (current.includes(region)) {
          setCompData({...compData, regions: current.filter((r: string) => r !== region)});
      } else {
          setCompData({...compData, regions: [...current, region]});
      }
  };

  const toggleStageRegion = (stageIdx: number, region: string) => {
      const newStages = [...compData.stages];
      const currentRegions = newStages[stageIdx].regions || [];
      if (currentRegions.includes(region)) {
          newStages[stageIdx].regions = currentRegions.filter((r: string) => r !== region);
      } else {
          newStages[stageIdx].regions = [...currentRegions, region];
      }
      setCompData({...compData, stages: newStages});
  };

  const toggleGroup = (g: string) => {
      const current = compData.groups;
      if (current.includes(g)) setCompData({...compData, groups: current.filter((i: string) => i !== g)});
      else setCompData({...compData, groups: [...current, g]});
  };

  const updateGroupDescription = (group: string, desc: string) => {
      setCompData((prev: any) => ({
          ...prev,
          groupDescriptions: {
              ...prev.groupDescriptions,
              [group]: desc
          }
      }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up border border-stone-200">
            {/* Header */}
            <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50 rounded-t-3xl">
                <div>
                    <h2 className="text-xl font-black text-stone-800 font-serif">{initialData?.id ? '编辑赛事' : '发布新赛事'}</h2>
                    <p className="text-xs text-stone-400 mt-1">配置赛事基本信息、赛制流程及详情页内容</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100 text-stone-400"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-10">
                    {/* Step 1: Basic Info */}
                    <section>
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center">
                            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs mr-2">1</span>
                            基本信息
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-stone-500 mb-1.5">赛事名称</label>
                                <input type="text" className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]" placeholder="赛事名称" value={compData.title} onChange={(e) => setCompData({...compData, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-1.5">所属赛道</label>
                                <select 
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#7f1d1d]" 
                                    value={compData.track} 
                                    onChange={(e) => setCompData({...compData, track: e.target.value})}
                                >
                                    <option value="">请选择赛道</option>
                                    {tracks.map(track => (
                                        <option 
                                            key={track.id} 
                                            value={track.id}
                                            disabled={occupiedTracks.includes(track.id) && initialData?.track !== track.id}
                                        >
                                            {track.name} {occupiedTracks.includes(track.id) && initialData?.track !== track.id ? '(进行中)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-1.5">参赛形式 (多选)</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleParticipationType('individual')}
                                        className={`flex-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center ${compData.participationTypes?.includes('individual') ? 'border-[#7f1d1d] bg-red-50 text-[#7f1d1d]' : 'border-stone-100 bg-white text-stone-500'}`}
                                    >
                                        {compData.participationTypes?.includes('individual') && <Check size={12} className="mr-1" />}
                                        <User size={14} className="mr-1.5" /> 个人赛
                                    </button>
                                    <button
                                        onClick={() => toggleParticipationType('team')}
                                        className={`flex-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center ${compData.participationTypes?.includes('team') ? 'border-[#7f1d1d] bg-red-50 text-[#7f1d1d]' : 'border-stone-100 bg-white text-stone-500'}`}
                                    >
                                        {compData.participationTypes?.includes('team') && <Check size={12} className="mr-1" />}
                                        <Users size={14} className="mr-1.5" /> 团队赛
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-1.5">赛事类型</label>
                                <div className="flex gap-2">
                                    <button onClick={() => handleStructureChange('single')} className={`flex-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all ${compData.structure === 'single' ? 'border-[#7f1d1d] bg-red-50 text-[#7f1d1d]' : 'border-stone-100 bg-white text-stone-500'}`}>单项赛</button>
                                    <button onClick={() => handleStructureChange('promotion')} className={`flex-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all ${compData.structure === 'promotion' ? 'border-[#7f1d1d] bg-red-50 text-[#7f1d1d]' : 'border-stone-100 bg-white text-stone-500'}`}>晋级赛</button>
                                </div>
                            </div>

                            {/* Promotion Region Config Toggle */}
                            {compData.structure === 'promotion' && (
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1.5">赛区配置模式</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setCompData({...compData, regionMode: 'global'})} className={`flex-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all ${compData.regionMode === 'global' ? 'border-[#7f1d1d] bg-red-50 text-[#7f1d1d]' : 'border-stone-100 bg-white text-stone-500'}`}>统一配置</button>
                                        <button onClick={() => setCompData({...compData, regionMode: 'stage'})} className={`flex-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all ${compData.regionMode === 'stage' ? 'border-[#7f1d1d] bg-red-50 text-[#7f1d1d]' : 'border-stone-100 bg-white text-stone-500'}`}>分阶段配置</button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Global Regions Selector */}
                            {(compData.structure === 'single' || (compData.structure === 'promotion' && compData.regionMode === 'global')) && (
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-stone-500 mb-1.5">覆盖赛区 (全局)</label>
                                    <div className="flex flex-wrap gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200 min-h-[46px]">
                                        {availableRegions.map(region => (
                                            <button key={region} onClick={() => toggleRegion(region)} className={`text-[10px] px-2 py-1 rounded-lg border transition-colors ${compData.regions.includes(region) ? 'bg-[#7f1d1d]/10 border-[#7f1d1d] text-[#7f1d1d] font-bold' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-100'}`}>{region}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Step 2: Config */}
                    <section>
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center">
                            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs mr-2">2</span>
                            赛制配置
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-2">包含组别 (多选)</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {groupOptions.map(g => (
                                        <div 
                                            key={g} 
                                            onClick={() => toggleGroup(g)} 
                                            className={`p-3 rounded-xl border cursor-pointer transition-colors ${compData.groups.includes(g) ? 'bg-[#7f1d1d]/5 border-[#7f1d1d]' : 'bg-stone-50 border-stone-100 hover:bg-white'}`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center shrink-0 ${compData.groups.includes(g) ? 'bg-[#7f1d1d] border-[#7f1d1d]' : 'bg-white border-stone-300'}`}>
                                                    {compData.groups.includes(g) && <Check size={10} className="text-white"/>}
                                                </div>
                                                <span className="text-xs font-bold text-stone-700">{g}</span>
                                            </div>
                                            {compData.groups.includes(g) && (
                                                <input 
                                                    type="text"
                                                    className="mt-2 w-full bg-white border border-[#7f1d1d]/20 rounded-lg p-2 text-[10px] outline-none focus:border-[#7f1d1d] text-stone-600 placeholder:text-stone-300 animate-fade-in"
                                                    placeholder="组别说明 (选填)"
                                                    value={compData.groupDescriptions?.[g] || ''}
                                                    onChange={(e) => updateGroupDescription(g, e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-2">报名审核方式</label>
                                <div onClick={() => setCompData({...compData, autoAudit: !compData.autoAudit})} className={`w-full py-3 px-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${compData.autoAudit ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-white'}`}>
                                    <div className="flex items-center">
                                        {compData.autoAudit ? <ToggleRight size={24} className="text-green-600 mr-2"/> : <ToggleLeft size={24} className="text-stone-400 mr-2"/>}
                                        <span className={`text-sm font-bold ${compData.autoAudit ? 'text-green-700' : 'text-stone-600'}`}>{compData.autoAudit ? '自动审核开启' : '人工审核 (默认)'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Step 3: Timeline & Rubrics */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider flex items-center">
                                <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs mr-2">3</span>
                                流程与评分
                            </h3>
                            {compData.structure === 'promotion' && (
                                <button onClick={addStage} className="text-[#7f1d1d] text-xs font-bold flex items-center hover:bg-stone-50 px-2 py-1 rounded">
                                    <PlusCircle size={14} className="mr-1" /> 添加阶段
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-4">
                            {compData.stages.map((stage: any, idx: number) => {
                                const isFinalStage = idx === compData.stages.length - 1;
                                const isExpanded = expandedStageIdx === idx;
                                return (
                                    <div key={idx} className={`border rounded-xl transition-all overflow-hidden ${isExpanded ? 'border-[#7f1d1d] ring-1 ring-[#7f1d1d]/10 bg-white' : 'border-stone-200 bg-stone-50'}`}>
                                        <div className="flex justify-between items-center p-3 cursor-pointer" onClick={() => setExpandedStageIdx(isExpanded ? null : idx)}>
                                            <div className="flex items-center">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${isExpanded ? 'bg-[#7f1d1d] text-white' : 'bg-stone-200 text-stone-500'}`}>{idx + 1}</div>
                                                <span className="font-bold text-sm text-stone-800">{stage.name}</span>
                                                <span className="ml-3 text-[10px] bg-stone-100 px-2 py-0.5 rounded border border-stone-200 text-stone-500">{stage.mode === 'online' ? '线上' : '线下'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                {compData.structure === 'promotion' && idx > 0 && <button onClick={(e) => { e.stopPropagation(); removeStage(idx); }} className="p-1 text-stone-400 hover:text-red-500 mr-2"><Trash2 size={14} /></button>}
                                                <Check size={16} className={`text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="p-5 border-t border-stone-100 bg-white">
                                                <div className="grid grid-cols-2 gap-5 mb-5">
                                                    <div>
                                                        <label className="text-xs font-bold text-stone-500 mb-1.5 block">阶段名称</label>
                                                        <input value={stage.name} onChange={(e) => updateStage(idx, 'name', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-bold outline-none focus:border-[#7f1d1d]" />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-stone-500 mb-1.5 block">比赛形式</label>
                                                        <div className="flex bg-stone-50 p-0.5 rounded-lg border border-stone-200">
                                                            <button onClick={() => updateStage(idx, 'mode', 'online')} className={`flex-1 py-2 rounded text-[10px] font-bold ${stage.mode === 'online' ? 'bg-white shadow-sm text-blue-600' : 'text-stone-500'}`}>线上</button>
                                                            <button onClick={() => updateStage(idx, 'mode', 'offline')} className={`flex-1 py-2 rounded text-[10px] font-bold ${stage.mode === 'offline' ? 'bg-white shadow-sm text-[#7f1d1d]' : 'text-stone-500'}`}>线下</button>
                                                        </div>
                                                    </div>

                                                    {/* Per-Stage Region Selector (If enabled) */}
                                                    {compData.structure === 'promotion' && compData.regionMode === 'stage' && (
                                                        <div className="col-span-2">
                                                            <label className="text-xs font-bold text-stone-500 mb-1.5 block flex items-center">
                                                                <Globe size={12} className="mr-1"/> 本阶段覆盖赛区
                                                            </label>
                                                            <div className="flex flex-wrap gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200 min-h-[46px]">
                                                                {availableRegions.map(region => (
                                                                    <button 
                                                                        key={region} 
                                                                        onClick={() => toggleStageRegion(idx, region)} 
                                                                        className={`text-[10px] px-2 py-1 rounded-lg border transition-colors ${stage.regions?.includes(region) ? 'bg-[#7f1d1d]/10 border-[#7f1d1d] text-[#7f1d1d] font-bold' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-100'}`}
                                                                    >
                                                                        {region}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {stage.mode === 'offline' && (
                                                        <div className="col-span-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                                                            <label className="text-xs font-bold text-stone-500 mb-2 block">参赛地址配置</label>
                                                            <div className="space-y-3">
                                                                <div className="flex gap-2">
                                                                    <div className="relative flex-1">
                                                                        <MapPin size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"/>
                                                                        <input value={stage.address} onChange={(e) => updateStage(idx, 'address', e.target.value)} className="w-full pl-9 bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-[#7f1d1d]" placeholder="详细地址" />
                                                                    </div>
                                                                    <button onClick={() => openMap(idx)} className="px-3 bg-[#7f1d1d]/10 text-[#7f1d1d] font-bold text-xs rounded-lg border border-[#7f1d1d]/20 hover:bg-[#7f1d1d]/20 flex items-center">
                                                                        <Locate size={14} className="mr-1"/> 地图选点
                                                                    </button>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <div className="flex-1 relative">
                                                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[10px] text-stone-400 font-bold">经度</span>
                                                                        <input value={stage.longitude} readOnly className="w-full pl-10 bg-stone-100 border border-stone-200 rounded-lg p-2 text-xs text-stone-500" placeholder="-" />
                                                                    </div>
                                                                    <div className="flex-1 relative">
                                                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[10px] text-stone-400 font-bold">纬度</span>
                                                                        <input value={stage.latitude} readOnly className="w-full pl-10 bg-stone-100 border border-stone-200 rounded-lg p-2 text-xs text-stone-500" placeholder="-" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-bold text-stone-500 mb-1.5 block">参赛注意事项</label>
                                                                    <textarea 
                                                                        value={stage.offlineNotes || ''} 
                                                                        onChange={(e) => updateStage(idx, 'offlineNotes', e.target.value)} 
                                                                        className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-[#7f1d1d] resize-none h-20"
                                                                        placeholder="例如：请提前30分钟签到，携带身份证原件..." 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Timeline Inputs */}
                                                    <div className="col-span-2 grid grid-cols-2 gap-4">
                                                        <div><label className="text-xs font-bold text-stone-500 mb-1 block">报名时间段</label><div className="flex gap-1"><input type="date" value={stage.regStart || ''} onChange={(e) => updateStage(idx, 'regStart', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs outline-none" /><input type="date" value={stage.regEnd || ''} onChange={(e) => updateStage(idx, 'regEnd', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs outline-none" /></div></div>
                                                        {stage.mode === 'online' && (<div><label className="text-xs font-bold text-stone-500 mb-1 block">作品提交时间段</label><div className="flex gap-1"><input type="date" value={stage.submitStart || ''} onChange={(e) => updateStage(idx, 'submitStart', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs outline-none" /><input type="date" value={stage.submitEnd || ''} onChange={(e) => updateStage(idx, 'submitEnd', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs outline-none" /></div></div>)}
                                                        <div><label className="text-xs font-bold text-stone-500 mb-1 block">{stage.mode === 'online' ? '专家评审时间段' : '线下比赛时间段'}</label><div className="flex gap-1"><input type="date" value={stage.reviewStart || ''} onChange={(e) => updateStage(idx, 'reviewStart', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs outline-none" /><input type="date" value={stage.reviewEnd || ''} onChange={(e) => updateStage(idx, 'reviewEnd', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs outline-none" /></div></div>
                                                    </div>
                                                </div>

                                                {/* Rules Configuration */}
                                                {compData.structure === 'promotion' && idx < compData.stages.length - 1 ? (
                                                    // Promotion Rule for Intermediate Stage
                                                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4">
                                                        <label className="text-xs font-bold text-amber-700 mb-2 block flex items-center"><TrendingUp size={14} className="mr-1.5"/> 晋级规则</label>
                                                        <div className="flex gap-3 items-center">
                                                            <select value={stage.promotionMethod} onChange={(e) => updateStage(idx, 'promotionMethod', e.target.value)} className="bg-white border border-amber-200 text-amber-900 text-xs rounded-lg p-2 outline-none font-bold">
                                                                <option value="ratio">按比例晋级</option>
                                                                <option value="count">按名额晋级</option>
                                                                <option value="score">按分数线晋级</option>
                                                            </select>
                                                            <input value={stage.promotionValue} onChange={(e) => updateStage(idx, 'promotionValue', e.target.value)} className="w-24 bg-white border border-amber-200 rounded-lg p-2 text-xs font-bold outline-none text-amber-900" placeholder="数值" />
                                                            <span className="text-xs text-amber-600 font-bold">{stage.promotionMethod === 'ratio' ? '%' : stage.promotionMethod === 'score' ? '分' : '人'}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Award Rule for Final/Single Stage
                                                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4">
                                                        <div className="flex justify-between items-center mb-3">
                                                            <label className="text-xs font-bold text-amber-700 flex items-center"><Award size={14} className="mr-1.5"/> 奖项设置</label>
                                                            <select value={stage.awardRule} onChange={(e) => updateStage(idx, 'awardRule', e.target.value)} className="bg-white border border-amber-200 text-amber-900 text-[10px] rounded px-2 py-1 outline-none font-bold">
                                                                <option value="ratio">统一规则：按比例 (%)</option>
                                                                <option value="count">统一规则：按人数</option>
                                                                <option value="score">统一规则：按分数线</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {stage.awards?.map((award: any, aIdx: number) => (
                                                                <div key={aIdx} className="flex gap-2 items-center">
                                                                    <div className="bg-white border border-amber-200 rounded-lg px-2 py-1.5 text-xs font-bold text-amber-600 w-8 text-center">{aIdx + 1}</div>
                                                                    <input placeholder="奖项名称 (如: 一等奖)" value={award.name} onChange={(e) => updateAward(idx, aIdx, 'name', e.target.value)} className="flex-1 bg-white border border-amber-200 rounded-lg p-2 text-xs font-bold outline-none text-amber-900" />
                                                                    <input placeholder={stage.awardRule === 'ratio' ? '比例 %' : stage.awardRule === 'score' ? '分数线' : '人数'} value={award.value} onChange={(e) => updateAward(idx, aIdx, 'value', e.target.value)} className="w-24 bg-white border border-amber-200 rounded-lg p-2 text-xs font-bold outline-none text-amber-900" />
                                                                    <button onClick={() => removeAward(idx, aIdx)} className="p-2 bg-white border border-amber-200 rounded-lg text-amber-600 hover:bg-amber-100"><Trash2 size={12}/></button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <button onClick={() => addAward(idx)} className="mt-3 text-xs font-bold text-amber-700 flex items-center hover:underline"><PlusCircle size={12} className="mr-1"/> 添加奖项</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Step 4: Details Page Decoration */}
                    <section>
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center">
                            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs mr-2">4</span>
                            详情页装修
                        </h3>
                        
                        <div className="space-y-6">
                            {/* Banner Upload */}
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-2">顶部 Banner</label>
                                <div onClick={() => fileInputRef.current?.click()} className="w-full h-32 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 cursor-pointer hover:bg-stone-100 transition-colors relative overflow-hidden">
                                    {compData.detailConfig?.banner ? (
                                        <div className="relative w-full h-full">
                                            <img src={compData.detailConfig.banner} className="w-full h-full object-cover" />
                                            <button 
                                                onClick={(e) => {e.stopPropagation(); setCompData({...compData, detailConfig: {...compData.detailConfig, banner: ''}});}}
                                                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <ImageIcon size={24} className="mb-2 opacity-50" />
                                            <span className="text-xs font-bold">点击上传 Banner (16:9)</span>
                                        </>
                                    )}
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleBannerUpload} />
                            </div>

                            {/* Content Mode Switcher */}
                            <div>
                                <label className="block text-xs font-bold text-stone-500 mb-2">介绍内容模式</label>
                                <div className="flex bg-stone-50 p-1 rounded-xl border border-stone-200 w-fit">
                                    <button 
                                        onClick={() => setCompData({...compData, detailConfig: {...compData.detailConfig, mode: 'richtext'}})}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center ${compData.detailConfig.mode === 'richtext' ? 'bg-white text-[#7f1d1d] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                                    >
                                        <Type size={14} className="mr-1.5"/> 富文本编辑器
                                    </button>
                                    <button 
                                        onClick={() => setCompData({...compData, detailConfig: {...compData.detailConfig, mode: 'modular'}})}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center ${compData.detailConfig.mode === 'modular' ? 'bg-white text-[#7f1d1d] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                                    >
                                        <Layout size={14} className="mr-1.5"/> 图文模块化
                                    </button>
                                </div>
                            </div>

                            {/* Editor Area */}
                            {compData.detailConfig.mode === 'richtext' ? (
                                <div className="border border-stone-200 rounded-xl overflow-hidden">
                                    <div className="bg-stone-50 border-b border-stone-200 p-2 flex gap-2">
                                        <button className="p-1.5 hover:bg-stone-200 rounded text-stone-600"><Bold size={14}/></button>
                                        <button className="p-1.5 hover:bg-stone-200 rounded text-stone-600"><Italic size={14}/></button>
                                        <div className="w-px bg-stone-300 mx-1"></div>
                                        <button className="p-1.5 hover:bg-stone-200 rounded text-stone-600"><List size={14}/></button>
                                        <button className="p-1.5 hover:bg-stone-200 rounded text-stone-600"><AlignLeft size={14}/></button>
                                    </div>
                                    <textarea 
                                        value={compData.detailConfig.richTextContent}
                                        onChange={(e) => setCompData({...compData, detailConfig: {...compData.detailConfig, richTextContent: e.target.value}})}
                                        className="w-full h-48 p-4 text-sm outline-none resize-none"
                                        placeholder="在此输入赛事详细介绍..."
                                    ></textarea>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {compData.detailConfig.modules?.map((mod: any, idx: number) => (
                                        <div key={mod.id} className="border border-stone-200 rounded-xl p-4 bg-white relative group">
                                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <button onClick={() => removeDetailModule(mod.id)} className="p-1.5 bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded"><Trash2 size={14}/></button>
                                            </div>
                                            
                                            <div className="mb-2 text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center">
                                                {mod.type === 'text' ? <Type size={12} className="mr-1"/> : mod.type === 'image' ? <ImageIcon size={12} className="mr-1"/> : <Video size={12} className="mr-1"/>}
                                                {mod.type === 'text' ? '文本模块' : mod.type === 'image' ? '图片模块' : '视频模块'}
                                            </div>

                                            {mod.type === 'text' ? (
                                                <textarea 
                                                    value={mod.content}
                                                    onChange={(e) => updateDetailModule(mod.id, 'content', e.target.value)}
                                                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm outline-none focus:border-[#7f1d1d]"
                                                    placeholder="输入文本内容..."
                                                    rows={3}
                                                ></textarea>
                                            ) : (
                                                <div className="flex gap-4">
                                                    <div className="w-24 h-24 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-center text-stone-400 flex-shrink-0">
                                                        {mod.type === 'image' ? <ImageIcon size={24}/> : <Video size={24}/>}
                                                    </div>
                                                    <div className="flex-1">
                                                        <input 
                                                            value={mod.url}
                                                            onChange={(e) => updateDetailModule(mod.id, 'url', e.target.value)}
                                                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-[#7f1d1d] mb-2"
                                                            placeholder={mod.type === 'image' ? "输入图片链接" : "输入视频链接 (MP4)"}
                                                        />
                                                        <button className="text-xs font-bold text-[#7f1d1d] flex items-center">
                                                            <UploadCloud size={12} className="mr-1"/> 上传文件
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="flex gap-2 justify-center py-4 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                                        <button onClick={() => addDetailModule('text')} className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:border-[#7f1d1d] hover:text-[#7f1d1d] flex items-center transition-colors">
                                            <Type size={14} className="mr-1"/> 添加文本
                                        </button>
                                        <button onClick={() => addDetailModule('image')} className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:border-[#7f1d1d] hover:text-[#7f1d1d] flex items-center transition-colors">
                                            <ImageIcon size={14} className="mr-1"/> 添加图片
                                        </button>
                                        <button onClick={() => addDetailModule('video')} className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:border-[#7f1d1d] hover:text-[#7f1d1d] flex items-center transition-colors">
                                            <Video size={14} className="mr-1"/> 添加视频
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-stone-100 flex justify-end bg-white rounded-b-3xl gap-3">
                <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 text-sm transition-colors">取消</button>
                <button onClick={() => onSave(compData, true)} className="px-6 py-2.5 rounded-xl bg-stone-100 text-stone-600 font-bold hover:bg-stone-200 text-sm transition-colors border border-stone-200 flex items-center">
                    <FileText size={14} className="mr-2"/> 存为草稿
                </button>
                <button onClick={() => onSave(compData, false)} className="px-8 py-2.5 rounded-xl bg-[#7f1d1d] text-white font-bold shadow-lg shadow-red-900/20 hover:bg-[#991b1b] text-sm transition-colors flex items-center">
                    <Save size={14} className="mr-2"/> 确认发布
                </button>
            </div>
        </div>

        {/* Map Modal */}
        {showMapModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl h-[500px] flex flex-col overflow-hidden shadow-2xl relative">
                    <div className="absolute top-4 right-4 z-10 bg-white rounded-full shadow-md">
                        <button onClick={() => setShowMapModal(false)} className="p-2 text-stone-500 hover:text-stone-800"><X size={20}/></button>
                    </div>
                    <div className="flex-1 bg-stone-100 relative cursor-crosshair group" onClick={handleMapSelect}>
                        {/* Mock Map Background */}
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'radial-gradient(#78716c 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-bold pointer-events-none">
                            <MapPin size={48} className="mb-2 opacity-50"/>
                            <span>点击地图任意位置选择坐标</span>
                        </div>
                        {/* Fake Map Elements */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-stone-300 rounded-full opacity-30"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-full h-2 bg-stone-300 transform -rotate-12 opacity-30"></div>
                    </div>
                    <div className="p-4 border-t border-stone-200 bg-white">
                        <p className="text-xs text-stone-500">提示：点击地图可直接获取经纬度并填入表单。</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default CompetitionEditor;
