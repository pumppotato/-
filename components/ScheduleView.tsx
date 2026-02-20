
import React, { useState } from 'react';
import { SCHEDULE } from '../constants';

const ScheduleView: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const seasonInfo = {
    spring: { icon: '🌸', label: '봄', color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-200', accent: 'bg-pink-500' },
    summer: { icon: '☀️', label: '여름', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-500' },
    autumn: { icon: '🍂', label: '가을', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', accent: 'bg-orange-500' },
    winter: { icon: '❄️', label: '겨울', color: 'text-blue-300', bg: 'bg-blue-50', border: 'border-blue-100', accent: 'bg-blue-300' },
  };

  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const getEventForDay = (day: number) => {
    return SCHEDULE[activeSeason].find(e => parseInt(e.day) === day);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">성하리 마을 일정</h2>
        <p className="text-gray-500 text-sm mt-1">마을의 주요 행사와 주민들의 생일 일정입니다. (각 계절은 28일로 구성됩니다.)</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Season Navigation */}
        <div className="flex border-b border-gray-100">
          {(Object.keys(seasonInfo) as Array<keyof typeof seasonInfo>).map((season) => (
            <button
              key={season}
              onClick={() => {
                setActiveSeason(season);
                setSelectedDay(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all border-b-2 ${
                activeSeason === season 
                  ? `${seasonInfo[season].color} border-current bg-gray-50` 
                  : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{seasonInfo[season].icon}</span>
              {seasonInfo[season].label}
            </button>
          ))}
        </div>

        {/* Schedule Content */}
        <div className="p-4 md:p-8">
          <div className={`rounded-2xl border-2 ${seasonInfo[activeSeason].border} ${seasonInfo[activeSeason].bg} p-4 md:p-8`}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">{seasonInfo[activeSeason].icon}</span>
              <div>
                <h3 className={`text-2xl font-black ${seasonInfo[activeSeason].color}`}>
                  {seasonInfo[activeSeason].label}의 성하리
                </h3>
                <p className="text-gray-500 text-sm">달력에서 일정을 확인해보세요.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                    <div key={d} className="text-xs text-center text-gray-400 font-bold py-2">{d}</div>
                  ))}
                  {days.map(day => {
                    const event = getEventForDay(day);
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`
                          aspect-square flex flex-col items-center justify-center rounded-xl transition-all relative group
                          ${event ? 'bg-white shadow-sm' : 'hover:bg-white/50'}
                          ${isSelected ? `ring-4 ring-offset-2 ${seasonInfo[activeSeason].border.replace('border', 'ring')}` : ''}
                        `}
                      >
                        <span className={`text-sm font-bold ${event ? seasonInfo[activeSeason].color : 'text-gray-400'}`}>
                          {day}
                        </span>
                        {event && (
                          <div className={`w-1.5 h-1.5 rounded-full mt-1 ${seasonInfo[activeSeason].accent}`}></div>
                        )}
                        {event && (
                          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-current opacity-20"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event Detail Panel */}
              <div className="flex flex-col">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-sm flex-1 flex flex-col">
                  <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">일정 상세</h4>
                  {selectedDay ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className={`text-4xl font-black ${seasonInfo[activeSeason].color}`}>{selectedDay}</span>
                        <span className="text-gray-400 font-bold">일</span>
                      </div>
                      {getEventForDay(selectedDay) ? (
                        <div>
                          <p className="text-xl font-bold text-gray-800 leading-tight">
                            {getEventForDay(selectedDay)?.event}
                          </p>
                          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <p className="text-xs text-gray-500 leading-relaxed">
                              성하리 마을의 소중한 일정입니다. <br/>
                              참여를 원하시는 주민분들은 마을 회관으로 모여주세요!
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm italic">이 날은 특별한 일정이 없습니다.</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                      <i className={`fas fa-calendar-alt text-4xl mb-4 ${seasonInfo[activeSeason].color}`}></i>
                      <p className="text-sm font-bold text-gray-500">달력에서 날짜를 <br/> 선택해주세요.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
