
import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Award, FileBadge, GitMerge, Zap, ChevronDown, ChevronUp, CheckCircle2, XCircle, Lock, ChevronRight } from 'lucide-react';
import Header from '../components/Header';

const StudentScoreTimeline: React.FC = () => {
  const { studentId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'individual';
  const navigate = useNavigate();

  // Mock Data
  const studentName = studentId === '1' || studentId === 'student_self' ? '王小明' : studentId === 't1' ? '飞跃梦想队' : '李小红';
  
  const rawScores = [
      { id: 1, competition: '第五届“讲好中国故事”演讲大赛', stage: '市级初赛', score: '92.5', rank: '一等奖', status: 'promoted', date: '2025-04-15', hasCertificate: true, compId: '1' },
      { id: 2, competition: '第五届“讲好中国故事”演讲大赛', stage: '省级复赛', score: '89.0', rank: '二等奖', status: 'promoted', date: '2025-07-20', hasCertificate: true, compId: '1' },
      { id: 6, competition: '第五届“讲好中国故事”演讲大赛', stage: '全国总决赛', score: '95.5', rank: '特等奖', status: 'awarded', date: '2025-10-01', hasCertificate: true, compId: '1' },
      { id: 3, competition: '经典诗文诵读大赛', stage: '初赛', score: '88.5', rank: '三等奖', status: 'completed', date: '2025-06-10', hasCertificate: true, compId: '2' },
      { id: 4, competition: '青少年主持人大赛', stage: '初赛', score: '78.0', rank: '未晋级', status: 'eliminated', date: '2025-05-20', hasCertificate: false, compId: '3' },
  ];

  // Group by Competition
  const groupedScores: Record<string, any> = {};
  rawScores.forEach(score => {
      if (!groupedScores[score.competition]) {
          groupedScores[score.competition] = {
              name: score.competition,
              id: score.compId,
              stages: []
          };
      }
      groupedScores[score.competition].stages.push(score);
  });

  const competitionGroups = Object.values(groupedScores).sort((a, b) => {
      // Sort by latest stage date
      const dateA = a.stages[a.stages.length - 1].date;
      const dateB = b.stages[b.stages.length - 1].date;
      return dateB.localeCompare(dateA);
  });

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title={`${studentName} 的成绩`} />
      
      <div className="p-5 flex-1 overflow-y-auto pb-20 animate-slide-up">
          {/* Header Card */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center mb-6">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mr-4 border border-stone-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${studentName}&background=random`} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-stone-800">{studentName}</h3>
                    <p className="text-xs text-stone-500">累计参赛 {rawScores.length} 场次</p>
                </div>
          </div>

          <div className="space-y-6">
              {competitionGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                      <div className="bg-stone-50/50 p-4 border-b border-stone-50 flex items-center justify-between">
                          <h3 className="font-bold text-stone-800 text-sm font-serif">{group.name}</h3>
                          {group.stages.length > 1 ? (
                              <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded border border-purple-100 flex items-center">
                                  <GitMerge size={10} className="mr-1"/> 晋级赛
                              </span>
                          ) : (
                              <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100 flex items-center">
                                  <Zap size={10} className="mr-1"/> 单项赛
                              </span>
                          )}
                      </div>
                      
                      <div className="p-4 space-y-6">
                          {group.stages.map((stage: any, idx: number) => {
                              const isLast = idx === group.stages.length - 1;
                              return (
                                  <div key={idx} className="relative pl-6 group cursor-pointer" onClick={() => navigate(`/score/${stage.id}`)}>
                                      {/* Connector Line */}
                                      {!isLast && <div className="absolute left-[7px] top-3 bottom-[-24px] w-0.5 bg-stone-100 group-hover:bg-stone-200 transition-colors"></div>}
                                      
                                      <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white ${stage.status === 'awarded' ? 'border-amber-500 text-amber-500' : stage.status === 'eliminated' ? 'border-stone-300 text-stone-400' : 'border-primary text-primary'}`}>
                                          {stage.status === 'awarded' ? <Award size={10} /> : stage.status === 'eliminated' ? <XCircle size={10} /> : <CheckCircle2 size={10} />}
                                      </div>

                                      <div className="flex justify-between items-center bg-white hover:bg-stone-50 p-2 -ml-2 rounded-lg transition-colors border border-transparent hover:border-stone-100">
                                          <div>
                                              <div className="flex items-center gap-2 mb-1">
                                                  <span className="text-sm font-bold text-stone-700">{stage.stage}</span>
                                                  <span className="text-[10px] text-stone-400">{stage.date}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                  {stage.status === 'promoted' && <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">晋级</span>}
                                                  {stage.status === 'eliminated' && <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded">未晋级</span>}
                                                  {stage.status === 'awarded' && <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded flex items-center"><Award size={10} className="mr-1"/>{stage.rank}</span>}
                                                  {stage.status === 'completed' && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{stage.rank}</span>}
                                              </div>
                                          </div>
                                          
                                          <div className="text-right flex items-center gap-3">
                                              <div>
                                                  <div className="flex items-end justify-end gap-1">
                                                      <span className="text-lg font-black text-stone-800 font-serif leading-none">{stage.score}</span>
                                                      <span className="text-[10px] text-stone-400 mb-0.5">分</span>
                                                  </div>
                                              </div>
                                              <ChevronRight size={16} className="text-stone-300" />
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              ))}
              
              {competitionGroups.length === 0 && (
                  <div className="text-center py-10 text-stone-400 text-sm">暂无参赛记录</div>
              )}
          </div>
      </div>
    </div>
  );
};

export default StudentScoreTimeline;
