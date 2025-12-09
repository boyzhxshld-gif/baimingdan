import React from 'react';
import { BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import Header from '../components/Header';

const Rules: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="赛制规则解读" />
      
      <div className="p-5 pb-24 overflow-y-auto animate-slide-up">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-black mb-2">公平 · 公正 · 公开</h2>
                <p className="text-blue-100 text-sm">全面解析大赛评审标准与流程</p>
            </div>
        </div>

        <div className="space-y-6">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center">
                    <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
                    评分维度
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="bg-blue-50 text-blue-600 font-black text-sm px-2 py-1 rounded mr-3 mt-0.5">40%</div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm">内容主旨</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">主题鲜明，立意新颖，内容充实，情感真挚。能够准确把握“中国故事”的内涵，传递正能量。</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-purple-50 text-purple-600 font-black text-sm px-2 py-1 rounded mr-3 mt-0.5">30%</div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm">语言表达</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">普通话标准，吐字清晰，声音洪亮，语调自然。语速适中，富有感染力，能够熟练运用语言技巧。</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-orange-50 text-orange-600 font-black text-sm px-2 py-1 rounded mr-3 mt-0.5">30%</div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm">仪表风范</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">衣着得体，仪态端庄，表情自然。肢体语言运用恰当，具有良好的舞台表现力和自信心。</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center">
                    <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
                    晋级规则
                </h3>
                <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-700">初赛</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">线上海选</span>
                        </div>
                        <p className="text-xs text-slate-500">提交视频作品，由专家评审团打分。各组别排名前 30% 的选手晋级复赛。</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-700">复赛</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">省赛现场</span>
                        </div>
                        <p className="text-xs text-slate-500">线下现场比赛，现场亮分。各省赛区前 10 名晋级全国总决赛。</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-700">总决赛</span>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">北京巅峰对决</span>
                        </div>
                        <p className="text-xs text-slate-500">全国总决赛在北京举行，决出特等奖、一二三等奖及单项奖。</p>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start">
                <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-red-800">
                    <p className="font-bold mb-1">违规说明</p>
                    <p>参赛作品必须为原创，严禁抄袭、代笔。如发现违规行为，组委会有权取消其参赛资格及获奖名次。</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;