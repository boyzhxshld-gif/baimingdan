import React, { useState, useRef } from 'react';
import { Camera, Upload, Wand2, AlertCircle, Loader2, Download, RefreshCw, Image as ImageIcon, X } from 'lucide-react';
import Header from '../components/Header';
import { editImageWithGemini } from '../services/geminiService';

const AIEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) {
      setError("请先上传图片");
      return;
    }
    if (!prompt.trim()) {
      setError("请输入修改指令");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await editImageWithGemini(selectedImage, prompt);
      
      if (result.error) {
        setError(result.error);
      } else if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      }
    } catch (e) {
      setError("生成失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="AI 创意工坊" />
      
      <div className="flex-1 p-5 flex flex-col overflow-y-auto pb-8 animate-fade-in">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2rem] p-6 text-white mb-6 shadow-lg shadow-fuchsia-200/50 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -mb-10 -ml-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
                <div className="bg-white/20 p-2.5 rounded-xl mr-3 backdrop-blur-md border border-white/20">
                    <Wand2 size={24} className="text-white" />
                </div>
                <div>
                   <h2 className="text-xl font-black tracking-tight">Nano Banana 魔术师</h2>
                   <p className="text-white/70 text-xs font-medium">Powered by Gemini 2.5 Flash Image</p>
                </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed font-medium bg-black/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
              "把背景换成科技感舞台" <br/> "添加星空滤镜"
            </p>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 min-h-[350px] bg-white rounded-3xl border border-slate-200 shadow-soft relative overflow-hidden mb-6 group">
          {generatedImage ? (
            <div className="w-full h-full relative flex flex-col">
                <div className="flex-1 relative bg-slate-100">
                   <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                       onClick={() => setGeneratedImage(null)}
                       className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors backdrop-blur-md"
                    >
                       <RefreshCw size={18} />
                    </button>
                    <a 
                      href={generatedImage} 
                      download="ai-generated.png"
                      className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center hover:bg-primary-dark transition-colors"
                    >
                       <Download size={16} className="mr-2" /> 保存
                    </a>
                </div>
                <div className="bg-green-50 p-2 text-center text-green-600 text-xs font-bold border-t border-green-100">
                   AI 生成成功
                </div>
            </div>
          ) : selectedImage ? (
            <div className="w-full h-full relative bg-slate-100">
                <img src={selectedImage} alt="Original" className="w-full h-full object-contain" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white/80 text-slate-700 p-2 rounded-full hover:bg-white transition-colors shadow-sm backdrop-blur-md"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
                   原始图片
                </div>
            </div>
          ) : (
            <div 
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors border-2 border-dashed border-slate-100 m-1 rounded-[1.4rem]"
                onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Camera size={32} className="text-violet-500" />
              </div>
              <p className="text-slate-800 font-bold text-lg">点击上传图片</p>
              <p className="text-slate-400 text-sm mt-1">支持 JPG, PNG 格式</p>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-violet-600 z-20">
              <div className="relative">
                 <div className="w-16 h-16 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                 <Wand2 size={24} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 text-violet-600 animate-pulse" />
              </div>
              <p className="font-bold text-lg text-slate-800">AI 正在施展魔法...</p>
              <p className="text-slate-400 text-sm mt-1">这可能需要几秒钟</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-white p-5 rounded-[2rem] shadow-soft border border-slate-100 space-y-4">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
          
          <div className="flex space-x-3">
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors active:scale-95"
             >
               <ImageIcon size={24} />
             </button>
             <div className="flex-1 relative">
                <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="描述你想如何修改图片..."
                    className="w-full h-full pl-5 pr-10 py-3 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-violet-200 outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <Wand2 size={18} className="absolute right-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-violet-400" />
             </div>
          </div>

          {error && (
            <div className="flex items-center text-red-600 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100 animate-fade-in">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={isLoading || !selectedImage}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center ${
              isLoading || !selectedImage 
                ? 'bg-slate-300 cursor-not-allowed shadow-none text-slate-100' 
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-fuchsia-500/30'
            }`}
          >
            {isLoading ? (
                <>
                   <Loader2 size={20} className="animate-spin mr-2" />
                   生成中...
                </>
            ) : '立即生成'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIEditor;
