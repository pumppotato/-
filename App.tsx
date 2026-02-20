
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import CharacterSection from './components/CharacterSection';
import ScheduleView from './components/ScheduleView';
import RightSidebar from './components/RightSidebar';
import MailModal from './components/MailModal';
import JoinScreen from './components/JoinScreen';
import { PostCategory } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PostCategory | 'characters' | 'schedule'>('all');
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [hasNewMail, setHasNewMail] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const savedNickname = localStorage.getItem('cafe_nickname');
    if (savedNickname) {
      setNickname(savedNickname);
      setIsJoined(true);
    }
  }, []);

  const handleJoin = (name: string) => {
    setNickname(name);
    setIsJoined(true);
    localStorage.setItem('cafe_nickname', name);
  };

  const handleReset = () => {
    if (window.confirm('카페를 탈퇴하시겠습니까? 가입 정보가 초기화됩니다.')) {
      localStorage.removeItem('cafe_nickname');
      setIsJoined(false);
      setNickname('');
    }
  };

  if (!isJoined) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        nickname={nickname}
        onMailClick={() => {
          setIsMailOpen(true);
          setHasNewMail(false);
        }} 
        hasNewMail={hasNewMail}
        onReset={handleReset}
      />
      
      <main className="flex-1 max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Left Sidebar - Navigation */}
        <div className="md:w-64 flex-shrink-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Center Content - Main Area */}
        <div className="flex-1 space-y-6">
          {(activeTab === 'all' || activeTab === 'notice' || activeTab === 'suggestion' || activeTab === 'praise') && (
            <Feed category={activeTab} />
          )}
          {activeTab === 'characters' && <CharacterSection />}
          {activeTab === 'schedule' && <ScheduleView />}
        </div>

        {/* Right Sidebar - Community Stats & Info */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <RightSidebar />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 성하리 공식 카페. {nickname}님 환영합니다!</p>
        <p className="mt-2 text-[10px] opacity-60">본 사이트는 농장 시뮬레이션 및 로맨스 챗봇 게임의 설정 가이드입니다.</p>
      </footer>

      {isMailOpen && <MailModal onClose={() => setIsMailOpen(false)} />}
    </div>
  );
};

export default App;
