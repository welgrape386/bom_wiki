import { useState } from 'react';
import type { ReactNode } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ChevronRight, Home, ChevronDown, ChevronUp, Trophy, Star, Clock, Gift } from 'lucide-react';
import { CasinoContent } from './CasinoContent';
import { ScrollBoxContent } from './ScrollBoxContent';

const COLORS = {
  primary: '#5BBE63',
  secondary: '#8DDA92',
  bg: '#F8FFF5',
  border: '#DCEFD9',
  yellow: '#FFD86B',
  blue: '#7FCFFF',
  danger: '#FF8A8A',
  success: '#69C77B',
};

const InfoBox = ({ type, children }: { type: 'tip' | 'info' | 'warning' | 'danger'; children: ReactNode }) => {
  const configs = {
    tip: { bg: '#F0FBF1', border: '#69C77B', emoji: '💡', label: 'TIP', text: '#1a7a24' },
    info: { bg: '#F0F8FF', border: '#7FCFFF', emoji: 'ℹ️', label: 'INFO', text: '#1a6fa3' },
    warning: { bg: '#FFFBF0', border: '#FFD86B', emoji: '⚠️', label: 'WARNING', text: '#8a6200' },
    danger: { bg: '#FFF5F5', border: '#FF8A8A', emoji: '🚨', label: 'DANGER', text: '#c0392b' },
  };
  const c = configs[type];
  return (
    <div className="rounded-xl p-4 my-4" style={{ backgroundColor: c.bg, borderLeft: `4px solid ${c.border}` }}>
      <div className="flex items-start gap-2">
        <span className="text-lg mt-0.5">{c.emoji}</span>
        <div>
          <span className="font-extrabold text-xs px-2 py-0.5 rounded-full mr-2" style={{ backgroundColor: c.border + '44', color: c.text }}>
            {c.label}
          </span>
          <span style={{ fontSize: '14px', color: c.text, lineHeight: 1.7 }}>{children}</span>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ icon, title, children }: { icon: string; title: string; children: ReactNode }) => (
  <div className="rounded-2xl p-6 mb-5" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
    <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '18px', color: '#2C3E20', fontWeight: 800 }}>
      <span className="text-xl">{icon}</span>{title}
    </h3>
    {children}
  </div>
);

const AccordionItem = ({ title, children }: { title: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden mb-2" style={{ border: `1.5px solid ${COLORS.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors"
        style={{ backgroundColor: open ? '#F0FAF1' : 'white', color: '#2C3E20', fontSize: '14px', fontWeight: 700 }}
      >
        {title}
        {open ? <ChevronUp size={16} style={{ color: COLORS.primary }} /> : <ChevronDown size={16} style={{ color: '#6B8A50' }} />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3" style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.8, borderTop: `1px solid ${COLORS.border}` }}>
          {children}
        </div>
      )}
    </div>
  );
};

const TableRow = ({ cols, isHeader = false }: { cols: string[]; isHeader?: boolean }) => (
  <tr
    style={isHeader ? { backgroundColor: '#F0FAF1' } : undefined}
    onMouseEnter={(e) => { if (!isHeader) (e.currentTarget as HTMLElement).style.backgroundColor = '#F8FFF5'; }}
    onMouseLeave={(e) => { if (!isHeader) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
  >
    {cols.map((col, i) => (
      <td key={i} className="px-4 py-3" style={{ fontSize: '13px', color: isHeader ? '#2C3E20' : '#4A6030', borderBottom: `1px solid ${COLORS.border}`, fontWeight: isHeader ? 800 : 500 }}>
        {col}
      </td>
    ))}
  </tr>
);

interface ContentData {
  icon: string;
  title: string;
  subtitle: string;
  difficulty: string;
  recommendLevel: string;
  estimatedIncome: string;
  mainReward: string;
  isNewbie: boolean;
  heroGradient: string;
}

const contentDatabase: Record<string, ContentData> = {
  mining: { icon: '⛏️', title: '채광', subtitle: '광물을 캐서 코인과 아이템을 버는 기본 컨텐츠', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '시간당 5,000~50,000 코인', mainReward: '광석, 코인, 강화 재료', isNewbie: true, heroGradient: 'linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%)' },
  fishing: { icon: '🎣', title: '낚시', subtitle: '낚시로 다양한 물고기와 특별 아이템을 획득하세요', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '시간당 8,000~60,000 코인', mainReward: '물고기, 코인, 희귀 아이템', isNewbie: true, heroGradient: 'linear-gradient(135deg, #7FCFFF 0%, #A8E4FF 100%)' },
  'ranking-points': { icon: '🏆', title: '랭킹 포인트', subtitle: '서버의 핵심! 매일 활동으로 포인트를 쌓고 랭킹을 올리세요', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '매일 획득 가능', mainReward: '랭킹 포인트, 특별 칭호', isNewbie: true, heroGradient: 'linear-gradient(135deg, #FFD86B 0%, #FFE8A0 100%)' },
  'cookie-run': { icon: '🍪', title: '쿠키런', subtitle: '새봄농장의 인기 미니게임! 참여만 해도 보상이 지급됩니다', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '회당 1,000~10,000 코인', mainReward: '코인, 씨앗, 특별 아이템', isNewbie: true, heroGradient: 'linear-gradient(135deg, #F5C842 0%, #FFE080 100%)' },
  daily: { icon: '📅', title: '일일 컨텐츠', subtitle: '매일 초기화! 꾸준히 참여하면 누적 보상을 획득할 수 있어요', difficulty: '매우쉬움', recommendLevel: '누구나', estimatedIncome: '매일 3,000~15,000 코인', mainReward: '코인, 경험치, 씨앗, 아이템', isNewbie: true, heroGradient: 'linear-gradient(135deg, #69C77B 0%, #A0E0A8 100%)' },
  lumberjacking: { icon: '🪓', title: '벌목', subtitle: '나무를 베어 목재를 수집하고 코인을 버는 컨텐츠', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '시간당 4,000~40,000 코인', mainReward: '목재, 코인', isNewbie: true, heroGradient: 'linear-gradient(135deg, #92400e 0%, #b45309 100%)' },
  hunting: { icon: '🏹', title: '수렵', subtitle: '몬스터를 사냥하여 희귀 드롭과 코인을 획득하세요', difficulty: '보통', recommendLevel: 'Lv. 20 이상 권장', estimatedIncome: '시간당 10,000~100,000 코인', mainReward: '희귀 드롭, 코인, 장비', isNewbie: false, heroGradient: 'linear-gradient(135deg, #FF8A8A 0%, #FFB3A0 100%)' },
  ranking: { icon: '🏆', title: '랭킹 시스템', subtitle: '제단에 아이템을 바쳐 포인트를 올리고 매주 보상을 받는 핵심 컨텐츠', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '주 단위 보상 지급', mainReward: '달성 보상, 순위 보상', isNewbie: true, heroGradient: 'linear-gradient(135deg, #FFD86B 0%, #F5A623 100%)' },
  cooking: { icon: '🍳', title: '오늘의 요리', subtitle: '매일 특별 레시피로 요리를 만들고 보상을 획득하세요', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '매일 2,000~10,000 코인', mainReward: '코인, 특별 재료, 보상', isNewbie: true, heroGradient: 'linear-gradient(135deg, #ff9b6a 0%, #ffbfa0 100%)' },
  casino: { icon: '🎰', title: '카지노', subtitle: '행운을 시험해보세요! 코인을 걸고 큰 보상에 도전', difficulty: '보통', recommendLevel: '모든 레벨', estimatedIncome: '변동 (운에 따라 상이)', mainReward: '코인, 희귀 아이템', isNewbie: false, heroGradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)' },
  'scroll-box': { icon: '📦', title: '스크롤 박스', subtitle: '도구에 특수한 효과를 추가로 부여하는 강화 시스템', difficulty: '보통', recommendLevel: '모든 레벨', estimatedIncome: '능력치 향상으로 간접 이득', mainReward: '도구 옵션 부여', isNewbie: false, heroGradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)' },
  'profile-stats': { icon: '📊', title: '프로필 스탯', subtitle: '확률 계산 공식과 프로필 기능을 확인하세요', difficulty: '쉬움', recommendLevel: '모든 레벨', estimatedIncome: '-', mainReward: '확률 이해', isNewbie: false, heroGradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)' },
  'afk-system': { icon: '💤', title: '잠수 시스템', subtitle: '접속만 해도 포인트가 쌓이는 잠수터 시스템', difficulty: '매우쉬움', recommendLevel: '모든 레벨', estimatedIncome: '1분당 1포인트', mainReward: '잠수 포인트 아이템', isNewbie: true, heroGradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)' },
  'tool-enhance': { icon: '🔮', title: '도구 강화 주문', subtitle: '효율·행운·내구성 인챈트를 최대 10까지 강화하세요', difficulty: '보통', recommendLevel: '모든 레벨', estimatedIncome: '능력치 향상으로 간접 이득', mainReward: '인챈트 강화', isNewbie: false, heroGradient: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)' },
  'tool-blessing': { icon: '✨', title: '도구 축복', subtitle: '도구에 축복을 부여하여 드랍률과 경험치 획득률을 높이세요', difficulty: '쉬움', recommendLevel: '모든 레벨', estimatedIncome: '능력치 향상으로 간접 이득', mainReward: '고품질 드랍률·경험치 획득률 상승', isNewbie: false, heroGradient: 'linear-gradient(135deg, #f59e0b 0%, #fde68a 100%)' },
  proficiency: { icon: '⚡', title: '숙련도', subtitle: '활동을 반복하여 숙련도를 올리고 강력한 효과를 얻으세요', difficulty: '쉬움', recommendLevel: 'Lv. 1 이상', estimatedIncome: '숙련도에 따라 수익 증가', mainReward: '드롭률 증가, 효율 향상', isNewbie: true, heroGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
  'overall-ranking': { icon: '🏅', title: '종합 랭킹', subtitle: '8가지 활동 카테고리에서 1위를 노리는 성취 시스템', difficulty: '보통', recommendLevel: '모든 레벨', estimatedIncome: '1위 한정 보상', mainReward: '메모리얼 스크롤 박스 외', isNewbie: false, heroGradient: 'linear-gradient(135deg, #FFD86B 0%, #F5A623 100%)' },
  accessory: { icon: '💎', title: '장신구 세공', subtitle: '장신구에 특별한 능력치를 부여하여 캐릭터를 강화하세요', difficulty: '보통', recommendLevel: 'Lv. 30 이상 권장', estimatedIncome: '능력치 향상으로 간접 이득', mainReward: '능력치 강화, 특별 효과', isNewbie: false, heroGradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)' },
};

const difficultyBadge: Record<string, { bg: string; text: string; label: string }> = {
  '매우쉬움': { bg: '#E8F8EB', text: '#2d7a35', label: '매우 쉬움 ⭐' },
  '쉬움': { bg: '#E8F8EB', text: '#2d7a35', label: '쉬움 ⭐⭐' },
  '보통': { bg: '#FFF9E6', text: '#8a6200', label: '보통 ⭐⭐⭐' },
  '어려움': { bg: '#FFF0F0', text: '#c0392b', label: '어려움 ⭐⭐⭐⭐' },
};

// ── Ranking custom renderer ──────────────────────────────────────────────────

const milestones = [
  {
    label: '100만점 이상',
    points: '1,000,000',
    color: '#5BBE63',
    bg: '#E8F8EB',
    border: '#5BBE63',
    imgUrl: 'https://mcnspring.notion.site/image/attachment%3A7eafc998-ed1a-4f2e-bb88-3ebbdfeea115%3Aimage.png?table=block&id=36e7ce2d-5858-80b8-9bd9-cafc82edf5b4&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=510&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl',
  },
  {
    label: '500만점 이상',
    points: '5,000,000',
    color: '#7FCFFF',
    bg: '#E8F4FF',
    border: '#7FCFFF',
    imgUrl: 'https://mcnspring.notion.site/image/attachment%3A8eb1bc04-2697-40f9-bcc6-c5c3c1fe31c2%3Aimage.png?table=block&id=36e7ce2d-5858-80a9-89fc-c76093c3a27b&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=510&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl',
  },
  {
    label: '1000만점 이상',
    points: '10,000,000',
    color: '#FFD86B',
    bg: '#FFFBEA',
    border: '#FFD86B',
    imgUrl: 'https://mcnspring.notion.site/image/attachment%3A501ffc67-b398-4d50-b5c9-8a7e926cc311%3Aimage.png?table=block&id=36e7ce2d-5858-809f-82eb-df9587f46882&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=510&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl',
  },
  {
    label: '5000만점 이상',
    points: '50,000,000',
    color: '#FF9B6A',
    bg: '#FFF3EE',
    border: '#FF9B6A',
    imgUrl: 'https://mcnspring.notion.site/image/attachment%3Ac58fece2-7fbd-48aa-92bb-983de4eaac71%3Aimage.png?table=block&id=36e7ce2d-5858-806a-8d58-d2acd3fdbd42&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=510&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl',
  },
  {
    label: '1억점 이상',
    points: '100,000,000',
    color: '#FF8A8A',
    bg: '#FFF0F0',
    border: '#FF8A8A',
    imgUrl: 'https://mcnspring.notion.site/image/attachment%3A2a58a338-e3f3-499d-ab01-84e65ef72edf%3Aimage.png?table=block&id=36e7ce2d-5858-807a-b804-e37b237f5245&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=510&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl',
  },
];

function RankingContent() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  return (
    <>
      {/* Overview */}
      <div id="overview">
        <SectionCard icon="📖" title="랭킹이란?">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            랭킹은 <strong>다른 농장과 매주 대결하는 컨텐츠</strong>입니다. 광물, 작물, 요리 등의 아이템을 제단에 바치고 랭킹 포인트를 올릴 수 있으며, 획득한 점수에 따라 달성 보상과 순위 보상을 받을 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { Icon: Trophy, label: '아이템 제단 헌납', desc: '광물·작물·요리 등을 바쳐 포인트 획득', color: '#FFD86B' },
              { Icon: Clock, label: '매주 일요일 23:59', desc: '랭킹 초기화 및 보상 정산', color: '#7FCFFF' },
              { Icon: Gift, label: '우편함으로 지급', desc: '만료 전 반드시 수령하세요', color: '#FF8A8A' },
            ].map(({ Icon, label, desc, color }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: color + '22', border: `1.5px solid ${color}55` }}>
                <Icon size={20} color={color} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: '#4A6030' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox type="warning">
            랭킹 보상은 농장 주인의 우편함으로 지급됩니다. 우편함 받는 시간이 만료되지 않도록 주의하세요!
          </InfoBox>
        </SectionCard>
      </div>

      {/* How to earn points */}
      <div id="how-to">
        <SectionCard icon="⚙️" title="포인트 획득 방법">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.8, marginBottom: '16px' }}>
            아이템별 랭킹 포인트는 게임 내 메뉴에서 직접 확인할 수 있습니다.
          </p>

          {/* Step guide */}
          <div className="space-y-3 mb-6">
            {[
              '메뉴 열기',
              '다음 페이지로 이동',
              '랭킹 관련 메뉴 선택',
              '제단 항목 클릭',
              'NPC 우클릭',
              '우측 아이콘 클릭하면 아이템별 포인트 확인 가능',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: COLORS.primary, color: 'white', fontSize: '11px', fontWeight: 800 }}>{i + 1}</div>
                <span style={{ fontSize: '14px', color: '#4A6030' }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Guide images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img
                src="https://mcnspring.notion.site/image/attachment%3Ac4d09149-b5a7-4c45-a2bd-e0a18af3bc51%3Aimage.png?table=block&id=3147ce2d-5858-807e-bc3a-f03b616f9848&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1410&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
                alt="랭킹 포인트 제단 화면"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '8px 12px', fontSize: '12px', color: '#6B8A50', backgroundColor: '#FAFFF9', textAlign: 'center' }}>제단 화면</div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img
                src="https://mcnspring.notion.site/image/attachment%3A19d009b1-2e7c-4320-8f25-04aed0b03bc2%3Aimage.png?table=block&id=34c7ce2d-5858-80e1-a888-f6a95b5de2dc&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1280&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
                alt="NPC 우클릭 화면"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '8px 12px', fontSize: '12px', color: '#6B8A50', backgroundColor: '#FAFFF9', textAlign: 'center' }}>NPC 우클릭</div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img
                src="https://mcnspring.notion.site/image/attachment%3Ae0264d7f-71aa-48e5-a824-7a52f70c094c%3Aimage.png?table=block&id=34c7ce2d-5858-80e6-8616-f744e390ed54&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1280&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
                alt="아이템별 포인트 확인 화면"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '8px 12px', fontSize: '12px', color: '#6B8A50', backgroundColor: '#FAFFF9', textAlign: 'center' }}>아이템별 포인트 확인</div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Settlement info */}
      <div id="settlement">
        <SectionCard icon="⏰" title="정산 및 초기화">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { emoji: '🕛', title: '정산 시각', desc: '매주 일요일 오후 23:59 이후' },
              { emoji: '🚫', title: '정산 중 제한', desc: '정산 시간 동안 랭킹 포인트 획득 불가' },
              { emoji: '🔄', title: '점수 초기화', desc: '정산 완료 후 점수 0으로 리셋' },
              { emoji: '📬', title: '보상 수령', desc: '우편함으로 자동 지급 (만료 주의!)' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
                <span className="text-2xl">{emoji}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '2px' }}>{title}</div>
                  <div style={{ fontSize: '12px', color: '#4A6030' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox type="info">
            순위 보상을 확인하시려면 제단 메뉴에서 <strong>농장 랭킹 보상</strong>을 클릭해보세요.
          </InfoBox>
          <div className="mt-4 rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}`, maxWidth: '260px' }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3Af571e882-2e9d-45ca-a620-31ac9e7844d7%3Aimage.png?table=block&id=33d7ce2d-5858-8058-8c07-c6e8a37e7ad5&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=510&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="농장 랭킹 보상 메뉴"
              style={{ width: '100%', display: 'block' }}
            />
            <div style={{ padding: '8px 12px', fontSize: '12px', color: '#6B8A50', backgroundColor: '#FAFFF9', textAlign: 'center' }}>농장 랭킹 보상 메뉴</div>
          </div>
        </SectionCard>
      </div>

      {/* Achievement rewards */}
      <div id="rewards">
        <SectionCard icon="🎁" title="달성 보상">
          <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: '#FFF9E6', border: `1.5px solid ${COLORS.yellow}55` }}>
            <div className="flex items-start gap-2">
              <Star size={16} color="#FFD86B" style={{ marginTop: '2px', flexShrink: 0 }} />
              <p style={{ fontSize: '14px', color: '#856404', lineHeight: 1.7 }}>
                달성 보상은 <strong>누적</strong>됩니다. 1억점이라면 100만점 보상부터 1억점 보상까지 전부 받게 됩니다!
              </p>
            </div>
          </div>

          {/* Milestone selector */}
          <div className="flex flex-wrap gap-2 mb-5">
            {milestones.map((m, i) => (
              <button
                key={m.label}
                onClick={() => setSelectedMilestone(i)}
                className="px-3 py-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: selectedMilestone === i ? m.color : m.bg,
                  border: `1.5px solid ${m.border}`,
                  color: selectedMilestone === i ? 'white' : m.color,
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Selected milestone image */}
          <div className="rounded-2xl overflow-hidden" style={{ border: `2px solid ${milestones[selectedMilestone].border}`, maxWidth: '340px' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: milestones[selectedMilestone].bg }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: milestones[selectedMilestone].color }}>
                🎖️ {milestones[selectedMilestone].label} 달성 보상
              </span>
            </div>
            <img
              src={milestones[selectedMilestone].imgUrl}
              alt={`${milestones[selectedMilestone].label} 달성 보상`}
              style={{ width: '100%', display: 'block' }}
            />
          </div>

        </SectionCard>
      </div>

      {/* FAQ */}
      <div id="faq">
        <SectionCard icon="❓" title="FAQ">
          <AccordionItem title="어떤 아이템을 제단에 바칠 수 있나요?">
            광물, 작물, 요리 등 다양한 아이템을 제단에 바칠 수 있습니다. 아이템별 포인트는 제단 NPC 우클릭 → 우측 아이콘에서 확인 가능합니다.
          </AccordionItem>
          <AccordionItem title="포인트는 언제 초기화되나요?">
            매주 일요일 오후 23:59 이후 정산이 진행되며, 완료 후 점수가 0으로 초기화됩니다. 정산 중에는 포인트 획득이 불가능합니다.
          </AccordionItem>
          <AccordionItem title="달성 보상과 순위 보상의 차이가 뭔가요?">
            달성 보상은 일정 포인트를 넘기면 자동으로 지급되는 누적 보상입니다. 순위 보상은 정산 시점의 내 순위에 따라 지급되는 보상으로 제단 메뉴 &gt; 농장 랭킹 보상에서 확인할 수 있습니다.
          </AccordionItem>
          <AccordionItem title="보상을 못 받았어요.">
            보상은 우편함으로 지급됩니다. 우편함 만료 전에 반드시 수령하세요. 만료된 보상은 재지급이 어렵습니다.
          </AccordionItem>
        </SectionCard>
      </div>
    </>
  );
}

// ── Activity content shared components ───────────────────────────────────────

const activityNotice = (
  <InfoBox type="warning">
    이곳에서 활동 행위를 방해할 경우 엄중한 처벌에 처하실 수 있습니다.
  </InfoBox>
);

type Zone = {
  emoji: string;
  name: string;
  items: { label: string; value: string }[];
};

function ZoneCards({ zones }: { zones: Zone[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {zones.map((z) => (
        <div key={z.name} className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}`, backgroundColor: 'white' }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: '#F0FAF1', borderBottom: `1px solid ${COLORS.border}` }}>
            <span className="text-xl">{z.emoji}</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#2C3E20' }}>{z.name}</span>
          </div>
          <div className="px-5 py-4 space-y-2">
            {z.items.map((item) => (
              <div key={item.label} className="flex justify-between items-start gap-2">
                <span style={{ fontSize: '12px', color: '#6B8A50', flexShrink: 0 }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#2C3E20', textAlign: 'right' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Mining ────────────────────────────────────────────────────────────────────

const miningZones: Zone[] = [
  {
    emoji: '💎',
    name: '수정 광산',
    items: [
      { label: '등장 광물', value: '돌, 돌 광물' },
      { label: '효과', value: '50% 확률로 광물 2배 획득' },
    ],
  },
  {
    emoji: '🏜️',
    name: '암석 사막',
    items: [
      { label: '등장 광물', value: '돌, 돌 광물, 심층암' },
      { label: '효과', value: '100% 확률로 광물 2배 획득' },
    ],
  },
  {
    emoji: '🌴',
    name: '유적지',
    items: [
      { label: '등장 광물', value: '심층암, 심층암 광물' },
      { label: '효과', value: '100% 확률로 광물 3배 획득' },
    ],
  },
];

function MiningContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            채광은 하루에 제한 없이 이용할 수 있는 수익률 높은 활동 컨텐츠입니다. 이동 시 앞의 판매 NPC가 존재하며, 상점가와 동일한 가격으로 바로 판매할 수 있습니다.
          </p>
          {activityNotice}
        </SectionCard>
      </div>
      <div id="zones">
        <SectionCard icon="🗺️" title="채광 구역">
          <ZoneCards zones={miningZones} />
          <div className="mt-4">
            <InfoBox type="tip">
              유적지는 배수 효과가 가장 높습니다. 심층암 광물을 노린다면 유적지를 우선 활용해보세요!
            </InfoBox>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Lumberjacking ─────────────────────────────────────────────────────────────

const lumberjackZones: Zone[] = [
  {
    emoji: '🏜️',
    name: '황토의 숲',
    items: [
      { label: '등장 나무', value: '정글나무, 아카시아나무' },
      { label: '효과', value: '25% 확률로 2배 획득' },
    ],
  },
  {
    emoji: '🌳',
    name: '평화의 숲',
    items: [
      { label: '등장 나무', value: '참나무, 자작나무, 벚나무' },
      { label: '효과', value: '25% 확률로 2배 획득' },
    ],
  },
  {
    emoji: '🌠',
    name: '밤안개 숲',
    items: [
      { label: '등장 나무', value: '가문비나무, 짙은참나무' },
      { label: '효과', value: '25% 확률로 2배 획득' },
    ],
  },
];

function LumberjackContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            벌목은 하루에 제한 없이 이용할 수 있는 수익률 높은 활동 컨텐츠입니다. 이동 시 앞의 판매 NPC가 존재하며, 상점가와 동일한 가격으로 바로 판매할 수 있습니다.
          </p>
          {activityNotice}
        </SectionCard>
      </div>
      <div id="zones">
        <SectionCard icon="🗺️" title="벌목 구역">
          <ZoneCards zones={lumberjackZones} />
          <div className="mt-4">
            <InfoBox type="tip">
              세 구역 모두 2배 확률은 동일합니다. 원하는 나무 종류에 따라 구역을 선택하세요.
            </InfoBox>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Hunting ───────────────────────────────────────────────────────────────────

type HuntingZone = {
  emoji: string;
  name: string;
  animal: string;
  lootChance: string;
  hqChance: string;
  attackRange: string;
  counterChance: string;
  hp: string;
  dmg: string;
  difficulty: { label: string; color: string };
};

const huntingZones: HuntingZone[] = [
  {
    emoji: '🐑',
    name: '양들의 언덕',
    animal: '양',
    lootChance: '15%',
    hqChance: '0.31% × @',
    attackRange: '1.5블럭',
    counterChance: '20%',
    hp: '15 ~ 20 HP',
    dmg: '1 DMG',
    difficulty: { label: '입문', color: '#5BBE63' },
  },
  {
    emoji: '🐂',
    name: '외양간',
    animal: '소',
    lootChance: '55%',
    hqChance: '1.13% × @',
    attackRange: '2블럭',
    counterChance: '40%',
    hp: '60 ~ 74 HP',
    dmg: '2 DMG',
    difficulty: { label: '중급', color: '#FFD86B' },
  },
  {
    emoji: '🐖',
    name: '진흙탕',
    animal: '돼지',
    lootChance: '85%',
    hqChance: '1.70% × @',
    attackRange: '2.5블럭',
    counterChance: '60%',
    hp: '90 ~ 102 HP',
    dmg: '4 DMG',
    difficulty: { label: '고급', color: '#FF8A8A' },
  },
];

function HuntingContent() {
  const [selectedZone, setSelectedZone] = useState(0);
  const z = huntingZones[selectedZone];

  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            수렵은 하루에 제한 없이 이용할 수 있는 수익률 높은 활동 컨텐츠입니다. 이동 시 앞의 판매 NPC가 존재하며, 상점가와 동일한 가격으로 바로 판매할 수 있습니다.
          </p>
          {activityNotice}
        </SectionCard>
      </div>
      <div id="zones">
        <SectionCard icon="🗺️" title="수렵 구역">
          {/* Zone tabs */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {huntingZones.map((zone, i) => (
              <button
                key={zone.name}
                onClick={() => setSelectedZone(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: selectedZone === i ? zone.difficulty.color : zone.difficulty.color + '22',
                  border: `1.5px solid ${zone.difficulty.color}`,
                  color: selectedZone === i ? 'white' : zone.difficulty.color,
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <span>{zone.emoji}</span>
                <span>{zone.name}</span>
                <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: '10px', backgroundColor: selectedZone === i ? 'rgba(255,255,255,0.3)' : zone.difficulty.color + '33', color: selectedZone === i ? 'white' : zone.difficulty.color }}>
                  {zone.difficulty.label}
                </span>
              </button>
            ))}
          </div>

          {/* Selected zone detail */}
          <div className="rounded-2xl overflow-hidden" style={{ border: `2px solid ${z.difficulty.color}66` }}>
            <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: z.difficulty.color + '22', borderBottom: `1px solid ${z.difficulty.color}44` }}>
              <span className="text-2xl">{z.emoji}</span>
              <div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#2C3E20' }}>{z.name}</span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: z.difficulty.color, color: 'white' }}>{z.difficulty.label}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-0" style={{ backgroundColor: 'white' }}>
              {[
                { label: '등장 동물', value: z.animal, emoji: '🐾' },
                { label: '전리품 확률', value: z.lootChance, emoji: '🎁' },
                { label: '고품질 확률', value: z.hqChance, emoji: '⭐' },
                { label: '공격 범위', value: z.attackRange, emoji: '🎯' },
                { label: '반격 확률', value: z.counterChance, emoji: '⚔️' },
                { label: '체력', value: z.hp, emoji: '❤️' },
                { label: '공격 데미지', value: z.dmg, emoji: '💥' },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className="px-5 py-4 flex items-center gap-3"
                  style={{ borderBottom: `1px solid ${COLORS.border}`, borderRight: idx % 3 !== 2 ? `1px solid ${COLORS.border}` : 'none' }}
                >
                  <span className="text-lg">{stat.emoji}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B8A50' }}>{stat.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20' }}>{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <InfoBox type="tip">
              고품질 아이템 확률의 <strong>@</strong>는 고품질 배율 스탯에 따라 곱해집니다. 스탯을 올릴수록 확률이 높아져요!
            </InfoBox>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Daily content ─────────────────────────────────────────────────────────────

const dailyActivities = [
  {
    emoji: '🍎',
    name: '열매 서리',
    required: '없음',
    drops: '신선한 사과, 신선한 황금 사과',
    steps: [
      '나무에 있는 열매를 꾹 우클릭하여 채집 시도',
      '게이지가 다 채워졌을 경우, 서리 완료!',
    ],
  },
  {
    emoji: '🐑',
    name: '양털 깎기',
    required: '가위',
    drops: '몽글몽글 양털, 찰랑찰랑 금빛 양털',
    steps: [
      '가위를 들고 양털을 우클릭하여 양털 깎기',
      '숫자의 순서대로 메뉴의 버튼을 클릭하기!',
    ],
  },
  {
    emoji: '🧹',
    name: '청소 의뢰',
    required: '솔',
    drops: '오래된 금화, 오래된 은화, 오래된 동화, 작은 먼지, 먼지 덩어리',
    steps: [
      '먼지 덩어리를 꾹 우클릭하여 먼지를 청소',
      '튀어 나온 먼지 덩어리를 때려 잡기!',
    ],
  },
];

function DailyContent() {
  const [selected, setSelected] = useState(0);
  const act = dailyActivities[selected];

  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '4px' }}>
            일일 컨텐츠는 하루 <strong>피로도가 제한</strong>되어 있는 특별한 컨텐츠입니다.
          </p>
          <ul style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0, marginBottom: '16px' }} className="space-y-1">
            <li>• 30분마다 새로운 컨텐츠를 이용하실 수 있습니다. 각 필요한 도구를 참조해주세요.</li>
            <li>• 피로도가 꽉 차셨나요? <strong>매일 자정(오후 11:59 이후)</strong>에 피로도가 초기화됩니다!</li>
          </ul>
          <div className="rounded-xl overflow-hidden mb-4" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3Ae0524b10-06bf-4a5e-b411-8199f71fdf67%3A1612cff9-3b6d-4642-bbc4-6b7b7a01c999.png?table=block&id=32b7ce2d-5858-809a-9962-d88b97d3edbc&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=930&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="일일 컨텐츠 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <InfoBox type="warning">
            이곳에서 활동 행위를 방해할 경우 엄중한 처벌에 처하실 수 있습니다.
          </InfoBox>
        </SectionCard>
      </div>

      <div id="activities">
        <SectionCard icon="🎮" title="활동 종류">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-5">
            {dailyActivities.map((a, i) => (
              <button
                key={a.name}
                onClick={() => setSelected(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: selected === i ? COLORS.primary : '#E8F8EB',
                  border: `1.5px solid ${COLORS.primary}`,
                  color: selected === i ? 'white' : COLORS.primary,
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                <span>{a.emoji}</span><span>{a.name}</span>
              </button>
            ))}
          </div>

          {/* Activity detail */}
          <div className="rounded-2xl overflow-hidden" style={{ border: `2px solid ${COLORS.border}` }}>
            <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: '#F0FAF1', borderBottom: `1px solid ${COLORS.border}` }}>
              <span className="text-xl">{act.emoji}</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#2C3E20' }}>{act.name}</span>
            </div>
            <div className="px-5 py-4 space-y-4" style={{ backgroundColor: 'white' }}>
              <div className="flex items-start gap-3">
                <span style={{ fontSize: '12px', color: '#6B8A50', minWidth: '80px', paddingTop: '2px' }}>필수 아이템</span>
                <span className="px-3 py-1 rounded-lg" style={{ backgroundColor: act.required === '없음' ? '#F0FAF1' : '#FFFBEA', color: act.required === '없음' ? '#2d7a35' : '#856404', fontSize: '13px', fontWeight: 700 }}>
                  {act.required === '없음' ? '✓ 없음' : `★ ${act.required}`}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ fontSize: '12px', color: '#6B8A50', minWidth: '80px', paddingTop: '2px' }}>등장 아이템</span>
                <span style={{ fontSize: '13px', color: '#2C3E20', lineHeight: 1.7 }}>{act.drops}</span>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6B8A50', marginBottom: '8px' }}>게임 방법</div>
                <div className="space-y-2">
                  {act.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: COLORS.primary, color: 'white', fontSize: '11px', fontWeight: 800, marginTop: '1px' }}>{i + 1}</div>
                      <span style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Fishing content ───────────────────────────────────────────────────────────

function FishingContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            낚시 컨텐츠는 하루 <strong>집중력이 제한</strong>되어 있는 특별한 컨텐츠입니다.
          </p>
          <div className="rounded-xl overflow-hidden mb-4" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A886b6ab9-49ad-40f9-a34d-0c1806edb491%3Aimage.png?table=block&id=34a7ce2d-5858-8007-9b17-d5e1d16a0118&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1410&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="낚시 컨텐츠 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <InfoBox type="warning">
            이곳에서 활동 행위를 방해할 경우 엄중한 처벌에 처하실 수 있습니다.
          </InfoBox>
        </SectionCard>
      </div>

      <div id="focus">
        <SectionCard icon="🎯" title="낚시 집중력">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              { emoji: '✅', label: '낚시 성공 시', value: '집중력 5 소모', color: '#5BBE63' },
              { emoji: '❌', label: '낚시 실패 시', value: '집중력 1 소모', color: '#FF8A8A' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: item.color + '18', border: `1.5px solid ${item.color}55` }}>
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div style={{ fontSize: '12px', color: '#6B8A50' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox type="info">
            집중력이 전부 소모되면 물고기 판매 가격이 <strong>기존의 15%</strong>로 조정됩니다. 또한 물 원소와 무지개 물고기 대신 <strong>바다의 파편</strong>이 드롭됩니다.
          </InfoBox>
          <div className="mt-3 p-4 rounded-xl" style={{ backgroundColor: '#F0F8FF', border: `1.5px solid ${COLORS.blue}55` }}>
            <p style={{ fontSize: '13px', color: '#1a6fa3', lineHeight: 1.8 }}>
              💡 바다의 파편은 <strong>12개</strong>를 모아 <strong>물 원소 / 무지개 물고기</strong>를 선택하여 교환할 수 있습니다.
            </p>
          </div>
        </SectionCard>
      </div>

      <div id="items">
        <SectionCard icon="💵" title="낚시 아이템 판매 & 특별 아이템">
          <div className="space-y-3 mb-4">
            {[
              { emoji: '🐟', title: '물고기 판매', desc: '물고기를 판매하면 수익을 얻을 수 있습니다. 총 48종의 물고기(은별, 금별 포함)를 획득할 수 있으며, 큰 물고기일수록 더욱 높은 수익을 획득할 수 있어요.' },
              { emoji: '✨', title: '특별 아이템', desc: '1% 확률로 무지개 물고기 또는 물 원소를 얻을 수 있습니다. 특별 아이템은 낚시꾼의 아이템 교환처에서 아이템을 교환할 수 있습니다.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '4px' }}>{item.title}</div>
                  <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div id="enhance">
        <SectionCard icon="🎣" title="낚싯대 강화">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.8, marginBottom: '16px' }}>
            물 원소를 이용하여 낚싯대를 강화할 수 있습니다. 총 3종의 강화 옵션을 선택하여 상승시킬 수 있어요.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {[
              { emoji: '×2', title: '더블 드랍 확률', desc: '인챈트당 +5%' },
              { emoji: '⚡', title: '물고기 낚는 속도', desc: '바닐라 미끼 인챈트와 동일' },
              { emoji: '🎮', title: '미니게임 무시', desc: '인챈트 1당 +10%' },
            ].map((opt) => (
              <div key={opt.title} className="p-4 rounded-xl text-center" style={{ backgroundColor: '#F0F8FF', border: `1.5px solid ${COLORS.blue}55` }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: COLORS.blue, marginBottom: '4px' }}>{opt.emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '2px' }}>{opt.title}</div>
                <div style={{ fontSize: '12px', color: '#6B8A50' }}>{opt.desc}</div>
              </div>
            ))}
          </div>

          <InfoBox type="tip">
            모든 낚싯대 강화는 게이지가 모두 찬 후, 다음 강화를 진행해야 인챈트 효과가 발휘됩니다.
          </InfoBox>

          {/* Enchant guide images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img
                src="https://mcnspring.notion.site/image/attachment%3Aebdfb2f5-81c2-48d2-9240-cfd5c2f93631%3Aimage.png?table=block&id=34c7ce2d-5858-8053-acf4-f1fc6681d2d7&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=450&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
                alt="낚싯대 게이지 꽉 참"
                style={{ width: '100%', display: 'block' }}
              />
              <div style={{ padding: '8px 12px', fontSize: '12px', color: '#4A6030', backgroundColor: '#FAFFF9', textAlign: 'center', lineHeight: 1.5 }}>
                게이지가 꽉 차고 별이 생기면 강화가 적용돼요
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img
                src="https://mcnspring.notion.site/image/attachment%3A6f268a85-5640-4270-89b9-5d06ec4ff354%3Aimage.png?table=block&id=3727ce2d-5858-8078-8dff-db9f2858383d&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=450&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
                alt="별이 달리지 않은 상태"
                style={{ width: '100%', display: 'block' }}
              />
              <div style={{ padding: '8px 12px', fontSize: '12px', color: '#4A6030', backgroundColor: '#FAFFF9', textAlign: 'center', lineHeight: 1.5 }}>
                아직 미끼에 별이 달리지 않은 상태
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img
                src="https://mcnspring.notion.site/image/attachment%3A45aac220-bf59-4b5a-b9d0-71373e701930%3Aimage.png?table=block&id=3727ce2d-5858-80ad-9a97-d6a8070f097b&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=450&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
                alt="인챈트 적용 완료"
                style={{ width: '100%', display: 'block' }}
              />
              <div style={{ padding: '8px 12px', fontSize: '12px', color: '#2d7a35', backgroundColor: '#F0FAF1', textAlign: 'center', lineHeight: 1.5 }}>
                ✓ 미끼 별 1 정상 적용 완료
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Cookie Run content ────────────────────────────────────────────────────────

const cookieStages = [
  { stage: '1STAGE', baskets: 1 },
  { stage: '2STAGE', baskets: 3 },
  { stage: '3STAGE', baskets: 5 },
  { stage: '4STAGE', baskets: 10 },
  { stage: '5STAGE', baskets: 16 },
];

function CookieRunContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            쿠키런은 하루에 제한 없이 이용할 수 있는 수익률 높은 컨텐츠입니다. 단순히 점프맵을 통해 클리어만 해도 자금을 수급하실 수 있어요.
          </p>
          <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#FFF9E6', border: `1.5px solid ${COLORS.yellow}55` }}>
            <p style={{ fontSize: '14px', color: '#856404', lineHeight: 1.8 }}>
              스테이지를 깨면 <strong>디저트 바구니</strong>를 획득하고, 바구니를 열면 판매 가능한 디저트를 획득합니다. 획득한 디저트를 NPC를 통해 전부 판매하여 돈을 모아봐요!
            </p>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3Ae6536a62-195a-4532-9362-6e74bc423568%3Aimage.png?table=block&id=3727ce2d-5858-8094-8590-d3927dd202e8&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=880&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="쿠키런 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </SectionCard>
      </div>

      <div id="stages">
        <SectionCard icon="🏆" title="스테이지 보상">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {cookieStages.map((s, i) => {
              const intensity = i / (cookieStages.length - 1);
              const bg = `hsl(${35 + intensity * 15}, ${70 + intensity * 20}%, ${92 - intensity * 10}%)`;
              const border = `hsl(${35 + intensity * 15}, ${70 + intensity * 20}%, ${70 - intensity * 10}%)`;
              const text = `hsl(${35 + intensity * 15}, 60%, ${30 - intensity * 5}%)`;
              return (
                <div key={s.stage} className="rounded-2xl p-4 text-center" style={{ backgroundColor: bg, border: `1.5px solid ${border}` }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: text, marginBottom: '8px' }}>{s.stage}</div>
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>🧺</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: text }}>{s.baskets}<span style={{ fontSize: '12px', fontWeight: 700, marginLeft: '2px' }}>개</span></div>
                  <div style={{ fontSize: '11px', color: text, opacity: 0.8, marginTop: '2px' }}>디저트 바구니</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <InfoBox type="tip">
              5STAGE까지 클리어하면 디저트 바구니를 총 35개 획득할 수 있어요. 제한 없이 반복 플레이가 가능합니다!
            </InfoBox>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Cooking content ───────────────────────────────────────────────────────────

const cookingRecipes = [
  { name: '사각 빵', ingredients: ['밀 작물', '깨끗한 물', '참나무 원목'], points: 8250 },
  { name: '사과 허브 빵', ingredients: ['밀 작물', '사과', '참나무 원목'], points: 38600 },
  { name: '당근 빵', ingredients: ['당근', '밀 작물', '참나무 원목'], points: 9350 },
  { name: '달콤 당근 스튜', ingredients: ['당근', '깨끗한 물', '설탕', '참나무 원목'], points: 9800 },
  { name: '감자 구이', ingredients: ['감자', '참나무 원목'], points: 5200 },
  { name: '감자 팬 케이크', ingredients: ['감자', '밀 작물', '참나무 원목'], points: 9250 },
  { name: '루비 비트 샐러드', ingredients: ['비트 작물', '사과'], points: 34400 },
  { name: '비트 크림 수프', ingredients: ['비트 작물'], points: 11650 },
  { name: '수박 샤베트', ingredients: ['수박', '설탕'], points: 2300 },
  { name: '수박 볼', ingredients: ['수박', '달콤한 열매'], points: 2300 },
  { name: '호박 파이', ingredients: ['호박', '밀 작물', '참나무 원목'], points: 9900 },
  { name: '매운 호박 스프', ingredients: ['호박', '설탕', '밀 작물', '참나무 원목'], points: 10950 },
  { name: '설탕 크리스탈', ingredients: ['설탕', '참나무 원목'], points: 5250 },
  { name: '카라멜 비스킷', ingredients: ['설탕', '밀 작물', '참나무 원목'], points: 9300 },
  { name: '핫 코코아', ingredients: ['코코아 콩', '깨끗한 우유'], points: 3800 },
  { name: '초코 스낵 바', ingredients: ['코코아 콩', '설탕', '참나무 원목'], points: 5600 },
  { name: '베리 파이', ingredients: ['달콤한 열매', '밀 작물', '참나무 원목'], points: 9300 },
  { name: '죽순 구이', ingredients: ['대나무', '참나무 원목'], points: 5000 },
  { name: '대나무 리조또', ingredients: ['대나무', '밀 작물', '깨끗한 물', '참나무 원목'], points: 12500 },
  { name: '베리 파르페', ingredients: ['달콤한 열매', '깨끗한 우유'], points: 4450 },
].sort((a, b) => b.points - a.points);

function pointColor(pts: number) {
  if (pts >= 30000) return { bg: '#FFF0F0', text: '#c0392b', border: '#FF8A8A' };
  if (pts >= 10000) return { bg: '#FFF9E6', text: '#856404', border: '#FFD86B' };
  return { bg: '#F0FAF1', text: '#2d7a35', border: '#5BBE63' };
}

function CookingContent() {
  const [search, setSearch] = useState('');
  const filtered = search.trim()
    ? cookingRecipes.filter(
        (r) =>
          r.name.includes(search) ||
          r.ingredients.some((ing) => ing.includes(search))
      )
    : cookingRecipes;

  const maxPts = Math.max(...cookingRecipes.map((r) => r.points));

  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '4px' }}>
            매일 다른 요리를 제작하여 <strong>랭킹 포인트를 추가로 획득</strong>할 수 있는 컨텐츠입니다.
          </p>
          <ul style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0, marginBottom: '16px' }} className="space-y-1">
            <li>• 오늘의 요리는 <strong>매일 자정</strong>에 요리 정보가 초기화됩니다.</li>
            <li>• 예외 없이 모든 요리는 <strong>개당 10초</strong>의 제작 시간이 존재합니다.</li>
          </ul>
          <div className="rounded-xl overflow-hidden mb-2" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A31e16fa6-2df0-49dd-9f46-f7943922b169%3Aimage.png?table=block&id=3737ce2d-5858-80d1-b81d-cbe30a512b61&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1220&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="오늘의 요리 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </SectionCard>
      </div>

      <div id="recipes">
        <SectionCard icon="🍽️" title="요리 레시피 목록">
          {/* 포인트 범례 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: '30,000pt 이상', ...pointColor(38600) },
              { label: '10,000pt 이상', ...pointColor(12000) },
              { label: '10,000pt 미만', ...pointColor(5000) },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: l.bg, border: `1px solid ${l.border}`, fontSize: '11px', fontWeight: 700, color: l.text }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: l.border }} />
                {l.label}
              </span>
            ))}
          </div>

          {/* 검색 */}
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="요리명 또는 재료로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl px-4 py-2.5 outline-none"
              style={{ border: `1.5px solid ${COLORS.border}`, fontSize: '14px', color: '#2C3E20', backgroundColor: 'white' }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ fontSize: '16px', color: '#6B8A50', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ×
              </button>
            )}
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filtered.map((r) => {
              const c = pointColor(r.points);
              const barWidth = Math.round((r.points / maxPts) * 100);
              return (
                <div
                  key={r.name}
                  className="rounded-xl p-4 flex flex-col gap-3"
                  style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', lineHeight: 1.4 }}>{r.name}</span>
                    <span
                      className="px-2 py-0.5 rounded-full shrink-0"
                      style={{ fontSize: '11px', fontWeight: 800, backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}`, whiteSpace: 'nowrap' }}
                    >
                      {r.points.toLocaleString()}pt
                    </span>
                  </div>

                  {/* 포인트 바 */}
                  <div className="h-1.5 rounded-full" style={{ backgroundColor: '#F0FAF1' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${barWidth}%`, backgroundColor: c.border, transition: 'width 0.3s' }}
                    />
                  </div>

                  {/* 재료 */}
                  <div className="flex flex-wrap gap-1">
                    {r.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2 py-0.5 rounded-lg"
                        style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#F0FAF1', color: '#4A6030', border: `1px solid ${COLORS.border}` }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-10 text-center" style={{ color: '#6B8A50', fontSize: '14px' }}>
              "{search}"에 해당하는 요리가 없어요.
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}

// ── Overall Ranking ───────────────────────────────────────────────────────────

const overallRankings = [
  { emoji: '🎣', name: '낚시', key: '낚시 성공 횟수', pts: '성공 +2pt / 실패 +1pt' },
  { emoji: '🧹', name: '청소', key: '먼지 처리하기 횟수', pts: '성공 +1pt' },
  { emoji: '🐑', name: '양털', key: '양털 깎기 횟수', pts: '일반 +1pt / 황금 +1pt' },
  { emoji: '🍎', name: '서리', key: '과일 서리 횟수', pts: '일반 +1pt / 황금 +2pt' },
  { emoji: '🏹', name: '수렵', key: '동물 수렵 횟수', pts: '수렵당 +1pt' },
  { emoji: '⛏️', name: '채광', key: '광물 채광 횟수', pts: '석탄~다이아 +1~32pt' },
  { emoji: '🪓', name: '벌목', key: '나무 벌목 횟수', pts: '벌목당 +1pt' },
  { emoji: '💬', name: '답변', key: '답변 횟수', pts: '질문당 최초 3회 +1pt' },
];

const rewardItems = [
  '메모리얼 스크롤 박스 ×1',
  '유니크 스크롤 박스 ×10',
  '축복의 결정 ×10',
  '찬란한 경험치 병 ×10',
  '카지노 그린 칩 ×1',
  '황금빛 낙엽 ×1',
];

function OverallRankingContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <ul style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0, marginBottom: '16px' }} className="space-y-1">
            <li>• 종합 컨텐츠 랭킹은 <strong>소정의 보상만 지급</strong>되는 성취 시스템입니다.</li>
            <li>• 서버 밸런스에 크게 영향을 주지 않도록 설계되었습니다.</li>
            <li>• 랭킹은 총 <strong>8가지</strong>가 존재하며, 경쟁률이 상대적으로 낮아 달성하기 쉬운 편입니다.</li>
            <li>• <strong>모든 컨텐츠 랭킹 보상은 1위만 지급</strong>됩니다.</li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              { emoji: '🔄', label: '초기화 주기', value: '매주 일요일 오후 11:59 이후' },
              { emoji: '📬', label: '보상 지급', value: '우편함으로 지급' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div style={{ fontSize: '12px', color: '#6B8A50' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A86402293-bad5-4e35-bacb-0063bfab0dee%3Aimage.png?table=block&id=3147ce2d-5858-8049-b9b2-cf94c0758625&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1280&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="명예의 전당 화면"
              style={{ width: '100%', display: 'block' }}
            />
            <div style={{ padding: '8px 14px', fontSize: '12px', color: '#6B8A50', backgroundColor: '#FAFFF9' }}>
              메뉴에서 명예의 전당으로 워프하거나, 스폰 지역 좌측편에 위치되어 있습니다.
            </div>
          </div>
        </SectionCard>
      </div>

      <div id="rankings">
        <SectionCard icon="🏅" title="랭킹 종류 & 포인트 기준">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {overallRankings.map((r) => (
              <div key={r.name} className="rounded-xl p-4" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{r.emoji}</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#2C3E20' }}>{r.name}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#6B8A50', marginBottom: '6px' }}>기록 기준: {r.key}</div>
                <div className="px-2 py-1 rounded-lg" style={{ backgroundColor: '#F0FAF1', fontSize: '12px', fontWeight: 700, color: COLORS.primary }}>
                  {r.pts}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div id="reward">
        <SectionCard icon="🎁" title="1위 보상">
          <div className="p-4 rounded-xl mb-2" style={{ backgroundColor: '#FFF9E6', border: `1.5px solid ${COLORS.yellow}55` }}>
            <p style={{ fontSize: '13px', color: '#856404', marginBottom: '10px', fontWeight: 700 }}>🥇 각 랭킹 1위에게 지급되는 보상</p>
            <div className="flex flex-wrap gap-2">
              {rewardItems.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.yellow}88`, fontSize: '13px', fontWeight: 700, color: '#2C3E20' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Proficiency ───────────────────────────────────────────────────────────────

const proficiencyLevels = [
  { lv: 1, exp: 27153.5 }, { lv: 2, exp: 29868.9 }, { lv: 3, exp: 32855.8 },
  { lv: 4, exp: 36141.3 }, { lv: 5, exp: 39755.5 }, { lv: 6, exp: 43731.0 },
  { lv: 7, exp: 48104.1 }, { lv: 8, exp: 52914.5 }, { lv: 9, exp: 58206.0 },
  { lv: 10, exp: 64026.6 }, { lv: 11, exp: 102122.4 }, { lv: 12, exp: 112334.6 },
  { lv: 13, exp: 123568.1 }, { lv: 14, exp: 135924.9 }, { lv: 15, exp: 149517.4 },
  { lv: 16, exp: 164469.2 }, { lv: 17, exp: 180916.1 }, { lv: 18, exp: 199007.7 },
  { lv: 19, exp: 218908.4 }, { lv: 20, exp: 240799.3 }, { lv: 21, exp: 384074.9 },
  { lv: 22, exp: 422482.4 }, { lv: 23, exp: 464730.6 }, { lv: 24, exp: 511203.7 },
  { lv: 25, exp: 562324.0 }, { lv: 26, exp: 618556.4 }, { lv: 27, exp: 680412.1 },
  { lv: 28, exp: 748453.3 }, { lv: 29, exp: 823298.6 }, { lv: 30, exp: 905628.5 },
  { lv: 31, exp: 1444477.4 }, { lv: 32, exp: 1588925.1 }, { lv: 33, exp: 1747817.6 },
  { lv: 34, exp: 1922599.4 }, { lv: 35, exp: 2114859.4 }, { lv: 36, exp: 2326345.3 },
  { lv: 37, exp: 2558979.8 }, { lv: 38, exp: 2814877.8 }, { lv: 39, exp: 3096365.6 },
  { lv: 40, exp: 3406002.1 }, { lv: 41, exp: 5432573.4 }, { lv: 42, exp: 5975830.8 },
  { lv: 43, exp: 6573413.8 }, { lv: 44, exp: 7230755.2 }, { lv: 45, exp: 7953830.7 },
  { lv: 46, exp: 8749213.8 }, { lv: 47, exp: 9624135.2 }, { lv: 48, exp: 10586548.7 },
  { lv: 49, exp: 11645203.6 },
];

const rebirthExamples = [
  { cond: '채광 50 / 채집 10 / 벌목 10 / 수렵 10', result: '축복의 결정 20개' },
  { cond: '채광 50 / 채집 50 / 벌목 10 / 수렵 10', result: '축복의 결정 40개' },
  { cond: '채광 50(+축복 1,000pt) / 나머지 10', result: '축복의 결정 40개' },
  { cond: '채광 50(+축복 1,000pt) / 채집(+축복 1,000pt) / 나머지 10', result: '축복의 결정 60개' },
];

function lvRangeColor(lv: number) {
  if (lv <= 10) return { bg: '#F0FAF1', text: '#2d7a35', border: '#5BBE63' };
  if (lv <= 20) return { bg: '#FFFBEA', text: '#856404', border: '#FFD86B' };
  if (lv <= 30) return { bg: '#FFF3E0', text: '#7a3d00', border: '#FF9800' };
  if (lv <= 40) return { bg: '#FFF0F0', text: '#c0392b', border: '#FF8A8A' };
  return { bg: '#F3E8FF', text: '#6d28d9', border: '#a78bfa' };
}

function ProficiencyContent() {
  const [tab, setTab] = useState<'overview' | 'rebirth' | 'expTable'>('overview');

  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            숙련도는 특정한 활동에 따라 얻을 수 있는 항목입니다. <strong>레벨 50이 되면 환생</strong>이 가능하며, 환생 시 <strong>축복의 결정</strong>을 획득할 수 있습니다.
          </p>
          <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A60ba6688-138f-48c0-830d-534267d05742%3Aimage.png?table=block&id=34a7ce2d-5858-8077-9a0d-d3432ba99bb3&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1410&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="숙련도 메뉴"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <InfoBox type="info">
            메뉴 → 다음 페이지 → 숙련도 로 이동하면 숙련도 메뉴를 확인할 수 있습니다. 각 숙련도당 환생 전까지는 <strong>1,000포인트씩</strong>만 넣을 수 있습니다.
          </InfoBox>

          {/* 성장 방법 두 가지 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {[
              {
                title: '직접 활동',
                emoji: '⚡',
                items: ['채광 — 광물 채광 시', '채집 — 작물 채집 시', '벌목 — 나무 벌목 시', '수렵 — 동물 수렵 시'],
              },
              {
                title: '숙련도 제단',
                emoji: '🏛️',
                items: ['채광 — 고품질 광물 사용', '채집 — 고품질 작물 사용', '벌목 — 고품질 약재 사용', '수렵 — 고품질 전리품 사용'],
              },
            ].map((method) => (
              <div key={method.title} className="p-4 rounded-xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{method.emoji}</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20' }}>{method.title}</span>
                </div>
                <ul className="space-y-1.5">
                  {method.items.map((item) => (
                    <li key={item} style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div id="rebirth">
        <SectionCard icon="✨" title="환생 시스템">
          <ul style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0 }} className="space-y-1.5 mb-5">
            <li>• 환생 시 채광·채집·벌목·수렵 숙련도 레벨이 <strong>모두 1레벨로 초기화</strong>됩니다.</li>
            <li>• 환생 조건: 최소 1개의 숙련도 <strong>50레벨 달성</strong></li>
            <li>• 50레벨 달성한 숙련도 1개당 <strong>축복의 결정 20개</strong> 지급</li>
            <li>• 축복 포인트 1,000 달성 시 추가로 <strong>축복의 결정 20개</strong> 지급</li>
            <li>• 축복 포인트는 1,000을 채우지 않아도 채운 수치에 <strong>비례해 지급</strong></li>
          </ul>

          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '10px' }}>예시</h4>
          <div className="space-y-2">
            {rebirthExamples.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
                <div style={{ fontSize: '12px', color: '#4A6030', flex: 1, lineHeight: 1.6 }}>{ex.cond}</div>
                <div className="shrink-0 px-3 py-1 rounded-lg" style={{ backgroundColor: '#E8F8EB', color: COLORS.primary, fontSize: '13px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                  → {ex.result}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div id="expTable">
        <SectionCard icon="📊" title="숙련도 필요 경험치">
          {/* 구간 탭 */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { label: 'Lv 1~10', range: [1, 10] as [number, number] },
              { label: 'Lv 11~20', range: [11, 20] as [number, number] },
              { label: 'Lv 21~30', range: [21, 30] as [number, number] },
              { label: 'Lv 31~40', range: [31, 40] as [number, number] },
              { label: 'Lv 41~49', range: [41, 49] as [number, number] },
            ].map(({ label, range }) => {
              const c = lvRangeColor(range[0]);
              const isActive = tab === 'expTable' || true; // always show tab buttons
              return (
                <button
                  key={label}
                  onClick={() => setTab('expTable')}
                  className="px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: c.bg, border: `1.5px solid ${c.border}`, color: c.text, fontSize: '12px', fontWeight: 700, cursor: 'default' }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="overflow-x-auto rounded-xl" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F0FAF1' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'center', color: '#2C3E20', fontWeight: 800, borderBottom: `1px solid ${COLORS.border}`, width: '100px' }}>레벨</th>
                  <th style={{ padding: '10px 16px', textAlign: 'right', color: '#2C3E20', fontWeight: 800, borderBottom: `1px solid ${COLORS.border}` }}>필요 경험치</th>
                </tr>
              </thead>
              <tbody>
                {proficiencyLevels.map((row, i) => {
                  const c = lvRangeColor(row.lv);
                  return (
                    <tr key={row.lv} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#FAFFF9' }}>
                      <td style={{ padding: '9px 16px', textAlign: 'center', borderBottom: `1px solid ${COLORS.border}` }}>
                        <span className="px-2 py-0.5 rounded-md" style={{ backgroundColor: c.bg, color: c.text, fontWeight: 800, fontSize: '12px', whiteSpace: 'nowrap' }}>
                          Lv {row.lv}
                        </span>
                      </td>
                      <td style={{ padding: '9px 16px', textAlign: 'right', color: '#4A6030', fontWeight: 600, borderBottom: `1px solid ${COLORS.border}`, fontVariantNumeric: 'tabular-nums' }}>
                        {row.exp.toLocaleString('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Tool Blessing ─────────────────────────────────────────────────────────────

const blessingOptions = [
  {
    name: '고품질 아이템 드랍률',
    emoji: '⭐',
    color: '#FFD86B',
    bg: '#FFFBEA',
    border: '#FFD86B',
    desc: '랭킹포인트, 장신구 제작, 자금 수급에 매우 용이한 옵션입니다.',
  },
  {
    name: '추가 경험치 획득률',
    emoji: '✨',
    color: '#7FCFFF',
    bg: '#E8F4FF',
    border: '#7FCFFF',
    desc: '경험치 수급이 빨라 경험치 상점에서 아이템을 더욱 구매하기 쉬워집니다.',
  },
];

const proficiencyMethods = [
  { name: '채광 숙련도', emoji: '⛏️', desc: '모든 광물류를 채광할 경우 숙련도가 상승합니다.' },
  { name: '채집 숙련도', emoji: '🌾', desc: '대부분의 작물을 수확할 경우 숙련도가 상승합니다.' },
  { name: '수렵 숙련도', emoji: '🏹', desc: '수렵장에서 동물을 수렵할 경우 숙련도가 상승합니다.' },
  { name: '벌목 숙련도', emoji: '🪓', desc: '모든 종류의 나무 및 나뭇잎을 부술 경우 숙련도가 상승합니다.' },
];

function ToolBlessingContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            도구에 축복을 부여하여 고품질 아이템 드랍률과 추가 경험치 획득률을 높일 수 있습니다.
          </p>

          <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A9eabd774-3bd7-4258-b22b-2a46c495181a%3Aimage.png?table=block&id=3147ce2d-5858-8029-87a7-ee9edaae47ad&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1060&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="도구 축복 부여 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blessingOptions.map((opt) => (
              <div key={opt.name} className="p-5 rounded-xl" style={{ backgroundColor: opt.bg, border: `1.5px solid ${opt.border}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{opt.emoji}</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#2C3E20' }}>{opt.name}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{opt.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div id="crystal">
        <SectionCard icon="💎" title="축복의 결정 획득 방법">
          <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A50d2a7a9-7829-4c82-aff0-6812fe6632c0%3Aimage.png?table=block&id=3147ce2d-5858-80de-854e-e367fea62a84&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1060&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="마법 부여소 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '8px' }}>🔮 주요 획득처</div>
              <ul style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0 }}>
                {['숙련도 50레벨 도달 후 환생', '일일 컨텐츠', '낚시 컨텐츠', '경험치 상점', '교환 상점'].map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFFBEA', border: `1.5px solid #FFD86B55` }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '8px' }}>✨ 환생 시스템</div>
              <ul style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0 }}>
                <li>• 채광 또는 채집 숙련도 50레벨 달성 시 환생 가능</li>
                <li>• 환생 시 <strong>축복의 결정</strong> 획득</li>
                <li>• 마법 부여소에서 도구에 축복 부여</li>
              </ul>
            </div>
          </div>

          <InfoBox type="tip">
            숙련도를 빠르게 올려 환생을 반복할수록 더 많은 축복의 결정을 모을 수 있습니다. 자세한 환생 방법은 <strong>숙련도</strong> 페이지를 참조하세요.
          </InfoBox>
        </SectionCard>
      </div>

      <div id="proficiency">
        <SectionCard icon="⚡" title="숙련도 상승 방법">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {proficiencyMethods.map((m) => (
              <div key={m.name} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
                <span className="text-2xl">{m.emoji}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '4px' }}>{m.name}</div>
                  <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Profile Stats ─────────────────────────────────────────────────────────────

function ProfileStatsContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            새봄농장의 모든 추가 확률은 <strong>곱연산</strong>을 적용합니다.
          </p>

          <div className="p-5 rounded-xl mb-5" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '12px' }}>📐 확률 계산 공식</div>
            <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: 'white', border: `1px solid ${COLORS.border}`, fontSize: '14px', color: '#2C3E20', textAlign: 'center' }}>
              기본 확률 × (1 + 추가 확률의 합) = 적용 확률
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '8px' }}>예시</div>
            <div className="space-y-1 mb-3">
              {[
                { label: '기본 등장 확률', value: '1%' },
                { label: '특수 아이템 드랍 확률 (축복)', value: '+20%' },
                { label: '특수 아이템 드랍 확률 (큐브)', value: '+20%' },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center px-3 py-2 rounded-lg" style={{ backgroundColor: '#FAFFF9' }}>
                  <span style={{ fontSize: '13px', color: '#4A6030' }}>{r.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: COLORS.primary }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: COLORS.primary + '18', border: `1px solid ${COLORS.primary}55` }}>
              <span style={{ fontSize: '13px', color: '#2C3E20' }}>계산 결과:</span>
              <span style={{ fontSize: '14px', fontWeight: 900, color: COLORS.primary }}>1% × (1 + 0.20 + 0.20) = 1.4%</span>
            </div>
          </div>
        </SectionCard>
      </div>

      <div id="command">
        <SectionCard icon="⌨️" title="프로필 명령어">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.8, marginBottom: '16px' }}>
            <code style={{ backgroundColor: '#F0FAF1', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, color: COLORS.primary }}>/프로필</code> 명령어로 여러 가지 정보를 확인할 수 있습니다. 또는 다른 플레이어를 우클릭하면 프로필을 확인할 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img src="https://mcnspring.notion.site/image/attachment%3A91a32bf8-3d33-4b15-9dfa-04151cc1c15c%3Aimage.png?table=block&id=32b7ce2d-5858-802b-aed0-e7a0b369e334&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=840&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl" alt="프로필 화면" style={{ width: '100%', display: 'block' }} />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
              <img src="https://mcnspring.notion.site/image/attachment%3A2830d845-b8cc-42eb-abd9-02128207efa5%3Aimage.png?table=block&id=32b7ce2d-5858-8019-9bad-ddc70c365f23&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=930&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl" alt="프로필 스탯 화면" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { emoji: '🍀', title: '인기도', desc: '다른 플레이어의 인기도를 하락 또는 상승시킬 수 있습니다. 인당 하루 3회까지 이용 가능합니다. (자정 후 매일 초기화)' },
              { emoji: '🎁', title: '교환 신청', desc: '교환 신청 버튼을 누르면 해당 플레이어에게 교환을 신청할 수 있습니다.' },
              { emoji: '👥', title: '친구 추가', desc: '친구를 추가하여 온라인 여부를 확인할 수 있어요. 명령어는 /친구 입니다.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '4px' }}>{item.title}</div>
                  <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Accessory ─────────────────────────────────────────────────────────────────

function AccessoryContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="장신구란?">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            고품질 아이템을 모아 <strong>마법 부여소</strong>의 <strong>세공사 NPC</strong>를 통해 제작할 수 있는 <strong>특별한 아이템</strong>입니다.
            고품질 아이템을 세공하여 <strong>500 제작 포인트</strong>가 달성될 경우 장신구가 제작됩니다.
          </p>
          <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1.5px solid ${COLORS.border}`, maxWidth: '300px' }}>
            <img src="https://mcnspring.notion.site/image/attachment%3A1851b1fb-c037-4fb2-a4f2-4ea160a84e1e%3Aimage.png?table=block&id=3727ce2d-5858-80c0-9164-de64dd41fb68&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=570&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl" alt="장신구 화면" style={{ width: '100%', display: 'block' }} />
          </div>

          <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '10px' }}>잠재능력 등급 확률</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {[
              { grade: '에픽', prob: '15%', color: '#7c3aed', bg: '#F5F3FF', border: '#a78bfa' },
              { grade: '유니크', prob: '3.5%', color: '#c2410c', bg: '#FFF7ED', border: '#fdba74' },
              { grade: '레전더리', prob: '1.4%', color: '#a16207', bg: '#FEF9C3', border: '#fde047' },
            ].map((g) => (
              <div key={g.grade} className="p-4 rounded-xl text-center" style={{ backgroundColor: g.bg, border: `1.5px solid ${g.border}` }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: g.color, marginBottom: '4px' }}>{g.grade}</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: g.color }}>{g.prob}</div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl" style={{ backgroundColor: '#F0F8FF', border: `1.5px solid ${COLORS.blue}55` }}>
            <p style={{ fontSize: '14px', color: '#1a6fa3', lineHeight: 1.7 }}>
              💡 잠재능력에 대한 자세한 설명은{' '}
              <Link to="/detail/scroll-box" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'underline' }}>스크롤 박스</Link> 페이지를 참조해주세요.
            </p>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── AFK System ────────────────────────────────────────────────────────────────

function AfkSystemContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="잠수 시스템">
          <div className="space-y-2 mb-5">
            {[
              { emoji: '⏱️', text: '잠수 포인트는 1분마다 1포인트씩 지급됩니다. (잠수터에서만 포인트 지급)' },
              { emoji: '🙈', text: '잠수 시 다른 플레이어들이 보이지 않아 백그라운드에서 방해되지 않습니다.' },
              { emoji: '🐢', text: '중앙의 잠수 거북이를 통해 포인트로 아이템을 구매할 수 있습니다.' },
            ].map((item) => (
              <div key={item.emoji} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
                <span className="text-xl">{item.emoji}</span>
                <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img src="https://mcnspring.notion.site/image/attachment%3A46431817-7a4e-4994-b0be-c696ea186aa5%3Aimage.png?table=block&id=3737ce2d-5858-8097-8588-c270f6174a1b&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1420&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl" alt="잠수터 화면" style={{ width: '100%', display: 'block' }} />
          </div>
        </SectionCard>
      </div>
    </>
  );
}

// ── Tool Enhance ──────────────────────────────────────────────────────────────

const toolEnhanceScrolls = [
  {
    name: '일반 도구 강화 주문서',
    color: '#64748b', bg: '#F8FAFC', border: '#cbd5e1',
    success: '40%', fail: '45%', drop: '10%', crash: '5%',
    tools: '곡괭이, 괭이, 도끼, 삽',
    berryPrice: '1,000베리',
    goldPrice: '450만원',
  },
  {
    name: '비급 도구 강화 주문서',
    color: '#1d4ed8', bg: '#EFF6FF', border: '#93c5fd',
    success: '50%', fail: '35%', drop: '10%', crash: '5%',
    tools: '곡괭이, 괭이, 도끼, 삽',
    berryPrice: '1,850베리',
    goldPrice: '유저 거래로만 가능',
  },
  {
    name: '전설 도구 강화 주문서',
    color: '#a16207', bg: '#FEF9C3', border: '#fde047',
    success: '65%', fail: '20%', drop: '10%', crash: '5%',
    tools: '곡괭이, 괭이, 도끼, 삽',
    berryPrice: '2,850베리',
    goldPrice: '유저 거래로만 가능',
  },
];

const resultColors: Record<string, { bg: string; text: string }> = {
  성공: { bg: '#E8F8EB', text: '#2d7a35' },
  실패: { bg: '#FFF0F0', text: '#c0392b' },
  하락: { bg: '#FFF9E6', text: '#856404' },
  폭락: { bg: '#FFF0F0', text: '#7f1d1d' },
};

function ToolEnhanceContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            도구 강화 주문서는 <strong>효율, 행운, 내구성 인챈트</strong>를 상승시킬 수 있습니다.
            최대 강화 인챈트는 각각 <strong>10 인챈트</strong>(10 도달 시 강화 불가능)까지 가능합니다.
          </p>
          <div className="rounded-xl overflow-hidden mb-2" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img src="https://mcnspring.notion.site/image/attachment%3A4b6d253f-eb20-4467-b401-5c027dc0bf3c%3Aimage.png?table=block&id=3737ce2d-5858-8071-a1b9-f7726239a4e2&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=730&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl" alt="도구 강화 주문서 화면" style={{ width: '100%', display: 'block' }} />
          </div>
        </SectionCard>
      </div>

      <div id="scrolls">
        <SectionCard icon="📜" title="주문서 종류">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {toolEnhanceScrolls.map((s) => (
              <div key={s.name} className="rounded-2xl overflow-hidden" style={{ border: `2px solid ${s.border}` }}>
                <div className="px-4 py-3" style={{ backgroundColor: s.bg, borderBottom: `1px solid ${s.border}` }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: s.color }}>{s.name}</span>
                </div>
                <div className="px-4 py-4 space-y-2" style={{ backgroundColor: 'white' }}>
                  {[
                    { label: '성공', value: s.success },
                    { label: '실패', value: s.fail },
                    { label: '하락', value: s.drop },
                    { label: '폭락', value: s.crash },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between items-center px-3 py-1.5 rounded-lg" style={{ backgroundColor: resultColors[r.label].bg }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: resultColors[r.label].text }}>{r.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: resultColors[r.label].text }}>{r.value}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t" style={{ borderColor: COLORS.border }}>
                    <div style={{ fontSize: '12px', color: '#6B8A50', marginBottom: '4px' }}>사용 가능 도구</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#2C3E20' }}>{s.tools}</div>
                  </div>
                  <div className="pt-2 border-t" style={{ borderColor: COLORS.border }}>
                    <div className="flex justify-between items-center mb-1">
                      <span style={{ fontSize: '12px', color: '#6B8A50' }}>베리 상점</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: s.color }}>{s.berryPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ fontSize: '12px', color: '#6B8A50' }}>게임머니</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#4A6030' }}>{s.goldPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

function GenericSections({ data }: { data: ContentData }) {
  const sections = [
    {
      id: 'overview', icon: '📖', title: '개요',
      content: (
        <div>
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.8, marginBottom: '16px' }}>
            <strong>{data.title}</strong>은(는) 새봄농장에서 즐길 수 있는 {data.isNewbie ? '초보자도 쉽게 즐길 수 있는' : '어느 정도 숙련이 필요한'} 컨텐츠입니다. {data.subtitle}
          </p>
          <InfoBox type="tip">
            {data.isNewbie ? `처음 서버에 입장했다면 ${data.title}부터 시작해보세요! 기본적인 게임 흐름을 익히기에 좋습니다.` : `${data.title}을(를) 시작하기 전에 기본 컨텐츠(일일 컨텐츠, 낚시 등)를 먼저 익혀두는 것을 추천합니다.`}
          </InfoBox>
        </div>
      ),
    },
    {
      id: 'how-to', icon: '🎮', title: '진행 방법',
      content: (
        <div>
          <div className="space-y-3">
            {[
              '서버에 접속 후 기본 도구를 준비하세요.',
              `${data.title} 전용 명령어 또는 위치로 이동하세요.`,
              '컨텐츠에 맞는 방법으로 활동을 시작합니다.',
              '획득한 아이템을 상점에서 판매하거나 활용하세요.',
              '숙련도가 오를수록 더 높은 보상을 기대할 수 있어요!',
            ].map((desc, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0 mt-0.5" style={{ backgroundColor: COLORS.primary }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
          <InfoBox type="info">
            /help 명령어를 통해 서버 내 도움말을 확인할 수 있어요. 모르는 것이 있으면 채팅창에서 질문해도 괜찮아요!
          </InfoBox>
        </div>
      ),
    },
    {
      id: 'rewards', icon: '🎁', title: '보상',
      content: (
        <div>
          <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${COLORS.border}` }}>
            <table className="w-full border-collapse">
              <thead>
                <TableRow isHeader cols={['아이템', '획득 방법', '예상 수량', '판매가']} />
              </thead>
              <tbody>
                <TableRow cols={['기본 재료', '활동 중 드롭', '시간당 10~50개', '100 코인/개']} />
                <TableRow cols={['중급 재료', '일정 확률 드롭', '시간당 2~10개', '500 코인/개']} />
                <TableRow cols={['희귀 재료', '낮은 확률 드롭', '시간당 0~2개', '2,000 코인/개']} />
                <TableRow cols={['특별 아이템', '매우 낮은 확률', '가끔씩', '10,000+ 코인/개']} />
              </tbody>
            </table>
          </div>
          <InfoBox type="warning">
            아이템 가격은 서버 경제 상황에 따라 변동될 수 있습니다. 상점에서 현재 가격을 확인하세요!
          </InfoBox>
        </div>
      ),
    },
    {
      id: 'tips', icon: '💡', title: '추천 루트 & 팁',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '⚡', title: '효율 극대화', desc: '숙련도를 먼저 올려두면 같은 시간에 더 많은 수익을 낼 수 있어요.' },
            { icon: '🛡️', title: '도구 관리', desc: '도구 내구도를 항상 확인하고, 도구 축복을 활용해 효율을 높이세요.' },
            { icon: '⏰', title: '시간대 활용', desc: '2배 이벤트 시간대를 노리면 수익을 극적으로 높일 수 있어요!' },
            { icon: '👥', title: '함께 하면 더 좋아요', desc: '파티를 맺고 함께 활동하면 보너스 보상을 획득할 수 있어요.' },
          ].map((tip) => (
            <div key={tip.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#F8FFF5', border: `1px solid ${COLORS.border}` }}>
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '4px' }}>{tip.title}</div>
                <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.6 }}>{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'faq', icon: '❓', title: 'FAQ',
      content: (
        <div>
          <AccordionItem title={`${data.title}을(를) 시작하려면 무엇이 필요한가요?`}>
            기본적인 도구와 초기 코인이 필요합니다. 초기 코인은 일일 컨텐츠나 낚시를 통해 쉽게 모을 수 있어요.
          </AccordionItem>
          <AccordionItem title="수익이 잘 나지 않아요. 어떻게 해야 하나요?">
            숙련도를 올리거나, 더 좋은 도구를 구입하면 수익이 크게 올라갑니다. 이벤트 기간을 활용하면 2~3배 수익을 낼 수 있어요!
          </AccordionItem>
          <AccordionItem title="아이템이 드롭되지 않는 것 같아요.">
            드롭률은 운에 따라 다릅니다. 도구 축복이나 행운 아이템을 사용하면 드롭률을 높일 수 있어요.
          </AccordionItem>
          <AccordionItem title="어느 정도 하면 랭킹 포인트를 얻을 수 있나요?">
            대부분의 활동을 하면 자동으로 랭킹 포인트가 쌓입니다. 활동량이 많을수록 포인트도 많이 쌓여요!
          </AccordionItem>
        </div>
      ),
    },
  ];

  return (
    <>
      {sections.map((section) => (
        <div key={section.id} id={section.id}>
          <SectionCard icon={section.icon} title={section.title}>
            {section.content}
          </SectionCard>
        </div>
      ))}
    </>
  );
}

export function DetailPage() {
  const { contentKey } = useParams<{ contentKey: string }>();
  const navigate = useNavigate();
  const data = contentKey ? contentDatabase[contentKey] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" style={{ backgroundColor: '#F8FFF5' }}>
        <div className="text-6xl">🌱</div>
        <h2 style={{ fontSize: '24px', color: '#2C3E20', fontWeight: 800 }}>페이지 준비 중이에요!</h2>
        <p style={{ color: '#6B8A50', textAlign: 'center' }}>이 컨텐츠의 상세 가이드는 곧 업데이트될 예정입니다.</p>
        <button
          onClick={() => navigate('/content-hub')}
          className="px-6 py-3 rounded-2xl font-bold text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          ← 컨텐츠 목록으로
        </button>
      </div>
    );
  }

  const isRanking = contentKey === 'ranking';
  const isMining = contentKey === 'mining';
  const isLumberjack = contentKey === 'lumberjacking';
  const isHunting = contentKey === 'hunting';
  const isDaily = contentKey === 'daily';
  const isFishing = contentKey === 'fishing';
  const isCookieRun = contentKey === 'cookie-run';
  const isCooking = contentKey === 'cooking';
  const isOverallRanking = contentKey === 'overall-ranking';
  const isProficiency = contentKey === 'proficiency';
  const isCasino = contentKey === 'casino';
  const isScrollBox = contentKey === 'scroll-box';
  const isToolBlessing = contentKey === 'tool-blessing';
  const isProfileStats = contentKey === 'profile-stats';
  const isAccessory = contentKey === 'accessory';
  const isAfkSystem = contentKey === 'afk-system';
  const isToolEnhance = contentKey === 'tool-enhance';
  const isActivityContent = isMining || isLumberjack || isHunting;

  const diff = difficultyBadge[data.difficulty] ?? difficultyBadge['쉬움'];

  const tocItems = isRanking
    ? [
        { id: 'overview', label: '랭킹이란?' },
        { id: 'how-to', label: '포인트 획득 방법' },
        { id: 'settlement', label: '정산 및 초기화' },
        { id: 'rewards', label: '달성 보상' },
        { id: 'faq', label: 'FAQ' },
      ]
    : isActivityContent
    ? [
        { id: 'overview', label: '개요' },
        { id: 'zones', label: '구역 안내' },
      ]
    : isDaily
    ? [
        { id: 'overview', label: '개요' },
        { id: 'activities', label: '활동 종류' },
      ]
    : isFishing
    ? [
        { id: 'overview', label: '개요' },
        { id: 'focus', label: '낚시 집중력' },
        { id: 'items', label: '아이템 & 특별 보상' },
        { id: 'enhance', label: '낚싯대 강화' },
      ]
    : isCookieRun
    ? [
        { id: 'overview', label: '개요' },
        { id: 'stages', label: '스테이지 보상' },
      ]
    : isCooking
    ? [
        { id: 'overview', label: '개요' },
        { id: 'recipes', label: '요리 레시피' },
      ]
    : isOverallRanking
    ? [
        { id: 'overview', label: '개요' },
        { id: 'rankings', label: '랭킹 종류' },
        { id: 'reward', label: '1위 보상' },
      ]
    : isProficiency
    ? [
        { id: 'overview', label: '개요' },
        { id: 'rebirth', label: '환생 시스템' },
        { id: 'expTable', label: '필요 경험치' },
      ]
    : isCasino
    ? [
        { id: 'overview', label: '개요' },
        { id: 'chips', label: '칩 종류' },
        { id: 'odds', label: '확률 정보' },
      ]
    : isScrollBox
    ? [
        { id: 'overview', label: '개요' },
        { id: 'options', label: '옵션 목록' },
        { id: 'boxes', label: '박스 종류' },
      ]
    : isToolBlessing
    ? [
        { id: 'overview', label: '개요' },
        { id: 'crystal', label: '축복의 결정 획득' },
        { id: 'proficiency', label: '숙련도 상승 방법' },
      ]
    : isProfileStats
    ? [
        { id: 'overview', label: '확률 계산' },
        { id: 'command', label: '프로필 기능' },
      ]
    : isAccessory
    ? [
        { id: 'overview', label: '장신구란?' },
      ]
    : isAfkSystem
    ? [
        { id: 'overview', label: '잠수 시스템' },
      ]
    : isToolEnhance
    ? [
        { id: 'overview', label: '개요' },
        { id: 'scrolls', label: '주문서 종류' },
      ]
    : [
        { id: 'overview', label: '개요' },
        { id: 'how-to', label: '진행 방법' },
        { id: 'rewards', label: '보상' },
        { id: 'tips', label: '팁' },
        { id: 'faq', label: 'FAQ' },
      ];

  return (
    <div style={{ fontFamily: 'inherit', backgroundColor: '#F8FFF5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm" style={{ color: '#6B8A50' }}>
          <Link to="/" className="flex items-center gap-1 hover:underline"><Home size={14} />홈</Link>
          <ChevronRight size={14} />
          <Link to="/content-hub" className="hover:underline">콘텐츠</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#2C3E20', fontWeight: 700 }}>{data.title}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 py-10" style={{ background: data.heroGradient, borderBottom: `2px solid ${COLORS.border}` }}>
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-5xl shadow-xl shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            {data.icon}
          </div>
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900 }}>{data.title}</h1>
              {data.isNewbie && !isRanking && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: COLORS.primary }}>
                  🌱 뉴비 추천
                </span>
              )}
            </div>
            <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.6 }}>{data.subtitle}</p>
          </div>
        </div>
      </div>


      {/* Main content + TOC */}
      <div className="px-4 pt-8 pb-12 max-w-6xl mx-auto flex gap-6">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-20 rounded-2xl p-4" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B8A50', marginBottom: '12px' }}>목차</div>
            {tocItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block py-1.5 px-2 rounded-lg text-sm transition-colors hover:bg-green-50" style={{ color: '#4A6030', fontSize: '13px', fontWeight: 600 }}>
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content sections */}
        <main className="flex-1 min-w-0">
          {isRanking ? <RankingContent />
            : isMining ? <MiningContent />
            : isLumberjack ? <LumberjackContent />
            : isHunting ? <HuntingContent />
            : isDaily ? <DailyContent />
            : isFishing ? <FishingContent />
            : isCookieRun ? <CookieRunContent />
            : isCooking ? <CookingContent />
            : isOverallRanking ? <OverallRankingContent />
            : isProficiency ? <ProficiencyContent />
            : isCasino ? <CasinoContent />
            : isScrollBox ? <ScrollBoxContent />
            : isToolBlessing ? <ToolBlessingContent />
            : isProfileStats ? <ProfileStatsContent />
            : isAccessory ? <AccessoryContent />
            : isAfkSystem ? <AfkSystemContent />
            : isToolEnhance ? <ToolEnhanceContent />
            : <GenericSections data={data} />}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate('/content-hub')}
              className="px-5 py-2.5 rounded-xl transition-all hover:shadow-md"
              style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}`, color: '#4A6030', fontWeight: 700, fontSize: '14px' }}
            >
              ← 목록으로
            </button>
            <Link
              to="/help"
              className="px-5 py-2.5 rounded-xl text-white transition-all hover:shadow-md inline-block"
              style={{ backgroundColor: COLORS.primary, fontWeight: 700, fontSize: '14px' }}
            >
              도움말 보기 →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
