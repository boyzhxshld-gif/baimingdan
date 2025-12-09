import React, { useState } from 'react';
import { Phone, ChevronRight, Send, User } from 'lucide-react';
import Header from '../components/Header';

const Consultation: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
      { id: 1, type: 'system', text: '您好！我是大赛组委会咨询助理，请问有什么可以帮您？' }
  ]);

  const handleSend = () => {
      if (!message.trim()) return;
      setChatHistory([...chatHistory, { id: Date.now(), type: 'user', text: message }]);
      setMessage('');
      // Simulate automated reply
      setTimeout(() => {
          setChatHistory(prev => [...prev, { id: Date.now() + 1, type: 'system', text: '收到您的留言，工作人员稍后会回复您。' }]);
      }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="咨询导演组" />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Contact Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-indigo-100 p-1">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60" alt="Director" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
                      组委会
                  </div>
              </div>
              <h2 className="text-lg font-bold text-slate-800">联系导演组</h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">工作时间: 周一至周五 9:30-16:30</p>
              
              <div className="flex items-center justify-center bg-slate-50 px-4 py-2 rounded-xl text-slate-600 text-xs font-medium">
                  <Phone size={14} className="mr-2" /> 4000-000-000
              </div>
          </div>

          {/* FAQ */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wide">常见问题</h3>
              <div className="space-y-2">
                  {['大赛介绍与赛制规则', '报名须知与费用说明', '作品上传格式要求', '晋级证书发放时间'].map((q, i) => (
                      <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-100" onClick={() => setMessage(q)}>
                          <span className="text-sm text-slate-700">{q}</span>
                          <ChevronRight size={16} className="text-slate-300" />
                      </div>
                  ))}
              </div>
          </div>

          {/* Chat Area Mock */}
          <div className="space-y-4 pb-4">
              {chatHistory.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.type === 'user' 
                          ? 'bg-primary text-white rounded-br-none' 
                          : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-sm'
                      }`}>
                          {msg.text}
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex space-x-3 safe-area-bottom">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="输入您的留言..." 
              />
          </div>
          <button 
            onClick={handleSend}
            className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 hover:bg-blue-600 transition-colors"
          >
              <Send size={20} />
          </button>
      </div>
    </div>
  );
};

export default Consultation;