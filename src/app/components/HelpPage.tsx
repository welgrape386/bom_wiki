import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home, ChevronDown, ChevronUp } from 'lucide-react';

const COLORS = { primary: '#5BBE63', border: '#DCEFD9' };

const faqs = [
  {
    emoji: '🤔',
    q: '뭘 해야할지 모르겠어요.',
    a: (
      <span>
        길라잡이를 이용해보세요. <strong>[L]</strong> 키를 통해 업적창에서 길라잡이를 이용할 수 있어요.
        <br />돈을 벌고 싶으신가요? 아래의 <strong>"돈을 버는 방법"</strong> 항목을 확인해보세요.
      </span>
    ),
  },
  {
    emoji: '👥',
    q: '친구랑 같이 들어왔는데, 어떻게 같이 해요?',
    a: (
      <div className="space-y-2">
        <p>농장의 구성원으로 들어가실 분은 <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F0FAF1', color: COLORS.primary, fontWeight: 800 }}>/농장 삭제</code> 명령어로 농장을 삭제합니다.</p>
        <p>농장의 주인이 되실 분은 <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F0FAF1', color: COLORS.primary, fontWeight: 800 }}>/농장 초대 &lt;닉네임&gt;</code> 명령어로 농장에 초대합니다.</p>
        <div className="mt-2 p-3 rounded-xl" style={{ backgroundColor: '#FFF0F0', borderLeft: '4px solid #FF8A8A' }}>
          <p style={{ fontSize: '13px', color: '#c0392b', fontWeight: 700 }}>⚠️ 주의: 농장을 삭제하면 키우던 농장은 원래대로 되돌릴 수 없어요.</p>
        </div>
      </div>
    ),
  },
  {
    emoji: '🌾',
    q: '농장에서 뭘 해야 하나요?',
    a: (
      <p>농장은 여러 가지 의미를 갖습니다. 나 또는 다른 사람들과 함께 돈을 벌어들이고 더욱 풍족한 생활을 하기 위한 기반이에요. 돈을 많이 벌려면 농장도 확장시켜야 하고 도구도 더 좋아야겠죠?</p>
    ),
  },
  {
    emoji: '💰',
    q: '돈을 버는 방법이 궁금해요.',
    a: (
      <div className="space-y-3">
        <p>기본적인 방법은 <strong>농작물을 키우고</strong> 수확하여 <strong>상점에서 아이템을 판매</strong>하는 거예요. 아이템을 얻고 상점에서 판매한다는 것만 기억하세요!</p>
        <p>초반에 특히 추천하는 컨텐츠:</p>
        <div className="flex flex-wrap gap-2">
          {['낚시', '수렵', '쿠키런', '일일 컨텐츠'].map((c) => (
            <span key={c} className="px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.primary + '22', color: COLORS.primary, fontWeight: 800, fontSize: '13px' }}>{c}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    emoji: '🏆',
    q: '서버의 목표는 뭔가요?',
    a: <p>여러 가지가 있지만 우선적으로 최고 명예인 <strong>최상위 랭킹</strong>입니다. 그렇다면 부가적으로 도구나 농장의 크기도 커야 하고, 열심히 활동하셔야겠죠!</p>,
  },
  {
    emoji: '🆘',
    q: '문제가 생겼어요 ㅠㅠ',
    a: <p>문제가 생겼다면 <strong>디스코드</strong>를 통해 문의를 작성하실 수 있습니다. 서버 연동이 되어야 문의가 가능하니 미리 가입해두세요!</p>,
  },
  {
    emoji: '📋',
    q: '서브 컨텐츠들에 대해 알고 싶어요.',
    a: (
      <div className="space-y-4">
        {[
          {
            num: '1',
            title: '일일 피로도 소모 컨텐츠',
            desc: '메뉴에서 시계 모양이 있다면 하루 제한이 있는 컨텐츠입니다. 아이템 획득 및 수익률은 좋지만 하루 제한이 있어 피로도를 전부 채우면 다른 걸 하는 게 좋아요!',
          },
          {
            num: '2',
            title: '무제한 이용 가능 서브 컨텐츠',
            desc: '언제든지 이용 가능한 컨텐츠입니다. 수익률도 적당하고 재료 수급에도 좋아요.',
          },
          {
            num: '3',
            title: '기타 서브 컨텐츠',
            desc: '낚시, 카지노 등이 이에 속합니다. 낚시는 수익률도 좋고 강화 관련 아이템·베리 수급·치장 관련 아이템을 추가로 획득하기 좋습니다. 카지노는 운에 맡겨 수익을 기대할 수 있어요. (도박 중독 신고는 1336)',
          },
        ].map((item) => (
          <div key={item.num} className="flex gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: COLORS.primary, color: 'white', fontSize: '11px', fontWeight: 800 }}>{item.num}</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2C3E20', marginBottom: '4px' }}>{item.title}</div>
              <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    emoji: '💬',
    q: '디스코드는 꼭 가입해야 하나요?',
    a: <p>필수 사항은 아닙니다! 다만 가입하면 여러 혜택 및 연동 보상이 지급됩니다. 문의를 하실 때도 디스코드 연동이 되어야 문의가 가능합니다.</p>,
  },
  {
    emoji: '⭐',
    q: '도구에 별이 붙어있어요. 이건 뭐예요?',
    a: (
      <div className="space-y-3">
        <p>저희 서버는 도구에 <strong>축복</strong>을 부여할 수 있어요. 별이 많을수록 <strong>경험치 획득 + 고품질 아이템</strong>을 획득할 확률이 높아지고, 고품질 아이템을 세공하여 <strong>장신구</strong>를 획득할 수 있어요.</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link to="/detail/scroll-box" className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: '#EFF6FF', color: '#1d4ed8', fontSize: '13px', fontWeight: 700, border: '1px solid #93c5fd' }}>
            📦 스크롤 박스 →
          </Link>
          <Link to="/detail/accessory" className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: '#F5F3FF', color: '#7c3aed', fontSize: '13px', fontWeight: 700, border: '1px solid #a78bfa' }}>
            💎 장신구 세공 →
          </Link>
        </div>
      </div>
    ),
  },
  {
    emoji: '🫐',
    q: '베리는 어떻게 구해요?',
    a: <p>기본적으로는 후원 신청을 통해 벌 수 있어요. 다만 서버 <strong>추천(투표)</strong>을 하면 50베리 +@가 지급되고, 이벤트 참여 등으로도 획득하실 수 있으니 어느 정도 노력하시면 얻으실 수 있어요!</p>,
  },
];

function FaqItem({ item }: { item: typeof faqs[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: open ? '#F0FAF1' : 'white', cursor: 'pointer' }}
      >
        <span className="text-xl shrink-0">{item.emoji}</span>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#2C3E20', flex: 1 }}>{item.q}</span>
        {open
          ? <ChevronUp size={18} color={COLORS.primary} className="shrink-0" />
          : <ChevronDown size={18} color="#6B8A50" className="shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: 'white', fontSize: '14px', color: '#4A6030', lineHeight: 1.8 }}>
          {item.a}
        </div>
      )}
    </div>
  );
}

export function HelpPage() {
  return (
    <div style={{ fontFamily: 'inherit', backgroundColor: '#F8FFF5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="px-4 py-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2" style={{ fontSize: '13px', color: '#6B8A50' }}>
          <Link to="/" className="flex items-center gap-1 hover:underline"><Home size={14} />홈</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#2C3E20', fontWeight: 700 }}>도움말</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-10" style={{ background: 'linear-gradient(160deg, #E8F8E9, #F8FFF5)', borderBottom: `2px solid ${COLORS.border}` }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4" style={{ backgroundColor: '#E8F8EB', color: COLORS.primary, fontWeight: 700 }}>
            🌱 뉴비 가이드
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#2C3E20', fontWeight: 900, marginBottom: '8px' }}>자주 묻는 질문</h1>
          <p style={{ fontSize: '15px', color: '#4A6030' }}>처음 시작하는 분들을 위한 안내 모음입니다.</p>
        </div>
      </div>

      {/* Quick start */}
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <div className="p-5 rounded-2xl mb-8" style={{ backgroundColor: 'white', border: `2px solid ${COLORS.primary}55`, boxShadow: `0 2px 12px ${COLORS.primary}18` }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#2C3E20', marginBottom: '12px' }}>🚀 처음이라면 이 순서대로!</div>
          <div className="flex flex-wrap gap-3">
            {[
              { step: '1', label: '서버 접속', to: '/server-info' },
              { step: '2', label: '일일 컨텐츠', to: '/detail/daily' },
              { step: '3', label: '낚시', to: '/detail/fishing' },
              { step: '4', label: '쿠키런', to: '/detail/cookie-run' },
              { step: '5', label: '랭킹 도전', to: '/detail/ranking' },
            ].map((s) => (
              <Link key={s.step} to={s.to} className="flex items-center gap-2 px-4 py-2 rounded-xl hover:opacity-80 transition-opacity" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold text-white" style={{ backgroundColor: COLORS.primary }}>{s.step}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#2C3E20' }}>{s.label}</span>
                <ChevronRight size={14} color="#6B8A50" />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((item, i) => <FaqItem key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
}
