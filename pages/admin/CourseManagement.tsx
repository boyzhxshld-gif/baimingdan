
import React, { useState } from 'react';
import { MonitorPlay, FileText, CreditCard, Plus, UploadCloud, Eye, Star, User, Settings, X, Video, Image as ImageIcon, Save } from 'lucide-react';

const CourseManagement: React.FC = () => {
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // Mock Data aligned with H5
  const courses = [
    { id: 1, title: '零基础学演讲：如何克服上台紧张', instructor: '张教授', role: '传媒大学教授', views: '5.2w', lessons: 12, type: 'free', status: '已上架', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=200&auto=format&fit=crop&q=60' },
    { id: 2, title: '经典古诗文诵读技巧与发声训练', instructor: '李老师', role: '国家一级演员', views: '3.8w', lessons: 8, type: 'premium', status: '已上架', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&auto=format&fit=crop&q=60' },
    { id: 3, title: '少年主持人风采展示与控场艺术', instructor: '王主持', role: '知名节目主持人', views: '2.5w', lessons: 15, type: 'free', status: '草稿', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=60' },
  ];

  const handleEdit = (course: any) => {
      setEditingCourse(course);
      setShowConfigDrawer(true);
  };

  const handleCreate = () => {
      setEditingCourse({ id: 0, title: '', instructor: '', role: '', type: 'free', status: '草稿', lessons: 0, image: '' });
      setShowConfigDrawer(true);
  };

  return (
    <div className="space-y-6 h-full flex flex-col relative">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">名师公开课管理</h1>
            <button 
                onClick={handleCreate}
                className="bg-[#7f1d1d] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#991b1b] flex items-center text-xs transition-colors"
            >
                <Plus size={16} className="mr-2" /> 发布新课程
            </button>
        </div>
        
        <div className="flex gap-6 h-full overflow-hidden">
            {/* Course List */}
            <div className="flex-[2] bg-white rounded-2xl shadow-sm border border-stone-200 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                    <h2 className="font-bold text-stone-800 flex items-center"><MonitorPlay size={18} className="mr-2 text-stone-400"/> 课程列表</h2>
                    <div className="flex gap-2">
                        <span className="text-xs font-bold text-stone-500 bg-white border border-stone-200 px-2 py-1 rounded cursor-pointer hover:text-[#7f1d1d]">全部</span>
                        <span className="text-xs font-bold text-stone-400 bg-white border border-stone-200 px-2 py-1 rounded cursor-pointer hover:text-[#7f1d1d]">已上架</span>
                        <span className="text-xs font-bold text-stone-400 bg-white border border-stone-200 px-2 py-1 rounded cursor-pointer hover:text-[#7f1d1d]">草稿箱</span>
                    </div>
                </div>
                
                <div className="flex-1 overflow-auto p-4 space-y-3">
                    {courses.map(course => (
                        <div key={course.id} onClick={() => handleEdit(course)} className="flex gap-4 p-4 rounded-xl border border-stone-100 hover:border-[#7f1d1d]/20 hover:bg-stone-50 transition-all group cursor-pointer bg-white shadow-sm">
                            <div className="w-32 h-20 bg-stone-200 rounded-lg overflow-hidden relative flex-shrink-0">
                                <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-0 left-0 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded-br font-bold">
                                    {course.type === 'free' ? '免费公益' : '精品课程'}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                <div>
                                    <h3 className="font-bold text-stone-800 text-sm line-clamp-1 group-hover:text-[#7f1d1d] transition-colors font-serif">{course.title}</h3>
                                    <div className="flex items-center text-xs text-stone-500 mt-1">
                                        <User size={12} className="mr-1" /> {course.instructor}
                                        <span className="mx-2 text-stone-300">|</span>
                                        <span className="bg-stone-100 px-1.5 rounded text-[10px]">{course.role}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-xs text-stone-400">
                                    <Eye size={12} className="mr-1" /> {course.views}
                                    <span className="mx-2 text-stone-300">•</span>
                                    <FileText size={12} className="mr-1" /> {course.lessons} 节课
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-between py-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${course.status === '已上架' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                    {course.status}
                                </span>
                                <button className="text-stone-400 hover:text-[#7f1d1d] transition-opacity">
                                    <Settings size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side Stats */}
            <div className="flex-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h3 className="font-bold text-stone-800 mb-4 flex items-center text-sm font-serif"><Star size={16} className="mr-2 text-amber-500"/> 热门讲师</h3>
                    <div className="space-y-4">
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden mr-3">
                                        <img src={`https://ui-avatars.com/api/?name=Teacher${i}&background=random`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-xs">
                                        <div className="font-bold text-stone-800">张教授</div>
                                        <div className="text-stone-400">传媒大学</div>
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-[#7f1d1d]">9.8分</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#1c1917] p-6 rounded-2xl shadow-lg text-white">
                    <h3 className="font-bold mb-4 flex items-center text-sm"><MonitorPlay size={16} className="mr-2 text-stone-400"/> 观看数据</h3>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-3xl font-black font-serif">12.5w</span>
                        <span className="text-green-400 text-xs font-bold mb-1">+15% 本周</span>
                    </div>
                    <div className="text-xs text-stone-500">累计播放次数</div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between">
                        <div>
                            <div className="text-lg font-bold">1,024</div>
                            <div className="text-[10px] text-stone-500">今日播放</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold">85%</div>
                            <div className="text-[10px] text-stone-500">完播率</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Configuration Drawer */}
        {showConfigDrawer && editingCourse && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setShowConfigDrawer(false)}></div>
                <div className="bg-white w-[600px] h-full shadow-2xl relative z-10 animate-slide-left flex flex-col border-l border-stone-200">
                    <div className="h-16 border-b border-stone-100 flex items-center justify-between px-6 bg-stone-50">
                        <h2 className="text-lg font-bold text-stone-800 font-serif">配置课程</h2>
                        <button onClick={() => setShowConfigDrawer(false)} className="text-stone-400 hover:text-stone-600"><X size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">基础信息</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-xs font-bold text-stone-500 mb-1 block">课程标题</label>
                                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none" defaultValue={editingCourse.title} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-stone-500 mb-1 block">讲师姓名</label>
                                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none" defaultValue={editingCourse.instructor} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-stone-500 mb-1 block">讲师头衔</label>
                                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none" defaultValue={editingCourse.role} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-stone-500 mb-1 block">课程类型</label>
                                    <select className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none" defaultValue={editingCourse.type}>
                                        <option value="free">免费公益</option>
                                        <option value="premium">精品课程</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-stone-500 mb-1 block">状态</label>
                                    <select className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold outline-none" defaultValue={editingCourse.status}>
                                        <option>草稿</option>
                                        <option>已上架</option>
                                        <option>已下架</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-stone-500 mb-1 block">课程封面</label>
                                <div className="w-full h-32 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 cursor-pointer hover:bg-stone-100">
                                    <ImageIcon size={24} className="mb-2" />
                                    <span className="text-xs font-bold">点击上传封面图</span>
                                </div>
                            </div>
                        </div>

                        {/* Chapters */}
                        <div className="space-y-4 pt-4 border-t border-stone-100">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">章节管理</h3>
                                <button className="text-[#7f1d1d] text-xs font-bold flex items-center"><Plus size={14} className="mr-1"/> 添加章节</button>
                            </div>
                            
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-center justify-between group">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 text-stone-400 shadow-sm font-serif">{i}</div>
                                            <div>
                                                <div className="text-sm font-bold text-stone-700">章节标题示例 {i}</div>
                                                <div className="text-[10px] text-stone-400 flex items-center mt-0.5"><Video size={10} className="mr-1"/> 15:00</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-blue-600 bg-blue-50 p-1.5 rounded"><UploadCloud size={14} /></button>
                                            <button className="text-red-600 bg-red-50 p-1.5 rounded"><X size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
                        <button onClick={() => setShowConfigDrawer(false)} className="px-6 py-3 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm">取消</button>
                        <button onClick={() => setShowConfigDrawer(false)} className="px-6 py-3 rounded-xl bg-[#7f1d1d] text-white font-bold text-sm flex items-center shadow-lg"><Save size={16} className="mr-2"/> 保存配置</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default CourseManagement;
