import { useState } from 'react';
import type { ReactNode } from 'react';

const COLORS = { primary: '#5BBE63', border: '#DCEFD9' };

const SectionCard = ({ icon, title, children }: { icon: string; title: string; children: ReactNode }) => (
  <div className="rounded-2xl p-6 mb-5" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
    <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '18px', color: '#2C3E20', fontWeight: 800 }}>
      <span className="text-xl">{icon}</span>{title}
    </h3>
    {children}
  </div>
);

const gradeStyle: Record<string, { bg: string; text: string; border: string }> = {
  '일반':     { bg: '#F8FAFC', text: '#64748b', border: '#cbd5e1' },
  '노말':     { bg: '#F8FAFC', text: '#64748b', border: '#cbd5e1' },
  '레어':     { bg: '#EFF6FF', text: '#1d4ed8', border: '#93c5fd' },
  '에픽':     { bg: '#F5F3FF', text: '#7c3aed', border: '#a78bfa' },
  '유니크':   { bg: '#FFF7ED', text: '#c2410c', border: '#fdba74' },
  '레전드리': { bg: '#FEF9C3', text: '#a16207', border: '#fde047' },
  '레전더리': { bg: '#FEF9C3', text: '#a16207', border: '#fde047' },
};

const grades = ['일반', '레어', '에픽', '유니크', '레전드리'] as const;
type Grade = typeof grades[number];

// ── Option list (for the option table) ───────────────────────────────────────
const optionList: { name: string; values: Record<Grade, string> }[] = [
  { name: '고품질 광물 드랍률',        values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 아이템 드랍률',       values: { '일반': '미등장', '레어': '미등장','에픽': '미등장','유니크': '미등장','레전드리': '8%'  } },
  { name: '고품질 약재 드랍률',         values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 전리품 드랍률',       values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 밀 드랍률',           values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 당근 드랍률',         values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 감자 드랍률',         values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 호박 조각 드랍률',    values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 수박 조각 드랍률',    values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 사탕수수 드랍률',     values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 달콤한 열매 드랍률',  values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 비트 드랍률',         values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '고품질 네더와트 드랍률',     values: { '일반': '미등장', '레어': '4%',    '에픽': '8%',    '유니크': '16%',  '레전드리': '24%' } },
  { name: '공격력',                     values: { '일반': '1',      '레어': '2',     '에픽': '3',     '유니크': '5',    '레전드리': '10'  } },
  { name: '더블 드랍',                  values: { '일반': '0.5%',   '레어': '1%',    '에픽': '1.5%',  '유니크': '2%',   '레전드리': '2.5%'} },
  { name: '공격속도',                   values: { '일반': '10%',    '레어': '20%',   '에픽': '30%',   '유니크': '50%',  '레전드리': '70%' } },
  { name: '이동속도',                   values: { '일반': '1%',     '레어': '3%',    '에픽': '5%',    '유니크': '10%',  '레전드리': '20%' } },
  { name: '경험치 획득률',              values: { '일반': '1%',     '레어': '3%',    '에픽': '5%',    '유니크': '10%',  '레전드리': '20%' } },
  { name: '최대 체력',                  values: { '일반': '1',      '레어': '3',     '에픽': '6',     '유니크': '9',    '레전드리': '12'  } },
  { name: '점프력',                     values: { '일반': '10%',    '레어': '20%',   '에픽': '30%',   '유니크': '40%',  '레전드리': '50%' } },
  { name: '추가 효율',                  values: { '일반': '1%',     '레어': '3%',    '에픽': '5%',    '유니크': '13%',  '레전드리': '25%' } },
];

// ── Probability data per box type ─────────────────────────────────────────────
type OptRow = { name: string; grade: string; prob: string };
type LineData = { line1: OptRow[]; line23: OptRow[] };
type BoxProbData = Record<string, LineData>; // keyed by item grade

// Helper to build standard 1st-line options for a given grade
function line1Opts(g: string, probs: number[]): OptRow[] {
  const names = [
    '고품질 광물 드랍률','고품질 약재 드랍률','고품질 전리품 드랍률',
    '고품질 밀 드랍률','고품질 당근 드랍률','고품질 감자 드랍률',
    '고품질 호박 조각 드랍률','고품질 수박 조각 드랍률','고품질 비트 드랍률',
    '고품질 달콤한 열매 드랍률','고품질 사탕수수 드랍률','고품질 네더와트 드랍률',
    '더블 드랍','공격력','공격속도','이동속도','경험치 획득률','최대 체력','점프력','추가 효율',
  ];
  return names.map((n, i) => ({ name: n, grade: g, prob: probs[i] + '%' }));
}

// 일반 스크롤 박스
const normalBoxData: BoxProbData = {
  '레어': {
    line1: line1Opts('레어', [5.0,5.5,5.5,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,5.0,6.0,6.0,6.5,5.0,6.5,6.5,6.5]),
    line23: [
      ...line1Opts('레어', Array(20).fill(0.0669)),
      { name: '더블 드랍',     grade: '노말', prob: '11.08275%' },
      { name: '공격력',        grade: '노말', prob: '12.08275%' },
      { name: '공격속도',      grade: '노말', prob: '12.08275%' },
      { name: '이동속도',      grade: '노말', prob: '13.08275%' },
      { name: '경험치 획득률', grade: '노말', prob: '11.08275%' },
      { name: '최대 체력',     grade: '노말', prob: '13.08275%' },
      { name: '점프력',        grade: '노말', prob: '13.08275%' },
      { name: '추가 효율',     grade: '노말', prob: '13.08275%' },
    ],
  },
  '에픽': {
    line1: line1Opts('에픽', [5.0,5.5,5.5,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,5.0,6.0,6.0,6.5,5.0,6.5,6.5,6.5]),
    line23: [
      ...line1Opts('에픽', Array(20).fill(0.0669)),
      { name: '고품질 광물 드랍률',       grade: '레어', prob: '3.9331%' },
      { name: '고품질 약재 드랍률',        grade: '레어', prob: '4.4331%' },
      { name: '고품질 전리품 드랍률',      grade: '레어', prob: '4.4331%' },
      { name: '고품질 밀 드랍률',          grade: '레어', prob: '4.9331%' },
      { name: '고품질 당근 드랍률',        grade: '레어', prob: '4.9331%' },
      { name: '고품질 감자 드랍률',        grade: '레어', prob: '4.9331%' },
      { name: '고품질 호박 조각 드랍률',   grade: '레어', prob: '4.9331%' },
      { name: '고품질 수박 조각 드랍률',   grade: '레어', prob: '4.9331%' },
      { name: '고품질 비트 드랍률',        grade: '레어', prob: '4.9331%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '레어', prob: '4.9331%' },
      { name: '고품질 사탕수수 드랍률',    grade: '레어', prob: '4.9331%' },
      { name: '고품질 네더와트 드랍률',    grade: '레어', prob: '4.9331%' },
      { name: '더블 드랍',                 grade: '레어', prob: '3.9331%' },
      { name: '공격력',                    grade: '레어', prob: '4.9331%' },
      { name: '공격속도',                  grade: '레어', prob: '4.9331%' },
      { name: '이동속도',                  grade: '레어', prob: '5.9331%' },
      { name: '경험치 획득률',             grade: '레어', prob: '3.9331%' },
      { name: '최대 체력',                 grade: '레어', prob: '5.9331%' },
      { name: '점프력',                    grade: '레어', prob: '5.9331%' },
      { name: '추가 효율',                 grade: '레어', prob: '5.9331%' },
    ],
  },
};

// 에픽 스크롤 박스 — 유니크 1st line은 에픽 박스와 동일 구조
const epicBoxData: BoxProbData = {
  '레어': {
    line1: line1Opts('레어', [5.0,5.5,5.5,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,5.0,6.0,6.0,6.5,5.0,6.5,6.5,6.5]),
    line23: [
      ...line1Opts('레어', Array(20).fill(0.069)),
      { name: '더블 드랍',     grade: '노말', prob: '11.0775%' },
      { name: '공격력',        grade: '노말', prob: '12.0775%' },
      { name: '공격속도',      grade: '노말', prob: '12.0775%' },
      { name: '이동속도',      grade: '노말', prob: '13.0775%' },
      { name: '경험치 획득률', grade: '노말', prob: '11.0775%' },
      { name: '최대 체력',     grade: '노말', prob: '13.0775%' },
      { name: '점프력',        grade: '노말', prob: '13.0775%' },
      { name: '추가 효율',     grade: '노말', prob: '13.0775%' },
    ],
  },
  '에픽': {
    line1: line1Opts('에픽', [5.0,5.5,5.5,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,5.0,6.0,6.0,6.5,5.0,6.5,6.5,6.5]),
    line23: [
      ...line1Opts('에픽', Array(20).fill(0.069)),
      { name: '고품질 광물 드랍률',       grade: '레어', prob: '3.931%' },
      { name: '고품질 약재 드랍률',        grade: '레어', prob: '4.431%' },
      { name: '고품질 전리품 드랍률',      grade: '레어', prob: '4.431%' },
      { name: '고품질 밀 드랍률',          grade: '레어', prob: '4.931%' },
      { name: '고품질 당근 드랍률',        grade: '레어', prob: '4.931%' },
      { name: '고품질 감자 드랍률',        grade: '레어', prob: '4.931%' },
      { name: '고품질 호박 조각 드랍률',   grade: '레어', prob: '4.931%' },
      { name: '고품질 수박 조각 드랍률',   grade: '레어', prob: '4.931%' },
      { name: '고품질 비트 드랍률',        grade: '레어', prob: '4.931%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '레어', prob: '4.931%' },
      { name: '고품질 사탕수수 드랍률',    grade: '레어', prob: '4.931%' },
      { name: '고품질 네더와트 드랍률',    grade: '레어', prob: '4.931%' },
      { name: '더블 드랍',                 grade: '레어', prob: '3.931%' },
      { name: '공격력',                    grade: '레어', prob: '4.931%' },
      { name: '공격속도',                  grade: '레어', prob: '4.931%' },
      { name: '이동속도',                  grade: '레어', prob: '5.931%' },
      { name: '경험치 획득률',             grade: '레어', prob: '3.931%' },
      { name: '최대 체력',                 grade: '레어', prob: '5.931%' },
      { name: '점프력',                    grade: '레어', prob: '5.931%' },
      { name: '추가 효율',                 grade: '레어', prob: '5.931%' },
    ],
  },
  '유니크': {
    line1: line1Opts('유니크', [5.0,5.5,5.5,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,5.0,6.0,6.0,6.5,5.0,6.5,6.5,6.5]),
    line23: [
      ...line1Opts('유니크', Array(20).fill(0.069)),
      { name: '고품질 광물 드랍률',       grade: '에픽', prob: '3.931%' },
      { name: '고품질 약재 드랍률',        grade: '에픽', prob: '4.431%' },
      { name: '고품질 전리품 드랍률',      grade: '에픽', prob: '4.431%' },
      { name: '고품질 밀 드랍률',          grade: '에픽', prob: '4.931%' },
      { name: '고품질 당근 드랍률',        grade: '에픽', prob: '4.931%' },
      { name: '고품질 감자 드랍률',        grade: '에픽', prob: '4.931%' },
      { name: '고품질 호박 조각 드랍률',   grade: '에픽', prob: '4.931%' },
      { name: '고품질 수박 조각 드랍률',   grade: '에픽', prob: '4.931%' },
      { name: '고품질 비트 드랍률',        grade: '에픽', prob: '4.931%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '에픽', prob: '4.931%' },
      { name: '고품질 사탕수수 드랍률',    grade: '에픽', prob: '4.931%' },
      { name: '고품질 네더와트 드랍률',    grade: '에픽', prob: '4.931%' },
      { name: '더블 드랍',                 grade: '에픽', prob: '3.931%' },
      { name: '공격력',                    grade: '에픽', prob: '4.931%' },
      { name: '공격속도',                  grade: '에픽', prob: '4.931%' },
      { name: '이동속도',                  grade: '에픽', prob: '5.931%' },
      { name: '경험치 획득률',             grade: '에픽', prob: '3.931%' },
      { name: '최대 체력',                 grade: '에픽', prob: '5.931%' },
      { name: '점프력',                    grade: '에픽', prob: '5.931%' },
      { name: '추가 효율',                 grade: '에픽', prob: '5.931%' },
    ],
  },
};

// 유니크 스크롤 박스 (from uploaded file)
const uniqueBoxData: BoxProbData = {
  '레어': {
    line1: line1Opts('레어', [5.275,5.775,5.775,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,5.275,5.275,5.275,5.775,5.275,5.775,5.775,6.275]),
    line23: [
      ...line1Opts('레어', Array(20).fill(0.01575)),
      { name: '더블 드랍',     grade: '노말', prob: '11.898125%' },
      { name: '공격력',        grade: '노말', prob: '11.898125%' },
      { name: '공격속도',      grade: '노말', prob: '11.898125%' },
      { name: '이동속도',      grade: '노말', prob: '12.898125%' },
      { name: '경험치 획득률', grade: '노말', prob: '11.898125%' },
      { name: '최대 체력',     grade: '노말', prob: '12.898125%' },
      { name: '점프력',        grade: '노말', prob: '12.898125%' },
      { name: '추가 효율',     grade: '노말', prob: '13.398125%' },
    ],
  },
  '에픽': {
    line1: line1Opts('에픽', [5.275,5.775,5.775,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,5.275,5.275,5.275,5.775,5.275,5.775,5.775,6.275]),
    line23: [
      ...line1Opts('에픽', Array(20).fill(0.01575)),
      { name: '고품질 광물 드랍률',       grade: '레어', prob: '4.25925%' },
      { name: '고품질 약재 드랍률',        grade: '레어', prob: '4.75925%' },
      { name: '고품질 전리품 드랍률',      grade: '레어', prob: '4.75925%' },
      { name: '고품질 밀 드랍률',          grade: '레어', prob: '5.25925%' },
      { name: '고품질 당근 드랍률',        grade: '레어', prob: '5.25925%' },
      { name: '고품질 감자 드랍률',        grade: '레어', prob: '5.25925%' },
      { name: '고품질 호박 조각 드랍률',   grade: '레어', prob: '5.25925%' },
      { name: '고품질 수박 조각 드랍률',   grade: '레어', prob: '5.25925%' },
      { name: '고품질 비트 드랍률',        grade: '레어', prob: '5.25925%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '레어', prob: '5.25925%' },
      { name: '고품질 사탕수수 드랍률',    grade: '레어', prob: '5.25925%' },
      { name: '고품질 네더와트 드랍률',    grade: '레어', prob: '5.25925%' },
      { name: '더블 드랍',                 grade: '레어', prob: '4.25925%' },
      { name: '공격력',                    grade: '레어', prob: '4.25925%' },
      { name: '공격속도',                  grade: '레어', prob: '4.25925%' },
      { name: '이동속도',                  grade: '레어', prob: '5.25925%' },
      { name: '경험치 획득률',             grade: '레어', prob: '4.25925%' },
      { name: '최대 체력',                 grade: '레어', prob: '5.25925%' },
      { name: '점프력',                    grade: '레어', prob: '5.25925%' },
      { name: '추가 효율',                 grade: '레어', prob: '5.75925%' },
    ],
  },
  '유니크': {
    line1: line1Opts('유니크', [5.275,5.775,5.775,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,5.275,5.275,5.275,5.775,5.275,5.775,5.775,6.275]),
    line23: [
      ...line1Opts('유니크', Array(20).fill(0.01575)),
      { name: '고품질 광물 드랍률',       grade: '에픽', prob: '4.25925%' },
      { name: '고품질 약재 드랍률',        grade: '에픽', prob: '4.75925%' },
      { name: '고품질 전리품 드랍률',      grade: '에픽', prob: '4.75925%' },
      { name: '고품질 밀 드랍률',          grade: '에픽', prob: '5.25925%' },
      { name: '고품질 당근 드랍률',        grade: '에픽', prob: '5.25925%' },
      { name: '고품질 감자 드랍률',        grade: '에픽', prob: '5.25925%' },
      { name: '고품질 호박 조각 드랍률',   grade: '에픽', prob: '5.25925%' },
      { name: '고품질 수박 조각 드랍률',   grade: '에픽', prob: '5.25925%' },
      { name: '고품질 비트 드랍률',        grade: '에픽', prob: '5.25925%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '에픽', prob: '5.25925%' },
      { name: '고품질 사탕수수 드랍률',    grade: '에픽', prob: '5.25925%' },
      { name: '고품질 네더와트 드랍률',    grade: '에픽', prob: '5.25925%' },
      { name: '더블 드랍',                 grade: '에픽', prob: '4.25925%' },
      { name: '공격력',                    grade: '에픽', prob: '4.25925%' },
      { name: '공격속도',                  grade: '에픽', prob: '4.25925%' },
      { name: '이동속도',                  grade: '에픽', prob: '5.25925%' },
      { name: '경험치 획득률',             grade: '에픽', prob: '4.25925%' },
      { name: '최대 체력',                 grade: '에픽', prob: '5.25925%' },
      { name: '점프력',                    grade: '에픽', prob: '5.25925%' },
      { name: '추가 효율',                 grade: '에픽', prob: '5.75925%' },
    ],
  },
  '레전드리': {
    line1: [
      ...line1Opts('레전드리', [5.0,5.5,5.5,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,5.0,5.0,5.0,5.5,5.0,5.5,5.5,6.0]).slice(0,1),
      { name: '고품질 아이템 드랍률', grade: '레전드리', prob: '5.5%' },
      ...line1Opts('레전드리', [5.0,5.5,5.5,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,4.0,5.0,5.0,5.0,5.5,5.0,5.5,5.5,6.0]).slice(1),
    ],
    line23: [
      ...line1Opts('레전드리', Array(20).fill(0.015)),
      { name: '고품질 아이템 드랍률',     grade: '레전드리', prob: '5.5%' },
      { name: '고품질 광물 드랍률',       grade: '유니크', prob: '3.985%' },
      { name: '고품질 약재 드랍률',        grade: '유니크', prob: '4.485%' },
      { name: '고품질 전리품 드랍률',      grade: '유니크', prob: '4.485%' },
      { name: '고품질 밀 드랍률',          grade: '유니크', prob: '4.985%' },
      { name: '고품질 당근 드랍률',        grade: '유니크', prob: '4.985%' },
      { name: '고품질 감자 드랍률',        grade: '유니크', prob: '4.985%' },
      { name: '고품질 호박 조각 드랍률',   grade: '유니크', prob: '4.985%' },
      { name: '고품질 수박 조각 드랍률',   grade: '유니크', prob: '4.985%' },
      { name: '고품질 비트 드랍률',        grade: '유니크', prob: '4.985%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '유니크', prob: '4.985%' },
      { name: '고품질 사탕수수 드랍률',    grade: '유니크', prob: '4.985%' },
      { name: '고품질 네더와트 드랍률',    grade: '유니크', prob: '4.985%' },
      { name: '더블 드랍',                 grade: '유니크', prob: '3.985%' },
      { name: '공격력',                    grade: '유니크', prob: '3.985%' },
      { name: '공격속도',                  grade: '유니크', prob: '3.985%' },
      { name: '이동속도',                  grade: '유니크', prob: '4.985%' },
      { name: '경험치 획득률',             grade: '유니크', prob: '3.985%' },
      { name: '최대 체력',                 grade: '유니크', prob: '4.985%' },
      { name: '점프력',                    grade: '유니크', prob: '4.985%' },
      { name: '추가 효율',                 grade: '유니크', prob: '5.485%' },
    ],
  },
};

// 메모리얼 스크롤 박스 (from uploaded file)
const memorialBoxData: BoxProbData = {
  '레어': {
    line1: line1Opts('레어', [5.275,5.775,5.775,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,5.275,5.275,5.275,5.775,5.275,5.775,5.775,6.275]),
    line23: [
      ...line1Opts('레어', Array(20).fill(0.525)),
      { name: '더블 드랍',     grade: '노말', prob: '10.625%' },
      { name: '공격력',        grade: '노말', prob: '10.625%' },
      { name: '공격속도',      grade: '노말', prob: '10.625%' },
      { name: '이동속도',      grade: '노말', prob: '11.625%' },
      { name: '경험치 획득률', grade: '노말', prob: '10.625%' },
      { name: '최대 체력',     grade: '노말', prob: '11.625%' },
      { name: '점프력',        grade: '노말', prob: '11.625%' },
      { name: '추가 효율',     grade: '노말', prob: '12.125%' },
    ],
  },
  '에픽': {
    line1: line1Opts('에픽', [5.275,5.775,5.775,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,5.275,5.275,5.275,5.775,5.275,5.775,5.775,6.275]),
    line23: [
      ...line1Opts('에픽', Array(20).fill(0.525)),
      { name: '고품질 광물 드랍률',       grade: '레어', prob: '3.75%' },
      { name: '고품질 약재 드랍률',        grade: '레어', prob: '4.25%' },
      { name: '고품질 전리품 드랍률',      grade: '레어', prob: '4.25%' },
      { name: '고품질 밀 드랍률',          grade: '레어', prob: '4.75%' },
      { name: '고품질 당근 드랍률',        grade: '레어', prob: '4.75%' },
      { name: '고품질 감자 드랍률',        grade: '레어', prob: '4.75%' },
      { name: '고품질 호박 조각 드랍률',   grade: '레어', prob: '4.75%' },
      { name: '고품질 수박 조각 드랍률',   grade: '레어', prob: '4.75%' },
      { name: '고품질 비트 드랍률',        grade: '레어', prob: '4.75%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '레어', prob: '4.75%' },
      { name: '고품질 사탕수수 드랍률',    grade: '레어', prob: '4.75%' },
      { name: '고품질 네더와트 드랍률',    grade: '레어', prob: '4.75%' },
      { name: '더블 드랍',                 grade: '레어', prob: '3.75%' },
      { name: '공격력',                    grade: '레어', prob: '3.75%' },
      { name: '공격속도',                  grade: '레어', prob: '3.75%' },
      { name: '이동속도',                  grade: '레어', prob: '4.75%' },
      { name: '경험치 획득률',             grade: '레어', prob: '3.75%' },
      { name: '최대 체력',                 grade: '레어', prob: '4.75%' },
      { name: '점프력',                    grade: '레어', prob: '4.75%' },
      { name: '추가 효율',                 grade: '레어', prob: '5.25%' },
    ],
  },
  '유니크': {
    line1: line1Opts('유니크', [5.275,5.775,5.775,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,4.275,5.275,5.275,5.275,5.775,5.275,5.775,5.775,6.275]),
    line23: [
      ...line1Opts('유니크', Array(20).fill(0.525)),
      { name: '고품질 광물 드랍률',       grade: '에픽', prob: '3.75%' },
      { name: '고품질 약재 드랍률',        grade: '에픽', prob: '4.25%' },
      { name: '고품질 전리품 드랍률',      grade: '에픽', prob: '4.25%' },
      { name: '고품질 밀 드랍률',          grade: '에픽', prob: '4.75%' },
      { name: '고품질 당근 드랍률',        grade: '에픽', prob: '4.75%' },
      { name: '고품질 감자 드랍률',        grade: '에픽', prob: '4.75%' },
      { name: '고품질 호박 조각 드랍률',   grade: '에픽', prob: '4.75%' },
      { name: '고품질 수박 조각 드랍률',   grade: '에픽', prob: '4.75%' },
      { name: '고품질 비트 드랍률',        grade: '에픽', prob: '4.75%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '에픽', prob: '4.75%' },
      { name: '고품질 사탕수수 드랍률',    grade: '에픽', prob: '4.75%' },
      { name: '고품질 네더와트 드랍률',    grade: '에픽', prob: '4.75%' },
      { name: '더블 드랍',                 grade: '에픽', prob: '3.75%' },
      { name: '공격력',                    grade: '에픽', prob: '3.75%' },
      { name: '공격속도',                  grade: '에픽', prob: '3.75%' },
      { name: '이동속도',                  grade: '에픽', prob: '4.75%' },
      { name: '경험치 획득률',             grade: '에픽', prob: '3.75%' },
      { name: '최대 체력',                 grade: '에픽', prob: '4.75%' },
      { name: '점프력',                    grade: '에픽', prob: '4.75%' },
      { name: '추가 효율',                 grade: '에픽', prob: '5.25%' },
    ],
  },
  '레전드리': {
    line1: [
      { name: '고품질 광물 드랍률', grade: '레전드리', prob: '5.0%' },
      { name: '고품질 아이템 드랍률', grade: '레전드리', prob: '5.5%' },
      { name: '고품질 약재 드랍률', grade: '레전드리', prob: '5.5%' },
      { name: '고품질 전리품 드랍률', grade: '레전드리', prob: '5.5%' },
      { name: '고품질 밀 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 당근 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 감자 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 호박 조각 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 수박 조각 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 비트 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 사탕수수 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '고품질 네더와트 드랍률', grade: '레전드리', prob: '4.0%' },
      { name: '더블 드랍', grade: '레전드리', prob: '5.0%' },
      { name: '공격력', grade: '레전드리', prob: '5.0%' },
      { name: '공격속도', grade: '레전드리', prob: '5.0%' },
      { name: '이동속도', grade: '레전드리', prob: '5.5%' },
      { name: '경험치 획득률', grade: '레전드리', prob: '5.0%' },
      { name: '최대 체력', grade: '레전드리', prob: '5.5%' },
      { name: '점프력', grade: '레전드리', prob: '5.5%' },
      { name: '추가 효율', grade: '레전드리', prob: '6.0%' },
    ],
    line23: [
      ...line1Opts('레전드리', Array(20).fill(0.5)),
      { name: '고품질 아이템 드랍률', grade: '레전드리', prob: '5.5%' },
      { name: '고품질 광물 드랍률',       grade: '유니크', prob: '3.5%' },
      { name: '고품질 약재 드랍률',        grade: '유니크', prob: '4.0%' },
      { name: '고품질 전리품 드랍률',      grade: '유니크', prob: '4.0%' },
      { name: '고품질 밀 드랍률',          grade: '유니크', prob: '4.5%' },
      { name: '고품질 당근 드랍률',        grade: '유니크', prob: '4.5%' },
      { name: '고품질 감자 드랍률',        grade: '유니크', prob: '4.5%' },
      { name: '고품질 호박 조각 드랍률',   grade: '유니크', prob: '4.5%' },
      { name: '고품질 수박 조각 드랍률',   grade: '유니크', prob: '4.5%' },
      { name: '고품질 비트 드랍률',        grade: '유니크', prob: '4.5%' },
      { name: '고품질 달콤한 열매 드랍률', grade: '유니크', prob: '4.5%' },
      { name: '고품질 사탕수수 드랍률',    grade: '유니크', prob: '4.5%' },
      { name: '고품질 네더와트 드랍률',    grade: '유니크', prob: '4.5%' },
      { name: '더블 드랍',                 grade: '유니크', prob: '3.5%' },
      { name: '공격력',                    grade: '유니크', prob: '3.5%' },
      { name: '공격속도',                  grade: '유니크', prob: '3.5%' },
      { name: '이동속도',                  grade: '유니크', prob: '4.5%' },
      { name: '경험치 획득률',             grade: '유니크', prob: '3.5%' },
      { name: '최대 체력',                 grade: '유니크', prob: '4.5%' },
      { name: '점프력',                    grade: '유니크', prob: '4.5%' },
      { name: '추가 효율',                 grade: '유니크', prob: '5.0%' },
    ],
  },
};

// ── Box type meta ─────────────────────────────────────────────────────────────
const boxTypes = [
  {
    name: '일반 스크롤 박스', short: '일반',
    maxGrade: '에픽', color: '#1d4ed8', bg: '#EFF6FF', border: '#93c5fd',
    upgrades: [
      { from: '레어', to: '에픽', prob: '1%' },
      { from: '에픽', to: '유니크', prob: '등업 불가' },
      { from: '유니크', to: '레전드리', prob: '등업 불가' },
    ],
    itemGrades: ['레어', '에픽'],
    probData: normalBoxData,
  },
  {
    name: '에픽 스크롤 박스', short: '에픽',
    maxGrade: '유니크', color: '#7c3aed', bg: '#F5F3FF', border: '#a78bfa',
    upgrades: [
      { from: '레어', to: '에픽', prob: '4.7%' },
      { from: '에픽', to: '유니크', prob: '1.2%' },
      { from: '유니크', to: '레전드리', prob: '등업 불가' },
    ],
    itemGrades: ['레어', '에픽', '유니크'],
    probData: epicBoxData,
  },
  {
    name: '유니크 스크롤 박스', short: '유니크',
    maxGrade: '레전드리', color: '#c2410c', bg: '#FFF7ED', border: '#fdba74',
    upgrades: [
      { from: '레어', to: '에픽', prob: '8%' },
      { from: '에픽', to: '유니크', prob: '1.7%' },
      { from: '유니크', to: '레전드리', prob: '0.2%' },
    ],
    itemGrades: ['레어', '에픽', '유니크', '레전드리'],
    probData: uniqueBoxData,
  },
  {
    name: '메모리얼 스크롤 박스', short: '메모리얼',
    maxGrade: '레전드리', color: '#a16207', bg: '#FEF9C3', border: '#fde047',
    upgrades: [
      { from: '레어', to: '에픽', prob: '15%' },
      { from: '에픽', to: '유니크', prob: '3.5%' },
      { from: '유니크', to: '레전드리', prob: '1.4%' },
    ],
    itemGrades: ['레어', '에픽', '유니크', '레전드리'],
    probData: memorialBoxData,
  },
];

// ── Prob table ────────────────────────────────────────────────────────────────
function ProbTable({ rows, color }: { rows: OptRow[]; color: string }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${COLORS.border}` }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr style={{ backgroundColor: '#F0FAF1' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', color: '#2C3E20', fontWeight: 800, borderBottom: `1px solid ${COLORS.border}` }}>옵션</th>
            <th style={{ padding: '8px 12px', textAlign: 'center', color: '#2C3E20', fontWeight: 800, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>등급</th>
            <th style={{ padding: '8px 12px', textAlign: 'right', color: '#2C3E20', fontWeight: 800, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>확률</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const gs = gradeStyle[r.grade] ?? gradeStyle['일반'];
            return (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#FAFFF9' }}>
                <td style={{ padding: '6px 12px', color: '#4A6030', borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>{r.name}</td>
                <td style={{ padding: '6px 12px', textAlign: 'center', borderBottom: `1px solid ${COLORS.border}` }}>
                  <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: gs.bg, color: gs.text, fontSize: '10px', fontWeight: 800, border: `1px solid ${gs.border}`, whiteSpace: 'nowrap' }}>{r.grade}</span>
                </td>
                <td style={{ padding: '6px 12px', textAlign: 'right', fontWeight: 700, color, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>{r.prob}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function ScrollBoxContent() {
  const [selectedBox, setSelectedBox] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [showLine, setShowLine] = useState<'1' | '23'>('1');

  const box = boxTypes[selectedBox];
  const itemGrade = box.itemGrades[selectedGrade] ?? box.itemGrades[0];
  const gradeData = box.probData[itemGrade];

  return (
    <>
      {/* Overview */}
      <div id="overview">
        <SectionCard icon="📖" title="개요">
          <p style={{ fontSize: '14px', color: '#4A6030', lineHeight: 1.9, marginBottom: '16px' }}>
            스크롤 박스는 도구에 <strong>특수한 효과를 추가적으로 부여</strong>시킬 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '8px' }}>📦 획득 방법</div>
              <ul style={{ fontSize: '13px', color: '#4A6030', lineHeight: 1.9, listStyle: 'none', padding: 0 }}>
                {['종합 상점 (모든 등급)','베리 상점 (모든 등급)','경험치 상점 (모든 등급)','교환 상점 (최대 유니크)','일일 컨텐츠 교환 상점 (최대 유니크)','낚시터 (최대 유니크)'].map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#F0FAF1', border: `1.5px solid ${COLORS.border}` }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#2C3E20', marginBottom: '8px' }}>🔧 사용 가능한 도구</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {['곡괭이','괭이','도끼','검'].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg" style={{ backgroundColor: 'white', border: `1.5px solid ${COLORS.border}`, fontSize: '13px', fontWeight: 700, color: '#2C3E20' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden mb-4" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <img
              src="https://mcnspring.notion.site/image/attachment%3A6c3a6f37-cec1-4fd6-9020-5990250cecc8%3Aimage.png?table=block&id=32b7ce2d-5858-807b-a708-f4938601329d&spaceId=23a7ce2d-5858-8138-bbba-00032492b309&width=1280&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
              alt="스크롤 박스 사용 화면"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFF0F0', borderLeft: '4px solid #FF8A8A' }}>
            <p style={{ fontSize: '14px', color: '#c0392b', lineHeight: 1.7, fontWeight: 700 }}>
              ⚠️ 메모리얼 스크롤 박스를 제외한 스크롤 박스 사용 시, 이전에 있던 옵션은 복구가 불가능합니다. 신중히 사용해주세요!
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Option values table */}
      <div id="options">
        <SectionCard icon="📋" title="옵션 수치 목록">
          <p style={{ fontSize: '13px', color: '#4A6030', marginBottom: '16px', lineHeight: 1.7 }}>
            잠재능력 <strong>첫 번째 줄</strong>은 해당 아이템의 등급에 따라 <strong>확정 옵션</strong>이 붙습니다.
          </p>
          <div className="overflow-x-auto rounded-xl" style={{ border: `1.5px solid ${COLORS.border}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F0FAF1' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', color: '#2C3E20', fontWeight: 800, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>옵션</th>
                  {grades.map((g) => (
                    <th key={g} style={{ padding: '10px 12px', textAlign: 'center', borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: gradeStyle[g].bg, color: gradeStyle[g].text, fontWeight: 800, fontSize: '11px', border: `1px solid ${gradeStyle[g].border}` }}>{g}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {optionList.map((opt, i) => (
                  <tr key={opt.name} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#FAFFF9' }}>
                    <td style={{ padding: '9px 14px', color: '#4A6030', fontWeight: 600, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: 'nowrap' }}>{opt.name}</td>
                    {grades.map((g) => (
                      <td key={g} style={{ padding: '9px 12px', textAlign: 'center', borderBottom: `1px solid ${COLORS.border}` }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: opt.values[g] === '미등장' ? '#CBD5E1' : gradeStyle[g].text }}>
                          {opt.values[g]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Box prob section */}
      <div id="boxes">
        <SectionCard icon="🎲" title="스크롤 박스 종류 & 옵션 등장 확률">
          {/* Box type tabs */}
          <div style={{ fontSize: '12px', color: '#6B8A50', fontWeight: 700, marginBottom: '6px' }}>박스 종류</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {boxTypes.map((b, i) => (
              <button key={b.name} onClick={() => { setSelectedBox(i); setSelectedGrade(0); setShowLine('1'); }}
                className="px-4 py-2 rounded-full transition-all"
                style={{ backgroundColor: selectedBox === i ? b.color : b.bg, border: `1.5px solid ${b.border}`, color: selectedBox === i ? 'white' : b.color, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                {b.short}
              </button>
            ))}
          </div>

          {/* Upgrade probs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {box.upgrades.map((u) => (
              <div key={u.from + u.to} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ backgroundColor: u.prob === '등업 불가' ? '#F8FAFC' : box.bg, border: `1px solid ${u.prob === '등업 불가' ? '#E2E8F0' : box.border}` }}>
                <span style={{ fontSize: '12px', color: '#6B8A50' }}>{u.from} → {u.to}</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: u.prob === '등업 불가' ? '#CBD5E1' : box.color }}>{u.prob}</span>
              </div>
            ))}
          </div>

          {/* Item grade tabs */}
          <div style={{ fontSize: '12px', color: '#6B8A50', fontWeight: 700, marginBottom: '6px' }}>아이템 등급</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {box.itemGrades.map((g, i) => {
              const gs = gradeStyle[g];
              return (
                <button key={g} onClick={() => setSelectedGrade(i)}
                  className="px-3 py-1.5 rounded-full transition-all"
                  style={{ backgroundColor: selectedGrade === i ? gs.text : gs.bg, border: `1.5px solid ${gs.border}`, color: selectedGrade === i ? 'white' : gs.text, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                  {g}
                </button>
              );
            })}
          </div>

          {/* Line toggle */}
          <div className="flex gap-2 mb-4">
            {([['1', '1번째 줄'], ['23', '2·3번째 줄']] as const).map(([val, label]) => (
              <button key={val} onClick={() => setShowLine(val)}
                className="px-4 py-2 rounded-xl transition-all"
                style={{ backgroundColor: showLine === val ? box.color : '#F0FAF1', color: showLine === val ? 'white' : '#4A6030', fontSize: '13px', fontWeight: 700, border: `1.5px solid ${showLine === val ? box.color : COLORS.border}`, cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>

          {gradeData ? (
            <ProbTable rows={showLine === '1' ? gradeData.line1 : gradeData.line23} color={box.color} />
          ) : (
            <div className="py-8 text-center" style={{ color: '#6B8A50', fontSize: '14px' }}>해당 등급의 데이터가 없습니다.</div>
          )}
        </SectionCard>
      </div>
    </>
  );
}
