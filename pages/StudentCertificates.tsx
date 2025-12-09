
import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Download, Truck, Eye, FileCheck, Package } from 'lucide-react';
import Header from '../components/Header';

const StudentCertificates: React.FC = () => {
  const { studentId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'individual';
  const navigate = useNavigate();

  // Mock Data
  const studentName = studentId === '1' || studentId === 'student_self' ? '王小明' : studentId === 't1' ? '飞跃梦想队' : '李小红';
  
  // Using more document-like/paper texture images for realism
  const certificatesMock = [
      { 
          id: 'c1', 
          title: '一等奖证书', 
          competition: '第五届“讲好中国故事”演讲大赛', 
          type: '决赛获奖', 
          category: '演讲',
          date: '2025-10-01', 
          status: 'mailed', 
          logistics: 'SF123456', 
          image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=60' // Document / Paper texture
      },
      { 
          id: 'c2', 
          title: '优秀奖证书', 
          competition: '经典诗文诵读大赛', 
          type: '初赛完赛', 
          category: '朗诵',
          date: '2025-06-10', 
          status: 'electronic', 
          image: 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?w=400&auto=format&fit=crop&q=60' // Heavy paper
      },
      { 
          id: 'c3', 
          title: '晋级证书', 
          competition: '青少年主持人大赛', 
          type: '初赛晋级', 
          category: '主持',
          date: '2025-05-20', 
          status: 'pending_mail', 
          image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&auto=format&fit=crop&q=60' // Diploma scroll / cert
      },
  ];

  // Filter if needed
  const list = certificatesMock;

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title={`${studentName} 的证书`} />
      
      <div className="p-5 flex-1 overflow-y-auto pb-20 animate-slide-up">
          {/* Header Card */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center mb-6">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mr-4 border border-stone-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${studentName}&background=random`} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-stone-800">{studentName}</h3>
                    <p className="text-xs text-stone-500">共获得 {list.length} 张证书</p>
                </div>
          </div>

          <div className="space-y-4">
               {list.map(cert => (
                   <div key={cert.id} onClick={() => navigate(`/certificate/${cert.id}`)} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex gap-4 cursor-pointer hover:border-primary/30 group relative overflow-hidden">
                       <div className="w-24 aspect-[1.414/1] bg-stone-100 rounded border border-stone-200 overflow-hidden relative flex-shrink-0">
                           <img src={cert.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity sepia-[0.2]" />
                           {cert.type.includes('获奖') && <div className="absolute top-0 left-0 bg-amber-500 text-white text-[8px] px-1.5 py-0.5 rounded-br font-bold">获奖</div>}
                           {cert.type.includes('晋级') && <div className="absolute top-0 left-0 bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-br font-bold">晋级</div>}
                       </div>
                       
                       <div className="flex-1 py-0.5 flex flex-col justify-between min-w-0">
                           <div>
                               <div className="flex justify-between items-start mb-1">
                                   <h3 className="font-bold text-stone-800 text-sm font-serif truncate pr-2">{cert.competition}</h3>
                                   <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded border border-stone-200 whitespace-nowrap flex-shrink-0">{cert.category}</span>
                               </div>
                               <p className="text-xs text-stone-500 font-bold text-primary">{cert.title}</p>
                           </div>
                           
                           <div className="flex justify-between items-end mt-2">
                               <div className="flex flex-col">
                                   <span className="text-[10px] text-stone-400">{cert.date}</span>
                                   <div className="flex items-center gap-2 mt-1">
                                       {cert.status === 'mailed' && (
                                           <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 flex items-center">
                                               <Truck size={10} className="mr-1"/> 已邮寄
                                           </span>
                                       )}
                                       {cert.status === 'pending_mail' && (
                                           <span className="text-[9px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100 flex items-center">
                                               <Package size={10} className="mr-1"/> 待发货
                                           </span>
                                       )}
                                       {cert.status === 'electronic' && (
                                           <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded border border-stone-200 flex items-center">
                                               <FileCheck size={10} className="mr-1"/> 电子版
                                           </span>
                                       )}
                                   </div>
                               </div>
                               <button className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-primary hover:text-white transition-colors border border-stone-100">
                                   <Download size={14} />
                               </button>
                           </div>
                       </div>
                   </div>
               ))}
               
               {list.length === 0 && (
                    <div className="text-center py-10 text-stone-400 text-sm">暂无证书</div>
               )}
          </div>
      </div>
    </div>
  );
};

export default StudentCertificates;
