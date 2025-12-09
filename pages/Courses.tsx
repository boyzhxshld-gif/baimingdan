
import React, { useState } from 'react';
import { Search, Play, MonitorPlay } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<'all' | 'free' | 'premium'>('all');
  const [activeGrade, setActiveGrade] = useState<'all' | 'primary' | 'junior' | 'senior'>('all');

  const courses = [
    {
      id: 1,
      title: '零基础学演讲：如何克服上台紧张',
      instructor: '张教授',
      role: '传媒大学教授',
      views: '5.2w',
      lessons: 12,
      category: 'speech',
      type: 'free',
      grade: 'primary',
      image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      title: '经典古诗文诵读技巧与发声训练',
      instructor: '李老师',
      role: '国家一级演员',
      views: '3.8w',
      lessons: 8,
      category: 'reading',
      type: 'premium',
      grade: 'junior',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      title: '少年主持人风采展示与控场艺术',
      instructor: '王主持',
      role: '知名节目主持人',
      views: '2.5w',
      lessons: 15,
      category: 'host',
      type: 'free',
      grade: 'senior',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      title: '如何写出打动人心的演讲稿',
      instructor: '赵作家',
      role: '著名儿童文学作家',
      views: '4.1w',
      lessons: 10,
      category: 'writing',
      type: 'free',
      grade: 'junior',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=60'
    },
    {
        id: 5,
        title: '英语演讲与国际礼仪',
        instructor: 'Sarah Smith',
        role: '资深外教',
        views: '1.9w',
        lessons: 20,
        category: 'speech',
        type: 'premium',
        grade: 'senior',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60'
    }
  ];

  const filteredCourses = courses.filter(c => {
      const matchType = activeType === 'all' || c.type === activeType;
      const matchGrade = activeGrade === 'all' || c.grade === activeGrade;
      return matchType && matchGrade;
  });

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Header title="名师公益课" />
      
      {/* Filters Container */}
      <div className="bg-white px-5 py-4 shadow-sm sticky top-14 z-20 border-b border-stone-100 space-y-3">
        {/* Type Filter (Buttons) */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
            {[
                { id: 'all', label: '全部课程' },
                { id: 'free', label: '免费公益' },
                { id: 'premium', label: '精品课程' }
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveType(item.id as any)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        activeType === item.id
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    {item.label}
                </button>
            ))}
        </div>

        {/* Grade Filter (Chips) */}
        <div className="flex items-center justify-between">
            <div className="flex space-x-2">
                {[
                    { id: 'all', label: '全部年级' },
                    { id: 'primary', label: '小学' },
                    { id: 'junior', label: '初中' },
                    { id: 'senior', label: '高中' }
                ].map(grade => (
                    <button
                        key={grade.id}
                        onClick={() => setActiveGrade(grade.id as any)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                            activeGrade === grade.id
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
                        }`}
                    >
                        {grade.label}
                    </button>
                ))}
            </div>
            <div className="text-[10px] text-stone-400 font-bold">
                共 {filteredCourses.length} 门
            </div>
        </div>
      </div>

      <div className="p-5 pb-24 space-y-4 animate-slide-up">
        {filteredCourses.map(course => (
            <div 
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 flex gap-4 cursor-pointer hover:border-primary/30 transition-all group"
            >
                <div className="w-28 h-28 rounded-xl bg-stone-200 relative overflow-hidden flex-shrink-0">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10"></div>
                    {course.type === 'free' ? (
                        <div className="absolute top-0 left-0 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-br-lg shadow-sm">免费</div>
                    ) : (
                        <div className="absolute top-0 left-0 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-br-lg shadow-sm">精品</div>
                    )}
                    <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 rounded flex items-center">
                        <MonitorPlay size={10} className="mr-1" /> {course.lessons}节
                    </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                        <h3 className="font-bold text-stone-800 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors font-serif">
                            {course.title}
                        </h3>
                        <div className="flex items-center text-xs text-stone-500 mb-1">
                            <span className="font-medium text-stone-700 mr-2">{course.instructor}</span>
                            <span className="text-[10px] bg-stone-50 px-1 rounded text-stone-400 border border-stone-100">{course.role}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-stone-400 border-t border-stone-50 pt-2">
                        <span className="flex items-center">
                            <Play size={12} className="mr-1 fill-stone-300" /> {course.views}次学习
                        </span>
                        <button className="bg-primary/5 text-primary px-3 py-1 rounded-full font-bold text-[10px] group-hover:bg-primary group-hover:text-white transition-colors">
                            立即学习
                        </button>
                    </div>
                </div>
            </div>
        ))}
        
        {filteredCourses.length === 0 && (
             <div className="text-center py-20 text-stone-400">
                <Search size={40} className="mx-auto mb-2 opacity-20" />
                <p className="text-xs">暂无符合条件的课程</p>
             </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
