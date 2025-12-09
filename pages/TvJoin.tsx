import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tv, Mic, Award, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';

const TvJoin: React.FC = () => {
  const navigate = useNavigate();

  const handleApply = () => {
      alert('申请已提交，请等待通知');
      navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="我要上电视" />
      
      <div className="flex-1 overflow-y-auto">
          <div className="relative h-64 bg-gradient-to-b from-pink-600 to-rose-500 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10 text-center text-white p-6">
                  <Tv size={48} className="mx-auto mb-4 opacity-90" />
                  <h1 className="text-3xl font-black mb-2">星光舞台等你来</h1>
                  <p className="text-pink-100 text-sm">中国教育电视台录制机会 / 展示自我风采</p>
              </div>
          </div>

          <div className="px-6 py-8 -mt-6 bg-white rounded-t-3xl relative z-20">
              <div className="space-y-8">
                  <div>
                      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                          <span className="w-1.5 h-6 bg-rose-500 rounded-full mr-3"></span>
                          活动介绍
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed text-justify">
                          “我要上电视”是全国青少年语言素养大赛组委会联合中国教育电视台特别推出的优秀选手展示计划。旨在发掘具有语言天赋的青少年，提供国家级媒体的展示平台，记录成长的精彩瞬间。
                      </p>
                  </div>

                  <div>
                      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                          <span className="w-1.5 h-6 bg-rose-500 rounded-full mr-3"></span>
                          招募对象
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                                  <Award size={20} />
                              </div>
                              <h3 className="font-bold text-slate-800 text-sm">获奖选手</h3>
                              <p className="text-slate-500 text-xs mt-1">大赛一等奖及以上</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3">
                                  <Mic size={20} />
                              </div>
                              <h3 className="font-bold text-slate-800 text-sm">特长生</h3>
                              <p className="text-slate-500 text-xs mt-1">具备特殊才艺展示</p>
                          </div>
                      </div>
                  </div>

                  <div>
                      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                          <span className="w-1.5 h-6 bg-rose-500 rounded-full mr-3"></span>
                          参与权益
                      </h2>
                      <ul className="space-y-3">
                          {[
                              '获得中国教育电视台节目录制机会',
                              '颁发“优秀展演奖”官方证书',
                              '专业导演团队一对一指导',
                              '录制视频将在官方全媒体矩阵播出'
                          ].map((item, idx) => (
                              <li key={idx} className="flex items-center bg-rose-50 p-3 rounded-xl text-sm text-rose-800">
                                  <CheckCircle2 size={16} className="mr-3 text-rose-500 flex-shrink-0" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      <div className="p-5 border-t border-slate-100 bg-white">
          <button 
            onClick={handleApply}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 hover:opacity-90 transition-opacity text-lg"
          >
              立即报名参与
          </button>
      </div>
    </div>
  );
};

export default TvJoin;