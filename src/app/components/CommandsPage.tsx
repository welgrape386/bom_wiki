import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home, Search } from 'lucide-react';

const COLORS = { primary: '#5BBE63', border: '#DCEFD9' };

type Cmd = { cmds: string[]; desc: string };
type Section = { label: string; emoji: string; color: string; bg: string; border: string; items: Cmd[] };

const sections: Section[] = [
  {
    label: '기본 명령어',
    emoji: '⌨️',
    color: '#2d7a35',
    bg: '#F0FAF1',
    border: COLORS.border,
    items: [
      { cmds: ['/프로필'], desc: '내 정보를 확인할 수 있습니다.' },
      { cmds: ['/메뉴', '/menu'], desc: '다양한 컨텐츠를 명령어 없이 쉽게 할 수 있어요.' },
      { cmds: ['/종합랭킹'], desc: '내 모든 종합 랭킹을 확인할 수 있습니다.' },
      { cmds: ['/money', '/돈'], desc: '소지금을 확인하거나 보낼 수 있습니다.' },
      { cmds: ['/베리'], desc: '가지고 있는 베리를 확인할 수 있습니다.' },
      { cmds: ['/친구'], desc: '서버 내에서 친구를 추가하거나 관리할 수 있습니다.' },
      { cmds: ['/금지템'], desc: '조합이 금지된 아이템을 확인할 수 있습니다.' },
      { cmds: ['/교환 <닉네임>'], desc: '돈, 아이템을 안전하게 교환할 수 있습니다.' },
      { cmds: ['/mail', '/mailbox', '/우편함', '/우편'], desc: '서버에서 보내 준 아이템들을 보관하는 곳입니다.' },
      { cmds: ['/auction', '/자유장터'], desc: '자유롭게 아이템을 올리고 판매할 수 있는 곳입니다.' },
      { cmds: ['/vote', '/추천'], desc: '서버 추천을 하면 보상이 지급됩니다.' },
      { cmds: ['/trash', '/쓰레기통'], desc: '쓸모 없는 아이템을 빠르게 버릴 수 있는 명령어입니다.' },
      { cmds: ['/shout <할 말>', '/확성기 <할 말>'], desc: '모든 플레이어가 들을 수 있게 확성기를 사용합니다. (규칙 위반에 주의하세요.)' },
      { cmds: ['/feed', '/밥'], desc: '소량의 돈을 사용하여 배고픔을 즉시 해결해줍니다.' },
      { cmds: ['/칭호'], desc: '내가 가지고 있는 칭호 또는 징표를 확인할 수 있습니다.' },
      { cmds: ['/개인설정'], desc: '따로 설정하고 싶은 부분이 있다면 여기를 이용해주세요.' },
      { cmds: ['/수리'], desc: '돈을 사용하여 들고 있는 아이템을 한 번에 바로 수리합니다.' },
      { cmds: ['/창고 <숫자>'], desc: '권한이 있다면 사용할 수 있는 가상창고를 명령어로 사용할 수 있습니다.' },
      { cmds: ['/엔더상자'], desc: '나만이 이용할 수 있는 엔더상자를 열 수 있습니다.' },
      { cmds: ['/자동심기'], desc: '자동심기를 토글할 수 있습니다.' },
      { cmds: ['/자동줍기'], desc: '자동줍기를 토글할 수 있습니다.' },
      { cmds: ['/날기'], desc: '날기 시간을 확인할 수 있습니다.' },
      { cmds: ['/잠광'], desc: '자동 채광을 시작할 수 있습니다.' },
      { cmds: ['/저장소'], desc: '자동 채광으로 얻은 아이템을 저장소에서 뺄 수 있습니다.' },
      { cmds: ['/잠수포인트'], desc: '잠수 포인트를 확인할 수 있습니다.' },
      { cmds: ['/집중력'], desc: '낚시에서 소모되는 집중력을 확인할 수 있습니다.' },
      { cmds: ['/피로도'], desc: '일일 컨텐츠에서 소모되는 피로도를 확인할 수 있습니다.' },
      { cmds: ['/쪽지'], desc: '온라인/오프라인 유저에게 쪽지를 보낼 수 있습니다.' },
      { cmds: ['/치장품'], desc: '치장품 메뉴를 열 수 있습니다.' },
      { cmds: ['/표지판제거'], desc: '농장에서 표지판을 제거할 수 있습니다. (주인 한정)' },
      { cmds: ['/조합대'], desc: '조합대 창을 명령어로 즉시 열 수 있습니다.' },
      { cmds: ['/장신구'], desc: '장신구를 명령어로 확인할 수 있습니다.' },
      { cmds: ['/별명확인'], desc: '특정 플레이어의 진짜 닉네임을 확인할 수 있습니다.' },
      { cmds: ['/로그조사'], desc: '유저가 직접 확인할 수 있는 로그조사입니다.' },
      { cmds: ['/마일리지'], desc: '내가 가지고 있는 마일리지를 확인합니다.' },
    ],
  },
  {
    label: '채팅 명령어',
    emoji: '💬',
    color: '#1d4ed8',
    bg: '#EFF6FF',
    border: '#93c5fd',
    items: [
      { cmds: ['/채팅차단'], desc: '서버 내 모든 채팅을 차단합니다. (농장 채팅은 제외)' },
      { cmds: ['/지역채팅'], desc: '반경 400블럭의 플레이어들에게 메시지를 보냅니다.' },
      { cmds: ['/전체채팅'], desc: '모든 플레이어에게 메시지를 보냅니다. (규칙 위반에 주의하세요.)' },
      { cmds: ['/농장채팅'], desc: '내가 속한 농장의 구성원들에게 메시지를 보냅니다.' },
      { cmds: ['/c'], desc: '간편하게 채팅 모드를 조정할 수 있습니다.' },
      { cmds: ['/확성기'], desc: '서버 거래글 작성은 이곳을 이용하세요!' },
      { cmds: ['/w <닉네임> <할 말>', '/t <닉네임> <할 말>', '/귓 <닉네임> <할 말>', '/귓속말 <닉네임> <할 말>'], desc: '특정한 플레이어에게만 메시지를 보낼 수 있습니다.' },
      { cmds: ['/r <할 말>', '/reply <할 말>', '/답 <할 말>', '/답장 <할 말>'], desc: '마지막으로 대화한 상대에게 바로 답장할 수 있습니다.' },
      { cmds: ['/질문'], desc: '서버 내에서 궁금한 내용을 질문할 수 있습니다.' },
      { cmds: ['/답변'], desc: '질문에 대한 답변이 가능한 명령어입니다.' },
    ],
  },
  {
    label: '이동 명령어',
    emoji: '🚀',
    color: '#7c3aed',
    bg: '#F5F3FF',
    border: '#a78bfa',
    items: [
      { cmds: ['/스폰', '/spawn'], desc: '서버의 광장으로 이동할 수 있습니다.' },
      { cmds: ['/is', '/island', '/섬', '/농장'], desc: '농장 메뉴를 이용하거나 이동할 수 있습니다.' },
      { cmds: ['/tpa', '/티피', '/티피에이'], desc: '다른 플레이어에게 텔레포트 신청을 할 수 있습니다.' },
      { cmds: ['/tpaccept', '/티피수락'], desc: '텔레포트 신청을 수락할 수 있습니다.' },
      { cmds: ['/tpdeny', '/티피거절'], desc: '텔레포트 신청을 거절할 수 있습니다.' },
      {
        cmds: ['/베리상점', '/종합상점', '/교환상점', '/경험치상점', '/등급상점', '/가구상점'],
        desc: '각 상점으로 즉시 이동할 수 있습니다.',
      },
      {
        cmds: ['/낚싯터', '/마법부여소', '/요리', '/잠수', '/카지노', '/쿠키런'],
        desc: '해당 컨텐츠 구역으로 즉시 이동할 수 있습니다.',
      },
      {
        cmds: ['/채광', '/벌목', '/수렵', '/열매', '/청소', '/양털'],
        desc: '컨텐츠 메뉴를 즉시 열 수 있습니다.',
      },
    ],
  },
];

function CmdRow({ item, accentColor }: { item: Cmd; accentColor: string }) {
  return (
    <div className="flex items-start gap-4 py-3" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="shrink-0 flex flex-wrap gap-1.5 min-w-[160px] max-w-[200px]">
        {item.cmds.map((c) => (
          <code key={c} className="px-2 py-0.5 rounded-md" style={{ backgroundColor: accentColor + '18', color: accentColor, fontSize: '12px', fontWeight: 700 }}>
            {c}
          </code>
        ))}
      </div>
      <span style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{item.desc}</span>
    </div>
  );
}

export function CommandsPage() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filtered = sections.map((sec) => ({
    ...sec,
    items: search.trim()
      ? sec.items.filter((i) => i.cmds.some((c) => c.includes(search)) || i.desc.includes(search))
      : sec.items,
  })).filter((sec) => sec.items.length > 0);

  return (
    <div style={{ fontFamily: 'inherit', backgroundColor: '#F8FFF5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="px-4 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2" style={{ fontSize: '13px', color: '#6B8A50' }}>
          <Link to="/" className="flex items-center gap-1 hover:underline"><Home size={14} />홈</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#2C3E20', fontWeight: 700 }}>명령어</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-10" style={{ background: 'linear-gradient(160deg, #E8F8E9, #F8FFF5)', borderBottom: `2px solid ${COLORS.border}` }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#2C3E20', fontWeight: 900, marginBottom: '8px' }}>⌨️ 명령어 목록</h1>
          <p style={{ fontSize: '15px', color: '#4A6030', marginBottom: '20px' }}>새봄농장에서 사용할 수 있는 모든 명령어를 확인하세요.</p>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={16} color="#6B8A50" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="명령어 또는 설명으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl outline-none"
              style={{ border: `2px solid ${COLORS.border}`, fontSize: '14px', color: '#2C3E20', backgroundColor: 'white' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-44 shrink-0">
          <div className="sticky top-20 rounded-2xl p-4" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B8A50', marginBottom: '10px' }}>카테고리</div>
            {sections.map((s) => (
              <a
                key={s.label}
                href={`#${s.label}`}
                className="flex items-center gap-2 py-2 px-2 rounded-lg transition-colors hover:bg-green-50 block"
                style={{ fontSize: '13px', fontWeight: 600, color: '#4A6030' }}
              >
                <span>{s.emoji}</span>{s.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {filtered.map((sec) => (
            <div key={sec.label} id={sec.label} className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              {/* Section header */}
              <button
                onClick={() => setActiveSection(activeSection === sec.label ? null : sec.label)}
                className="w-full flex items-center justify-between px-5 py-4"
                style={{ backgroundColor: sec.bg, cursor: 'pointer' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{sec.emoji}</span>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: sec.color }}>{sec.label}</span>
                  <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: sec.color + '22', color: sec.color, fontSize: '11px', fontWeight: 800 }}>
                    {sec.items.length}개
                  </span>
                </div>
              </button>

              {/* Rows */}
              <div className="px-5">
                {sec.items.map((item, i) => (
                  <CmdRow key={i} item={item} accentColor={sec.color} />
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center rounded-2xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
              <div className="text-4xl mb-3">🔍</div>
              <p style={{ color: '#6B8A50', fontSize: '14px' }}>"{search}"에 해당하는 명령어가 없어요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
