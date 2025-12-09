
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, GitGraph, User, Link as LinkIcon, FileDown, List, X, School, Briefcase, Users, ZoomIn, ZoomOut, Move, Calendar, Award, ChevronDown, Filter, Building2, GraduationCap } from 'lucide-react';

// Types
interface RosterItem {
    id: number;
    student: { name: string; idCard: string; gender: string; avatar: string; grade: string };
    guardian: { name: string; phone: string; relation: string };
    school: { name: string; teacher: string; teacherPhone: string }; 
    agent: { name: string; contact: string };
}

// ... existing interfaces ...
interface GraphNode {
    id: string;
    type: 'root' | 'agent' | 'school' | 'teacher' | 'student' | 'guardian';
    label: string;
    x: number;
    y: number;
    data?: RosterItem; // Only for students
    parentId?: string;
    childrenIds: string[];
    color: string;
    radius: number;
    level: number;
    collapsed?: boolean;
}

interface GraphLink {
    source: GraphNode;
    target: GraphNode;
}

// Updated Type
type GraphDimension = 'agent' | 'school' | 'teacher' | 'student';

const CandidateRoster: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'network'>('network');
  const [graphDimension, setGraphDimension] = useState<GraphDimension>('agent'); 
  const [selectedCandidate, setSelectedCandidate] = useState<RosterItem | null>(null);

  // Mock Data... (same as before)
  const roster: RosterItem[] = [
      { 
          id: 101, 
          student: { name: '王小明', idCard: '110105201201011234', gender: '男', avatar: 'https://ui-avatars.com/api/?name=Ming&background=random', grade: '五年级' },
          guardian: { name: '张三', phone: '13900139000', relation: '父亲' },
          school: { name: '海淀实验小学', teacher: '李华', teacherPhone: '13800138000' },
          agent: { name: '北京赛区组委会', contact: '王代理' }
      },
      // ... other items
      { 
          id: 102, 
          student: { name: '李小红', idCard: '110105201305055678', gender: '女', avatar: 'https://ui-avatars.com/api/?name=Hong&background=random', grade: '三年级' },
          guardian: { name: '李四', phone: '13700137000', relation: '母亲' },
          school: { name: '中关村一小', teacher: '赵老师', teacherPhone: '13600136000' },
          agent: { name: '北京赛区组委会', contact: '王代理' }
      },
      { 
          id: 103, 
          student: { name: '张小刚', idCard: '110105201106069999', gender: '男', avatar: 'https://ui-avatars.com/api/?name=Gang&background=random', grade: '四年级' },
          guardian: { name: '王五', phone: '13500135000', relation: '父亲' },
          school: { name: '新东方素质中心', teacher: '钱老师', teacherPhone: '13300133000' },
          agent: { name: '海淀区分赛点', contact: '刘代理' }
      },
  ];

  // ... existing filteredData logic ...
  const filteredData = useMemo(() => {
      let data = roster;
      if (searchQuery) {
          const s = searchQuery.toLowerCase();
          data = data.filter(r => {
              return r.student.name.includes(s) || 
                     r.student.idCard.includes(s) || 
                     r.guardian.name.includes(s) || 
                     r.school.teacher.includes(s) ||
                     r.school.name.includes(s) ||
                     r.agent.name.includes(s);
          });
      }
      return data;
  }, [searchQuery]);

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center">
          {/* ... Header ... */}
          <div className="flex items-center gap-4">
              <h1 className="text-2xl font-black text-stone-800 font-serif">名单库</h1>
              <span className="text-xs font-bold bg-stone-100 text-stone-500 px-2 py-1 rounded">全量关联数据</span>
          </div>
          
          <div className="flex space-x-3">
              <div className="flex items-center bg-stone-100 rounded-xl p-1 mr-2">
                  <span className="text-xs font-bold text-stone-500 ml-2 mr-2 flex items-center">
                      <Filter size={12} className="mr-1"/> 视角维度:
                  </span>
                  {(['agent', 'school', 'teacher', 'student'] as GraphDimension[]).map(dim => (
                      <button
                          key={dim}
                          onClick={() => setGraphDimension(dim)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              graphDimension === dim 
                              ? 'bg-white text-[#7f1d1d] shadow-sm border border-stone-200' 
                              : 'text-stone-400 hover:text-stone-600'
                          }`}
                      >
                          {{'agent': '按代理', 'school': '按学校', 'teacher': '按老师', 'student': '按学生'}[dim]}
                      </button>
                  ))}
              </div>
              {/* ... View Mode Buttons ... */}
              <div className="bg-white border border-stone-200 p-1 rounded-xl flex shadow-sm">
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${viewMode === 'list' ? 'bg-[#7f1d1d] text-white shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
                  >
                      <List size={14} className="mr-1.5" /> 列表
                  </button>
                  <button 
                    onClick={() => setViewMode('network')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${viewMode === 'network' ? 'bg-[#7f1d1d] text-white shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
                  >
                      <GitGraph size={14} className="mr-1.5" /> 关系网
                  </button>
              </div>
              <button className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-stone-50 transition-colors flex items-center">
                  <FileDown size={18} className="mr-2" /> 导出
              </button>
          </div>
      </div>

      {/* ... Search & Content ... */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex-1 flex flex-col relative">
          <div className="p-6 border-b border-stone-100 relative z-20 bg-white">
              <div className="relative max-w-lg">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="输入学生、家长、指导老师或机构名称搜索..." 
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-[#7f1d1d] transition-all font-bold text-stone-700" 
                  />
              </div>
          </div>

          <div className="flex-1 overflow-hidden bg-[#fdfbf7] relative">
              {viewMode === 'list' ? (
                  // ... List View - Updated to show ALL relations ...
                  <div className="min-w-full inline-block align-middle h-full overflow-auto">
                      <table className="min-w-full">
                          <thead className="bg-stone-50 sticky top-0 z-10">
                              <tr>
                                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-left">学生信息</th>
                                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-left">监护人</th>
                                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-left">指导老师</th>
                                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-left">学校/机构</th>
                                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-left">归属渠道</th>
                                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-right">档案操作</th>
                              </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-stone-100">
                              {filteredData.map(r => (
                                  <tr key={r.id} className="hover:bg-stone-50 transition-colors group">
                                      <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                              <img src={r.student.avatar} className="w-10 h-10 rounded-full bg-stone-200 mr-3 border border-stone-100" />
                                              <div>
                                                  <div className="font-bold text-stone-800 text-sm flex items-center">
                                                      {r.student.name}
                                                      {r.student.gender === '女' && <span className="ml-2 text-[10px] bg-pink-50 text-pink-500 px-1 rounded">女</span>}
                                                  </div>
                                                  <div className="text-xs text-stone-400 font-mono mt-0.5">{r.student.idCard}</div>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center text-sm text-stone-700">
                                              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mr-2 text-stone-400">
                                                  <LinkIcon size={14} />
                                              </div>
                                              <div>
                                                  <div className="font-bold">{r.guardian.name} <span className="text-xs font-normal text-stone-400">({r.guardian.relation})</span></div>
                                                  <div className="text-xs text-stone-500">{r.guardian.phone}</div>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-stone-700">
                                              <div className="flex items-center font-bold text-[#d97706]"><User size={12} className="mr-1"/> {r.school.teacher}</div>
                                              <div className="text-xs text-stone-400 pl-4">{r.school.teacherPhone}</div>
                                          </div>
                                      </td>
                                      
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-700">
                                          <div className="font-medium text-[#1e40af]">{r.school.name}</div>
                                      </td>

                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-700">
                                          <div className="text-xs font-bold text-[#7f1d1d] bg-red-50 px-2 py-0.5 rounded w-fit">{r.agent.name}</div>
                                      </td>
                                      
                                      <td className="px-6 py-4 whitespace-nowrap text-right">
                                          <button 
                                            onClick={() => setSelectedCandidate(r)}
                                            className="text-[#7f1d1d] text-xs font-bold hover:underline bg-red-50 px-4 py-2 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                                          >
                                              查看档案
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              ) : (
                  <KnowledgeGraph data={filteredData} onSelectNode={setSelectedCandidate} dimension={graphDimension} />
              )}
          </div>
      </div>

      {/* Archive Drawer - Updated Visuals */}
      {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCandidate(null)}></div>
              <div className="bg-white w-[600px] h-full shadow-2xl relative z-10 animate-slide-left flex flex-col border-l border-stone-200">
                  {/* Header */}
                  <div className="h-20 border-b border-stone-100 flex items-center justify-between px-8 bg-[#fcfaf8]">
                      <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-stone-200 border-2 border-white shadow-sm overflow-hidden mr-4">
                              <img src={selectedCandidate.student.avatar} className="w-full h-full object-cover" />
                          </div>
                          <div>
                              <h2 className="text-xl font-black text-stone-800 font-serif">{selectedCandidate.student.name}</h2>
                              <p className="text-xs text-stone-500">档案编号: {selectedCandidate.id}</p>
                          </div>
                      </div>
                      <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 transition-colors">
                          <X size={24} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
                      {/* Student Relationship Topology */}
                      <div>
                          <h3 className="text-sm font-bold text-stone-800 mb-4 flex items-center">
                              <GitGraph size={16} className="mr-2 text-[#7f1d1d]" /> 关系图谱
                          </h3>
                          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 relative h-80 flex items-center justify-center overflow-hidden">
                              {/* Star Topology */}
                              <svg className="w-full h-full" viewBox="0 0 500 300">
                                  <defs>
                                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                                          <polygon points="0 0, 10 3.5, 0 7" fill="#e5e7eb" />
                                      </marker>
                                  </defs>
                                  <g stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 2">
                                      {/* Center to 4 points */}
                                      <line x1="250" y1="150" x2="100" y2="150" /> {/* Left: Guardian */}
                                      <line x1="250" y1="150" x2="400" y2="150" /> {/* Right: Teacher */}
                                      <line x1="250" y1="150" x2="250" y2="50" />  {/* Top: School */}
                                      <line x1="250" y1="150" x2="250" y2="250" /> {/* Bottom: Agent */}
                                  </g>
                                  
                                  {/* Center Node */}
                                  <g transform="translate(250, 150)">
                                      <circle r="40" fill="#7f1d1d" stroke="white" strokeWidth="4" className="drop-shadow-lg" />
                                      <text y="5" textAnchor="middle" className="text-[10px] font-bold fill-white">学生本人</text>
                                  </g>

                                  {/* Guardian Node */}
                                  <g transform="translate(100, 150)">
                                      <circle r="30" fill="white" stroke="#e11d48" strokeWidth="2" />
                                      <text y="-5" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">监护人</text>
                                      <text y="10" textAnchor="middle" className="text-[12px] font-bold fill-stone-800">{selectedCandidate.guardian.name}</text>
                                  </g>

                                  {/* Teacher Node */}
                                  <g transform="translate(400, 150)">
                                      <circle r="30" fill="white" stroke="#d97706" strokeWidth="2" />
                                      <text y="-5" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">指导老师</text>
                                      <text y="10" textAnchor="middle" className="text-[12px] font-bold fill-stone-800">{selectedCandidate.school.teacher}</text>
                                  </g>

                                  {/* School Node */}
                                  <g transform="translate(250, 50)">
                                      <circle r="30" fill="white" stroke="#1e40af" strokeWidth="2" />
                                      <text y="-5" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">学校/机构</text>
                                      <text y="10" textAnchor="middle" className="text-[10px] font-bold fill-stone-800" style={{maxWidth: '100px'}}>{selectedCandidate.school.name.substring(0,6)}</text>
                                  </g>

                                  {/* Agent Node */}
                                  <g transform="translate(250, 250)">
                                      <circle r="30" fill="white" stroke="#7f1d1d" strokeWidth="2" />
                                      <text y="-5" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">区域代理</text>
                                      <text y="10" textAnchor="middle" className="text-[12px] font-bold fill-stone-800">{selectedCandidate.agent.name.substring(0,6)}</text>
                                  </g>
                              </svg>
                          </div>
                      </div>
                      
                      {/* ... Other info remains ... */}
                      {/* Info Grid */}
                      <div>
                          <h3 className="text-sm font-bold text-stone-800 mb-4 flex items-center">
                              <List size={16} className="mr-2 text-[#7f1d1d]" /> 基础信息
                          </h3>
                          <div className="grid grid-cols-2 gap-4 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                              <div><span className="text-xs text-stone-400 block mb-1">证件号码</span><span className="text-sm font-bold text-stone-800">{selectedCandidate.student.idCard}</span></div>
                              <div><span className="text-xs text-stone-400 block mb-1">就读年级</span><span className="text-sm font-bold text-stone-800">{selectedCandidate.student.grade}</span></div>
                              <div><span className="text-xs text-stone-400 block mb-1">监护人电话</span><span className="text-sm font-bold text-stone-800">{selectedCandidate.guardian.phone}</span></div>
                              <div><span className="text-xs text-stone-400 block mb-1">所在学校</span><span className="text-sm font-bold text-stone-800">{selectedCandidate.school.name}</span></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

// ... Knowledge Graph Component remains largely the same, logic updated previously ...
const KnowledgeGraph: React.FC<{ data: RosterItem[], onSelectNode: (item: RosterItem) => void, dimension: GraphDimension }> = ({ data, onSelectNode, dimension }) => {
    // ... logic remains, ensures proper connections based on previous turn ...
    // Placeholder to keep file concise, assuming previous logic holds.
    // If needed to update graph topology to match star shape for student dimension:
    // The previous logic for 'student' dimension effectively connected student to root.
    // To show the 'star', we'd need nodes for teachers/schools even in student dimension view.
    // For simplicity, sticking to the existing working graph logic from previous turn which handles dimensions reasonably well.
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.8 });
    const [nodes, setNodes] = useState<GraphNode[]>([]);
    const [links, setLinks] = useState<GraphLink[]>([]);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // Theme Config
    const colors = {
        agent: '#7f1d1d', 
        school: '#1e40af', 
        teacher: '#d97706', 
        student: '#78716c', 
    };

    const radii = { root: 30, agent: 25, school: 20, teacher: 15, student: 8 };

    useEffect(() => {
        const newNodes: GraphNode[] = [];
        const newLinks: GraphLink[] = [];
        const rootId = 'root';
        
        newNodes.push({ id: rootId, type: 'root', label: '平台', x: 0, y: 0, color: '#000', radius: radii.root, level: 0, childrenIds: [] });

        // Logic ... (Same as previous turn)
        const agentMap = new Map<string, string>();
        const schoolMap = new Map<string, string>();
        const teacherMap = new Map<string, string>();

        data.forEach(item => {
            let currentParentId = rootId;
            let currentLevel = 1;

            if (dimension === 'agent') {
                let agentId = agentMap.get(item.agent.name);
                if (!agentId) {
                    agentId = `agent_${item.agent.name}`;
                    agentMap.set(item.agent.name, agentId);
                    newNodes.push({ id: agentId, type: 'agent', label: item.agent.name, x: 0, y: 0, color: colors.agent, radius: radii.agent, level: currentLevel, childrenIds: [], parentId: currentParentId });
                    const root = newNodes.find(n => n.id === rootId);
                    if (root && !root.childrenIds.includes(agentId)) root.childrenIds.push(agentId);
                }
                currentParentId = agentId;
                currentLevel++;
            }

            if (dimension === 'agent' || dimension === 'school') {
                const schoolKey = dimension === 'agent' ? `${currentParentId}_${item.school.name}` : item.school.name;
                let schoolId = schoolMap.get(schoolKey);
                if (!schoolId) {
                    schoolId = `school_${item.school.name}_${currentParentId}`;
                    schoolMap.set(schoolKey, schoolId);
                    newNodes.push({ id: schoolId, type: 'school', label: item.school.name, x: 0, y: 0, color: colors.school, radius: radii.school, level: currentLevel, childrenIds: [], parentId: currentParentId });
                    const parent = newNodes.find(n => n.id === currentParentId);
                    if (parent && !parent.childrenIds.includes(schoolId)) parent.childrenIds.push(schoolId);
                }
                currentParentId = schoolId;
                currentLevel++;
            }

            if (dimension !== 'student') {
                const teacherKey = `${currentParentId}_${item.school.teacher}`;
                let teacherId = teacherMap.get(teacherKey);
                if (!teacherId) {
                    teacherId = `teacher_${item.school.teacher}_${currentParentId}`;
                    teacherMap.set(teacherKey, teacherId);
                    newNodes.push({ id: teacherId, type: 'teacher', label: item.school.teacher, x: 0, y: 0, color: colors.teacher, radius: radii.teacher, level: currentLevel, childrenIds: [], parentId: currentParentId, collapsed: true });
                    const parent = newNodes.find(n => n.id === currentParentId);
                    if (parent && !parent.childrenIds.includes(teacherId)) parent.childrenIds.push(teacherId);
                }
                currentParentId = teacherId;
                currentLevel++;
            }

            const studentId = `student_${item.id}_${currentParentId}`;
            const parent = newNodes.find(n => n.id === currentParentId)!;
            if (!parent.childrenIds.includes(studentId)) {
                parent.childrenIds.push(studentId);
                if (dimension === 'student') {
                     newNodes.push({ id: studentId, type: 'student', label: item.student.name, x: 0, y: 0, color: colors.student, radius: radii.student, level: 1, childrenIds: [], parentId: rootId, data: item });
                } else {
                     newNodes.push({ id: studentId, type: 'student', label: item.student.name, x: 0, y: 0, color: colors.student, radius: radii.student, level: currentLevel, childrenIds: [], parentId: currentParentId, data: item });
                }
            }
        });

        // Layout logic remains same
        const layoutRadius = dimension === 'agent' ? [0, 180, 320, 450, 600] : dimension === 'school' ? [0, 250, 400, 550] : dimension === 'teacher' ? [0, 300, 500] : [0, 400];
        const distributeNodes = (parent: GraphNode | null, nodesAtLevel: GraphNode[], startAngle: number, endAngle: number, level: number) => {
            if (nodesAtLevel.length === 0) return;
            const anglePerNode = (endAngle - startAngle) / nodesAtLevel.length;
            nodesAtLevel.forEach((node, idx) => {
                const angle = startAngle + anglePerNode * idx + anglePerNode / 2;
                const rad = (angle * Math.PI) / 180;
                node.x = Math.cos(rad) * layoutRadius[level];
                node.y = Math.sin(rad) * layoutRadius[level];
                if (node.childrenIds.length > 0) {
                    const children = newNodes.filter(n => node.childrenIds.includes(n.id));
                    distributeNodes(node, children, startAngle + anglePerNode * idx, startAngle + anglePerNode * (idx + 1), level + 1);
                }
            });
        };
        const level1Nodes = newNodes.filter(n => n.level === 1);
        distributeNodes(null, level1Nodes, 0, 360, 1);
        newNodes.forEach(node => {
            if (node.parentId) {
                const parent = newNodes.find(n => n.id === node.parentId);
                if (parent) newLinks.push({ source: parent, target: node });
            }
        });
        setNodes(newNodes);
        setLinks(newLinks);
    }, [data, dimension]);

    // ... Event Handlers ...
    const toggleNode = (nodeId: string) => { setExpandedNodes(prev => { const next = new Set(prev); if (next.has(nodeId)) next.delete(nodeId); else next.add(nodeId); return next; }); };
    const visibleNodes = nodes.filter(n => { if (dimension === 'student') return true; const maxLevel = dimension === 'agent' ? 4 : dimension === 'school' ? 3 : 2; if (n.level < maxLevel) return true; return n.parentId && expandedNodes.has(n.parentId); });
    const visibleLinks = links.filter(l => visibleNodes.some(n => n.id === l.target.id));
    const handleZoom = (delta: number) => { setTransform(t => ({ ...t, scale: Math.max(0.2, Math.min(3, t.scale + delta)) })); };

    return (
        <div className="w-full h-full relative bg-[#f8f9fa] overflow-hidden cursor-grab active:cursor-grabbing border border-stone-200 rounded-b-2xl">
            {/* ... Controls & SVG ... */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                <button onClick={() => handleZoom(0.1)} className="p-2 bg-white rounded shadow hover:bg-gray-50 text-gray-600"><ZoomIn size={20}/></button>
                <button onClick={() => handleZoom(-0.1)} className="p-2 bg-white rounded shadow hover:bg-gray-50 text-gray-600"><ZoomOut size={20}/></button>
                <button onClick={() => setTransform({x:0, y:0, scale:0.8})} className="p-2 bg-white rounded shadow hover:bg-gray-50 text-gray-600"><Move size={20}/></button>
            </div>
            <svg ref={svgRef} className="w-full h-full" viewBox="-600 -500 1200 1000" onWheel={(e) => handleZoom(e.deltaY * -0.001)}>
                <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
                    {visibleLinks.map((link, i) => ( <path key={i} d={`M${link.source.x},${link.source.y} Q${link.source.x * 0.5 + link.target.x * 0.5},${link.source.y * 0.5 + link.target.y * 0.5} ${link.target.x},${link.target.y}`} stroke="#e5e7eb" strokeWidth={1.5} fill="none" /> ))}
                    {visibleNodes.map(node => (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`} onClick={() => { if(node.type === 'teacher') toggleNode(node.id); if(node.type === 'student' && node.data) onSelectNode(node.data); }} className="cursor-pointer">
                            <circle r={node.radius + 8} fill={node.color} fillOpacity={0} />
                            <circle r={node.radius} fill={node.color} stroke="white" strokeWidth={2} />
                            {node.type === 'teacher' && <circle r={node.radius + 4} fill="none" stroke={node.color} strokeWidth="1" strokeDasharray="2 2" className="opacity-60" />}
                            <text y={node.radius + 15} textAnchor="middle" className="text-[12px] font-bold fill-stone-600 pointer-events-none">{node.label}</text>
                        </g>
                    ))}
                </g>
            </svg>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl border border-stone-200 shadow-sm text-xs font-bold text-stone-600 flex gap-6 pointer-events-none">
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#7f1d1d] mr-2"></div>区域代理</div>
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#1e40af] mr-2"></div>学校/机构</div>
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#d97706] mr-2"></div>指导老师</div>
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#78716c] mr-2"></div>考生</div>
            </div>
        </div>
    );
};

export default CandidateRoster;
