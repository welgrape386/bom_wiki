import type { ReactNode } from 'react';

const COLORS = {
  primary: '#5BBE63',
  border: '#DCEFD9',
};

const SectionCard = ({ icon, title, children }: { icon: string; title: string; children: ReactNode }) => (
  <div className="rounded-2xl p-6 mb-5" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
    <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '18px', color: '#2C3E20', fontWeight: 800 }}>
      <span className="text-xl">{icon}</span>{title}
    </h3>
    {children}
  </div>
);

const chips = [
  { label: '5만 칩', value: '50,000', color: '#5BBE63', bg: '#E8F8EB' },
  { label: '10만 칩', value: '100,000', color: '#7FCFFF', bg: '#E8F4FF' },
  { label: '50만 칩', value: '500,000', color: '#FFD86B', bg: '#FFFBEA' },
];

const outcomes = [
  { result: '슈퍼 잭팟', multiplier: '×15', prob: '0.1%', color: '#c0392b', bg: '#FFF0F0', border: '#FF8A8A', emoji: '🎰' },
  { result: '잭팟', multiplier: '×7', prob: '1%', color: '#7c3aed', bg: '#F5F3FF', border: '#a78bfa', emoji: '💜' },
  { result: '에메랄드', multiplier: '×5', prob: '5%', color: '#059669', bg: '#ECFDF5', border: '#6ee7b7', emoji: '💎' },
  { result: '금괴', multiplier: '×2', prob: '15%', color: '#d97706', bg: '#FFFBEB', border: '#fcd34d', emoji: '🏅' },
  { result: '철괴', multiplier: '×1', prob: '25%', color: '#64748b', bg: '#F8FAFC', border: '#cbd5e1', emoji: '🔩' },
  { result: '꽝', multiplier: '×0', prob: '나머지', color: '#6B8A50', bg: '#F8FFF5', border: COLORS.border, emoji: '💨' },
];

export function CasinoContent() {
  return (
    <>
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            메뉴에서 <strong>서브 컨텐츠 → 카지노</strong>를 클릭하여 카지노로 이동할 수 있습니다.
          </p>
          <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A98e39d4b-b039-4eab-ac2c-f9f11c06c64b%3Aimage.png?table=block&id=33d7ce2d-5858-8034-83eb-e9911292e76f&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1310&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="카지노 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <ul style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0 }} className="space-y-1">
            <li>• 카지노 칩은 <strong>5만 / 10만 / 50만</strong> 3종입니다. 원하는 금액대에 맞춰 베팅할 수 있습니다.</li>
            <li>• 해당 아이템을 들고 머신을 우클릭하면 칩이 베팅되며 결과가 나옵니다.</li>
          </ul>
        </SectionCard>
      </div>

      <div id="chips">
        <SectionCard icon="🎰" title="칩 종류">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {chips.map((c) => (
              <div key={c.label} className="rounded-xl p-5 text-center" style={{ backgroundColor: c.bg, border: `2px solid ${c.color}55` }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>🎰</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: c.color, marginBottom: '2px' }}>{c.label}</div>
                <div style={{ fontSize: '13px', color: '#4A6030' }}>{c.value}원</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div id="odds">
        <SectionCard icon="📊" title="확률 정보">
          <div className="space-y-2">
            {outcomes.map((o) => (
              <div
                key={o.result}
                className="flex items-center gap-4 px-5 py-3 rounded-xl"
                style={{ backgroundColor: o.bg, border: `1.5px solid ${o.border}` }}
              >
                <span className="text-xl w-6 text-center">{o.emoji}</span>
                <div className="flex-1">
                  <span style={{ fontSize: '14px', fontWeight: 800, color: o.color }}>{o.result}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: o.color + '22', color: o.color, fontSize: '14px', fontWeight: 900, minWidth: '50px', textAlign: 'center' }}
                  >
                    {o.multiplier}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6B8A50', minWidth: '60px', textAlign: 'right', fontWeight: 700 }}>
                    {o.prob}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
