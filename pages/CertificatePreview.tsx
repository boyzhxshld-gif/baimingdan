
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, Award, ChevronLeft, CheckCircle2, Mail, MapPin, X, Truck, Package } from 'lucide-react';

const CertificatePreview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  // Mock State: In a real app, fetch this status
  const [isMailed, setIsMailed] = useState(false); 
  const [showLogistics, setShowLogistics] = useState(false);

  // Mock Certificate Data
  const certificateData = {
      name: '王小明',
      award: '一等奖',
      competition: '童话剧独白表演赛 (小学组)',
      date: '2025年8月15日',
      id: 'CERT-20250815-001'
  };

  const handleDownload = () => {
      alert('证书正在下载中...');
  };

  const handleShare = () => {
      alert('分享面板');
  };

  const handleRequestPaper = () => {
      setShowAddressModal(true);
  };
  
  const confirmRequest = () => {
      alert('申请成功'); 
      setIsMailed(true);
      setShowAddressModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative">
       {/* Dark Header */}
       <div className="px-4 h-14 flex items-center justify-between z-20">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-white font-bold">证书预览</h1>
            <div className="w-10"></div>
       </div>

       <div className="flex-1 flex flex-col items-center justify-center p-6">
           {/* Certificate Card (Landscape simulation) */}
           <div className="w-full aspect-[1.414/1] bg-[#FDFBF7] rounded shadow-2xl relative p-8 flex flex-col items-center justify-between text-slate-800 border-[10px] border-double border-yellow-600/30 transform transition-transform hover:scale-[1.01] duration-500">
               {/* Watermark / Background Pattern */}
               <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                   <Award size={200} />
               </div>
               
               {/* Border Corners */}
               <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-yellow-600"></div>
               <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-yellow-600"></div>
               <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-yellow-600"></div>
               <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-yellow-600"></div>

               <div className="text-center z-10 w-full">
                   <h2 className="text-3xl font-serif font-black text-yellow-700 tracking-widest mb-2">荣誉证书</h2>
                   <p className="text-[10px] text-yellow-600 uppercase tracking-[0.3em]">CERTIFICATE OF HONOR</p>
               </div>

               <div className="text-center z-10 w-full space-y-4">
                   <p className="text-sm font-serif">恭喜 <span className="text-xl font-bold border-b border-slate-300 px-2">{certificateData.name}</span> 同学</p>
                   <p className="text-sm font-serif leading-relaxed">
                       在 <span className="font-bold">{certificateData.competition}</span> 中表现优异<br/>
                       荣获
                   </p>
                   <div className="text-3xl font-black text-red-600 py-2 font-serif">{certificateData.award}</div>
                   <p className="text-xs text-slate-500">特发此证，以资鼓励</p>
               </div>

               <div className="flex justify-between items-end w-full z-10 mt-4">
                   <div className="text-[8px] text-slate-400">
                       编号: {certificateData.id}
                   </div>
                   <div className="text-center">
                       <div className="w-24 h-24 absolute bottom-8 right-8 opacity-80 mix-blend-multiply">
                           <div className="w-full h-full border-4 border-red-600 rounded-full flex items-center justify-center rotate-[-15deg]">
                               <div className="w-[90%] h-[90%] border border-red-600 rounded-full flex items-center justify-center">
                                   <div className="text-red-600 text-[10px] font-bold text-center leading-tight">
                                       大赛组委会<br/>
                                       专用章
                                   </div>
                               </div>
                           </div>
                       </div>
                       <p className="text-xs font-serif font-bold relative z-10">大赛组委会</p>
                       <p className="text-[10px] font-serif relative z-10">{certificateData.date}</p>
                   </div>
               </div>
           </div>
           
           <div className="mt-8 flex items-center justify-center w-full px-4">
               {isMailed ? (
                   <button 
                      onClick={() => setShowLogistics(true)}
                      className="flex items-center bg-green-500/20 backdrop-blur-md text-green-300 border border-green-500/50 px-6 py-3 rounded-full text-sm font-bold hover:bg-green-500/30 transition-colors"
                   >
                       <Truck size={18} className="mr-2" /> 证书已邮寄 (查看物流)
                   </button>
               ) : (
                   <button 
                      onClick={handleRequestPaper}
                      className="flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full text-sm font-bold hover:bg-white/20 transition-colors"
                   >
                       <Mail size={18} className="mr-2" /> 申请邮寄纸质证书
                   </button>
               )}
           </div>
       </div>

       {/* Bottom Actions */}
       <div className="p-6 bg-slate-800/50 backdrop-blur-md pb-10">
           <div className="flex space-x-4">
               <button 
                  onClick={handleShare}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center"
               >
                   <Share2 size={20} className="mr-2" /> 分享证书
               </button>
               <button 
                  onClick={handleDownload}
                  className="flex-[2] bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-900/20 transition-all flex items-center justify-center"
               >
                   <Download size={20} className="mr-2" /> 保存到相册
               </button>
           </div>
       </div>

       {/* Address Selection Modal */}
       {showAddressModal && (
           <div className="fixed inset-0 z-50 flex items-end justify-center">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowAddressModal(false)}></div>
               <div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up">
                   <div className="flex justify-between items-center mb-6">
                       <h3 className="text-lg font-bold text-slate-800">选择邮寄地址</h3>
                       <button onClick={() => setShowAddressModal(false)} className="text-slate-400 hover:text-slate-600">
                           <X size={20} />
                       </button>
                   </div>
                   
                   <div className="space-y-3 mb-6">
                       <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 relative cursor-pointer">
                           <div className="flex justify-between items-start mb-1">
                               <span className="font-bold text-slate-800">张三</span>
                               <span className="text-slate-600 font-medium text-sm">138****0000</span>
                           </div>
                           <div className="text-xs text-slate-500 leading-relaxed pr-8">
                               北京市海淀区中关村大街1号海淀科技大厦A座1001室
                           </div>
                           <div className="absolute top-4 right-4 text-blue-600">
                               <CheckCircle2 size={20} />
                           </div>
                       </div>
                       
                       <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold text-sm flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors">
                           <MapPin size={16} className="mr-2" /> 添加新地址
                       </button>
                   </div>

                   <div className="bg-slate-50 p-4 rounded-xl mb-6 text-xs text-slate-500">
                       <p className="mb-1">说明：</p>
                       <ul className="list-disc pl-4 space-y-1">
                           <li>纸质证书邮寄费用需自理（到付）。</li>
                           <li>预计在申请后 5-10 个工作日内寄出。</li>
                       </ul>
                   </div>

                   <button 
                       onClick={confirmRequest}
                       className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-slate-800 transition-all"
                   >
                       确认申请
                   </button>
               </div>
           </div>
       )}

       {/* Logistics Modal */}
       {showLogistics && (
           <div className="fixed inset-0 z-50 flex items-end justify-center">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowLogistics(false)}></div>
               <div className="bg-white w-full max-w-md rounded-t-3xl p-6 relative z-10 animate-slide-up">
                   <div className="flex justify-between items-center mb-6">
                       <h3 className="text-lg font-bold text-slate-800">物流信息</h3>
                       <button onClick={() => setShowLogistics(false)} className="text-slate-400 hover:text-slate-600">
                           <X size={20} />
                       </button>
                   </div>
                   
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center mb-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
                            <Package size={24} className="text-blue-500" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-800">顺丰速运</div>
                            <div className="text-xs text-slate-500 mt-1">单号: SF1234567890</div>
                        </div>
                   </div>

                   <div className="space-y-6 pl-2 relative border-l-2 border-slate-100 ml-2">
                       <div className="relative pl-6">
                           <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                           <div className="text-sm font-bold text-slate-800">已签收，感谢使用顺丰速运</div>
                           <div className="text-xs text-slate-400 mt-1">2025-08-20 14:30</div>
                       </div>
                       <div className="relative pl-6">
                           <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                           <div className="text-sm font-bold text-slate-500">快件到达 [北京海淀中关村营业点]</div>
                           <div className="text-xs text-slate-400 mt-1">2025-08-20 08:15</div>
                       </div>
                       <div className="relative pl-6">
                           <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                           <div className="text-sm font-bold text-slate-500">顺丰速运 已收取快件</div>
                           <div className="text-xs text-slate-400 mt-1">2025-08-19 18:20</div>
                       </div>
                   </div>

                   <button 
                       onClick={() => setShowLogistics(false)}
                       className="w-full bg-slate-100 text-slate-600 font-bold py-3.5 rounded-2xl mt-8 hover:bg-slate-200 transition-all"
                   >
                       关闭
                   </button>
               </div>
           </div>
       )}
    </div>
  );
};

export default CertificatePreview;
