
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, User, Clock, MapPin, Share2, MessageCircle, Star, Target, Zap, BookOpen, FileBadge, ChevronRight, Quote } from 'lucide-react';
import Header from '../components/Header';

const ScoreDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data with Themed Colors
  const scoreData = {
    competition: '第五届“讲好中国故事”演讲大赛',
    stage: '市级初赛',
    score: '92.5',
    rank: '一等奖',
    rankPercent: '前5%',
    student: '王小明',
    date: '2025-04-15',
    // Updated colors to match "Forbidden City" theme (Red, Amber, Stone, Muted Blue)
    dimensions: [
      { label: '内容主旨', score: 38, full: 40, color: 'text-primary', bg: 'bg-primary' },
      { label: '语言表达', score: 28, full: 30, color: 'text-amber-600', bg: 'bg-amber-600' },
      { label: '仪表风范', score: 18, full: 20, color: 'text-stone-600', bg: 'bg-stone-600' },
      { label: '综合效果', score: 8.5, full: 10, color: 'text-slate-500', bg: 'bg-slate-500' },
    ],
    comment: '选手发音标准，情感充沛，内容紧扣主题。在舞台表现力上还有提升空间，建议加强肢体语言的自然度，注意眼神与观众的交流。',
    teacher: '张评委',
    hasCertificate: true,
    certificateImage: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80' 
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title="成绩详情" />
      
      <div className="p-5 flex-1 overflow-y-auto animate-slide-up pb-10">
          {/* Main Score Card */}
          <div className="bg-white rounded-2xl shadow-card border border-stone-100 text-center relative overflow-hidden mb-6 group">
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-amber-600"></div>
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-stone-50 rounded-full z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
              
              <div className="relative z-10 p-6 pb-8">
                  <div className="mb-6">
                      <h2 className="text-lg font-black text-stone-800 leading-tight font-serif">{scoreData.competition}</h2>
                      <div className="text-xs font-bold text-stone-400 mt-1 uppercase tracking-widest">{scoreData.stage}</div>
                  </div>

                  <div className="flex justify-center items-baseline mb-6">
                      <span className="text-6xl font-black text-primary font-serif tracking-tighter drop-shadow-sm">{scoreData.score}</span>
                      <span className="text-xl text-stone-400 mb-1.5 ml-1 font-bold font-serif">分</span>
                  </div>

                  <div className="flex justify-center gap-3">
                      <div className="px-4 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold border border-amber-100 shadow-sm flex items-center">
                          <Award size={12} className="mr-1.5" />
                          {scoreData.rank}
                      </div>
                      <div className="px-4 py-1.5 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold border border-stone-200 shadow-sm">
                          排名 {scoreData.rankPercent}
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-stone-50/80 border-t border-stone-100 p-4 relative z-10 backdrop-blur-sm">
                   <div className="flex flex-col items-center border-r border-stone-200">
                       <span className="text-[10px] text-stone-400 mb-1 font-medium">参赛选手</span>
                       <div className="flex items-center font-bold text-stone-700 text-sm">
                           <User size={12} className="mr-1.5 opacity-60"/> {scoreData.student}
                       </div>
                   </div>
                   <div className="flex flex-col items-center">
                       <span className="text-[10px] text-stone-400 mb-1 font-medium">发布时间</span>
                       <div className="flex items-center font-bold text-stone-700 text-sm">
                           <Clock size={12} className="mr-1.5 opacity-60"/> {scoreData.date}
                       </div>
                   </div>
              </div>
          </div>

          {/* Dimension Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
              <h3 className="font-bold text-stone-800 text-sm mb-5 flex items-center font-serif">
                  <span className="w-1 h-4 bg-amber-500 rounded-full mr-2"></span>
                  得分维度分析
              </h3>
              <div className="space-y-5">
                  {scoreData.dimensions.map((dim, idx) => (
                      <div key={idx}>
                          <div className="flex justify-between items-end mb-2">
                              <span className="text-xs font-bold text-stone-600">{dim.label}</span>
                              <div className="text-xs font-medium">
                                  <span className={`font-black text-sm ${dim.color}`}>{dim.score}</span>
                                  <span className="text-stone-300 mx-0.5">/</span>
                                  <span className="text-stone-400">{dim.full}</span>
                              </div>
                          </div>
                          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className={`h-full rounded-full ${dim.bg} transition-all duration-1000 ease-out`} 
                                style={{ width: `${(dim.score / dim.full) * 100}%` }}
                              ></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Teacher Comment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6 relative">
              <div className="absolute top-6 right-6 text-stone-100">
                  <Quote size={40} fill="currentColor" />
              </div>
              <h3 className="font-bold text-stone-800 text-sm mb-4 flex items-center font-serif">
                  <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
                  评委评语
              </h3>
              <div className="relative z-10">
                  <p className="text-sm text-stone-600 leading-relaxed text-justify font-medium">
                      {scoreData.comment}
                  </p>
                  <div className="mt-4 pt-4 border-t border-stone-50 flex justify-end items-center">
                      <div className="flex items-center text-xs font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full">
                          <User size={12} className="mr-1.5" />
                          {scoreData.teacher}
                      </div>
                  </div>
              </div>
          </div>

          {/* Certificate Section */}
          {scoreData.hasCertificate && (
             <div className="bg-white rounded-2xl p-1 shadow-sm border border-stone-100 mb-6">
                <div 
                    onClick={() => navigate(`/certificate/${id}`)}
                    className="bg-stone-50 rounded-xl p-4 flex items-center justify-between cursor-pointer group hover:bg-stone-100 transition-colors"
                >
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-amber-500 mr-3 border border-stone-100 group-hover:scale-110 transition-transform">
                            <FileBadge size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-stone-800 text-sm">电子证书</div>
                            <div className="text-[10px] text-stone-400">已生成，点击查看或下载</div>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-stone-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
             </div>
          )}
      </div>

      <div className="p-4 bg-white/90 backdrop-blur-md border-t border-stone-100 flex space-x-4 safe-area-bottom">
          <button className="flex-1 py-3.5 bg-stone-100 rounded-2xl text-stone-600 font-bold text-sm flex items-center justify-center hover:bg-stone-200 transition-colors">
              <Share2 size={18} className="mr-2" /> 分享成绩
          </button>
          <button className="flex-1 py-3.5 bg-primary rounded-2xl text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-red-900/20 hover:bg-primary-dark transition-colors active:scale-95">
              <Award size={18} className="mr-2" /> 下载成绩单
          </button>
      </div>
    </div>
  );
};

export default ScoreDetail;
