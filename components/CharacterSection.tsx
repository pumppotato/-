
import React, { useState } from 'react';
import { CHARACTERS } from '../constants';
import { Character } from '../types';

const CharacterSection: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const closeModal = () => setSelectedCharacter(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">성하리 주민 명부</h2>
        <p className="text-gray-500 text-sm mt-1">마을을 지키는 소중한 주민들의 프로필입니다.</p>
      </div>

      {/* 3 columns on medium screens, 2 rows of 3 = 6 characters */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {CHARACTERS.map((char) => (
          <div 
            key={char.id} 
            onClick={() => setSelectedCharacter(char)}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-green-500 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center"
          >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 mb-4 relative">
              <img 
                src={char.thumbnailUrl} 
                alt={char.name} 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-300" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800 text-base">{char.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{char.age}세 · {char.job}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={closeModal}
          ></div>
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-gray-800 z-10 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-[3/4] md:aspect-auto h-80 md:h-auto overflow-hidden">
                <img 
                  src={selectedCharacter.imageUrl} 
                  alt={selectedCharacter.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{selectedCharacter.job}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">{selectedCharacter.mbti}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedCharacter.name} <span className="text-sm font-normal text-gray-400">({selectedCharacter.age}세)</span></h3>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">소개</h4>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {selectedCharacter.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase">성격</h4>
                      <p className="text-xs text-gray-700 font-medium">{selectedCharacter.personality}</p>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://share.crack.wrtn.ai/x6pqrh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fas fa-comment"></i> 대화하기
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSection;
