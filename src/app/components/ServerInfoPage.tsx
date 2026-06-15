import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home, Server, Shield, FileText, Monitor, MapPin, Copy, Check } from 'lucide-react';

const COLORS = {
  primary: '#5BBE63',
  secondary: '#8DDA92',
  border: '#DCEFD9',
  yellow: '#FFD86B',
  blue: '#7FCFFF',
  danger: '#FF8A8A',
};

const tabs = [
  { id: 'intro', label: '서버 소개', icon: Server },
  { id: 'connect', label: '접속 방법', icon: Monitor },
  { id: 'rules', label: '서버 규칙', icon: Shield },
  { id: 'terms', label: '이용 약관', icon: FileText },
  { id: 'inquiry', label: '문의 방법', icon: MapPin },
];

// ── Intro ─────────────────────────────────────────────────────────────────────

const InfoCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div className="p-5 rounded-2xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
    <div className="text-3xl mb-3">{icon}</div>
    <h3 style={{ fontSize: '16px', color: '#2C3E20', marginBottom: '8px', fontWeight: 800 }}>{title}</h3>
    <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{desc}</p>
  </div>
);

function IntroTab() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #E8F8E9, #F8FFF5)', border: `1.5px solid ${COLORS.border}` }}>
        <h2 style={{ fontSize: '22px', color: '#2C3E20', marginBottom: '12px', fontWeight: 900 }}>🌱 새봄농장이란?</h2>
        <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9 }}>
          새봄농장은 <strong>농사와 모험이 함께하는 마인크래프트 RPG 서버</strong>입니다. 단순한 생존 게임을 넘어, 농사·채광·낚시·수렵 등 다양한 컨텐츠와 함께 자신만의 농장을 성장시키는 재미를 경험할 수 있어요.
          <br /><br />
          초보자도 쉽게 시작할 수 있으며, 오래 플레이할수록 더 다양하고 깊이 있는 컨텐츠를 즐길 수 있습니다.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard icon="🌱" title="농장 시스템" desc="자신만의 농장을 만들고 업그레이드하세요. 다양한 작물을 심고 수확하여 코인을 벌 수 있어요." />
        <InfoCard icon="⚔️" title="RPG 요소" desc="레벨업과 스탯 시스템으로 캐릭터를 성장시키세요. 더 강해질수록 더 많은 컨텐츠가 열려요!" />
        <InfoCard icon="🏆" title="랭킹 시스템" desc="다양한 활동으로 랭킹 포인트를 쌓고 서버 최강자에 도전하세요." />
        <InfoCard icon="🎪" title="미니게임" desc="쿠키런 등 다양한 미니게임을 즐겨보세요. 지루할 틈이 없어요!" />
        <InfoCard icon="👥" title="커뮤니티" desc="친절한 플레이어들과 함께 즐기는 서버입니다. 뉴비도 환영받는 따뜻한 분위기!" />
        <InfoCard icon="🔄" title="정기 업데이트" desc="새로운 컨텐츠와 이벤트가 정기적으로 추가됩니다. 항상 새로운 재미가 기다려요!" />
      </div>
    </div>
  );
}

// ── Connect ───────────────────────────────────────────────────────────────────

const StepCard = ({ step, title, desc, icon }: { step: number; title: string; desc: string; icon: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-white shrink-0 shadow" style={{ backgroundColor: COLORS.primary, fontSize: '16px' }}>
      {step}
    </div>
    <div className="flex-1 p-4 rounded-2xl" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}` }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span style={{ fontSize: '15px', color: '#2C3E20', fontWeight: 800 }}>{title}</span>
      </div>
      <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.7 }}>{desc}</p>
    </div>
  </div>
);

function ConnectTab() {
  const [copied, setCopied] = useState(false);
  const serverAddr = 'NSpring.kr';

  const handleCopy = () => {
    navigator.clipboard.writeText(serverAddr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #E8F8E9, #F0FAF1)', border: `1.5px solid ${COLORS.border}` }}>
        <div className="text-4xl mb-3">🖥️</div>
        <h2 style={{ fontSize: '20px', color: '#2C3E20', marginBottom: '8px', fontWeight: 800 }}>서버 접속 주소</h2>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: 'white', border: `2px solid ${COLORS.primary}`, color: '#2C3E20', fontWeight: 900, fontSize: '18px', cursor: 'pointer' }}
        >
          🌐 <span style={{ color: COLORS.primary }}>{serverAddr}</span>
          {copied ? <Check size={18} color={COLORS.primary} /> : <Copy size={18} color={COLORS.primary} />}
        </button>
        {copied && <p className="mt-2" style={{ fontSize: '13px', color: COLORS.primary }}>클립보드에 복사되었습니다!</p>}
        {!copied && <p className="mt-2" style={{ fontSize: '13px', color: '#6B8A50' }}>클릭하여 주소 복사</p>}
      </div>

      <h3 style={{ fontSize: '18px', color: '#2C3E20', marginBottom: '12px', fontWeight: 800 }}>접속 방법 단계별 안내</h3>
      <div className="space-y-3">
        <StepCard step={1} icon="🖥️" title="멀티 플레이 선택" desc="마인크래프트 메인 화면에서 멀티 플레이를 누릅니다." />
        <StepCard step={2} icon="➕" title="서버 추가" desc="우측 하단의 서버 추가 버튼을 누릅니다." />
        <StepCard step={3} icon="⌨️" title="서버 주소 입력" desc={`서버 주소란에 ${serverAddr} 을 타이핑하고, 리소스팩 사용을 "사용"으로 설정합니다.`} />
        <StepCard step={4} icon="🎮" title="접속 완료!" desc="서버 목록에서 새봄농장을 더블클릭하면 접속됩니다. 즐거운 게임 되세요!" />
      </div>

      <div className="p-4 rounded-2xl" style={{ backgroundColor: '#FFFBEA', borderLeft: `4px solid ${COLORS.yellow}` }}>
        <div className="flex items-start gap-2">
          <span className="text-lg">⚠️</span>
          <p style={{ fontSize: '14px', color: '#856404', lineHeight: 1.7 }}>
            <strong>리소스팩 설정 주의:</strong> 서버 추가 시 리소스팩 사용을 반드시 <strong>"사용"</strong>으로 설정해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Rules ─────────────────────────────────────────────────────────────────────

type RuleRow = { item: string; score: string };
type RuleSection = { title: string; emoji: string; rows: RuleRow[] };

const ruleSections: RuleSection[] = [
  {
    title: '소통 및 언어생활',
    emoji: '💬',
    rows: [
      { item: '무의미한 단어 반복, 도배 행위', score: '최소 -5점' },
      { item: '패륜적 발언, 성적 은어 발언, 성적 수치심을 유발하는 발언', score: '최소 -20점' },
      { item: '전체 채팅에서의 사담, 과도한 친목, 반말 사용', score: '최소 -5점' },
      { item: '구걸 및 장난식 확성기 사용', score: '최소 -5점' },
      { item: '운영진의 안내 및 주의 사항 무시', score: '최소 -15점' },
      { item: '비속어, 욕설 사용 (특수문자/초성 포함)', score: '최소 -10점' },
      { item: '타인에게 모욕감이나 불쾌감을 주는 언행', score: '최소 -10점' },
      { item: '고의적인 분쟁 유도 및 싸움 조장', score: '최소 -20점' },
      { item: '정치, 종교 등 논란 소지가 있는 발언', score: '최소 -20점' },
      { item: '서버 및 운영진 비하, 이탈 선동', score: '최소 -100점' },
    ],
  },
  {
    title: '플레이 매너 위반',
    emoji: '🎮',
    rows: [
      { item: '확성기 용도 위반 (홍보 외 사용)', score: '최소 -20점' },
      { item: '시세 조작 시도 및 아이템 독점 (독점·시세 조작 행위 포함)', score: '최소 -15점' },
      { item: '타인의 플레이 고의 방해', score: '최소 -15점' },
    ],
  },
  {
    title: '농장 생활 위반',
    emoji: '🌾',
    rows: [
      { item: '섬원 무단 추방', score: '최소 -10점' },
      { item: '타인의 작물/자산 무단 서리 및 파괴', score: '최소 -30점' },
      { item: '순위 조작을 위한 어뷰징 행위', score: '최소 -100점' },
      { item: '섬 훼손(테러) 행위 / 거래 사기 및 기만 행위', score: '최소 -100점' },
    ],
  },
  {
    title: '기타 위반',
    emoji: '⚠️',
    rows: [
      { item: '꼼수, 버그를 이용한 맵 탈출', score: '최소 -50점' },
      { item: '입장 불가능한 구역 강제 진입 시도', score: '최소 -20점' },
      { item: '부적절한 스킨/닉네임 사용', score: '최소 -10점' },
      { item: '매크로, 핵 등 비인가 프로그램 사용 (서버 플레이에 직접적인 영향)', score: '최소 -100점' },
      { item: '버그 악용을 통한 부당 이득 취득', score: '최소 -100점' },
      { item: '현금 거래(RMT) 시도 및 진행', score: '최소 -100점' },
      { item: '계정 공유, 대리 육성, 다중 계정(부계정) 사용', score: '최소 -60점' },
      { item: '서버 렉 고의 유발', score: '최소 -100점' },
      { item: '오토마우스 핵방지 적발', score: '최소 -20점' },
      { item: '농장 월드 이외의 F3+T 사용 / 특정 키가 지속적으로 눌리게 하는 행위', score: '최소 -20점' },
    ],
  },
];

const casinoRows: RuleRow[] = [
  { item: '배팅 상한액 위반', score: '최소 -5점' },
  { item: '지급 최대 배수 위반', score: '최소 -5점' },
  { item: '운영 주체 최대 배수 금액 이상 미소유', score: '최소 -50점' },
  { item: '배팅 상한액(500만) 초과', score: '최소 -10점' },
  { item: '수익 최대 배수 10배 이상 설정', score: '최소 -10점' },
  { item: '불리한 확률(마이너스 배수) 설정', score: '최소 -10점' },
];

const penaltyLevels = [
  { score: '80점', penalty: '1일간 접속 정지', color: '#F0FAF1', border: COLORS.primary, text: '#2d7a35' },
  { score: '60점', penalty: '3일간 접속 정지', color: '#FFFBEA', border: COLORS.yellow, text: '#856404' },
  { score: '40점', penalty: '7일간 접속 정지', color: '#FFF3E0', border: '#FF9800', text: '#7a3d00' },
  { score: '20점', penalty: '30일간 접속 정지', color: '#FFF0F0', border: COLORS.danger, text: '#c0392b' },
  { score: '0점', penalty: '서버 영구 접속 정지', color: '#2C0A0A', border: '#c0392b', text: '#FF8A8A' },
];

function RuleTable({ rows }: { rows: RuleRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: `1.5px solid ${COLORS.border}` }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#F0FAF1' }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: '#2C3E20', fontWeight: 700, borderBottom: `1px solid ${COLORS.border}` }}>위반 항목</th>
            <th style={{ padding: '10px 14px', textAlign: 'center', color: '#2C3E20', fontWeight: 700, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>신뢰 점수 차감</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#FAFFF9' }}>
              <td style={{ padding: '10px 14px', color: '#4A6030', borderBottom: `1px solid ${COLORS.border}`, lineHeight: 1.6 }}>{r.item}</td>
              <td style={{ padding: '10px 14px', textAlign: 'center', color: '#c0392b', fontWeight: 700, whiteSpace: 'nowrap', borderBottom: `1px solid ${COLORS.border}` }}>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RulesTab() {
  return (
    <div className="space-y-8">
      {/* Notice */}
      <div className="p-5 rounded-2xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
        <h2 style={{ fontSize: '20px', color: '#2C3E20', marginBottom: '8px', fontWeight: 900 }}>🛡️ 새봄농장 서버 규칙</h2>
        <ul style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, paddingLeft: '0', listStyle: 'none' }} className="space-y-1">
          <li>• 모든 신뢰 점수 차감은 증인의 말이 아닌, <strong>명확한 증거 자료</strong>가 있을 때에만 집행됩니다. (관리자가 직접 확인한 사항은 예외)</li>
          <li>• 서버 외에 있던 문제로 인해 서버 내에도 지장이 생길 경우, 추가적인 처벌이 있을 수 있습니다.</li>
          <li>• 명시되지 않은 사항이라도 운영진의 판단하에 서버의 질서를 어지럽힌다고 판단될 경우 점수가 차감될 수 있습니다.</li>
        </ul>
      </div>

      {/* Penalty Levels */}
      <div>
        <h3 style={{ fontSize: '17px', color: '#2C3E20', marginBottom: '12px', fontWeight: 800 }}>📊 신뢰 점수별 처벌 강도</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {penaltyLevels.map((p) => (
            <div key={p.score} className="p-4 rounded-xl text-center" style={{ backgroundColor: p.color, border: `1.5px solid ${p.border}` }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: p.border, marginBottom: '4px' }}>{p.score}</div>
              <div style={{ fontSize: '12px', color: p.text, fontWeight: 700 }}>{p.penalty}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rule Sections */}
      {ruleSections.map((s) => (
        <div key={s.title}>
          <h3 style={{ fontSize: '17px', color: '#2C3E20', marginBottom: '10px', fontWeight: 800 }}>{s.emoji} {s.title}</h3>
          <RuleTable rows={s.rows} />
        </div>
      ))}

      {/* Casino Section */}
      <div className="p-5 rounded-2xl space-y-4" style={{ backgroundColor: '#FAFAFA', border: `1.5px solid ${COLORS.border}` }}>
        <h3 style={{ fontSize: '17px', color: '#2C3E20', fontWeight: 800 }}>🎰 사설 카지노(도박장) 관련 안내</h3>
        <ul style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0 }} className="space-y-1">
          <li>• 1회 배팅 상한액은 <strong>500만원</strong>까지 가능합니다.</li>
          <li>• 지급 최대 배수는 <strong>5배</strong>까지만 가능합니다.</li>
          <li>• 카지노 운영 주체는 최대 배수 금액 이상을 보유해야 합니다. <span style={{ color: '#6B8A50' }}>(예: 500만원 × 5배 = 2,500만원 이상 소유 필요)</span></li>
          <li>• 수수료 부담 시 카지노 코인을 사용하세요. 인게임 내 50만원과 동일한 화폐가치로 인정됩니다.</li>
        </ul>
        <RuleTable rows={casinoRows} />
      </div>
    </div>
  );
}

// ── Terms ─────────────────────────────────────────────────────────────────────

type TermsSection = { chapter: string; articles: { title: string; content: string | string[] }[] };

const termsSections: TermsSection[] = [
  {
    chapter: '제1장 총칙',
    articles: [
      {
        title: '제1조 (목적)',
        content: '본 약관은 새봄농장(이하 "서버"라 합니다)이 제공하는 마인크래프트 게임 서비스 및 관련 부가 서비스(디스코드 등, 이하 "서비스"라 합니다)의 이용과 관련하여, 서버와 이용자 간의 권리, 의무, 책임 사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.',
      },
      {
        title: '제2조 (용어의 정의)',
        content: [
          '"이용자"란 본 약관에 동의하고 서버가 제공하는 서비스를 이용하는 자를 의미합니다.',
          '"계정"이란 이용자의 식별과 서비스 이용을 위하여 이용자가 선정하고 서버가 승인한 마인크래프트 닉네임(UUID 포함) 및 연동된 디스코드 계정을 의미합니다.',
          '"제재"란 이용자가 본 약관 및 세부 운영정책을 위반한 경우, 서버가 부과하는 서비스 이용 제한 조치(경고, 채팅 금지, 기간 정지, 영구 접속 차단 등)를 의미합니다.',
          '"게임 정보"란 이용자가 서비스를 이용하는 과정에서 획득한 아이템, 재화(게임 머니), 건축물, 농장, 강화 수치, 낚시/채광 데이터 등 일체의 형태적·비형태적 결과물을 의미합니다.',
        ],
      },
    ],
  },
  {
    chapter: '제2장 서비스 이용계약 및 계정 관리',
    articles: [
      {
        title: '제3조 (약관의 동의 및 효력)',
        content: [
          '본 약관은 이용자가 서버에 최초 접속하거나, 공식 디스코드 채널에서 약관 동의 절차(이모지 클릭 등)를 완료함과 동시에 효력이 발생합니다.',
          '서버는 운영상 필요한 경우 본 약관을 수정할 수 있으며, 변경된 약관은 적용일자 7일 전(중대한 변경의 경우 30일 전)에 공식 커뮤니티(디스코드)를 통해 공지합니다.',
        ],
      },
      {
        title: '제4조 (계정 관리 의무)',
        content: [
          '계정에 대한 모든 관리 책임은 이용자 본인에게 있습니다.',
          '이용자는 자신의 계정을 제3자에게 양도, 대여, 공유할 수 없으며, 계정 도용이나 부주의로 인해 발생한 서비스 이용 상의 불이익 및 제재 조치에 대해 서버는 책임지지 않습니다.',
          '다중 클라이언트(부계정) 접속은 원칙적으로 금지되며, 시스템 악용 목적의 다중 접속 적발 시 관련된 모든 계정이 영구 차단 조치됩니다.',
        ],
      },
    ],
  },
  {
    chapter: '제3장 계약 당사자의 의무',
    articles: [
      {
        title: '제5조 (서버의 의무)',
        content: [
          '서버는 계속적이고 안정적인 서비스 제공을 위해 최선을 다합니다.',
          '서버는 시스템 오류, 플러그인 충돌, 데이터 백업 문제 등으로 인해 서비스가 일시 중단될 경우, 이를 신속히 복구하기 위해 노력합니다. 단, 천재지변이나 서버 호스팅사의 문제 등 불가항력적인 사유가 발생한 경우 예외로 합니다.',
          '서버는 이용자의 정당한 의견이나 불만 사항이 접수될 경우, 규정된 절차에 따라 신속히 처리합니다.',
        ],
      },
      {
        title: '제6조 (이용자의 의무 및 금지행위)',
        content: [
          '비정상적 플레이: 매크로, 핵(X-ray 등), 변조된 클라이언트 등 서버가 허가하지 않은 비인가 외부 프로그램을 사용하는 행위',
          '버그 악용: 시스템의 취약점, 플러그인 오류 등을 고의로 악용하여 게임 내 부당한 이득(재화, 강화, 농사/채광 결과물 등)을 취하는 행위',
          '현금 거래(RMT): 게임 내 재화, 아이템, 계정 등을 현실의 재화나 타 게임의 재화로 교환, 매매, 알선하는 행위',
          '타인 권리 침해: 타인의 건축물, 상자, 작물 등을 무단으로 파괴하거나 약탈하는 행위',
          '질서 훼손: 욕설, 비하, 성희롱, 분쟁 조장, 타 서버 홍보 등 건전한 게임 환경 및 커뮤니티 분위기를 저해하는 행위',
        ],
      },
    ],
  },
  {
    chapter: '제4장 이용제한 및 제재',
    articles: [
      {
        title: '제7조 (이용제한의 기준 및 절차)',
        content: [
          '서버는 이용자가 제6조(이용자의 의무 및 금지행위)를 위반한 경우, 운영정책에 따라 제재할 수 있습니다.',
          '비인가 프로그램 사용, 중대한 버그 악용, 현금 거래, 심각한 서버 테러 등 서버 생태계에 치명적인 영향을 미치는 행위는 적발 횟수와 무관하게 즉각적인 \'영구 접속 차단\' 조치가 취해집니다.',
        ],
      },
    ],
  },
  {
    chapter: '제5장 후원 및 환불 규정',
    articles: [
      {
        title: '제8조 (후원의 성격 및 보상)',
        content: [
          '"후원"이란 이용자가 새봄농장 서버의 원활한 유지보수 및 콘텐츠 개발을 돕기 위해 자발적으로 금전을 제공하는 행위를 의미합니다.',
          '서버는 후원한 이용자에게 감사의 표시로 게임 내 재화, 아이템, 칭호, 편의 기능 등의 혜택(이하 "후원 보상"이라 합니다)을 제공할 수 있습니다.',
        ],
      },
      {
        title: '제9조 (환불 및 청약철회)',
        content: [
          '환불 불가: 지급된 후원 보상(아이템, 재화 등)을 인게임에서 수령하였거나, 상자 개봉, 아이템 소비, 기능 활성화 등 혜택이 이미 계정에 적용된 경우에는 어떠한 사유로도 환불이 불가능합니다.',
          '환불 가능: 결제 후 게임 내에서 우편함에서 후원 보상을 전혀 수령하지 않은 미사용 상태이며, 결제일로부터 7일 이내에 환불을 요청하는 경우 절차를 거쳐 환불이 가능합니다.',
          '이용자의 단순 변심, 게임에 대한 흥미 상실, 또는 개인적인 사정으로 인한 환불은 1항의 규정에 따라 엄격히 제한됩니다.',
        ],
      },
      {
        title: '제10조 (제재 및 초기화에 따른 후원 보상 처리)',
        content: [
          '이용 제재 시: 이용자가 본 약관 제6조(금지행위)를 위반하여 제재를 받은 경우, 보유 중인 모든 후원 보상은 즉시 소멸되며 이에 대한 환불은 절대 불가능합니다.',
          '서버 초기화(시즌 종료) 시: 서버의 대규모 업데이트, 경제 밸런스 조정, 정기적인 시즌 변경 등으로 인해 서버가 초기화(리셋)되는 경우, 기존의 게임 데이터 및 후원 보상은 서버의 운영 방침에 따라 초기화되거나 일부만 이관될 수 있으며, 이를 사유로 한 현금 환불은 불가능합니다.',
          '서비스 종료 시: 피치 못할 사정으로 서버 운영이 영구적으로 종료될 경우, 종료일 기준 최소 30일 이전에 공지하며, 이 기간 내에 사용된 보상이나 과거의 후원에 대해서는 환불을 요구할 수 없습니다.',
        ],
      },
      {
        title: '제11조 (허위 후원 및 분쟁 조장)',
        content: [
          '지속적인 허위 후원 신청은(2회 이상) 영업 방해로 간주되어 즉시 영구 접속 차단 조치됩니다.',
          '위 1항의 행위로 인해 서버에 금전적 피해나 수수료 부담이 발생할 경우, 서버는 해당 이용자에게 법적 손해배상을 청구할 수 있습니다.',
          '후원 및 환불과 관련하여 허위 사실을 유포하거나 타 이용자를 선동하여 서버 분위기를 흐리는 경우, 운영정책에 따라 강력히 제재됩니다.',
        ],
      },
    ],
  },
  {
    chapter: '제6장 기타',
    articles: [
      {
        title: '제12조 (면책 조항)',
        content: [
          '서버는 이용자 간 또는 이용자와 제3자 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해에 대해 책임지지 않습니다. (예: 유저 간 사기 거래)',
          '서버는 정기 점검, 서버 초기화(시즌 종료), 불가피한 데이터 유실 등으로 인해 발생한 게임 정보(아이템, 재화, 강화 수치 등)의 손실에 대해 원칙적으로 복구 및 배상의 책임을 지지 않습니다. (예외: 관리진의 직접적 실수로 인한 손실)',
          '이용자가 제재를 받아 발생하는 모든 불이익에 대해 서버는 보상하지 않습니다.',
        ],
      },
    ],
  },
];

function TermsTab() {
  const [openChapter, setOpenChapter] = useState<string | null>(termsSections[0].chapter);

  return (
    <div className="space-y-3">
      <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}`, fontSize: '13px', color: '#4A6030' }}>
        본 약관은 <strong>2026년 4월 25일</strong>부터 시행되었습니다.
      </div>
      {termsSections.map((sec) => {
        const isOpen = openChapter === sec.chapter;
        return (
          <div key={sec.chapter} className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <button
              onClick={() => setOpenChapter(isOpen ? null : sec.chapter)}
              className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:opacity-90"
              style={{ backgroundColor: isOpen ? '#F0FAF1' : 'white', textAlign: 'left', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '15px', color: '#2C3E20', fontWeight: 800 }}>{sec.chapter}</span>
              <ChevronRight size={18} color="#6B8A50" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 space-y-5" style={{ backgroundColor: 'white', borderTop: `1px solid ${COLORS.border}` }}>
                {sec.articles.map((art) => (
                  <div key={art.title} className="pt-4">
                    <h4 style={{ fontSize: '14px', color: '#2C3E20', fontWeight: 800, marginBottom: '8px' }}>{art.title}</h4>
                    {Array.isArray(art.content) ? (
                      <ol style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }} className="space-y-2">
                        {art.content.map((c, i) => (
                          <li key={i} style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.8, display: 'flex', gap: '8px' }}>
                            <span style={{ minWidth: '20px', color: COLORS.primary, fontWeight: 700 }}>{i + 1}.</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.8 }}>{art.content}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function InquiryTab() {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
        <h2 style={{ fontSize: '20px', color: '#2C3E20', marginBottom: '8px', fontWeight: 900 }}>📩 문의 방법 및 안내사항</h2>
        <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.8 }}>
          서버 관련 문의는 <strong>디스코드</strong>를 통해 진행됩니다. 문의 전 아래 안내사항을 꼭 확인해주세요.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { emoji: '⚠️', text: '장난으로 생성한 티켓, 감정이 실린 말투는 처벌 대상입니다.', color: '#c0392b', bg: '#FFF0F0', border: '#FF8A8A' },
          { emoji: '📋', text: '서버 내에 관련한 문의가 가능하며, 사적인 질문은 받지 않습니다.', color: '#856404', bg: '#FFFBEA', border: '#FFD86B' },
          { emoji: '🔗', text: '문의는 서버 연동이 되어야만 가능합니다. 디스코드에 먼저 가입 후 서버 계정을 연동해주세요.', color: '#1a6fa3', bg: '#F0F8FF', border: '#7FCFFF' },
        ].map((item) => (
          <div key={item.emoji} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: item.bg, borderLeft: `4px solid ${item.border}` }}>
            <span className="text-xl shrink-0">{item.emoji}</span>
            <p style={{ fontSize: '14px', color: item.color, lineHeight: 1.7, fontWeight: 600 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServerInfoPage() {
  const [activeTab, setActiveTab] = useState('intro');

  const renderTab = () => {
    switch (activeTab) {
      case 'intro': return <IntroTab />;
      case 'connect': return <ConnectTab />;
      case 'rules': return <RulesTab />;
      case 'terms': return <TermsTab />;
      case 'inquiry': return <InquiryTab />;
      default: return <IntroTab />;
    }
  };

  return (
    <div style={{ fontFamily: 'inherit', backgroundColor: '#F8FFF5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="px-4 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2" style={{ fontSize: '13px', color: '#6B8A50' }}>
          <Link to="/" className="flex items-center gap-1 hover:underline"><Home size={14} />홈</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#2C3E20', fontWeight: 700 }}>서버 정보</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-10" style={{ background: 'linear-gradient(160deg, #E8F8E9, #F8FFF5)', borderBottom: `2px solid ${COLORS.border}` }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#2C3E20', marginBottom: '8px', fontWeight: 900 }}>🌐 서버 정보</h1>
          <p style={{ fontSize: '15px', color: '#4A6030' }}>새봄농장 서버에 대한 모든 정보를 확인하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[60px] z-10 px-4" style={{ backgroundColor: 'white', borderBottom: `2px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div className="max-w-6xl mx-auto flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-4 shrink-0 border-b-2 transition-colors"
                style={{ borderBottomColor: isActive ? COLORS.primary : 'transparent', color: isActive ? COLORS.primary : '#6B8A50', fontWeight: isActive ? 700 : 600, backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px' }}
              >
                <Icon size={15} />{tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-8 max-w-6xl mx-auto">{renderTab()}</div>
    </div>
  );
}
