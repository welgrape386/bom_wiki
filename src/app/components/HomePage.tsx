import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { Search, X, ChevronRight } from 'lucide-react';
import spnBg from '../../imports/spn.png';

// ─── Item Badge Helper ────────────────────────────────────────────────────────
function getItemStyle(item: string): string {
  if (item.includes('코인') || item.includes('주머니') || item.includes('화폐'))
    return 'bg-amber-100 text-amber-800 border border-amber-200';
  if (item.includes('강화서') || item.includes('강화'))
    return 'bg-violet-100 text-violet-800 border border-violet-200';
  if (item.includes('주문서'))
    return 'bg-blue-100 text-blue-800 border border-blue-200';
  if (item.includes('포션'))
    return 'bg-red-100 text-red-800 border border-red-200';
  if (item.includes('씨앗'))
    return 'bg-green-100 text-green-800 border border-green-200';
  if (item.includes('물고기') || item.includes('낚시'))
    return 'bg-cyan-100 text-cyan-800 border border-cyan-200';
  if (item.includes('비료') || item.includes('퇴비'))
    return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
  if (item.includes('광석') || item.includes('광물') || item.includes('철') || item.includes('금') || item.includes('다이아'))
    return 'bg-stone-100 text-stone-700 border border-stone-200';
  if (item.includes('목재') || item.includes('나무'))
    return 'bg-orange-100 text-orange-800 border border-orange-200';
  return 'bg-slate-100 text-slate-700 border border-slate-200';
}

// ─── Search ───────────────────────────────────────────────────────────────────
type SearchItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  emoji: string;
  route: string;
};

const searchData: SearchItem[] = [
  { id: 'ranking-points', title: '랭킹 포인트', content: '랭킹 포인트 활동 일일 점수 순위 서버 핵심', category: '핵심 컨텐츠', emoji: '🏆', route: '/detail/ranking-points' },
  { id: 'ranking-rewards', title: '랭킹 보상', content: '랭킹 보상 상위 특별 전설 장비 칭호 등급', category: '핵심 컨텐츠', emoji: '🎖️', route: '/detail/ranking-rewards' },
  { id: 'mining', title: '채광', content: '채광 광물 광석 코인 철 금 다이아 크리스탈 강화 재료', category: '핵심 컨텐츠', emoji: '⛏️', route: '/detail/mining' },
  { id: 'lumberjacking', title: '벌목', content: '벌목 나무 목재 코인 도끼 나무꾼', category: '핵심 컨텐츠', emoji: '🪓', route: '/detail/lumberjacking' },
  { id: 'hunting', title: '수렵', content: '수렵 사냥 몬스터 드롭 희귀 아이템 활', category: '핵심 컨텐츠', emoji: '🏹', route: '/detail/hunting' },
  { id: 'fishing', title: '낚시', content: '낚시 물고기 코인 특별 아이템 낚시대 어부', category: '핵심 컨텐츠', emoji: '🎣', route: '/detail/fishing' },
  { id: 'cookie-run', title: '쿠키런', content: '쿠키런 미니게임 참여 보상 이벤트 달리기', category: '핵심 컨텐츠', emoji: '🍪', route: '/detail/cookie-run' },
  { id: 'daily', title: '일일 컨텐츠', content: '일일 컨텐츠 매일 초기화 퀘스트 보상 출석 일일보상', category: '핵심 컨텐츠', emoji: '📅', route: '/detail/daily' },
  { id: 'cooking', title: '오늘의 요리', content: '요리 레시피 음식 오늘의 요리 보상 조리', category: '서브 컨텐츠', emoji: '🍳', route: '/detail/cooking' },
  { id: 'casino', title: '카지노', content: '카지노 도박 보상 운 코인 슬롯', category: '서브 컨텐츠', emoji: '🎰', route: '/detail/casino' },
  { id: 'proficiency', title: '숙련도', content: '숙련도 스킬 레벨 경험치 특성 직업 효율', category: '서브 컨텐츠', emoji: '⚡', route: '/detail/proficiency' },
  { id: 'accessory', title: '장신구 세공', content: '장신구 세공 능력치 보석 반지 목걸이', category: '서브 컨텐츠', emoji: '💎', route: '/detail/accessory' },
  { id: 'farm-upgrade', title: '농장 업그레이드', content: '농장 업그레이드 확장 자동 심기 줍기', category: '기타 시스템', emoji: '🌾', route: '/detail/farm-upgrade' },
  { id: 'server-info', title: '서버 정보', content: '서버 소개 접속 방법 IP 주소 규칙 이용약관', category: '서버정보', emoji: '🌐', route: '/server-info' },
  { id: 'help', title: '자주 묻는 질문', content: 'FAQ 질문 뉴비 처음 시작 방법 돈 버는 법 문의', category: '도움말', emoji: '❓', route: '/help' },
  { id: 'rules', title: '서버 규칙', content: '규칙 핵 치트 욕설 매크로 밴 신고', category: '서버정보', emoji: '📋', route: '/server-info' },
  { id: 'tool-blessing', title: '도구 축복', content: '도구 축복 강화 효율 내구도 드롭률', category: '서브 컨텐츠', emoji: '✨', route: '/detail/tool-blessing' },
  { id: 'scroll-box', title: '스크롤 박스', content: '스크롤 박스 뽑기 확률 주문서 강화서', category: '서브 컨텐츠', emoji: '📦', route: '/detail/scroll-box' },
];

function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? searchData.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
    : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSelect = (item: SearchItem) => {
    navigate(item.route);
    setQuery('');
    setFocused(false);
  };

  const showResults = focused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 transition-all duration-200 ${
          focused
            ? 'border-2 border-green-400 shadow-lg shadow-green-100'
            : 'border-2 border-green-200 shadow-md hover:border-green-300'
        }`}
        style={{ background: 'rgba(255,255,255,0.92)' }}
      >
        <Search
          className={`w-5 h-5 flex-shrink-0 transition-colors ${focused ? 'text-green-500' : 'text-slate-400'}`}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="랭킹, 채광, 낚시, 일일 컨텐츠, 서버 규칙 등 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 outline-none"
          style={{ fontSize: '15px', fontWeight: 500 }}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden z-40 max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-slate-400" style={{ fontSize: '14px' }}>
                "<span className="text-slate-600">{query}</span>"에 대한 결과가 없어요
              </p>
            </div>
          ) : (
            <div>
              <div className="px-4 py-2.5 border-b border-slate-50 flex items-center justify-between">
                <span className="text-slate-400" style={{ fontSize: '12px', fontWeight: 600 }}>
                  검색 결과 {results.length}개
                </span>
              </div>
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-3.5 hover:bg-green-50 transition-colors border-b border-slate-50 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-slate-700" style={{ fontSize: '14px', fontWeight: 700 }}>
                          {item.title}
                        </span>
                        <span
                          className="bg-slate-100 text-slate-500 rounded-full px-2 py-0.5"
                          style={{ fontSize: '10px', fontWeight: 700 }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-slate-400 truncate" style={{ fontSize: '12px' }}>
                        {item.content}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Quick Links ──────────────────────────────────────────────────────────────
const quickLinks = [
  { title: '핵심 컨텐츠', desc: '채광, 낚시, 수렵, 쿠키런, 랭킹 등', emoji: '🎮', to: '/content-hub', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  { title: '뉴비 가이드', desc: '처음 시작하는 분을 위한 단계별 안내', emoji: '🌱', to: '/help', color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd' },
  { title: '서버 정보', desc: '접속 방법, 규칙, 추천 클라이언트', emoji: '🌐', to: '/server-info', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe' },
  { title: '일일 컨텐츠', desc: '매일 초기화되는 퀘스트와 보상', emoji: '📅', to: '/detail/daily', color: '#d97706', bg: '#fff7ed', border: '#fed7aa' },
  { title: '랭킹 포인트', desc: '서버 랭킹 시스템과 포인트 획득법', emoji: '🏆', to: '/detail/ranking-points', color: '#ca8a04', bg: '#fefce8', border: '#fde68a' },
  { title: '도움말 · FAQ', desc: '자주 묻는 질문과 빠른 답변 모음', emoji: '❓', to: '/help', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
];

function QuickLinksSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🚀</span>
        <h2 className="text-slate-800" style={{ fontSize: '20px', fontWeight: 800 }}>
          바로가기
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group rounded-2xl border-2 p-5 shadow-sm hover:shadow-md transition-all"
            style={{ background: item.bg, borderColor: item.border }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-1" style={{ fontSize: '28px' }}>{item.emoji}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: item.color }}>{item.title}</div>
                <p className="mt-1 text-slate-500" style={{ fontSize: '12px', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Daily Rewards Data ───────────────────────────────────────────────────────
const allDailyRewards: { day: number; items: string[] }[] = [
  { day: 1, items: ['씨앗 묶음 (5개)'] },
  { day: 2, items: ['코인 주머니 (소)', '비료 (3개)', '씨앗 묶음 (3개)'] },
  { day: 3, items: ['낚시 미끼 (10개)', '코인 주머니 (소)', '강화서 [40%]'] },
  { day: 4, items: ['광석 상자', '씨앗 묶음 (5개)', '코인 주머니 (중)', '자동심기 주문서 (+500회)'] },
  { day: 5, items: ['비료 (10개)', '낚시 미끼 (15개)', '포션 (회복)'] },
  { day: 6, items: ['코인 주머니 (중)', '목재 묶음 (10개)', '씨앗 묶음 (10개)'] },
  { day: 7, items: ['코인 주머니 (대)', '강화서 [50%]', '포션 (경험치)', '특별 씨앗', '자동심기 주문서 (+1000회)'] },
  { day: 8, items: ['코인 주머니 (중)', '광석 상자', '강화서 [40%]'] },
  { day: 9, items: ['비료 (10개)', '낚시 미끼 (20개)', '자동심기 주문서 (+1000회)'] },
  { day: 10, items: ['고급 광석 상자', '코인 주머니 (대)', '도구 축복 주문서', '랭킹 포인트 배지'] },
  { day: 11, items: ['황금 비료 (15개)', '씨앗 묶음 (15개)'] },
  { day: 12, items: ['고급 씨앗 상자', '코인 주머니 (대)', '강화서 [60%]', '자동심기 주문서 (+2000회)'] },
  { day: 13, items: ['희귀 물고기 미끼', '포션 (행운)', '자동심기 주문서 (+2000회)'] },
  { day: 14, items: ['특별 낚시 세트', '코인 주머니 (특대)', '강화서 [60%]', '자동심기 주문서 (+3000회)'] },
  { day: 15, items: ['강화서 [50%]', '황금 비료 (20개)', '자동심기 주문서 (+3000회)'] },
  { day: 16, items: ['코인 주머니 (대)', '희귀 씨앗', '광석 상자', '목재 상자'] },
  { day: 17, items: ['황금 비료 (30개)', '강화서 [60%]', '씨앗 묶음 (20개)', '코인 주머니 (특대)', '자동심기 주문서 (+3000회)'] },
  { day: 18, items: ['희귀 물고기 상자', '강화서 [70%]', '코인 주머니 (대) (3개)'] },
  { day: 19, items: ['목재 묶음 (20개)', '낚시 미끼 (30개)', '강화서 [50%]', '포션 (행운)', '특별 씨앗'] },
  { day: 20, items: ['황금 비료 (30개)', '강화서 [70%]', '씨앗 묶음 (20개)', '희귀 씨앗 (2개)', '코인 주머니 (특대)'] },
  { day: 21, items: ['전설 씨앗', '코인 주머니 (특대)', '랭킹 포인트 배지 (대)', '특별 도구'] },
  { day: 22, items: ['희귀 물고기 상자', '강화서 [70%]', '코인 주머니 (대) (3개)'] },
  { day: 23, items: ['황금 비료 (20개)', '목재 묶음 (20개)', '특별 씨앗 (2개)', '코인 주머니 (대)'] },
  { day: 24, items: ['자동심기 주문서 (+5000회)', '코인 주머니 (특대)', '희귀 씨앗'] },
  { day: 25, items: ['포션 (행운) (2개)', '포션 (경험치) (2개)', '강화서 [70%]', '희귀 물고기 상자'] },
  { day: 26, items: ['전설 씨앗', '강화서 [60%]', '특별 도구', '황금 비료 (20개)'] },
  { day: 27, items: ['강화서 [70%]', '전설 씨앗', '코인 주머니 (특대)'] },
  { day: 28, items: ['포션 (최고 행운)', '포션 (최고 경험치)', '강화서 [80%]', '희귀 물고기 상자'] },
  { day: 29, items: ['강화서 [70%]', '코인 주머니 (특대) (2개)', '전설 씨앗', '자동심기 주문서 (+5000회)'] },
  { day: 30, items: ['강화서 [70%]', '전설 씨앗 (2개)', '황금 비료 (20개)', '특별 씨앗 (5개)'] },
  { day: 31, items: ['포션 (최고 행운)', '포션 (최고 경험치)', '강화서 [80%]', '전설 씨앗 (3개)', '최고급 랭킹 배지'] },
];

const cookieRunRewards = [
  '씨앗 묶음 (5개)',
  '코인 주머니 (소)',
  '비료 (3개)',
  '낚시 미끼 (10개)',
  '강화서 [40%]',
  '특별 씨앗',
];

const newbieEventRewards = [
  '코인 주머니 (중)',
  '자동심기 주문서 (+1000회)',
  '씨앗 묶음 (10개)',
  '비료 (5개)',
  '낚시 미끼 (15개)',
  '강화서 [50%]',
];

// ─── Newbie Rewards Section ───────────────────────────────────────────────────
function NewbieRewardsSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🌱</span>
        <h2 className="text-slate-800" style={{ fontSize: '20px', fontWeight: 800 }}>
          뉴비 전용 보상
        </h2>
      </div>

      <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm max-w-md">
        <p className="text-slate-500 mb-3" style={{ fontSize: '13px', lineHeight: 1.6 }}>
          처음 접속한 신규 플레이어에게 지급되는 스타터 보상이에요.
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {newbieEventRewards.map((item) => (
            <span
              key={item}
              className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
              style={{ fontSize: '11px', fontWeight: 600 }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="pt-3 border-t border-slate-100">
          <Link
            to="/help"
            className="text-green-600 hover:text-green-800 transition-colors flex items-center gap-1"
            style={{ fontSize: '12px', fontWeight: 700 }}
          >
            뉴비 가이드 보기 <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div style={{ background: '#F8FFF5', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '580px' }}>
        {/* 1. 서버 이미지 배경 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${spnBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.45,
          }}
        />
        {/* 2. 어두운 파란 그린 오버레이 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(10,25,40,0.82) 0%, rgba(15,45,30,0.75) 40%, rgba(20,55,35,0.65) 70%, rgba(10,30,20,0.85) 100%)',
          }}
        />
        {/* 3. 하단 페이드아웃 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, #F8FFF5 100%)',
          }}
        />

        <div className="relative z-10 min-h-[580px] flex items-center justify-center">
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' }}
            >
              <span className="text-sm">🌱</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                농사와 모험이 함께하는 RPG 서버
              </span>
            </div>

            <h1
              className="text-white mb-3"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 3rem)',
                fontWeight: 900,
                letterSpacing: '-0.5px',
                lineHeight: 1.15,
                textShadow: '0 2px 16px rgba(0,0,0,0.7)',
              }}
            >
              새봄농장 비공식 위키
            </h1>

            <p
              className="mb-8"
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.82)',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              뉴비부터 고인물까지, 필요한 모든 정보가 여기에
            </p>

            <SearchBar />

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/help"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all hover:shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '13px',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)',
                }}
              >
                🌱 뉴비 가이드
              </Link>
              <Link
                to="/content-hub"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all hover:shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '13px',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)',
                }}
              >
                📖 컨텐츠 전체보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <QuickLinksSection />
        <NewbieRewardsSection />
      </div>

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center border-t"
        style={{ borderColor: '#DCEFD9', backgroundColor: '#f0fdf4' }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg">🌱</span>
          <span style={{ fontWeight: 800, fontSize: '16px', color: '#2C3E20' }}>새봄농장 비공식 위키</span>
        </div>
        <p style={{ fontSize: '12px', color: '#6B8A50' }}>
          이 위키는 팬이 만든 비공식 정보 사이트입니다. 공식 채널의 정보와 다를 수 있습니다.
        </p>
      </footer>
    </div>
  );
}
