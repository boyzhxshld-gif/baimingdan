
import React, { useState } from 'react';
import { Shield, Save, Check } from 'lucide-react';

const PermissionManagement: React.FC = () => {
  const roles = [
      { id: 'admin', name: '管理员' },
      { id: 'agent', name: '区域代理' },
      { id: 'judge', name: '评审老师' },
      { id: 'teacher', name: '指导老师' },
      { id: 'school', name: '学校/机构' },
  ];

  const permissions = [
      { category: '核心概览', items: [
          { id: 'view_dashboard', name: '查看工作台' },
          { id: 'manage_platform', name: '平台配置' }
      ]},
      { category: '赛事运营', items: [
          { id: 'create_comp', name: '创建赛事' },
          { id: 'edit_comp', name: '编辑赛事配置' },
          { id: 'publish_comp', name: '发布/下架赛事' },
          { id: 'view_reg', name: '查看报名列表' },
          { id: 'audit_reg', name: '人工审核报名' },
          { id: 'manage_works', name: '作品管理' }
      ]},
      { category: '评审中心', items: [
          { id: 'assign_task', name: '分配评审任务' }, // Judging System
          { id: 'score_work', name: '作品评分' }, // Review Console
          { id: 'manage_promo', name: '晋级/发布成绩' }, // Promotion Management
          { id: 'config_judging', name: '评审配置' } // Judging Config
      ]},
      { category: '系统管理', items: [
          { id: 'manage_user', name: '用户账号管理' },
          { id: 'view_roster', name: '查看考生名单库' },
          { id: 'manage_role', name: '角色权限配置' },
      ]}
  ];

  // Mock initial state
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({
      'admin': ['view_dashboard', 'manage_platform', 'create_comp', 'edit_comp', 'publish_comp', 'view_reg', 'audit_reg', 'manage_works', 'assign_task', 'view_result', 'manage_promo', 'config_judging', 'manage_user', 'view_roster', 'manage_role'],
      'agent': ['view_dashboard', 'view_reg', 'view_result', 'view_roster'],
      'judge': ['score_work', 'view_result'],
      'teacher': ['view_reg'] // Restricted view
  });

  const togglePermission = (roleId: string, permId: string) => {
      setRolePermissions(prev => {
          const current = prev[roleId] || [];
          if (current.includes(permId)) {
              return { ...prev, [roleId]: current.filter(id => id !== permId) };
          } else {
              return { ...prev, [roleId]: [...current, permId] };
          }
      });
  };

  const handleSave = () => {
      alert('权限配置已保存');
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-stone-800 font-serif">角色权限管理</h1>
            <button 
                onClick={handleSave}
                className="bg-[#7f1d1d] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#991b1b] flex items-center transition-colors"
            >
                <Save size={18} className="mr-2" /> 保存配置
            </button>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-6 bg-stone-50 border-b border-r border-stone-200 w-64 text-sm font-bold text-stone-600 sticky left-0 z-10">
                                权限 / 角色
                            </th>
                            {roles.map(role => (
                                <th key={role.id} className="p-4 bg-stone-50 border-b border-stone-200 text-center min-w-[120px]">
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-bold text-stone-800">{role.name}</span>
                                        <span className="text-[10px] text-stone-400 font-mono mt-1">{role.id}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm text-stone-600">
                        {permissions.map((group, groupIdx) => (
                            <React.Fragment key={groupIdx}>
                                {/* Category Header */}
                                <tr className="bg-stone-50/50">
                                    <td colSpan={roles.length + 1} className="px-6 py-3 border-b border-stone-200 font-bold text-stone-800 text-xs uppercase tracking-wider">
                                        {group.category}
                                    </td>
                                </tr>
                                {/* Permission Items */}
                                {group.items.map(perm => (
                                    <tr key={perm.id} className="hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-0">
                                        <td className="p-4 pl-8 border-r border-stone-100 font-medium text-stone-700 bg-white sticky left-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                            {perm.name}
                                        </td>
                                        {roles.map(role => {
                                            const isChecked = rolePermissions[role.id]?.includes(perm.id);
                                            return (
                                                <td key={`${role.id}-${perm.id}`} className="p-4 text-center cursor-pointer" onClick={() => togglePermission(role.id, perm.id)}>
                                                    <div className={`w-6 h-6 rounded-lg border-2 mx-auto flex items-center justify-center transition-all ${
                                                        isChecked 
                                                        ? 'bg-[#7f1d1d] border-[#7f1d1d]' 
                                                        : 'border-stone-200 bg-white hover:border-[#7f1d1d]/50'
                                                    }`}>
                                                        {isChecked && <Check size={14} className="text-white" />}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default PermissionManagement;
