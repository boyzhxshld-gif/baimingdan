
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Clock, ChevronRight, UploadCloud, Image as ImageIcon, CheckCircle2, ArrowRight, Play, X, RefreshCcw, Eye } from 'lucide-react';
import Header from '../components/Header';

const UploadWork: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const mode = searchParams.get('mode'); // 'edit' | 'preview' | null
  const isEditMode = mode === 'edit';
  const isPreviewMode = mode === 'preview';
  
  // Determine if "Use Original" is available from navigation state
  // If passed as true, show toggle. Else default to 'new' and hide toggle.
  const canReuse = location.state?.canReuse === true;

  const [workName, setWorkName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  // Upload Type Toggle
  const [uploadType, setUploadType] = useState<'new' | 'original'>('new');

  useEffect(() => {
      // Pre-fill if editing or previewing
      if (isEditMode || isPreviewMode) {
          setWorkName('我的演讲作品-王小明.mp4');
          setDescription('这是我关于传统文化的演讲，希望能通过我的声音传递中国故事的力量。');
          setUploadedFile('mock-file');
          setUploadType('new');
      } else {
          setWorkName('我的作品.mp4');
      }
  }, [isEditMode, isPreviewMode]);

  const handleSubmit = () => {
    if (isPreviewMode) return;
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
        setIsUploading(false);
        setIsSubmitted(true);
    }, 1500);
  };

  const handleReturnToDetail = () => {
      navigate(`/registration/${id}`);
  };

  if (isSubmitted) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header title={isEditMode ? "修改结果" : "上传结果"} showBack={false} />
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-slide-up">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200">
                    <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">{isEditMode ? '修改成功！' : '提交成功！'}</h2>
                <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                    您的作品<span className="font-bold text-slate-700">《{workName}》</span>已成功{isEditMode ? '更新' : '上传'}。<br/>
                    请耐心等待评委审核，结果将通过消息中心通知您。
                </p>
                
                <div className="w-full max-w-sm space-y-4">
                    <button 
                        onClick={handleReturnToDetail}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center"
                    >
                        查看报名详情 <ChevronRight size={18} className="ml-1 opacity-50" />
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-slate-600 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                        返回首页
                    </button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title={isPreviewMode ? "作品预览" : (isEditMode ? "修改作品" : "上传作品")} />

      <div className="p-5 pb-24">
         {/* Info Card */}
         <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
            <div className="flex items-center justify-between mb-4">
               <h2 className="font-bold text-slate-800">经典诗文诵读-小学组</h2>
               {!isPreviewMode && (
                   <div className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                     <Clock size={12} className="mr-1" /> 截止: 3天
                   </div>
               )}
            </div>
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className={`h-full w-1/2 rounded-full ${isPreviewMode ? 'bg-blue-500' : 'bg-primary'}`}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
               <span>报名信息</span>
               <span className={`${isPreviewMode ? 'text-blue-500' : 'text-primary'} font-bold`}>
                   {isPreviewMode ? '评审中' : (isEditMode ? '作品修改' : '作品上传')}
               </span>
               <span>结果</span>
            </div>
         </div>

         {/* Toggle Switch (Only show if reuse is allowed AND not preview mode) */}
         {!isPreviewMode && canReuse && (
             <div className="bg-slate-200/50 p-1 rounded-xl flex mb-6">
                 <button 
                    onClick={() => setUploadType('new')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${uploadType === 'new' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                     上传新作品
                 </button>
                 <button 
                    onClick={() => {
                        setUploadType('original');
                        setWorkName('复用-初赛作品.mp4');
                        setUploadedFile('original-file');
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${uploadType === 'original' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                     使用原作品
                 </button>
             </div>
         )}

         <div className="space-y-6 animate-fade-in">
            {/* Upload Area */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-slate-700">视频文件</label>
                    {isPreviewMode && <span className="text-xs text-blue-500 font-bold flex items-center"><Eye size={12} className="mr-1"/> 仅供预览</span>}
                </div>
                
                {uploadType === 'original' ? (
                    <div className="w-full h-48 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded font-bold">
                            已关联
                        </div>
                        <img 
                           src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&auto=format&fit=crop&q=60" 
                           className="w-full h-full object-cover opacity-60 grayscale" 
                           alt="Original" 
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm font-bold text-slate-700 text-sm flex items-center mb-2">
                                 <CheckCircle2 size={16} className="text-green-500 mr-2" /> 初赛作品.mp4
                             </div>
                             <p className="text-[10px] text-slate-800 bg-white/50 px-2 rounded">系统将自动使用您上一阶段提交的作品</p>
                        </div>
                    </div>
                ) : uploadedFile ? (
                    <div className="w-full h-48 bg-black rounded-xl overflow-hidden relative group">
                        <img 
                           src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&auto=format&fit=crop&q=60" 
                           className="w-full h-full object-cover opacity-80" 
                           alt="Preview" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                 <Play size={20} className="text-white ml-1" fill="currentColor" />
                             </div>
                        </div>
                        {!isPreviewMode && (
                            <button 
                                onClick={() => setUploadedFile(null)}
                                className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-red-500 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ) : (
                    <div 
                        className="w-full h-48 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-primary/50 transition-all group relative overflow-hidden"
                        onClick={() => !isPreviewMode && setUploadedFile('new-file')}
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform relative z-10">
                            <UploadCloud size={32} className="text-primary" />
                        </div>
                        <p className="text-slate-600 font-bold text-sm relative z-10">点击或拖拽上传视频</p>
                        <p className="text-slate-400 text-xs mt-1 relative z-10">支持 MP4, MOV (最大 500MB)</p>
                    </div>
                )}
            </div>

            {/* Input Fields */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">作品名称</label>
                    <input 
                        type="text"
                        value={workName}
                        onChange={(e) => setWorkName(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl text-slate-800 font-medium border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-colors"
                        readOnly={isPreviewMode || uploadType === 'original'}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">作品简介</label>
                    <div className="relative">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-32 bg-slate-50 rounded-xl p-3 text-slate-700 text-sm border border-transparent focus:border-primary/30 focus:bg-white outline-none resize-none"
                            maxLength={200}
                            readOnly={isPreviewMode || uploadType === 'original'}
                            placeholder={isPreviewMode ? "暂无简介" : "请输入作品简介"}
                        />
                        {!isPreviewMode && uploadType === 'new' && (
                            <span className="absolute bottom-2 right-3 text-xs text-slate-400">
                                {description.length}/200
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* AI Promo - Only show for new uploads in edit/upload mode */}
            {!isPreviewMode && uploadType === 'new' && (
                <div 
                    onClick={() => navigate('/ai-editor')}
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-1 cursor-pointer shadow-lg shadow-fuchsia-200 transform transition-transform hover:scale-[1.02]"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center text-white">
                            <div className="bg-white/20 p-2 rounded-lg mr-3">
                                <ImageIcon size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">AI 封面制作</h4>
                                <p className="text-xs text-white/80">让你的作品脱颖而出</p>
                            </div>
                        </div>
                        <div className="bg-white text-fuchsia-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
                            去试试 <ChevronRight size={12} className="ml-1" />
                        </div>
                    </div>
                </div>
            )}
         </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md p-4 px-6 border-t border-slate-100 flex space-x-4 z-30">
        {isPreviewMode ? (
            <button 
                onClick={() => navigate(-1)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl transition-colors"
            >
                返回
            </button>
        ) : (
            <>
                <button 
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl transition-colors"
                  disabled={isUploading}
                >
                  取消
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-[2] bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center"
                  disabled={isUploading}
                >
                  {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        上传中...
                      </>
                  ) : (isEditMode ? '确认修改' : '确认提交')}
                </button>
            </>
        )}
      </div>
    </div>
  );
};

export default UploadWork;
