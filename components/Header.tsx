
import React from 'react';

interface HeaderProps {
  onMailClick: () => void;
  hasNewMail: boolean;
  nickname: string;
}

const Header: React.FC<HeaderProps> = ({ onMailClick, hasNewMail, nickname }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl">
            <i className="fas fa-home"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-green-600">성하리 공식 카페</h1>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="게시글, 멤버 검색" 
              className="w-full bg-gray-100 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-green-500 text-sm"
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-green-600 relative">
            <i className="far fa-bell text-xl"></i>
          </button>
          <button 
            onClick={onMailClick}
            className="text-gray-600 hover:text-green-600 relative"
          >
            <i className="far fa-envelope text-xl"></i>
            {hasNewMail && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700">{nickname || '나그네'}</span>
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400">
              <i className="fas fa-user text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
