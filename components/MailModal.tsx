
import React, { useState } from 'react';

interface MailModalProps {
  onClose: () => void;
}

const MailModal: React.FC<MailModalProps> = ({ onClose }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const mails = [
    {
      id: 1,
      from: '성하리 이장',
      subject: '입주를 환영.함세~~!.',
          content: '나,,, 성하리. 이장일세~!\n우리. 마을에서,,, 살게. 된걸,,, 진심으로,,, 축하하네,,,!!\n모르는게,,, 있으면,,, 우리. 면사무소,,, 깐깐한~~,, 한도준이한테,,, 물어보고!\n그럼,,, 잘 부탁...한다~!!\n- 성하리의,,, 희망,,, 이장. 올림 -',
      time: '방금 전'
    },
    {
      id: 2,
      from: '한도준 (면사무소)',
      subject: '전입신고 및 관련 절차 안내',
        content: '안녕하십니까, 성하리 면무소 행정복지팀 한도준입니다.\n귀하의 성하리 전입 소식을 확인하였습니다.\n주민등록법 제16조에 의거하여 거주지 이동 후 14일 이내에 전입 신고를 완료해야 합니다.\n이에 본인 확인을 위한 신분증을 지참하시어 업무 시간 내에 면사무소를 방문해 주시기 바랍니다.\n기한 내 미신고 시 관련 법령에 따라 불이익이 발생할 수 있음을 알려드립니다.',
      time: '10분 전'
    }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-green-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <i className="fas fa-envelope text-green-600"></i>
            주민 우편함
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Mail List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {mails.map((mail) => (
              <div 
                key={mail.id} 
                className={`p-6 transition-all cursor-pointer ${expandedId === mail.id ? 'bg-green-50/30' : 'hover:bg-gray-50'}`}
                onClick={() => setExpandedId(expandedId === mail.id ? null : mail.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-green-600 px-1.5 py-0.5 bg-green-100 rounded">FROM: {mail.from}</span>
                      <span className="text-[10px] text-gray-400">{mail.time}</span>
                    </div>
                    <h4 className={`font-bold text-gray-900 text-lg transition-colors ${expandedId === mail.id ? 'text-green-700' : ''}`}>
                      {mail.subject}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded font-bold">중요</span>
                    <i className={`fas fa-chevron-down text-gray-300 transition-transform duration-300 ${expandedId === mail.id ? 'rotate-180' : ''}`}></i>
                  </div>
                </div>
                
                {expandedId === mail.id && (
                  <div className="mt-4 bg-white p-5 rounded-xl text-sm text-gray-700 whitespace-pre-line leading-relaxed border border-green-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    {mail.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">우편물은 성하리 주민들에게서 발송됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default MailModal;
