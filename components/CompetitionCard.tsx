
import React from 'react';
import { Clock, ChevronRight, GitMerge, Zap, CheckCircle2 } from 'lucide-react';
import { Competition } from '../types';
import { useNavigate } from 'react-router-dom';

interface CompetitionCardProps {
  competition: Competition & { 
      structure?: 'promotion' | 'single'; 
      isRegistered?: boolean; 
      feeType?: 'free' | 'paid'; 
      imageUrl?: string; 
      levels?: string[] 
  };
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
  const navigate = useNavigate();
  
  // Parse date for display
  const deadlineDate = new Date(competition.deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  // Category Translation Map
  const categoryMap: Record<string, string> = {
      'speech': '演讲',
      'reading': '朗诵',
      'host': '主持',
      'english': '英语',
      'drama': '戏剧',
      'debate': '辩论',
      'interview': '采访',
      'commentary': '解说',
      'crosstalk': '相声',
      'ai': '语言科技'
  };

  const levelStyles: Record<string, { label: string, style: string }> = {
      'primary': { label: '小学组', style: 'bg-green-600/90 text-white border-green-700' },
      'junior': { label: '初中组', style: 'bg-blue-600/90 text-white border-blue-700' },
      'senior': { label: '高中/职高', style: 'bg-indigo-600/90 text-white border-indigo-700' },
      'vocational': { label: '职高组', style: 'bg-slate-600/90 text-white border-slate-700' }
  };

  const handleCardClick = () => {
    navigate(`/competition/${competition.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop bubbling to prevent double navigation if parent is clickable (though here it's fine)
    navigate(`/competition/${competition.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-card border border-stone-100 mb-4 cursor-pointer group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
    >
      {/* Image Banner Area */}
      <div className="h-32 w-full relative overflow-hidden">
          {competition.imageUrl ? (
              <img src={competition.imageUrl} alt={competition.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
              <div className="w-full h-full bg-stone-200"></div>
          )}
          
          {/* Level Badge on Top Left */}
          <div className="absolute top-0 left-0 p-2 flex flex-col gap-1">
             {competition.levels?.map(level => {
                 const config = levelStyles[level] || { label: level, style: 'bg-stone-600 text-white' };
                 return (
                     <span key={level} className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm border ${config.style} backdrop-blur-sm`}>
                         {config.label}
                     </span>
                 );
             })}
          </div>

          {/* Status Badge Top Right */}
          <div className="absolute top-2 right-2 flex space-x-1">
               {competition.isRegistered && (
                   <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center shadow-sm border border-primary-light">
                       <CheckCircle2 size={10} className="mr-1"/> 已报名
                   </span>
               )}
          </div>
      </div>

      <div className="p-4 pt-3">
          {/* Title Moved Here */}
          <h3 className="font-bold text-lg text-stone-800 leading-tight mb-1.5 font-serif group-hover:text-primary transition-colors">{competition.title}</h3>
          
          {/* Date Info Moved Here */}
          <div className="flex items-center text-xs text-stone-400 mb-3 font-medium">
             <Clock size={12} className="mr-1" />
             <span>截止: {competition.deadline}</span>
             <span className="mx-2 text-stone-300">|</span>
             <span className={daysLeft < 7 ? "text-amber-600 font-bold" : "text-stone-500"}>
                 {daysLeft > 0 ? `${daysLeft}天后截止` : '已截止'}
             </span>
          </div>

          {/* Tags (Category, Structure) */}
          <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-stone-50 text-stone-600 px-2 py-1 rounded text-xs font-bold border border-stone-200">
                  {categoryMap[competition.category] || competition.category}
              </span>
              {competition.structure === 'promotion' ? (
                  <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-bold border border-purple-100 flex items-center">
                      <GitMerge size={10} className="mr-1"/> 晋级赛
                  </span>
               ) : (
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-100 flex items-center">
                      <Zap size={10} className="mr-1"/> 单项赛
                  </span>
               )}
          </div>

          <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
              {competition.description}
          </p>

          <div className="flex items-center justify-between border-t border-stone-50 pt-3">
              <span className={`text-xs font-bold ${competition.feeType === 'free' ? 'text-green-600' : 'text-amber-600'}`}>
                  {competition.feeType === 'free' ? '公益免费' : '收费赛事'}
              </span>
              <div 
                onClick={handleButtonClick}
                className="flex items-center text-primary text-xs font-bold group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                  查看详情 <ChevronRight size={14} className="ml-0.5" />
              </div>
          </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
