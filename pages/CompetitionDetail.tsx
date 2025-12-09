
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Share2, Check, ShieldCheck, Calendar, Users, GraduationCap, AlertTriangle, ChevronRight, ChevronDown, ChevronUp, Lock, Award, CheckCircle2, Play, Clock, MapPin, Edit3, UploadCloud, XCircle, FileBadge, Building2 } from 'lucide-react';
import Header from '../components/Header';

const CompetitionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('intro');
  
  // State for interactions
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  // Mock registration check
  const isRegistered = ['1', '2', '4', '5'].includes(id || '');

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    showToastMessage(!isFavorited ? '已加入收藏夹' : '已取消收藏');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleShareAction = (platform: string) => {
      setShowShareModal(false);
      showToastMessage(`已分享到${platform}`);
  };

  const showToastMessage = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2000);
  };

  // Dynamic Data Logic
  const getCompetitionData = (id: string) => {
      switch(id) {
          case '1': // Speech
              return {
                  title: '第五届“讲好中国故事”全国青少年语言素养大赛',
                  subTitle: '小学组 / 个人赛 / 演讲',
                  deadline: '2025-10-25',
                  daysLeft: 12,
                  host: '中国教育电视台中线传媒',
                  description: '本次大赛旨在通过演讲的形式，引导青少年深入了解中华优秀传统文化，讲述身边的感人故事，展现新时代少年的精神风貌。',
                  bgImage: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '初赛主题：我的家乡',
                  introContent: '选手需围绕“我的家乡”这一主题，结合自身经历，讲述家乡的风土人情、历史变迁或感人故事。内容要求健康向上，真挚感人，能够体现家乡的独特魅力和新时代的发展变化。'
              };
          case '2': // Reading
              return {
                  title: '经典诗文诵读大赛',
                  subTitle: '诵读 / 经典传唱',
                  deadline: '2025-11-10',
                  daysLeft: 28,
                  host: '中国教育电视台中线传媒',
                  description: '传承中华优秀传统文化，诵读经典，感受文字的力量。通过诵读经典诗文，提升青少年的语言感知力和文化素养。',
                  bgImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '诵读篇目要求',
                  introContent: '参赛选手需从中国古代、近代或现代经典诗文中选取篇目进行诵读。要求发音标准，情感充沛，能够准确传达作品的意境和内涵。'
              };
          case '3': // Host
              return {
                  title: '青少年主持人大赛',
                  subTitle: '主持 / 舞台风采',
                  deadline: '2025-12-01',
                  daysLeft: 48,
                  host: '中国教育电视台中线传媒',
                  description: '展现自我风采，我在舞台中央，寻找下一个金话筒。旨在挖掘和培养具有主持潜力的青少年人才。',
                  bgImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '主持考核内容',
                  introContent: '初赛包括自我介绍和模拟主持两个环节。选手需在规定时间内展现良好的语言组织能力、临场应变能力和舞台亲和力。'
              };
          case '4': // English
              return {
                  title: '“未来之星”英语风采大赛',
                  subTitle: '英语 / 国际视野',
                  deadline: '2025-12-15',
                  daysLeft: 62,
                  host: '中国教育电视台中线传媒',
                  description: '用英语讲好中国故事，展示国际视野，连接世界。培养青少年的跨文化交流能力和全球胜任力。',
                  bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '演讲主题：My China Story',
                  introContent: 'Please share a story about China in English. It could be about Chinese culture, food, festivals, or your personal experiences living in China.'
              };
          case '5': // Drama (Wang Xiaohong - Completed)
              return {
                  title: '童话剧独白表演赛',
                  subTitle: '戏剧 / 角色扮演',
                  deadline: '2025-11-20',
                  daysLeft: 0, // Ended
                  host: '中国教育电视台中线传媒',
                  description: '发挥想象力，用声音演绎经典童话角色。通过角色独白，展现青少年的表演天赋和创造力。',
                  bgImage: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '表演剧目选择',
                  introContent: '选手可从经典童话故事中选取一段角色独白进行表演。要求服装道具自备，表演生动自然，能够塑造鲜明的人物形象。'
              };
          case '6': // Debate
              return {
                  title: '青少年辩论邀请赛',
                  subTitle: '辩论 / 思辨能力',
                  deadline: '2025-12-20',
                  daysLeft: 67,
                  host: '中国教育电视台中线传媒',
                  description: '唇枪舌战，思辨争锋。旨在培养青少年的逻辑思维能力、语言表达能力和团队协作精神。',
                  bgImage: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '辩论赛制',
                  introContent: '比赛采用团队赛制，每队4人。分为立论、攻辩、自由辩论和总结陈词四个环节。辩题涉及社会热点、校园生活等方面。'
              };
          case '7': // AI
              return {
                  title: 'AI 语言创意大赛',
                  subTitle: '科技 / 创新应用',
                  deadline: '2026-01-15',
                  daysLeft: 90,
                  host: '中国教育电视台中线传媒',
                  description: '探索 AI 在语言艺术中的应用，激发创新思维。鼓励青少年利用 AI 工具进行文学创作、剧本编写等。',
                  bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '创意方向',
                  introContent: '参赛选手可利用生成式 AI 工具辅助创作诗歌、故事或剧本，并进行朗诵或表演。需提交创作过程说明及 AI 使用报告。'
              };
          default:
              return {
                  title: '第五届“讲好中国故事”全国青少年语言素养大赛',
                  subTitle: '小学组 / 个人赛 / 演讲',
                  deadline: '2025-10-25',
                  daysLeft: 12,
                  host: '中国教育电视台中线传媒',
                  description: '本次大赛旨在通过演讲的形式，引导青少年深入了解中华优秀传统文化，讲述身边的感人故事，展现新时代少年的精神风貌。',
                  bgImage: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1000&auto=format&fit=crop&q=80',
                  introTitle: '初赛主题：我的家乡',
                  introContent: '选手需围绕“我的家乡”这一主题，结合自身经历，讲述家乡的风土人情、历史变迁或感人故事。内容要求健康向上，真挚感人，能够体现家乡的独特魅力和新时代的发展变化。'
              };
      }
  };

  const competition = getCompetitionData(id || '1');

  const stages = [
      { 
          id: 1, 
          name: '市级初赛', 
          date: '2025.04-06',
          desc: '提交视频作品，由专家评审团打分。各组别排名前 30% 的选手晋级复赛。'
      },
      { 
          id: 2, 
          name: '省级复赛', 
          date: '2025.07-08',
          desc: '线下现场比赛，现场亮分。各省赛区前 10 名晋级全国总决赛。'
      },
      { 
          id: 3, 
          name: '全国总决赛', 
          date: '2025.10',
          desc: '全国总决赛在北京举行，决出特等奖、一二三等奖及单项奖。'
      }
  ];

  const toggleStage = (index: number) => {
      setExpandedStage(expandedStage === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 relative">
      {/* Custom Toast Notification */}
      {showToast && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900/90 text-white px-6 py-3 rounded-full shadow-2xl z-[70] flex items-center animate-fade-in backdrop-blur-md border border-stone-700">
          <Check size={16} className="mr-2 text-green-400" />
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      <Header 
        title="赛事详情" 
        rightElement={
          <div className="flex space-x-2">
             <button 
               className={`p-2 rounded-full transition-all active:scale-95 hover:bg-stone-100 text-stone-600`} 
               onClick={handleShare}
             >
               <Share2 size={20} />
             </button>
             <button 
               className={`p-2 rounded-full transition-all active:scale-95 ${isFavorited ? 'bg-amber-50 text-amber-500' : 'hover:bg-stone-100 text-stone-600'}`} 
               onClick={handleFavorite}
             >
               <Star size={20} fill={isFavorited ? "currentColor" : "none"} />
             </button>
          </div>
        } 
      />

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Banner Image */}
        <div className="w-full h-48 relative">
           <img 
             src={competition.bgImage} 
             alt="Stage" 
             className="w-full h-full object-cover sepia-[.3]"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent mix-blend-multiply"></div>
           <div className="absolute bottom-0 left-0 p-5 text-white w-full">
              <div className="flex items-center mb-2 space-x-2">
                 <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-white/20">教育部白名单赛事</span>
                 <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">官方认证</span>
              </div>
              <h1 className="text-xl font-black leading-tight mb-1 tracking-tight shadow-sm font-serif">{competition.title}</h1>
              <p className="text-white/80 text-xs font-medium flex items-center">
                 <ShieldCheck size={12} className="mr-1" /> 主办方：{competition.host}
              </p>
           </div>
        </div>

        {/* Stats Bar */}
        <div className="px-5 py-4 bg-white border-b border-stone-200 flex justify-between items-center shadow-sm relative z-10">
           <div className="flex flex-col items-center flex-1 border-r border-stone-100">
              <span className="text-xs text-stone-400 mb-1">报名截止</span>
              <span className="text-sm font-bold text-stone-800">{competition.deadline}</span>
           </div>
           <div className="flex flex-col items-center flex-1 border-r border-stone-100">
              <span className="text-xs text-stone-400 mb-1">剩余时间</span>
              <span className="text-sm font-bold text-primary">{competition.daysLeft > 0 ? `${competition.daysLeft} 天` : '已截止'}</span>
           </div>
           <div className="flex flex-col items-center flex-1">
              <span className="text-xs text-stone-400 mb-1">已报名</span>
              <span className="text-sm font-bold text-stone-800">3.5w+</span>
           </div>
        </div>

        {/* Tabs */}
        <div className="px-5 mt-4 mb-4 sticky top-14 bg-stone-50 z-20 py-2">
           <div className="flex p-1 bg-stone-200 rounded-xl shadow-inner">
              {[
                { id: 'intro', label: '大赛简介' },
                { id: 'schedule', label: '赛程安排' },
                { id: 'groups', label: '组别设置' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all font-serif ${
                    activeTab === tab.id ? 'bg-white text-primary shadow-sm' : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </div>
        </div>

        {/* Content Area */}
        <div className="px-5 space-y-6 animate-fade-in">
           {activeTab === 'intro' && (
             <>
                <div className="prose prose-sm prose-stone max-w-none">
                   {/* 1. Specific Intro */}
                   <h3 className="text-base font-bold text-stone-800 flex items-center mb-2 font-serif">
                      <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
                      {competition.introTitle}
                   </h3>
                   <p className="text-stone-600 text-sm leading-relaxed text-justify mb-4">
                      {competition.introContent}
                   </p>
                   
                   <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-6">
                      <h4 className="font-bold text-stone-800 text-sm mb-2">参赛视频要求：</h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-stone-600">
                         <li>视频格式：MP4 高清格式 (1080P最佳)，画质清晰，色彩自然。</li>
                         <li>视频时长：3-5分钟，超时将扣分，请严格控制时间。</li>
                         <li>拍摄要求：横屏拍摄，固定机位，全身或半身出镜，背景整洁。</li>
                         <li>声音要求：原声录制，清晰无杂音，不得后期配音或修音。</li>
                         <li>文件大小：建议不超过 500MB，以免上传失败。</li>
                      </ul>
                   </div>

                   {/* 2. Competition Background */}
                   <h3 className="text-base font-bold text-stone-800 flex items-center mb-2 font-serif">
                      <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
                      大赛背景
                   </h3>
                   <p className="text-stone-600 text-sm leading-relaxed text-justify mb-4">
                      {competition.description}
                   </p>

                   {/* 3. Realistic Stage Image */}
                   <div className="my-6 rounded-xl overflow-hidden shadow-sm relative group">
                      {/* Updated to a reliable auditorium/stage photo URL */}
                      <img src="https://images.unsplash.com/photo-1560439514-e960a3ef5019?w=800&auto=format&fit=crop&q=80" alt="大赛现场" className="w-full h-auto object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white p-2 text-[10px] text-center font-serif backdrop-blur-sm">往届大赛总决赛现场实况</div>
                   </div>

                   {/* 4. Organizer Info (New) */}
                   <h3 className="text-base font-bold text-stone-800 flex items-center mb-2 font-serif">
                      <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
                      主办方介绍
                   </h3>
                   <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-4 flex items-start">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-stone-100 mr-3 flex-shrink-0 shadow-sm">
                            <Building2 size={20} className="text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold text-stone-800 text-sm mb-1">{competition.host}</h4>
                            <p className="text-xs text-stone-600 leading-relaxed text-justify">
                                中国教育电视台中线传媒是专注青少年素质教育、文化传播的专业机构。致力于弘扬中华优秀传统文化，提升青少年语言素养与国际传播能力。
                            </p>
                        </div>
                   </div>
                </div>

                {/* Disclaimer Section */}
                <div className="mt-4 mb-4 border-2 border-dashed border-stone-200 rounded-2xl p-4 bg-stone-50/50">
                    <div className="flex items-center mb-2 text-stone-400">
                        <AlertTriangle size={16} className="mr-2" />
                        <h3 className="text-xs font-bold">免责声明</h3>
                    </div>
                    <p className="text-[10px] text-stone-400 leading-relaxed text-justify">
                        1. 本次大赛秉持公平、公正、公开原则。<br/>
                        2. 参赛作品必须为原创，严禁抄袭、代笔。如发现违规行为，组委会有权取消其参赛资格及获奖名次。<br/>
                        3. 大赛组委会拥有对参赛作品的展示、出版、宣传等权利。
                    </p>
                </div>
             </>
           )}

           {activeTab === 'schedule' && (
               <div className="space-y-4">
                    {/* Stage Roadmap */}
                    <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                        <h3 className="text-base font-bold text-stone-800 flex items-center mb-6 font-serif">
                            <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
                            整体赛程
                        </h3>
                        <div className="relative space-y-8 pl-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-stone-200"></div>

                            {stages.map((stage, index) => (
                                <div key={index} className="relative flex items-start">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 border-4 border-stone-50 shadow-sm ${index === 0 ? 'bg-primary text-white' : 'bg-white text-stone-500 border-stone-200'}`}>
                                        {index + 1}
                                    </div>
                                    <div className="ml-4 flex-1 bg-stone-50 p-3 rounded-xl border border-stone-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-stone-800 text-sm">{stage.name}</span>
                                        </div>
                                        <div className="text-xs text-stone-500 flex items-center mb-2">
                                            <Calendar size={12} className="mr-1.5"/> {stage.date}
                                        </div>
                                        <p className="text-xs text-stone-400 leading-relaxed">
                                            {stage.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#fcfaf8] p-3 rounded-xl border border-stone-200 flex items-start">
                       <div className="bg-stone-100 p-1.5 rounded-lg mr-3 text-stone-600 shadow-sm">
                          <Users size={16} />
                       </div>
                       <div>
                          <div className="text-[10px] text-stone-400 font-bold uppercase">参赛对象</div>
                          <div className="text-xs font-bold text-stone-800">全国中小学生 (含职高/中专)</div>
                       </div>
                    </div>
               </div>
           )}

           {activeTab === 'groups' && (
               <div className="space-y-4">
                   {/* Group Definition Block */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-base font-bold text-stone-800 mb-4 flex items-center font-serif">
                            <GraduationCap size={18} className="text-primary mr-2" />
                            详细组别说明
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-stone-800">小学A组 (低年级)</span>
                                    <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">1-3 年级</span>
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed">侧重考察基础发音、朗诵兴趣及舞台自信。</p>
                            </div>

                            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-stone-800">小学B组 (高年级)</span>
                                    <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">4-6 年级</span>
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed">考察语言表达技巧、情感理解及内容创作能力。</p>
                            </div>

                            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-stone-800">初中组</span>
                                    <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">7-9 年级</span>
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed">要求具备较高的思辨能力、逻辑表达及即兴评述能力。</p>
                            </div>

                            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-stone-800">高中/职高组</span>
                                    <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">10-12 年级</span>
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed">侧重考察综合语言素养、文化底蕴及国际视野。</p>
                            </div>
                        </div>
                    </div>
               </div>
           )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md p-4 px-6 border-t border-stone-100 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {isRegistered ? (
              <button 
                onClick={() => navigate('/my-registrations')}
                className="w-full bg-stone-100 text-stone-600 py-3.5 rounded-2xl font-bold shadow-sm hover:bg-stone-200 transition-colors border border-stone-200"
              >
                  查看报名进度
              </button>
          ) : (
              <button 
                onClick={() => navigate(`/register/${id}`)}
                className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-red-900/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center"
                disabled={competition.daysLeft <= 0}
              >
                  {competition.daysLeft <= 0 ? '报名已截止' : (
                      <>立即报名参赛 <ChevronRight size={18} className="ml-1 opacity-80" /></>
                  )}
              </button>
          )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowShareModal(false)}></div>
              <div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up">
                  <h3 className="text-center font-bold text-stone-800 mb-6 font-serif">分享赛事给好友</h3>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                      {['微信', '朋友圈', 'QQ', '复制链接'].map((item, idx) => (
                          <div key={idx} className="flex flex-col items-center cursor-pointer group" onClick={() => handleShareAction(item)}>
                              <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors border border-stone-100 group-hover:border-primary/20">
                                  <Share2 size={20} className="text-stone-600 group-hover:text-primary" />
                              </div>
                              <span className="text-xs text-stone-500">{item}</span>
                          </div>
                      ))}
                  </div>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="w-full py-3.5 bg-stone-100 rounded-2xl font-bold text-stone-600 hover:bg-stone-200 transition-colors"
                  >
                      取消
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default CompetitionDetail;
