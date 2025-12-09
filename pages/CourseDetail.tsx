
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Lock, Clock, BookOpen, Star, Share2, CheckCircle2, ChevronDown, MonitorPlay, Maximize, Gauge, RotateCcw } from 'lucide-react';
import Header from '../components/Header';

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('catalogue');
  const [showResumeToast, setShowResumeToast] = useState(true);

  // Mock Data
  const course = {
      title: '零基础学演讲：如何克服上台紧张',
      instructor: '张教授',
      role: '传媒大学教授',
      description: '本课程专为零基础学员设计，从心理建设到实战技巧，全方位解析演讲的奥秘。通过系统的训练，帮助孩子克服怯场心理，自信表达。',
      lessons: [
          { id: 1, title: '先导课：为什么我们害怕演讲？', duration: '10:00', isFree: true, isWatched: true },
          { id: 2, title: '第一讲：建立自信的三个法宝', duration: '15:30', isFree: true, isWatched: false },
          { id: 3, title: '第二讲：如何准备一篇精彩的演讲稿', duration: '18:45', isFree: false, isWatched: false },
          { id: 4, title: '第三讲：声音的魅力与运用', duration: '20:00', isFree: false, isWatched: false },
          { id: 5, title: '第四讲：肢体语言的艺术', duration: '16:20', isFree: false, isWatched: false },
          { id: 6, title: '第五讲：眼神交流与互动技巧', duration: '14:50', isFree: false, isWatched: false },
      ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title="课程详情" />
      
      {/* Video Player Simulator */}
      <div className="w-full aspect-video bg-black relative group cursor-pointer overflow-hidden">
          <img 
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1000&auto=format&fit=crop&q=60" 
              alt="Course Cover" 
              className="w-full h-full object-cover opacity-60"
          />
          
          {/* Resume Toast */}
          {showResumeToast && (
              <div className="absolute left-4 top-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center animate-fade-in z-20 border border-white/10">
                  <RotateCcw size={12} className="mr-1.5" />
                  上次观看到 05:20，点击恢复
                  <button onClick={(e) => {e.stopPropagation(); setShowResumeToast(false);}} className="ml-2 text-white/50 hover:text-white"><span className="text-[10px]">✕</span></button>
              </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border border-white/30">
                 <Play size={32} className="text-white ml-1" fill="currentColor" />
             </div>
          </div>
          
          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-primary relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow"></div>
                  </div>
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center space-x-3">
                      <Play size={16} fill="currentColor"/>
                      <span>05:20 / 10:00</span>
                  </div>
                  <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-white/20 px-2 py-0.5 rounded hover:bg-white/30 transition-colors cursor-pointer">
                          <Gauge size={12} className="mr-1" /> 1.0x
                      </div>
                      <Maximize size={16} className="cursor-pointer hover:scale-110 transition-transform" />
                  </div>
              </div>
          </div>
          
          <div className="absolute bottom-16 left-4 text-white pointer-events-none group-hover:opacity-0 transition-opacity">
              <span className="bg-primary text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block shadow-sm border border-white/20">免费试听</span>
              <p className="text-sm font-medium drop-shadow-md">先导课：为什么我们害怕演讲？</p>
          </div>
      </div>

      {/* Info Card */}
      <div className="bg-white p-5 border-b border-stone-100">
          <h1 className="text-lg font-black text-stone-800 mb-2 leading-tight font-serif">{course.title}</h1>
          <div className="flex items-center text-xs text-stone-500 mb-4 font-medium">
              <span className="flex items-center mr-4"><MonitorPlay size={14} className="mr-1"/> 共{course.lessons.length}节</span>
              <span className="flex items-center mr-4"><Clock size={14} className="mr-1"/> 120分钟</span>
              <span className="flex items-center"><Star size={14} className="mr-1 text-amber-500 fill-amber-500"/> 4.9分</span>
          </div>
          
          <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-100">
              <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden mr-3 border border-white shadow-sm">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                  </div>
                  <div>
                      <div className="text-sm font-bold text-stone-800">{course.instructor}</div>
                      <div className="text-xs text-stone-500">{course.role}</div>
                  </div>
              </div>
              <button className="text-primary text-xs font-bold border border-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors">
                  + 关注
              </button>
          </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-100 sticky top-14 bg-white z-20">
          <button 
             onClick={() => setActiveTab('catalogue')}
             className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'catalogue' ? 'text-primary' : 'text-stone-500 hover:text-stone-700'}`}
          >
             课程目录
             {activeTab === 'catalogue' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>}
          </button>
          <button 
             onClick={() => setActiveTab('intro')}
             className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'intro' ? 'text-primary' : 'text-stone-500 hover:text-stone-700'}`}
          >
             课程介绍
             {activeTab === 'intro' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>}
          </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-5 pb-24">
          {activeTab === 'catalogue' ? (
              <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center justify-between group cursor-pointer p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-100">
                          <div className="flex items-center flex-1">
                              <div className="text-stone-300 font-black text-lg mr-4 w-6 text-center font-serif italic">{index + 1}</div>
                              <div className="flex-1">
                                  <h3 className={`text-sm font-bold mb-1 ${lesson.isWatched ? 'text-primary' : 'text-stone-700'}`}>
                                      {lesson.title}
                                  </h3>
                                  <div className="text-[10px] text-stone-400 flex items-center">
                                      <Clock size={10} className="mr-1" /> {lesson.duration}
                                      {lesson.isWatched && <span className="ml-2 text-primary flex items-center bg-primary/5 px-1.5 rounded"><CheckCircle2 size={10} className="mr-0.5" /> 已学完</span>}
                                  </div>
                              </div>
                          </div>
                          <div className="ml-4">
                              {lesson.isFree ? (
                                  <button className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                      <Play size={12} fill="currentColor" className="ml-0.5"/>
                                  </button>
                              ) : (
                                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                                      <Lock size={14} />
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          ) : (
              <div className="text-sm text-stone-600 leading-relaxed space-y-6 animate-fade-in">
                  <div>
                      <h3 className="font-bold text-stone-800 mb-2 font-serif border-l-2 border-primary pl-2">课程简介</h3>
                      <p className="text-justify">{course.description}</p>
                  </div>
                  <div>
                      <h3 className="font-bold text-stone-800 mb-2 font-serif border-l-2 border-primary pl-2">你将获得</h3>
                      <ul className="space-y-2">
                          {['克服舞台恐惧的实用方法', '科学的发声训练技巧', '演讲稿的撰写逻辑', '提升自信心与表达能力'].map((item, idx) => (
                              <li key={idx} className="flex items-start bg-stone-50 p-2 rounded-lg">
                                  <CheckCircle2 size={14} className="text-primary mr-2 mt-0.5" />
                                  <span>{item}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          )}
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-stone-100 p-4 flex items-center space-x-4 z-30 shadow-lg">
          <button className="flex flex-col items-center justify-center text-stone-400 px-2 hover:text-stone-600 transition-colors">
              <Share2 size={20} />
              <span className="text-[10px] mt-0.5 font-bold">分享</span>
          </button>
          <button className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white font-bold py-3 rounded-2xl shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all active:scale-95">
              免费加入学习
          </button>
      </div>
    </div>
  );
};

export default CourseDetail;
