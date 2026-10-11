# 박진수 포트폴리오 사이트

박진수의 경력과 프로젝트를 소개하는 정적 포트폴리오 사이트입니다.

**공개 사이트:** https://parkjinsu.com/

`main` 브랜치에 변경 사항을 올리면 GitHub Actions가 정적 사이트를 `dist/`에 빌드하고 GitHub Pages에 배포합니다. Vercel은 이 저장소의 배포 경로에 포함되지 않습니다.

## 실행

```sh
cd '/Users/parkjinsu/2026/4th Quarter101112/11 개인 프로젝트/portfolio-site'
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173/`을 엽니다. 별도 설치나 빌드가 필요 없습니다.

## 배포용 빌드

```sh
npm run build
```

`scripts/build.mjs`가 HTML·CSS·JavaScript·이미지·폰트를 `dist/`에 복사합니다. GitHub Actions는 JavaScript 구문을 검사하고 이 명령을 실행한 뒤 `dist/`를 Pages에 배포합니다.

## 구성

- `index.html`: 소개와 대표 프로젝트
- `resume.html`: 역할, 교육, 기술, 수상 및 오픈소스 기여
- `portfolio.html`: 프로젝트별 본인 역할과 팀 성과
- `notes.html`: 프로젝트·수상·오픈소스 기록과 필터
- `site.js`: 콘텐츠, 한국어/영어 전환, 검색, 다크 모드, 필터
- `style.css`: 반응형 레이아웃 및 인쇄용 스타일
- `assets/hero-platform.jpg`: 시작 화면 배경
- `assets/fonts/`: 직접 제공하는 SUIT Variable·Pretendard Variable 웹폰트와 각 라이선스

검색은 화면의 검색 버튼 또는 `⌘K` / `Ctrl+K`로 엽니다. 이력서와 프로젝트 페이지의 **인쇄 · PDF로 저장** 버튼은 브라우저 인쇄 기능을 사용합니다.

## 문의 버튼

오른쪽 아래 `PJ` 버튼은 모든 페이지에서 같은 위치에 표시됩니다. 채널톡 웹 플러그인 키가 없는 동안에는 기존 공개 문의 주소인 `jinsu.build@gmail.com`으로 이메일 작성을 엽니다.

채널톡을 연결하려면 `site.js`의 `CHANNEL_TALK_PLUGIN_KEY`에 **본인 채널**의 웹 플러그인 키를 입력하세요. 이후 `PJ` 버튼을 누를 때 채널톡 스크립트를 불러와 채팅 창을 열고, 채널톡의 기본 버튼은 숨깁니다. 환영 문구, 자동 안내, 이메일 수집 양식은 채널톡 관리 화면에서 설정합니다.

소개 페이지를 열면 전체 화면 프로필이 나타납니다. 사진 여백을 왼쪽으로 끌거나 아래로 스크롤하면 왼쪽 사이드바로 접히고 본문이 드러납니다. 접힌 사진을 오른쪽으로 끌거나 본문 상단의 `☰` 버튼을 누르면 다시 펼쳐집니다. 드래그 중에는 사진 영역이 포인터 이동을 따라갑니다. 표지의 오른쪽 안내를 눌러 접을 수도 있습니다. 키보드의 `↓`·`Page Down`·`Space`·`Esc`로 접을 수 있고, 모바일에서는 표지를 왼쪽으로 스와이프하거나 상단 메뉴로 다시 열 수 있습니다.

## 글꼴

본문과 UI는 Pretendard Variable을 사용합니다. 한글 제목에는 SUIT Variable Bold를 사용하며, 제목에 섞인 영문·숫자는 Pretendard로 표시되도록 글리프 범위를 지정했습니다. 폰트 파일은 각각 SUIT v2.0.5와 Pretendard v1.3.9의 공식 배포본을 수정 없이 저장했으며, 두 서체의 SIL Open Font License는 `assets/fonts/`에 함께 있습니다. 외부 폰트 CDN 연결 없이 로컬에서도 표시됩니다.

## 콘텐츠 출처

프로젝트·역할·수상은 사용자의 경력 기록을 대조해 작성했습니다. 공개 내용을 수정할 때는 팀 성과와 개인 기여를 구분해 주세요.
