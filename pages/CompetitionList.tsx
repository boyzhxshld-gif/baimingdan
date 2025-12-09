
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronLeft, Filter } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CompetitionCard from '../components/CompetitionCard';

const CompetitionList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter');
  const initialSearch = searchParams.get('search');
  const initialLevel = searchParams.get('level');

  const filterMap: Record<string, string> = {
    'speech': '演讲',
    'reading': '朗诵',
    'host': '主持',
    'drama': '戏剧',
    'english': '英语'
  };

  const [activeFilter, setActiveFilter] = useState(initialFilter ? (filterMap[initialFilter] || '全部') : '全部');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showUnregisteredOnly, setShowUnregisteredOnly] = useState(false);

  const [filters, setFilters] = useState({
      fee: 'all',
      structure: 'all',
      level: initialLevel || 'all'
  });
  
  const competitions: any[] = [
    {
      id: '1',
      title: '第五届“讲好中国故事”演讲大赛',
      description: '讲述身边的感人故事，传递正能量，展现新时代少年风采。',
      deadline: '2025-10-25',
      category: 'speech',
      type: '演讲',
      structure: 'promotion', 
      isRegistered: true, 
      feeType: 'free',
      levels: ['primary', 'junior', 'senior'],
      imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      title: '经典诗文诵读大赛',
      description: '传承中华优秀传统文化，诵读经典，感受文字的力量。',
      deadline: '2025-11-10',
      category: 'reading',
      type: '朗诵',
      structure: 'single', 
      isRegistered: true,
      feeType: 'free',
      levels: ['primary'],
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: '3',
      title: '青少年主持人大赛',
      description: '展现自我风采，我在舞台中央，寻找下一个金话筒。',
      deadline: '2025-12-01',
      category: 'host',
      type: '主持',
      structure: 'promotion',
      feeType: 'free',
      isRegistered: false,
      levels: ['primary', 'junior'],
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80'
    },
    {
        id: '4',
        title: '“未来之星”英语风采大赛',
        description: '用英语讲好中国故事，展示国际视野，连接世界。',
        deadline: '2025-12-15',
        category: 'english',
        type: '英语',
        structure: 'promotion',
        isRegistered: true, 
        feeType: 'free',
        levels: ['primary', 'junior', 'senior'],
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80'
    },
    {
        id: '10',
        title: '童话剧独白表演赛',
        description: '发挥想象力，用声音演绎经典童话角色。',
        deadline: '2025-11-20',
        category: 'drama',
        type: '戏剧',
        structure: 'single',
        isRegistered: false,
        feeType: 'free',
        levels: ['primary'],
        imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const filterTabs = ['全部', '演讲', '朗诵', '主持', '戏剧', '英语'];

  const filteredCompetitions = competitions.filter(comp => {
    let matchesTab = true;
    if (activeFilter !== '全部') {
        matchesTab = comp.type === activeFilter;
    }
    const matchesSearch = comp.title.includes(searchQuery) || comp.description.includes(searchQuery);
    const matchesStatus = showUnregisteredOnly ? !comp.isRegistered : true;
    const matchesFee = filters.fee === 'all' || comp.feeType === filters.fee;
    const matchesStructure = filters.structure === 'all' || comp.structure === filters.structure;
    const matchesLevel = filters.level === 'all' || (comp.levels && comp.levels.includes(filters.level));

    return matchesTab && matchesSearch && matchesFee && matchesStructure && matchesLevel && matchesStatus;
  });

  const resetFilters = () => {
      setFilters({ fee: 'all', structure: 'all', level: 'all' });
      setShowUnregisteredOnly(false);
      setActiveFilter('全部');
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 relative">
       {/* Top Search Bar */}
       <div className="px-5 py-3 sticky top-0 glass z-30 shadow-sm mt-0 border-b border-stone-200">
         <div className="flex items-center space-x-3 mb-3">
            <button 
                onClick={() => navigate(-1)} 
                className="p-2 -ml-2 rounded-full hover:bg-stone-100 transition-colors"
            >
                <ChevronLeft size={24} className="text-stone-600" />
            </button>
            <div className="flex-1 relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索赛事名称"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-100 border-none text-sm text-stone-700 placeholder-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              />
              <div className="absolute left-0 top-0 bottom-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-stone-400 group-focus-within:text-primary transition-colors" />
              </div>
            </div>
            
            <button 
                onClick={() => setShowFilterDrawer(true)}
                className={`border p-2.5 rounded-xl transition-colors shadow-sm active:scale-95 ${
                    (filters.fee !== 'all' || filters.structure !== 'all' || filters.level !== 'all')
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-primary'
                }`}
            >
              <SlidersHorizontal size={18} />
            </button>
         </div>
         
         {/* Horizontal Filter Scroll */}
         <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {filterTabs.map(filter => (
               <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                     activeFilter === filter 
                     ? 'bg-primary text-white shadow-md' 
                     : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
               >
                  {filter}
               </button>
            ))}
         </div>
      </div>

      <div className="p-5 pb-10 animate-slide-up">
        {/* Redesigned Header Area */}
        <div className="flex items-center justify-between mb-5 px-1 pt-2">
            <div className="flex items-center gap-3">
                 <h2 className="text-xl font-black text-stone-900 tracking-tight font-serif">
                     {showUnregisteredOnly ? '未报名的赛事' : (searchQuery ? '搜索结果' : '赛事列表')}
                 </h2>
                 {filters.level !== 'all' && (
                     <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-lg text-xs font-bold border border-primary/20">
                         {{'primary': '小学组', 'junior': '初中组', 'senior': '高中组'}[filters.level]}
                     </span>
                 )}
            </div>
            <div className="bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                <span className="text-[10px] text-stone-500 font-bold">
                    共 {filteredCompetitions.length} 项
                </span>
            </div>
        </div>
        
        {filteredCompetitions.length > 0 ? (
          <div className="space-y-4">
            {filteredCompetitions.map(comp => (
              <CompetitionCard key={comp.id} competition={comp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-400 flex flex-col items-center">
            <Search size={40} className="mb-3 opacity-20" />
            <p>未找到相关赛事</p>
            <button onClick={resetFilters} className="mt-3 text-primary text-xs font-bold">清空筛选条件</button>
          </div>
        )}
      </div>

      {/* Floating Action Button for Status Filter */}
      <button
        onClick={() => setShowUnregisteredOnly(!showUnregisteredOnly)}
        className={`fixed bottom-8 right-6 px-5 py-3 rounded-full shadow-lg font-bold text-sm flex items-center transition-all z-40 active:scale-95 ${
            showUnregisteredOnly 
            ? 'bg-stone-800 text-white ring-4 ring-stone-200' 
            : 'bg-white text-primary border border-primary/20 shadow-xl'
        }`}
      >
        <Filter size={16} className={`mr-2 ${showUnregisteredOnly ? 'text-white' : 'text-primary'}`} />
        {showUnregisteredOnly ? '显示全部' : '只看未报'}
      </button>

      {/* Filter Drawer */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowFilterDrawer(false)}></div>
             <div className="bg-white w-full max-w-md rounded-t-3xl relative z-10 animate-slide-up flex flex-col max-h-[80vh]">
                 <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
                      <h3 className="font-bold text-stone-800 font-serif">筛选赛事</h3>
                      <button onClick={() => setShowFilterDrawer(false)} className="p-2 bg-stone-50 rounded-full text-stone-400"><X size={20} /></button>
                 </div>
                 <div className="p-6 space-y-6 overflow-y-auto">
                     {/* Fee Type */}
                     <div>
                         <h4 className="text-xs font-bold text-stone-400 uppercase mb-3">费用类型</h4>
                         <div className="flex gap-3">
                             {['all', 'free', 'paid'].map(type => (
                                 <button
                                     key={type}
                                     onClick={() => setFilters({...filters, fee: type})}
                                     className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                         filters.fee === type 
                                         ? 'bg-primary text-white shadow-md' 
                                         : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                     }`}
                                 >
                                     {{'all': '全部', 'free': '免费', 'paid': '收费'}[type]}
                                 </button>
                             ))}
                         </div>
                     </div>

                     {/* Structure Type */}
                     <div>
                         <h4 className="text-xs font-bold text-stone-400 uppercase mb-3">赛制类型</h4>
                         <div className="flex gap-3">
                             {['all', 'single', 'promotion'].map(type => (
                                 <button
                                     key={type}
                                     onClick={() => setFilters({...filters, structure: type})}
                                     className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                         filters.structure === type 
                                         ? 'bg-primary text-white shadow-md' 
                                         : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                     }`}
                                 >
                                     {{'all': '全部', 'single': '单项赛', 'promotion': '晋级赛'}[type]}
                                 </button>
                             ))}
                         </div>
                     </div>

                     {/* Level Type */}
                     <div>
                         <h4 className="text-xs font-bold text-stone-400 uppercase mb-3">组别</h4>
                         <div className="grid grid-cols-3 gap-3">
                             {['all', 'primary', 'junior', 'senior'].map(type => (
                                 <button
                                     key={type}
                                     onClick={() => setFilters({...filters, level: type})}
                                     className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                                         filters.level === type 
                                         ? 'bg-primary text-white shadow-md' 
                                         : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                     }`}
                                 >
                                     {{'all': '全部', 'primary': '小学组', 'junior': '初中组', 'senior': '高中组'}[type]}
                                 </button>
                             ))}
                         </div>
                     </div>
                 </div>
                 <div className="p-5 border-t border-stone-50 flex gap-4">
                     <button 
                        onClick={resetFilters}
                        className="flex-1 py-3.5 rounded-2xl font-bold text-sm bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                     >
                         重置
                     </button>
                     <button 
                        onClick={() => setShowFilterDrawer(false)}
                        className="flex-[2] py-3.5 rounded-2xl font-bold text-sm bg-primary text-white shadow-lg shadow-red-900/20 hover:bg-primary-dark transition-colors"
                     >
                         确认筛选
                     </button>
                 </div>
             </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionList;
