
import React, { useState } from 'react';

interface JoinScreenProps {
  onJoin: (nickname: string) => void;
}

const JoinScreen: React.FC<JoinScreenProps> = ({ onJoin }) => {
  const [nickname, setNickname] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleJoinClick = () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요!');
      return;
    }
    setShowConfirm(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#f2f2f2]">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-leaf text-4xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">성하리 공식 카페</h1>
          <p className="text-gray-500 mt-2 text-sm">마을 주민들과 소통하기 위해 가입이 필요합니다.</p>
        </div>

        {!showConfirm ? (
          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">닉네임 입력</label>
              <input 
                type="text" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="카페에서 사용할 닉네임"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleJoinClick()}
              />
            </div>
            <button 
              onClick={handleJoinClick}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
            >
              가입하기
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <p className="text-gray-700 font-medium">
                <span className="text-green-600 font-bold">"{nickname}"</span> 님으로<br/>
                성하리 카페에 가입하시겠습니까?
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                아니요
              </button>
              <button 
                onClick={() => onJoin(nickname)}
                className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md"
              >
                네
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-[10px] text-gray-400">
          본 사이트는 농장 시뮬레이션 게임의 설정 가이드입니다.
        </div>
      </div>
    </div>
  );
};

export default JoinScreen;
