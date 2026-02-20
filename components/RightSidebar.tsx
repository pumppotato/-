
import React, { useState } from 'react';

const SCHEDULE = {
  spring: [
    { day: '04', event: '이장님 생일' },
    { day: '13', event: '봄꽃 축제' },
    { day: '20', event: '강이현 생일' },
    { day: '25', event: '모내기 대작전' },
    { day: '28', event: '한도준 생일' },
  ],
  summer: [
    { day: '01', event: '해변 축제' },
    { day: '07', event: '백승우 생일' },
    { day: '15', event: '밤 계곡 축제' },
    { day: '21', event: '써니 생일' },
    { day: '28', event: '태풍 대비의 날' },
  ],
  autumn: [
    { day: '05', event: '청년회장 생일' },
    { day: '10', event: '체육대회' },
    { day: '12', event: '장석두 생일' },
    { day: '20', event: '보름달 야시장' },
    { day: '28', event: '월동준비' },
  ],
  winter: [
    { day: '01', event: '김장 전쟁' },
    { day: '07', event: '얼음 낚시 축제' },
    { day: '14', event: '윤세희 생일' },
    { day: '20', event: '부녀회장 생일' },
    { day: '24', event: '눈꽃 조명 축제' },
    { day: '28', event: '제야의 종소리와 소원 빌기' },
  ]
};

const RightSidebar: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const seasonInfo = {
    spring: { icon: '🌸', label: '봄', color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-200' },
    summer: { icon: '☀️', label: '여름', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    autumn: { icon: '🍂', label: '가을', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    winter: { icon: '❄️', label: '겨울', color: 'text-blue-300', bg: 'bg-blue-50', border: 'border-blue-100' },
  };

  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const currentSeasonEvents = SCHEDULE[activeSeason];

  const getEventForDay = (day: number) => {
    return currentSeasonEvents.find(e => parseInt(e.day) === day);
  };

  return (
    <div className="space-y-6">
      {/* Notice Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-sm">공지사항</h3>
          <button className="text-gray-400 text-xs hover:underline">전체보기</button>
        </div>
        <ul className="space-y-3">
          <li className="flex gap-2 items-start text-sm">
            <span className="text-green-600 font-bold">•</span>
            <p className="text-gray-600 hover:underline cursor-pointer line-clamp-1">신규 입주자 안내</p>
          </li>
          <li className="flex gap-2 items-start text-sm">
            <span className="text-green-600 font-bold">•</span>
            <p className="text-gray-600 hover:underline cursor-pointer line-clamp-1">여름 휴가 맞이 낚시 대회 이벤트!</p>
          </li>
          <li className="flex gap-2 items-start text-sm">
            <span className="text-green-600 font-bold">•</span>
            <p className="text-gray-600 hover:underline cursor-pointer line-clamp-1">안전한 마을 생활을 위한 에티켓</p>
          </li>
        </ul>
      </div>

      {/* Community Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="font-bold text-gray-800 text-sm mb-4">마을 현황</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">오늘 방문</p>
            <p className="font-bold text-green-600">1,245</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">전체 게시글</p>
            <p className="font-bold text-gray-800">42.8k</p>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-sm p-5 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium opacity-80">햇살마을 날씨</p>
            <h4 className="text-2xl font-bold mt-1">24°C</h4>
            <p className="text-xs mt-1">맑음, 농사짓기 딱 좋은 날!</p>
          </div>
          <i className="fas fa-sun text-4xl text-yellow-300"></i>
        </div>
      </div>

      {/* Village Schedule Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-sm">마을 일정</h3>
        </div>
        
        {/* Season Tabs */}
        <div className="flex justify-between mb-4 border-b border-gray-100 pb-2">
          {(Object.keys(seasonInfo) as Array<keyof typeof seasonInfo>).map((season) => (
            <button
              key={season}
              onClick={() => {
                setActiveSeason(season);
                setHoveredDay(null);
              }}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                activeSeason === season ? 'bg-gray-100' : 'hover:bg-gray-50 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-lg">{seasonInfo[season].icon}</span>
              <span className={`text-[10px] font-bold ${activeSeason === season ? seasonInfo[season].color : 'text-gray-500'}`}>
                {seasonInfo[season].label}
              </span>
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="mb-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map(d => (
              <div key={d} className="text-[10px] text-center text-gray-400 font-medium">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map(day => {
              const event = getEventForDay(day);
              return (
                <div
                  key={day}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`
                    aspect-square flex items-center justify-center text-[11px] rounded-md cursor-default transition-all relative
                    ${event ? `${seasonInfo[activeSeason].bg} ${seasonInfo[activeSeason].color} font-bold border ${seasonInfo[activeSeason].border}` : 'text-gray-400 hover:bg-gray-50'}
                    ${hoveredDay === day ? 'ring-2 ring-inset ring-gray-200' : ''}
                  `}
                >
                  {day}
                  {event && <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${seasonInfo[activeSeason].color.replace('text', 'bg')}`}></span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Detail */}
        <div className={`min-h-[60px] rounded-lg p-3 ${seasonInfo[activeSeason].bg} border ${seasonInfo[activeSeason].border} transition-all duration-300`}>
          {hoveredDay && getEventForDay(hoveredDay) ? (
            <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
              <p className={`text-[10px] font-bold ${seasonInfo[activeSeason].color} mb-1`}>{hoveredDay}일 일정</p>
              <p className="text-xs text-gray-800 font-bold">{getEventForDay(hoveredDay)?.event}</p>
            </div>
          ) : (
            <div className="flex flex-col justify-center h-full opacity-50">
              <p className="text-[10px] text-gray-500">날짜에 마우스를 올려</p>
              <p className="text-[10px] text-gray-500">일정을 확인해보세요.</p>
            </div>
          )}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="font-bold text-gray-800 text-sm mb-3">인기 태그</h3>
        <div className="flex flex-wrap gap-2">
          {['#사과수확', '#첫만남', '#낚시대회', '#이장님짱', '#귀농일기', '#로맨스'].map(tag => (
            <span key={tag} className="text-xs text-gray-500 hover:text-green-600 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
