import { Brain, Mic, MonitorPlay, User, BookOpen, MessageCircle, PenTool, Video, Globe, Languages } from 'lucide-react';

export const CATEGORIES = [
  { id: 'debate', name: '辩论', icon: MessageCircle },
  { id: 'speech', name: '演讲', icon: Mic },
  { id: 'host', name: '主持', icon: User },
  { id: 'interview', name: '采访', icon: Video },
  { id: 'commentary', name: '解说', icon: MonitorPlay },
  { id: 'reading', name: '经典诵读', icon: BookOpen },
  { id: 'crosstalk', name: '相声', icon: Languages },
  { id: 'drama', name: '戏剧', icon: PenTool },
  { id: 'ai', name: '语言科技', icon: Brain, isSpecial: true },
  { id: 'english', name: '英文演讲', icon: Globe },
];

export const SCHOOL_LEVELS = [
  { id: 'primary', label: '小学' },
  { id: 'junior', label: '初中' },
  { id: 'senior', label: '高中/职高' },
];