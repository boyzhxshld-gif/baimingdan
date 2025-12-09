
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Clock, Calendar, Eye, Video, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';

const StudentWorks: React.FC = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const studentName = studentId === '1' || studentId === 'student_self' ? '王小明' : studentId === 't1' ? '飞跃梦想队' : '李小红';
  
  const works = [
      { 
          id: 1, 
          title: '初赛演讲视频-我的家乡', 
          competition: '第五届“讲好中国故事”演讲大赛', 
          stage: '初赛',
          uploadDate: '2025-04-10',
          duration: '03:45',
          status: '已提交',
          views: 128,
          cover: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600&auto=format&fit=crop&q=60'
      },
      { 
          id: 2, 
          title: '复赛模拟主持-校园新闻', 
          competition: '“金话筒”青少年主持人大赛', 
          stage: '复赛',
          uploadDate: '2025-11-14',
          duration: '04:20',
          status: '评审中',
          views: 56,
          cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=60'
      },
      { 
          id: 3, 
          title: '英语演讲-My Dream', 
          competition: '21世纪杯英语演讲比赛', 
          stage: '初赛',
          uploadDate: '2025-09-01',
          duration: '02:50',
          status: '已提交',
          views: 89,
          cover: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60'
      }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title={`${studentName} 的作品`} />
      
      <div className="p-5 flex-1 overflow-y-auto pb-20 animate-slide-up">
          {/* Header Card */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center mb-6">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mr-4 border border-stone-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${studentName}&background=random`} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-stone-800">{studentName}</h3>
                    <p className="text-xs text-stone-500">共上传 {works.length} 个作品</p>
                </div>
          </div>

          <div className="space-y-5">
              {works.map(work => (
                  <div key={work.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
                      <div className="w-full aspect-video bg-black relative">
                          <img src={work.cover} alt={work.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Play size={20} className="text-white ml-1" fill="currentColor" />
                              </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-medium backdrop-blur-sm">
                              {work.duration}
                          </div>
                          <div className="absolute top-2 left-2">
                              <span className={`text-[9px] px-2 py-1 rounded font-bold backdrop-blur-md shadow-sm ${work.status === '评审中' ? 'bg-primary/80 text-white' : 'bg-white/80 text-stone-700'}`}>
                                  {work.status}
                              </span>
                          </div>
                      </div>
                      
                      <div className="p-4">
                          <h3 className="font-bold text-stone-800 text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">{work.title}</h3>
                          <p className="text-xs text-stone-500 mb-3 line-clamp-1">{work.competition} · {work.stage}</p>
                          
                          <div className="flex items-center justify-between text-[10px] text-stone-400 pt-3 border-t border-stone-50">
                              <div className="flex items-center space-x-3">
                                  <span className="flex items-center"><Calendar size={12} className="mr-1"/> {work.uploadDate}</span>
                                  <span className="flex items-center"><Eye size={12} className="mr-1"/> {work.views}</span>
                              </div>
                              <div className="flex items-center font-bold text-stone-500 group-hover:text-primary">
                                  查看详情
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
              
              {works.length === 0 && (
                  <div className="text-center py-10 text-stone-400 text-sm">暂无作品记录</div>
              )}
          </div>
      </div>
    </div>
  );
};

export default StudentWorks;
