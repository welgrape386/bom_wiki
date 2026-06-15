import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

const COLORS = {
  primary: '#5BBE63',
  secondary: '#8DDA92',
  bg: '#F8FFF5',
  card: '#FFFFFF',
  border: '#DCEFD9',
  yellow: '#FFD86B',
  blue: '#7FCFFF',
};

const categories = [
  {
    label: '핵심 컨텐츠',
    color: COLORS.primary,
    items: [
      { key: 'daily', icon: '📅', title: '일일 컨텐츠', desc: '매일 초기화! 꾸준히 하면 큰 보상이 기다려요.', tag: '뉴비 추천', tagColor: COLORS.primary },
      { key: 'fishing', icon: '🎣', title: '낚시', desc: '다양한 물고기와 특별 아이템을 획득하세요.', tag: '뉴비 추천', tagColor: COLORS.primary },
      { key: 'cookie-run', icon: '🍪', title: '쿠키런', desc: '인기 미니게임! 참여만 해도 보상 지급!', tag: '뉴비 추천', tagColor: COLORS.primary },
      { key: 'ranking', icon: '🏆', title: '랭킹 시스템', desc: '제단에 아이템을 바쳐 포인트를 올리고 매주 보상을 받으세요!', tag: null, tagColor: '' },
      { key: 'mining', icon: '⛏️', title: '채광', desc: '광물을 캐서 코인과 아이템을 획득!', tag: null, tagColor: '' },
      { key: 'lumberjacking', icon: '🪓', title: '벌목', desc: '나무를 베어 목재와 코인을 수집하세요.', tag: null, tagColor: '' },
      { key: 'hunting', icon: '🏹', title: '수렵', desc: '몬스터 사냥으로 희귀 드롭을 노려보세요.', tag: null, tagColor: '' },
    ],
  },
  {
    label: '서브 컨텐츠',
    color: '#d97706',
    items: [
      // 캐릭터·도구 성장 (핵심 투자 순서대로)
      { key: 'proficiency',    icon: '⚡', title: '숙련도',        desc: '숙련도를 올려 축복의 결정을 모으고 도구를 강화하세요.',    tag: null, tagColor: '' },
      { key: 'tool-blessing',  icon: '✨', title: '도구 축복',     desc: '숙련도 환생으로 얻은 축복의 결정으로 도구에 축복을 부여하세요.', tag: null, tagColor: '' },
      { key: 'tool-enhance',   icon: '🔮', title: '도구 강화 주문', desc: '효율·행운·내구성 인챈트를 최대 10까지 강화하세요.',         tag: null, tagColor: '' },
      { key: 'scroll-box',     icon: '📦', title: '스크롤 박스',   desc: '도구에 특수 옵션을 추가로 부여하는 잠재능력 시스템.',        tag: null, tagColor: '' },
      // 장신구 라인 (고품질 아이템 → 세공 순서)
      { key: 'hq-items',       icon: '⭐', title: '고품질 아이템', desc: '세공 재료가 되는 고품질 아이템을 모아보세요.',               tag: null, tagColor: '' },
      { key: 'accessory',      icon: '💎', title: '장신구 세공',   desc: '고품질 아이템을 세공하여 강력한 장신구를 제작하세요.',       tag: null, tagColor: '' },
      // 일상 수익 & 랭킹
      { key: 'cooking',        icon: '🍳', title: '오늘의 요리',   desc: '매일 다른 요리를 제작해 랭킹 포인트를 추가 획득하세요.',     tag: null, tagColor: '' },
      { key: 'overall-ranking',icon: '🏅', title: '종합 랭킹',    desc: '8가지 활동 카테고리 1위를 노리는 성취 시스템.',               tag: null, tagColor: '' },
      // 정보 & 기타
      { key: 'profile-stats',  icon: '📊', title: '프로필 스탯',  desc: '확률 계산 공식과 프로필 부가 기능을 확인하세요.',             tag: null, tagColor: '' },
      { key: 'afk-system',     icon: '💤', title: '잠수 시스템',  desc: '잠수터에서 1분마다 포인트가 쌓이는 패시브 시스템.',          tag: null, tagColor: '' },
      { key: 'casino',         icon: '🎰', title: '카지노',       desc: '칩을 들고 머신을 우클릭! 최대 15배 잭팟에 도전하세요.',      tag: null, tagColor: '' },
    ],
  },
  {
    label: '농장 & 기타 시스템',
    color: '#0284c7',
    items: [
      // 농장 핵심 기능 먼저
      { key: 'farm-upgrade',  icon: '🌾', title: '농장 업그레이드', desc: '농장을 확장하고 업그레이드해 생산량을 높이세요.',          tag: null, tagColor: '' },
      { key: 'auto-plant',    icon: '🌱', title: '자동 심기',      desc: '씨앗을 자동으로 심어주는 편의 시스템.',                   tag: null, tagColor: '' },
      { key: 'auto-pickup',   icon: '🤖', title: '자동 줍기',      desc: '아이템이 자동으로 인벤토리에 들어와요.',                  tag: null, tagColor: '' },
      { key: 'crop-crystal',  icon: '🌽', title: '농작물 결정',    desc: '수확한 작물을 결정으로 변환하세요.',                      tag: null, tagColor: '' },
      // 편의·부가
      { key: 'berry-items',   icon: '🫐', title: '베리 아이템',   desc: '다양한 효과의 베리 아이템을 활용하세요.',                  tag: null, tagColor: '' },
      { key: 'fly',           icon: '🪄', title: '날기',           desc: '하늘을 자유롭게 날아다닐 수 있어요!',                     tag: null, tagColor: '' },
      { key: 'probability',   icon: '🎲', title: '확률 공개',      desc: '모든 드롭과 뽑기의 확률이 투명하게 공개되어 있어요.',      tag: null, tagColor: '' },
    ],
  },
];

export function ContentHubPage() {
  return (
    <div style={{ fontFamily: 'inherit', backgroundColor: '#F8FFF5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="px-4 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm" style={{ color: '#6B8A50' }}>
          <Link to="/" className="flex items-center gap-1 hover:underline">
            <Home size={14} />홈
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: '#2C3E20', fontWeight: 700 }}>콘텐츠</span>
        </div>
      </div>

      {/* Header */}
      <div
        className="px-4 py-10"
        style={{
          background: 'linear-gradient(160deg, #E8F8E9, #F8FFF5)',
          borderBottom: `2px solid ${COLORS.border}`,
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
            style={{ backgroundColor: '#E8F8EB', color: COLORS.primary, fontWeight: 700 }}
          >
            📖 새봄농장 위키
          </div>
          <h1
            className="mb-3"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#2C3E20', fontWeight: 900 }}
          >
            새봄농장 콘텐츠
          </h1>
          <p style={{ fontSize: '15px', color: '#4A6030' }}>원하는 콘텐츠를 선택해 상세 가이드를 확인하세요 🌱</p>
        </div>
      </div>

      {/* Content categories */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {categories.map((cat) => (
          <div key={cat.label}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: cat.color }} />
              <h2 style={{ fontSize: '20px', color: '#2C3E20', fontWeight: 800 }}>{cat.label}</h2>
              <span
                className="ml-2 px-2.5 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: cat.color + '22', color: cat.color, fontWeight: 800 }}
              >
                {cat.items.length}개
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.items.map((item) => (
                <Link
                  key={item.key}
                  to={`/detail/${item.key}`}
                  className="text-left p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl group block"
                  style={{
                    backgroundColor: 'white',
                    border: item.tag === '뉴비 추천' ? `2px solid ${COLORS.primary}55` : `1.5px solid ${COLORS.border}`,
                    boxShadow: item.tag === '뉴비 추천' ? `0 2px 12px ${COLORS.primary}18` : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: cat.color + '22' }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span style={{ fontSize: '15px', color: '#2C3E20', fontWeight: 800 }}>{item.title}</span>
                        {item.tag && (
                          <span
                            className="px-2 py-0.5 rounded-full"
                            style={{ fontSize: '10px', fontWeight: 800, backgroundColor: item.tagColor + '22', color: item.tagColor }}
                          >
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '12px', color: '#6B8A50', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <span style={{ fontSize: '12px', color: COLORS.secondary, fontWeight: 700 }}>자세히 보기 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
