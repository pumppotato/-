
import React from 'react';
import { PostCategory } from '../types';

interface SidebarProps {
  activeTab: PostCategory | 'characters';
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 bg-green-50 border-b border-green-100">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">공식카페</span>
          <span className="text-[10px] text-gray-400">Since 2024.05</span>
        </div>
        <h2 className="font-bold text-lg text-gray-800 leading-tight">성하리 공식 카페</h2>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <p className="text-xs text-gray-600">멤버 3,402명 | <span className="text-green-600 font-bold">새글 24</span></p>
        </div>
      </div>
      
      <nav className="p-2">
        <div className="text-[11px] font-bold text-gray-400 px-4 py-2 uppercase tracking-wider">Main Boards</div>
        <button
          onClick={() => setActiveTab('all')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'all' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-list-ul w-5"></i>
          전체글 보기
        </button>
        <button
          onClick={() => setActiveTab('notice')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'notice' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-bullhorn w-5"></i>
          공지사항
        </button>

        <div className="border-t border-gray-100 my-2"></div>
        <div className="text-[11px] font-bold text-gray-400 px-4 py-2 uppercase tracking-wider">Village Life</div>
        <button
          onClick={() => setActiveTab('characters')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'characters' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-users w-5"></i>
          주민 소식 (NPC)
        </button>
        <button
          onClick={() => setActiveTab('suggestion')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'suggestion' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-edit w-5"></i>
          건의사항 (면사무소)
        </button>
        <button
          onClick={() => setActiveTab('praise')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'praise' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-thumbs-up w-5"></i>
          칭찬합시다
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
