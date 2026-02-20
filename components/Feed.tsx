
import React from 'react';
import { MOCK_POSTS, CHARACTERS } from '../constants';
import { PostCategory } from '../types';

interface FeedProps {
  category: PostCategory;
}

const Feed: React.FC<FeedProps> = ({ category }) => {
  const filteredPosts = category === 'all' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === category);

  const getAuthorThumbnail = (authorName: string) => {
    const character = CHARACTERS.find(c => c.name === authorName);
    if (character) return character.thumbnailUrl;
    
    // Ijang has no profile picture as per concept
    if (authorName === '최이장' || authorName === '이장') return null;
    
    return `https://picsum.photos/seed/${authorName}/100/100`;
  };

  return (
    <div className="space-y-5">
      {/* Category Title */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center justify-between">
        <h3 className="font-bold text-gray-800">
          {category === 'all' && '전체글 보기'}
          {category === 'notice' && '공지사항'}
          {category === 'suggestion' && '건의사항 (면사무소)'}
          {category === 'praise' && '칭찬합시다'}
        </h3>
        <span className="text-xs text-gray-400">정렬: 최신순</span>
      </div>

      {/* Writing Box (Hidden on Notice board) */}
      {category !== 'notice' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-200">
              <i className="fas fa-user text-sm"></i>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg p-3 text-gray-400 text-sm cursor-pointer hover:bg-gray-200 transition-colors">
              주민들에게 전하고 싶은 이야기를 남겨보세요...
            </div>
          </div>
        </div>
      )}

      {/* Post List */}
      {filteredPosts.length > 0 ? filteredPosts.map((post) => (
        <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100 overflow-hidden">
                  {(CHARACTERS.some(c => c.name === post.author) || post.author === '최이장' || post.author === '이장') && getAuthorThumbnail(post.author) ? (
                    <img src={getAuthorThumbnail(post.author)!} className="w-full h-full object-cover" alt={post.author} />
                  ) : (
                    <i className="fas fa-user text-xl"></i>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{post.author}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{post.time}</p>
                </div>
              </div>
            <div className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">
              {post.category}
            </div>
          </div>
          
          <div className="px-5 pb-5">
            <div className="text-gray-800 leading-relaxed text-sm">
              {(() => {
                const lines = post.content.split('\n');
                const firstLine = lines[0];
                const rest = lines.slice(1).join('\n');
                
                if (firstLine.startsWith('[') && firstLine.includes(']')) {
                  return (
                    <>
                      <div className="text-base font-extrabold mb-3 text-gray-900 tracking-tight">
                        {firstLine}
                      </div>
                      <div className="whitespace-pre-line opacity-90">
                        {rest.trim()}
                      </div>
                    </>
                  );
                }
                return <div className="whitespace-pre-line">{post.content}</div>;
              })()}
            </div>
          </div>

          <div className="px-5 py-3 border-t border-gray-50 flex items-center gap-6">
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 font-medium transition-colors">
              <i className="far fa-thumbs-up"></i> 좋아요 {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 font-medium transition-colors">
              <i className="far fa-comment"></i> 댓글 {post.commentsCount}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium ml-auto">
              <i className="far fa-share-square"></i> 공유
            </button>
          </div>

          {/* Comment Section */}
          {post.commentsList && post.commentsList.length > 0 && (
            <div className="px-5 py-4 bg-gray-50 space-y-3 border-t border-gray-100">
              {post.commentsList.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden border border-gray-300 flex items-center justify-center text-gray-400">
                    {getAuthorThumbnail(comment.author) ? (
                      <img src={getAuthorThumbnail(comment.author)!} className="w-full h-full object-cover" alt="Commenter" />
                    ) : (
                      <i className="fas fa-user text-xs"></i>
                    )}
                  </div>
                  <div className="flex-1 comment-bubble p-3 shadow-sm border border-gray-100 bg-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-800">{comment.author}</span>
                      <span className="text-[10px] text-gray-400">{comment.time}</span>
                    </div>
                    <p className="text-xs text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      )) : (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-sm">
          <i className="fas fa-folder-open text-gray-200 text-5xl mb-4"></i>
          <p className="text-gray-500">이 게시판에는 아직 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
