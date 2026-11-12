const I = (ko, en) => ({ ko, en });
// Add your own Channel Talk web plugin key to enable the PJ chat launcher.
const CHANNEL_TALK_PLUGIN_KEY = '';
const CONTACT_EMAIL = 'jinsu.build@gmail.com';
let channelTalkReady = false;
let channelTalkPending = null;

function showChannelTalk() {
  if (channelTalkReady) {
    window.ChannelIO('showMessenger');
    return Promise.resolve();
  }
  if (!channelTalkPending) {
    channelTalkPending = new Promise((resolve, reject) => {
      const boot = () => {
        if (typeof window.ChannelIO !== 'function') return reject(new Error('Channel Talk did not load'));
        window.ChannelIO('boot', {
          pluginKey: CHANNEL_TALK_PLUGIN_KEY,
          language: getLang(),
          hideChannelButtonOnBoot: true
        }, error => error ? reject(error) : resolve());
      };
      if (typeof window.ChannelIO === 'function') return boot();
      const script = document.createElement('script');
      script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      script.async = true;
      script.onload = boot;
      script.onerror = () => reject(new Error('Channel Talk script failed to load'));
      document.head.append(script);
    }).then(() => { channelTalkReady = true; }).catch(error => {
      channelTalkPending = null;
      throw error;
    });
  }
  return channelTalkPending.then(() => window.ChannelIO('showMessenger'));
}
const projectData = [
  {
    id: 'reeltime', year: '2026.10–11', title: I('ReelTime', 'ReelTime'),
    category: I('iOS 앱 · App Store 출시', 'iOS app · App Store release'),
    description: I('영화 한 편 상영 시간만큼 휴대폰을 잠그는 집중 앱. 끝까지 보면 집중한 시간이 숫자 포스터로 남습니다.', 'A focus app that locks your phone for the length of one film. Finish it and the time you focused stays as a numeric poster.'),
    role: I('단독 개발 · 기획, 디자인, 개발, App Store 심사 대응', 'Solo · Planning, design, development, and App Store review'),
    outcome: I('심사 반려 3번을 하나씩 고쳐 2026.11 App Store 출시(138개 국가·지역)', 'Fixed three review rejections one by one; released on the App Store in Nov 2026 (138 countries and regions)'),
    tech: ['Swift', 'SwiftUI', 'Family Controls', 'KMDb API'],
    links: [{ label: I('App Store', 'App Store'), href: 'https://apps.apple.com/kr/app/id6827067507' }]
  },
  {
    id: 'sourcenote', year: '2026.10–11', title: I('Sourcenote', 'Sourcenote'),
    category: I('데스크톱 앱 · 해커톤', 'Desktop app · Hackathon'),
    description: I('강의 녹음과 슬라이드로 요약을 만들고, 요약 문장마다 녹음 시점과 슬라이드 쪽을 근거로 달아 다시 판정하는 강의 노트 앱. 근거가 없으면 "자료에 없음"으로 표시합니다.', 'A lecture-notes app that summarizes recordings and slides, attaches a timestamp or slide page to every sentence, and re-checks it. Sentences without support are marked "Not in sources".'),
    role: I('단독 개발 · Meta Global AI Developer Hackathon 제출', 'Solo · Submitted to the Meta Global AI Developer Hackathon'),
    outcome: I('v0.1.0 공개(맥 서명·공증 DMG, 윈도우 설치 파일) · 테스트 314개', 'v0.1.0 released (signed and notarized macOS DMG, Windows installer) · 314 tests'),
    tech: ['Electron', 'TypeScript', 'Meta Model API'],
    links: [{ label: I('코드 보기', 'View code'), href: 'https://github.com/1jsjs/sourcenote' }, { label: I('데모 영상', 'Demo video'), href: 'https://youtu.be/_HBXvpVbhfg' }]
  },
  {
    id: 'sobi', year: '2026.08', title: I('소비 재판소', 'Sobi Tribunal'),
    category: I('AI 서비스 · 해커톤', 'AI product · Hackathon'),
    description: I('후회한 소비 한 건을 사진으로 올리면 AI 판사가 심문하고 판결하는 소비 회고 서비스. 가계부로 만들다가 해커톤 둘째 날 재판 형식으로 방향을 바꿨고, 판결은 규칙이·문장은 AI가 맡도록 나눴습니다.', 'A spending-reflection service where an AI judge questions and rules on one regretted purchase. We pivoted from a budgeting app to a courtroom format on day two, splitting verdicts (rules) from wording (AI).'),
    role: I('5인 팀 · 기획, 인프라 구축, v1·v2 전체 개발', 'Five-person team · Product planning, infrastructure, and v1/v2 implementation'),
    outcome: I('2026 제2회 호남권 SW중심대학 LLM 해커톤 장려상', 'Honorable mention, 2026 Honam SW-Centered University LLM Hackathon'),
    tech: ['FastAPI', 'SQLite', 'Amazon Bedrock', 'EC2', 'S3'],
    links: [{ label: I('최종 코드', 'Final code'), href: 'https://github.com/1jsjs/sobi-tribunal' }, { label: I('초기 버전', 'Initial version'), href: 'https://github.com/1jsjs/receipt-tribunal' }]
  },
  {
    id: 'trafficflow', year: '2026.10–11', title: I('Traffic Flow Bench', 'Traffic Flow Bench'),
    category: I('데이터 대회 · Kaggle', 'Data competition · Kaggle'),
    description: I('IEEE Big Data Cup 교통 흐름 예측 대회. 규칙을 다시 읽다가 당시 최고 점수 제출들이 금지된 "시점 이후 데이터"를 쓰고 있다는 걸 찾아 최종 후보에서 빼고, 이전 30일만 쓰는 방식으로 다시 쌓았습니다.', 'IEEE Big Data Cup traffic-flow forecasting. Rereading the rules, I found my top-scoring submissions used forbidden post-cutoff data, removed them from the final pick, and rebuilt using only the previous 30 days.'),
    role: I('개인 참가 · 모델, 재현 패키지, 16쪽 보고서', 'Solo · Models, reproducible package, and a 16-page report'),
    outcome: I('비공개 리더보드 99위 / 801팀 · 깨끗한 환경에서 다시 돌려 제출 파일과 같음을 확인', 'Private leaderboard 99 / 801 teams · A clean rerun reproduced the submitted file'),
    tech: ['Python', 'U-Net', 'Kaggle'],
    links: [{ label: I('대회 페이지', 'Competition page'), href: 'https://www.kaggle.com/competitions/2026-ieee-big-data-traffic-flow-bench' }]
  },
  {
    id: 'speakup', year: '2026.05–06', title: I('SpeakUp', 'SpeakUp'),
    category: I('실시간 AI 코칭', 'Real-time AI coaching'),
    description: I('STT·LLM과 전북도청 API를 연결한 실시간 면접 코칭 웹 서비스. 코칭 결과를 다시 보고 영상으로 내보내는 흐름을 구현했습니다.', 'A real-time interview coaching web service connecting STT, an LLM, and a Jeonbuk provincial API. Built coaching replay and video export flows.'),
    role: I('3인 팀 · 실시간 코칭 엔진, 리포트 다시보기, MP4 내보내기', 'Three-person team · Real-time coaching engine, report replay, and MP4 export'),
    outcome: I('2026 JBNU AI·SW 경진대회 SW부문 동상 · 수상 팀명 StepUP', 'Bronze prize, 2026 JBNU AI·SW Competition · Awarded as team StepUP'),
    tech: ['STT', 'LLM', 'React'],
    links: [{ label: I('원본 저장소', 'Source repository'), href: 'https://github.com/eecczz/speech-coach' }]
  },
  {
    id: 'vispresso', year: '2026.03–06', title: I('Vispresso', 'Vispresso'),
    category: I('산학 프로젝트 · 영상 편집', 'Industry project · Video editing'),
    description: I('전주MBC 산학 연계로 진행한 AI 기반 롱폼 영상 자동 편집 시스템. 긴 영상에서 편집 작업을 구성하고 결과를 확인하는 웹 화면을 맡았습니다.', 'An AI-assisted long-form video editing system developed with Jeonju MBC. Worked on the web interface for preparing and reviewing editing jobs.'),
    role: I('4인 팀 · 프론트엔드', 'Four-person team · Frontend'),
    outcome: I('2026-1 SW 캡스톤디자인 경진대회 우수상', 'Excellence prize, Spring 2026 SW Capstone Design Competition'),
    tech: ['Next.js', 'React', 'TypeScript', 'FFmpeg', 'STT'],
    links: [{ label: I('원본 저장소', 'Original repository'), href: 'https://github.com/Me1e/jbnu_capstone_vispresso' }]
  },
  {
    id: 'thumbstap', year: '2026.07', title: I('Thumbstap', 'Thumbstap'),
    category: I('macOS · 오픈소스', 'macOS · Open source'),
    description: I('엄지 제스처로 실행하는 macOS 앱 격자 런처. 멀티터치 입력의 형태 정보를 이용해 엄지 동작을 구분합니다.', 'A macOS app-grid launcher controlled by a thumb gesture, using multitouch contact-shape data to identify the gesture.'),
    role: I('단독 개발 · 공개 저장소', 'Solo project · Public repository'),
    outcome: I('MIT 라이선스로 공개, Homebrew cask 배포 구성', 'Released under MIT, with Homebrew cask distribution'),
    tech: ['Swift', 'SwiftPM', 'MultitouchSupport', 'Homebrew'],
    links: [{ label: I('코드 보기', 'View code'), href: 'https://github.com/1jsjs/thumbstap' }]
  },
  {
    id: 'k4f', year: '2025.09–12', title: I('KoreanForYou', 'KoreanForYou'),
    category: I('교육 서비스 · 일경험', 'Learning product · Work experience'),
    description: I('이주노동자 직무 온보딩을 위한 한국어 학습 플랫폼. 문장 학습, 발음 평가, AI 역할극, 학습 통계 흐름을 제공했습니다.', 'A Korean learning platform for migrant-worker job onboarding, with sentence practice, pronunciation feedback, AI role-play, and learning statistics.'),
    role: I('4인 팀 · 프론트엔드', 'Four-person team · Frontend'),
    outcome: I('KMA 미래내일 일경험 · 케어로그 연계', 'KMA Future Work Experience · Carelog collaboration'),
    tech: ['React', 'TypeScript', 'TanStack Query', 'FastAPI', 'PostgreSQL'],
    links: [
      { label: I('클라이언트 저장소', 'Client repository'), href: 'https://github.com/TT-Team-2025/Client_KoreanForYou' },
      { label: I('서버 저장소', 'Server repository'), href: 'https://github.com/TT-Team-2025/Server_KoreanForYou' }
    ]
  },
  {
    id: 'refine', year: '2025.12', title: I('REFINE', 'REFINE'),
    category: I('iOS · AI 글쓰기', 'iOS · AI writing'),
    description: I('사용자 경험을 바탕으로 이력서 문장을 생성하고 정제하는 SwiftUI 앱. 문장 초안부터 수정까지의 흐름을 구현했습니다.', 'A SwiftUI app that drafts and refines résumé sentences from a user’s experience.'),
    role: I('단독 개발', 'Solo project'), outcome: I('개인 프로젝트', 'Personal project'),
    tech: ['SwiftUI', 'OpenAI API', 'Cloudflare Workers'],
    links: [{ label: I('코드 보기', 'View code'), href: 'https://github.com/1jsjs/REFINE' }]
  }
];

const contributionData = [
  { title: 'apple/coremltools', detail: I('layer_norm beta shape 검증 오류 수정', 'Fixed layer_norm beta-shape validation'), date: '2026.06', href: 'https://github.com/apple/coremltools/pull/2736' },
  { title: 'alhangeul-macos', detail: I('macOS 한글 입력기 기여', 'Contribution to a macOS Korean input method'), date: '2026.06', href: 'https://github.com/postmelee/alhangeul-macos/pull/328' },
  { title: 'odysseus', detail: I('세션 정리 타임존 버그 수정', 'Fixed a session-cleanup timezone bug'), date: '2026.06', href: 'https://github.com/odysseus-dev/odysseus/pull/2488' }
];

const notesData = [
  { category: 'project', date: '2026.11', title: I('ReelTime App Store 출시', 'ReelTime released on the App Store'), summary: I('심사 반려 3번(권한 판정, 백그라운드 소리, 권한 안내 버튼)을 하나씩 고쳐 138개 국가·지역에 출시했습니다.', 'Fixed three review rejections (entitlement check, background audio, permission prompt) and released in 138 countries and regions.'), href: './portfolio.html#reeltime' },
  { category: 'project', date: '2026.11', title: I('Sourcenote · Meta 해커톤 제출', 'Sourcenote · Meta hackathon submission'), summary: I('요약 문장마다 근거를 달고 다시 판정하는 강의 노트 앱을 혼자 만들어 v0.1.0을 공개했습니다.', 'Built a lecture-notes app that cites and re-checks every summary sentence, and released v0.1.0.'), href: './portfolio.html#sourcenote' },
  { category: 'project', date: '2026.11', title: I('Traffic Flow Bench 보고서·재현 패키지 제출', 'Traffic Flow Bench report and reproducible package'), summary: I('규칙을 어긴 고득점 제출을 스스로 빼고, 깨끗한 환경에서 다시 돌려 같은 결과를 확인한 뒤 16쪽 보고서와 코드를 냈습니다.', 'Removed my rule-breaking top submissions, verified a clean rerun matched, and sent a 16-page report with code.'), href: './portfolio.html#trafficflow' },
  { category: 'award', date: '2026.10', title: I('Pre-SKALA 합격', 'Selected for Pre-SKALA'), summary: I('SK의 AI 교육 과정 Pre-SKALA에 합격해 10~11월 온라인 부트캠프에 참여하고 최종 과제를 제출했습니다.', 'Selected for SK’s Pre-SKALA AI program; joined the Oct–Nov online bootcamp and submitted the final project.'), href: './resume.html' },
  { category: 'project', date: '2026.08', title: I('소비 재판소: 영수증에서 소비 회고까지', 'Sobi Tribunal: from receipt to reflection'), summary: I('5인 팀 해커톤에서 기획과 인프라, 두 버전의 구현을 맡은 프로젝트 기록입니다.', 'A record of product planning, infrastructure, and two implementation versions in a five-person hackathon team.'), href: './portfolio.html#sobi' },
  { category: 'award', date: '2026.06', title: I('SpeakUp · JBNU AI·SW 경진대회 동상', 'SpeakUp · JBNU AI·SW bronze prize'), summary: I('수상 팀명은 StepUP이며, SpeakUp은 출품작입니다. 본인 기여는 코칭 엔진과 리포트·영상 출력 기능입니다.', 'Awarded as team StepUP, with SpeakUp as the project. My work covered the coaching engine and report/video export.'), href: './portfolio.html#speakup' },
  { category: 'award', date: '2026.06', title: I('Vispresso · SW 캡스톤디자인 우수상', 'Vispresso · SW Capstone excellence prize'), summary: I('전주MBC 산학 연계 4인 프로젝트에서 프론트엔드를 담당했습니다.', 'I handled frontend development in a four-person industry project with Jeonju MBC.'), href: './portfolio.html#vispresso' },
  { category: 'open', date: '2026.07', title: I('Thumbstap 공개', 'Thumbstap release'), summary: I('macOS 엄지 제스처 앱 런처를 공개하고 Homebrew 배포 구성을 마련했습니다.', 'Published a macOS thumb-gesture app launcher with Homebrew distribution.'), href: 'https://github.com/1jsjs/thumbstap' },
  { category: 'open', date: '2026.06', title: I('coremltools에 버그 수정 기여', 'Bug fix merged into coremltools'), summary: I('layer_norm beta shape 검증 버그를 수정한 PR #2736이 병합됐습니다.', 'PR #2736 fixing layer_norm beta-shape validation was merged.'), href: 'https://github.com/apple/coremltools/pull/2736' },
  { category: 'award', date: '2026.07', title: I('J-Point 장학생 선발', 'Selected as a J-Point scholarship recipient'), summary: I('전북대학교 SW중심대학사업단의 J-Point 장학생으로 선발됐습니다.', 'Selected for the J-Point scholarship by JBNU’s SW-Centered University program.'), href: './resume.html#awards' }
];

const labels = {
  home: I('소개', 'About'), resume: I('이력서', 'Résumé'), portfolio: I('프로젝트', 'Projects'), notes: I('기록', 'Notes'),
  search: I('검색', 'Search'), theme: I('색상 모드 전환', 'Toggle color mode'), language: I('언어 전환', 'Switch language'),
  viewProjects: I('프로젝트 보기', 'Explore projects'), viewResume: I('이력서 보기', 'View résumé'),
  print: I('인쇄 · PDF로 저장', 'Print · Save as PDF'),
  current: I('진행 중', 'Current'), close: I('닫기', 'Close')
};

const getLang = () => localStorage.getItem('pj-lang') === 'en' ? 'en' : 'ko';
const tr = (item, lang) => typeof item === 'string' ? item : item[lang];
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const a = (href, text, extra = '') => `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} ${extra}>${text}</a>`;
const chip = text => `<span class="chip">${escapeHTML(text)}</span>`;
const projectCard = (item, lang) => `<article class="project" id="${item.id}"><div class="project-top"><div class="meta">${item.year} / ${escapeHTML(tr(item.category,lang))}</div><h3>${escapeHTML(tr(item.title,lang))}</h3></div><div class="project-desc"><p>${escapeHTML(tr(item.description,lang))}</p><dl class="project-facts"><div><dt>${lang==='ko'?'내 역할':'My role'}</dt><dd>${escapeHTML(tr(item.role,lang))}</dd></div><div><dt>${lang==='ko'?'결과 · 현황':'Result · status'}</dt><dd>${escapeHTML(tr(item.outcome,lang))}</dd></div></dl></div><div class="skills">${item.tech.map(chip).join('')}</div>${item.links.length ? `<div class="item-actions">${item.links.map(x => a(x.href,escapeHTML(tr(x.label,lang))+' ↗')).join('')}</div>` : ''}</article>`;
const sectionHead = (title, link, text) => `<div class="section-head"><h2>${title}</h2>${link ? a(link,text) : ''}</div>`;

function shell(page, lang, body) {
  const nav = [ ['home','index.html'], ['resume','resume.html'], ['portfolio','portfolio.html'], ['notes','notes.html'] ];
  return `<div class="app-shell"><a class="skip-link" href="#main-content">${lang==='ko'?'본문으로 건너뛰기':'Skip to content'}</a><div class="mobile-scrim" id="scrim"></div><aside class="sidebar" id="sidebar" aria-label="Profile and navigation"><div><a href="./index.html" style="text-decoration:none" aria-label="Park Jinsu home"><div class="brand-mark">PJ</div></a><p class="brand-overline">@1jsjs / PORTFOLIO</p><h2 class="brand-name">${lang==='ko'?'박진수':'Jinsu Park'}</h2><p class="brand-role">AI Engineering · Product Development</p><nav class="side-nav" aria-label="Main navigation">${nav.map(([key,href])=>a('./'+href,escapeHTML(tr(labels[key],lang)),page===key?'aria-current="page"':'')).join('')}</nav></div><div class="signal-art" aria-hidden="true"><span class="orbit"></span><span class="orbit"></span><span class="orbit"></span><span class="dot one"></span><span class="dot two"></span></div><div class="side-footer"><div class="side-links">${a('https://github.com/1jsjs','GITHUB')}${a('./resume.html','RÉSUMÉ')}</div><small>LOCAL PORTFOLIO · 2026</small></div><button class="cover-hint" id="coverHint" type="button" aria-label="${lang==='ko'?'사이트 내용 보기':'View site content'}"><span class="cover-hint-arrow" aria-hidden="true">←</span><span>${lang==='ko'?'스크롤해 살펴보기':'SCROLL TO EXPLORE'}</span></button></aside><main class="main" id="main-content" tabindex="-1"><div class="topbar"><button class="icon-btn mobile-menu" id="menuBtn" aria-label="${page==='home'?(lang==='ko'?'표지 펼치기':'Open cover'):(lang==='ko'?'메뉴 열기':'Open menu')}" aria-expanded="false">☰</button><div class="breadcrumb">JINSU PARK / <strong>${escapeHTML(tr(labels[page],lang))}</strong></div><div class="top-actions"><button class="icon-btn" id="searchBtn" aria-label="${tr(labels.search,lang)}" title="${tr(labels.search,lang)}">⌕</button><button class="icon-btn" id="themeBtn" aria-label="${tr(labels.theme,lang)}" title="${tr(labels.theme,lang)}">◐</button><button class="text-btn" id="langBtn" aria-label="${tr(labels.language,lang)}" title="${tr(labels.language,lang)}">${lang==='ko'?'EN':'KO'}</button></div></div><div class="content">${body}<footer class="site-footer"><span>© 2026 Jinsu Park</span><span>${lang==='ko'?'확인된 경력 자료를 바탕으로 작성':'Built from verified career records'}</span></footer></div></main><div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-label="${tr(labels.search,lang)}"><div class="search-panel"><div class="search-row"><input id="searchInput" type="search" placeholder="${lang==='ko'?'프로젝트·기술·성과 검색':'Search projects, skills, and outcomes'}" aria-label="${tr(labels.search,lang)}"><button class="icon-btn" id="searchClose" aria-label="${tr(labels.close,lang)}">✕</button></div><div class="search-results" id="searchResults"></div></div></div></div>`;
}

function home(lang) {
  const ko = lang === 'ko';
  return `<header class="page-intro"><div class="page-kicker">PROFILE / 2026</div><h1>${ko?'문제를 제품으로 연결하는<br>AI 엔지니어링':'Turning technical problems<br>into working products'}</h1><p class="lead">${ko?'안녕하세요, 박진수입니다. AI 서비스의 아이디어를 사용 가능한 제품으로 만들고, 프론트엔드와 인프라 사이의 빈틈을 메우는 일을 좋아합니다.':'I’m Jinsu Park. I build AI-powered products and enjoy connecting interface decisions with the systems that make them work.'}</p><div class="intro-actions"><a class="button" href="./portfolio.html">${tr(labels.viewProjects,lang)} <span aria-hidden="true">↗</span></a><a class="button secondary" href="./resume.html">${tr(labels.viewResume,lang)}</a></div><div class="fact-strip"><div class="fact"><strong>${ko?'AI 엔지니어 지향':'AI engineering'}</strong><span>${ko?'진로 방향':'Career direction'}</span></div><div class="fact"><strong>${ko?'제품 · 플랫폼':'Product · Platform'}</strong><span>${ko?'관심 영역':'Focus'}</span></div><div class="fact"><strong>${ko?'전북대학교':'JBNU'}</strong><span>${ko?'컴퓨터인공지능학부':'Computer & AI'}</span></div></div></header><section class="section">${sectionHead(ko?'둘러보기':'Explore',null,'')}<div class="quick-grid"><a class="quick-link" href="./resume.html"><span>01 / RÉSUMÉ</span><strong>${ko?'이력서':'Résumé'}</strong><small>${ko?'역할, 기술, 교육과 성과를 한눈에':'Roles, skills, education, and outcomes'}</small><span class="arrow">↗</span></a><a class="quick-link" href="./portfolio.html"><span>02 / PROJECTS</span><strong>${ko?'프로젝트':'Projects'}</strong><small>${ko?'실제 개발에서 맡은 범위와 결과':'My contribution and each project’s result'}</small><span class="arrow">↗</span></a><a class="quick-link" href="./notes.html"><span>03 / NOTES</span><strong>${ko?'기록':'Notes'}</strong><small>${ko?'프로젝트·수상·오픈소스 기록':'Projects, awards, and open source'}</small><span class="arrow">↗</span></a><a class="quick-link" href="https://github.com/1jsjs" target="_blank" rel="noopener noreferrer"><span>04 / GITHUB</span><strong>GitHub</strong><small>${ko?'공개 코드와 기여 보기':'Public code and contributions'}</small><span class="arrow">↗</span></a></div></section><section class="section">${sectionHead(ko?'대표 작업':'Selected work','./portfolio.html',ko?'전체 프로젝트 보기 ↗':'All projects ↗')}<div class="feature-list">${projectData.slice(0,3).map(p=>`<article class="feature"><div class="meta">${p.year} / ${escapeHTML(tr(p.category,lang))}</div><h3>${escapeHTML(tr(p.title,lang))}</h3><p>${escapeHTML(tr(p.role,lang))}</p>${a('./portfolio.html#'+p.id,ko?'자세히 보기 ↗':'Read more ↗','class="inline"')}</article>`).join('')}</div></section><section class="section">${sectionHead(ko?'최근의 배움':'Recent learning',null,'')}<p class="section-copy">${ko?'2026년 10~11월 SK Pre-SKALA 온라인 부트캠프에서 강의 22개를 듣고, 최종 과제로 제 지원·대회 기록을 근거로 공고를 읽고 참가 여부를 판정하는 에이전트를 만들었습니다. 요즘은 사람이 AI를 믿고 맡기려면 무엇이 필요한지, 보안과 재현성 쪽에서 파고들고 있습니다.':'In Oct–Nov 2026 I took all 22 lectures of SK’s Pre-SKALA online bootcamp and, for the final project, built an agent that reads a call for applications and judges whether I should apply, grounded in my own application and competition records. Lately I’m digging into what people need before they can trust AI with their lives — from the security and reproducibility side.'}</p></section>`;
}

function resume(lang) {
  const ko=lang==='ko';
  return `<header class="page-intro compact"><div class="page-kicker">RÉSUMÉ / JINSU PARK</div><h1>${ko?'이력서':'Résumé'}</h1><p class="lead">${ko?'AI 서비스 개발, 프론트엔드, 배포 인프라를 가로지르며 만든 결과와 실제 맡은 역할을 정리했습니다.':'A concise record of my work across AI products, frontend development, and deployment infrastructure.'}</p><div class="intro-actions"><button class="button secondary print-btn">${tr(labels.print,lang)} ↗</button></div></header><div class="resume-grid"><div><section class="section">${sectionHead(ko?'주요 경험':'Selected experience',null,'')}<div class="timeline"><div class="timeline-item"><time>2026.10 — 11</time><h3>Pre-SKALA (SK)</h3><p>${ko?'AI 온라인 부트캠프 강의 22개 수강, 최종 과제로 공고 참가 판정 에이전트 제출':'Took all 22 lectures of the AI online bootcamp; submitted a call-for-applications judging agent as the final project'}</p></div><div class="timeline-item"><time>2026.10 — 11</time><h3>ReelTime</h3><p>${ko?'iOS 집중 앱 단독 개발, 심사 반려 3번을 고쳐 App Store 출시':'Built an iOS focus app solo; fixed three review rejections and shipped on the App Store'}</p></div><div class="timeline-item"><time>2026.10 — 11</time><h3>Sourcenote</h3><p>${ko?'근거를 다시 판정하는 강의 노트 앱 단독 개발, Meta Global AI Developer Hackathon 제출':'Built a lecture-notes app that re-checks its own citations; submitted to the Meta Global AI Developer Hackathon'}</p></div><div class="timeline-item"><time>2026.08 — 10</time><h3>${ko?'퓨리오사 AI 에이전트 스쿨':'Furiosa AI Agent School'}</h3><p>${ko?'머신러닝·딥러닝 기초, LLM, RAG 과정 수강':'Studied ML and deep learning fundamentals, LLMs, and RAG'}</p></div><div class="timeline-item"><time>2026.08</time><h3>${ko?'소비 재판소 · LLM 해커톤':'Sobi Tribunal · LLM Hackathon'}</h3><p>${ko?'5인 팀에서 기획·인프라·v1 및 v2 전체 개발. 장려상 수상':'Planned the product, set up infrastructure, and built v1/v2 in a five-person team. Honorable mention.'}</p></div><div class="timeline-item"><time>2026.07</time><h3>${ko?'SCPC AI 챌린지':'SCPC AI Challenge'}</h3><p>${ko?'1차 예선 퍼블릭 51위 / 1,842명으로 2차 예선 진출':'Public rank 51 / 1,842 in round one; advanced to round two'}</p></div><div class="timeline-item"><time>2026.03 — 06</time><h3>Vispresso</h3><p>${ko?'전주MBC 산학 연계 4인 팀의 프론트엔드. SW 캡스톤디자인 우수상':'Frontend in a four-person project with Jeonju MBC. SW Capstone excellence prize.'}</p></div><div class="timeline-item"><time>2025.09 — 12</time><h3>KoreanForYou</h3><p>${ko?'4인 팀의 프론트엔드. 이주노동자 직무 온보딩 한국어 학습 플랫폼':'Frontend in a four-person team building Korean learning for job onboarding.'}</p></div></div></section><section class="section">${sectionHead(ko?'프로젝트':'Projects','./portfolio.html',ko?'자세히 보기 ↗':'Details ↗')}${projectData.slice(0,4).map(p=>`<div class="resume-item"><div class="period">${p.year}</div><h3>${escapeHTML(tr(p.title,lang))}</h3><p>${escapeHTML(tr(p.role,lang))}</p></div>`).join('')}</section><section class="section" id="awards">${sectionHead(ko?'수상과 선발':'Awards and selection',null,'')}<div class="resume-item"><h3>${ko?'호남권 SW중심대학 LLM 해커톤 장려상':'Honorable mention · Honam LLM Hackathon'}</h3><p>2026.08 · ${ko?'소비 재판소, 5인 팀':'Sobi Tribunal, five-person team'}</p></div><div class="resume-item"><h3>${ko?'JBNU AI·SW 경진대회 SW부문 동상':'Bronze prize · JBNU AI·SW Competition'}</h3><p>2026.06 · ${ko?'팀 StepUP, 출품작 SpeakUp':'Team StepUP, project SpeakUp'}</p></div><div class="resume-item"><h3>${ko?'SW 캡스톤디자인 경진대회 우수상':'Excellence prize · SW Capstone Competition'}</h3><p>2026.06 · Vispresso, ${ko?'4인 팀':'four-person team'}</p></div><div class="resume-item"><h3>${ko?'J-Point 장학생 선발':'J-Point scholarship'}</h3><p>2026.07 · ${ko?'전북대학교 SW중심대학사업단':'JBNU SW-Centered University program'}</p></div></section></div><div class="resume-side"><section class="section">${sectionHead(ko?'기술':'Skills',null,'')}<div class="skills">${['Python','FastAPI','React','Next.js','TypeScript','Swift','SwiftUI','Electron','AWS EC2','Amazon Bedrock','SQLite','PostgreSQL','STT','LLM','RAG'].map(chip).join('')}</div></section><section class="section">${sectionHead(ko?'오픈소스':'Open source',null,'')}${contributionData.map(c=>`<div class="resume-item"><div class="period">${c.date} / MERGED</div><h3>${a(c.href,escapeHTML(c.title)+' ↗')}</h3><p>${escapeHTML(tr(c.detail,lang))}</p></div>`).join('')}</section><section class="section">${sectionHead(ko?'학력':'Education',null,'')}<div class="resume-item"><h3>${ko?'전북대학교':'Jeonbuk National University'}</h3><p>${ko?'IT정보공학과 (현 컴퓨터인공지능학부) · 2021.03 입학':'IT Information Engineering (now Computer & AI) · Entered March 2021'}</p></div></section><section class="section">${sectionHead(ko?'어학':'Language',null,'')}<div class="resume-item"><h3>TOEIC Speaking IM1</h3><p>2026.02</p></div></section></div></div>`;
}

function portfolio(lang) {
  const ko=lang==='ko';
  return `<header class="page-intro compact"><div class="page-kicker">PORTFOLIO / SELECTED WORK</div><h1>${ko?'프로젝트':'Projects'}</h1><p class="lead">${ko?'팀의 결과와 제가 직접 맡은 역할을 구분해 기록했습니다. 제품 기획부터 화면, API, 배포까지 이어진 작업을 볼 수 있습니다.':'Each project separates the team outcome from my own contribution, from planning and interfaces to APIs and deployment.'}</p><div class="intro-actions"><button class="button secondary print-btn">${tr(labels.print,lang)} ↗</button></div></header><section class="section">${sectionHead(ko?'선별한 작업':'Selected work',null,'')}<div class="project-stack">${projectData.map(p=>projectCard(p,lang)).join('')}</div></section><section class="section">${sectionHead(ko?'오픈소스 기여':'Open-source contributions',null,'')}<div class="feature-list">${contributionData.map(c=>`<article class="feature"><div class="meta">${c.date} / MERGED</div><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(tr(c.detail,lang))}</p>${a(c.href,ko?'PR 보기 ↗':'View PR ↗','class="inline"')}</article>`).join('')}</div></section>`;
}

function notes(lang) {
  const ko=lang==='ko';
  return `<header class="page-intro compact"><div class="page-kicker">NOTES / MILESTONES</div><h1>${ko?'기록':'Notes'}</h1><p class="lead">${ko?'프로젝트, 수상, 오픈소스의 주요 기록을 모았습니다. 각 항목은 관련 프로젝트 또는 공개 코드로 이어집니다.':'A directory of project milestones, awards, and open-source work, linked to the related project or public code.'}</p></header><div class="note-toolbar" role="group" aria-label="${ko?'기록 필터':'Note filters'}"><button class="filter active" data-filter="all">${ko?'전체':'All'}</button><button class="filter" data-filter="project">${ko?'프로젝트':'Projects'}</button><button class="filter" data-filter="award">${ko?'성과':'Awards'}</button><button class="filter" data-filter="open">${ko?'오픈소스':'Open source'}</button></div><div class="entries">${notesData.map(n=>`<article class="entry" data-category="${n.category}"><div><div class="category">${n.category.toUpperCase()}</div><div class="meta">${n.date}</div></div><div><h3>${escapeHTML(tr(n.title,lang))}</h3><p>${escapeHTML(tr(n.summary,lang))}</p>${a(n.href,ko?'관련 내용 보기 ↗':'Explore ↗','class="more"')}</div></article>`).join('')}</div><p class="empty" id="notesEmpty" hidden>${ko?'해당 기록이 없습니다.':'No records in this category.'}</p>`;
}

let coverState = null;
function setCover(open) {
  if (document.body.dataset.page !== 'home') return;
  coverState = open;
  document.body.classList.toggle('cover-open', open);
  document.querySelector('main').inert = open;
  document.getElementById('menuBtn')?.setAttribute('aria-expanded', String(open));
}
const closeCover = () => setCover(false);
const openCover = () => setCover(true);

function bindCoverDrag(sidebar) {
  let gesture = null;
  sidebar.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('a, button, input, nav, .side-links')) return;
    gesture = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      width: sidebar.getBoundingClientRect().width,
      open: document.body.classList.contains('cover-open'),
      dragging: false
    };
  });
  sidebar.addEventListener('pointermove', e => {
    if (!gesture || e.pointerId !== gesture.id) return;
    const dx = e.clientX - gesture.x;
    const dy = e.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      gesture.dragging = true;
      sidebar.setPointerCapture(e.pointerId);
      sidebar.classList.add('is-dragging');
      document.body.classList.add('cover-dragging');
    }
    if (e.cancelable) e.preventDefault();
    const rail = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rail')) || 0;
    const minWidth = Math.max(rail, 1);
    sidebar.style.width = `${Math.max(minWidth, Math.min(window.innerWidth, gesture.width + dx))}px`;
  });
  const finish = e => {
    if (!gesture || e.pointerId !== gesture.id) return;
    const {dragging, open, width} = gesture;
    gesture = null;
    if (!dragging) return;
    const moved = sidebar.getBoundingClientRect().width - width;
    sidebar.classList.remove('is-dragging');
    document.body.classList.remove('cover-dragging');
    setCover(open ? moved > -70 : moved > 70);
    sidebar.style.width = '';
  };
  sidebar.addEventListener('pointerup', finish);
  sidebar.addEventListener('pointercancel', finish);
}

function bind(lang) {
  const sidebar=document.getElementById('sidebar'), scrim=document.getElementById('scrim'), menu=document.getElementById('menuBtn');
  const contactLauncher=document.getElementById('contactLauncher');
  if (CHANNEL_TALK_PLUGIN_KEY) contactLauncher.addEventListener('click',event=>{
    event.preventDefault();
    contactLauncher.setAttribute('aria-busy','true');
    showChannelTalk().catch(()=>{window.location.href=contactLauncher.href}).finally(()=>contactLauncher.removeAttribute('aria-busy'));
  });
  document.getElementById('coverHint').addEventListener('click',closeCover);
  document.querySelector('.skip-link').addEventListener('click', () => { closeCover(); document.getElementById('main-content').focus(); });
  if (document.body.dataset.page === 'home') bindCoverDrag(sidebar);
  const closeMenu=()=>{sidebar.classList.remove('open');scrim.classList.remove('open');menu.setAttribute('aria-expanded','false')};
  menu.addEventListener('click',()=>{if(document.body.dataset.page==='home'){openCover();return}let open=!sidebar.classList.contains('open');sidebar.classList.toggle('open',open);scrim.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});
  scrim.addEventListener('click',closeMenu);
  document.getElementById('themeBtn').addEventListener('click',()=>{let dark=!document.body.classList.contains('dark');document.body.classList.toggle('dark',dark);localStorage.setItem('pj-theme',dark?'dark':'light')});
  document.getElementById('langBtn').addEventListener('click',()=>{localStorage.setItem('pj-lang',lang==='ko'?'en':'ko');render()});
  document.querySelectorAll('.print-btn').forEach(btn=>btn.addEventListener('click',()=>window.print()));
  const overlay=document.getElementById('searchOverlay'), input=document.getElementById('searchInput'), results=document.getElementById('searchResults');
  const searchItems=[
    ...projectData.map(p=>({title:tr(p.title,lang),description:tr(p.description,lang),href:'./portfolio.html#'+p.id})),
    ...notesData.map(n=>({title:tr(n.title,lang),description:tr(n.summary,lang),href:n.href})),
    ...contributionData.map(c=>({title:c.title,description:tr(c.detail,lang),href:c.href}))
  ];
  const updateResults=()=>{let q=input.value.trim().toLocaleLowerCase();let hits=(q?searchItems.filter(x=>(x.title+' '+x.description).toLocaleLowerCase().includes(q)):searchItems.slice(0,6)).slice(0,12);results.innerHTML=hits.length?hits.map(x=>`<a class="search-result" href="${x.href}" ${x.href.startsWith('http')?'target="_blank" rel="noopener noreferrer"':''}><strong>${escapeHTML(x.title)}</strong><small>${escapeHTML(x.description)}</small></a>`).join(''):`<div class="empty">${lang==='ko'?'검색 결과가 없습니다.':'No results found.'}</div>`};
  const closeSearch=()=>{overlay.classList.remove('open');document.body.style.overflow='';document.getElementById('searchBtn').focus()};
  document.getElementById('searchBtn').addEventListener('click',()=>{overlay.classList.add('open');document.body.style.overflow='hidden';input.value='';updateResults();input.focus()});
  document.getElementById('searchClose').addEventListener('click',closeSearch);
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});
  input.addEventListener('input',updateResults);
  document.onkeydown=e=>{if(document.body.classList.contains('cover-open')&&['ArrowDown','PageDown',' ','Escape'].includes(e.key)){e.preventDefault();closeCover();return}if(e.key==='Escape'&&overlay.classList.contains('open'))closeSearch();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('searchBtn').click()}};
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{let category=btn.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn));let visible=0;document.querySelectorAll('.entry').forEach(entry=>{let show=category==='all'||entry.dataset.category===category;entry.hidden=!show;if(show)visible++});let empty=document.getElementById('notesEmpty');if(empty)empty.hidden=visible>0}));
}

function render() {
  const lang=getLang(), page=document.body.dataset.page||'home';
  document.documentElement.lang=lang;
  document.body.classList.toggle('dark',localStorage.getItem('pj-theme')==='dark');
  document.getElementById('app').innerHTML=shell(page,lang,({home,resume,portfolio,notes}[page]||home)(lang));
  const launcher=document.createElement('a');
  launcher.id='contactLauncher';
  launcher.className='contact-launcher';
  launcher.href=`mailto:${CONTACT_EMAIL}`;
  launcher.textContent='PJ';
  launcher.setAttribute('aria-label',CHANNEL_TALK_PLUGIN_KEY?(lang==='ko'?'채팅으로 문의하기':'Open chat'):(lang==='ko'?'이메일로 문의하기':'Contact by email'));
  launcher.title=launcher.getAttribute('aria-label');
  document.getElementById('app').append(launcher);
  const coverActive=page==='home'&&(coverState ?? true);
  document.body.classList.toggle('cover-open',coverActive);
  document.querySelector('main').inert=coverActive;
  document.title=`${tr(labels[page]||labels.home,lang)} · ${lang==='ko'?'박진수':'Jinsu Park'}`;
  bind(lang);
  if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
}
window.addEventListener('wheel',e=>{if(e.deltaY>12)closeCover()},{passive:true});
let coverTouchY=0;
window.addEventListener('touchstart',e=>{coverTouchY=e.touches[0]?.clientY||0},{passive:true});
window.addEventListener('touchend',e=>{if(coverTouchY-(e.changedTouches[0]?.clientY||0)>35)closeCover()},{passive:true});
render();
