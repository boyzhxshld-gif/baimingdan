
import React from 'react';
import Header from '../components/Header';
import { Building2, Award, Users, Globe, ChevronRight } from 'lucide-react';

const OrganizerInfo: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title="组织机构介绍" />
      
      <div className="flex-1 overflow-y-auto p-5 animate-slide-up pb-24">
        {/* Main Logo/Title Area */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg shadow-red-900/20">
                <Building2 size={40} className="text-white" />
            </div>
            <div className="relative mb-2">
                <h1 className="text-2xl font-black text-primary font-serif tracking-wider relative z-10" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                    中国教育电视台<br/><span className="text-3xl">中线传媒</span>
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-amber-500/30 rounded-full"></div>
            </div>
            <p className="text-[10px] text-stone-400 font-medium uppercase tracking-widest mt-3">China Education Television Zhongxian Media</p>
            
            <div className="mt-5 flex space-x-3">
                <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-bold border border-primary/10">官方权威</span>
                <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-bold border border-primary/10">专业传媒</span>
            </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
            <h2 className="text-base font-bold text-stone-800 mb-4 flex items-center font-serif">
                <span className="w-1.5 h-4 bg-primary rounded-full mr-2"></span>
                机构简介
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed text-justify mb-4 font-medium">
                中国教育电视台中线传媒是专注青少年素质教育、文化传播的专业机构。依托中国教育电视台的国家级媒体平台优势，致力于弘扬中华优秀传统文化，提升青少年语言素养与国际传播能力。
            </p>
            <p className="text-sm text-stone-600 leading-relaxed text-justify font-medium">
                我们成功举办了多届“讲好中国故事”全国青少年语言素养大赛，覆盖全国30多个省市自治区，服务超过百万名青少年，成为国内最具影响力的语言类赛事品牌之一。
            </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#fcfaf8] p-4 rounded-2xl border border-stone-200 text-center">
                <div className="text-2xl font-black text-primary mb-1 font-serif">10+</div>
                <div className="text-xs text-stone-500 font-bold">年办赛经验</div>
            </div>
            <div className="bg-[#fcfaf8] p-4 rounded-2xl border border-stone-200 text-center">
                <div className="text-2xl font-black text-primary mb-1 font-serif">100w+</div>
                <div className="text-xs text-stone-500 font-bold">服务学子</div>
            </div>
            <div className="bg-[#fcfaf8] p-4 rounded-2xl border border-stone-200 text-center">
                <div className="text-2xl font-black text-primary mb-1 font-serif">30+</div>
                <div className="text-xs text-stone-500 font-bold">覆盖省份</div>
            </div>
            <div className="bg-[#fcfaf8] p-4 rounded-2xl border border-stone-200 text-center">
                <div className="text-2xl font-black text-primary mb-1 font-serif">500+</div>
                <div className="text-xs text-stone-500 font-bold">合作名校</div>
            </div>
        </div>

        {/* Contact/Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden divide-y divide-stone-50">
             <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50">
                 <div className="flex items-center">
                     <Award className="text-amber-600 mr-3" size={20} />
                     <span className="text-sm font-bold text-stone-700">荣誉资质</span>
                 </div>
                 <ChevronRight size={16} className="text-stone-300" />
             </div>
             <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50">
                 <div className="flex items-center">
                     <Users className="text-primary mr-3" size={20} />
                     <span className="text-sm font-bold text-stone-700">专家团队</span>
                 </div>
                 <ChevronRight size={16} className="text-stone-300" />
             </div>
             <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50">
                 <div className="flex items-center">
                     <Globe className="text-blue-600 mr-3" size={20} />
                     <span className="text-sm font-bold text-stone-700">官方网站</span>
                 </div>
                 <ChevronRight size={16} className="text-stone-300" />
             </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerInfo;
