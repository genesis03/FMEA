# FMEA 분석 도구 배포 가이드

이 문서는 AIAG 표준 FMEA 분석 도구를 웹에 배포하는 방법을 설명합니다.

## 📋 사전 요구사항

- Node.js (버전 18 이상)
- npm 또는 yarn 패키지 매니저

## 🚀 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 🌐 웹 배포 방법

### 방법 1: Vercel 배포 (추천)

1. [Vercel](https://vercel.com)에 계정 생성
2. GitHub에 프로젝트 업로드
3. Vercel에서 "New Project" 클릭
4. GitHub 저장소 연결
5. 자동으로 배포 완료

### 방법 2: Netlify 배포

1. [Netlify](https://netlify.com)에 계정 생성
2. 프로젝트 빌드:
   ```bash
   npm run build
   ```
3. `dist` 폴더를 Netlify에 드래그 앤 드롭

### 방법 3: GitHub Pages 배포

1. `vite.config.ts` 파일에서 base 경로 설정:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... 나머지 설정
   })
   ```

2. GitHub Actions 워크플로우 파일 생성 (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## 📁 파일 구조

```
fmea-analysis-tool/
├── src/
│   ├── components/
│   │   ├── ui/           # ShadCN UI 컴포넌트들
│   │   ├── FMEAHeader.tsx
│   │   ├── FMEAForm.tsx
│   │   └── FMEAGuide.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 환경 변수 설정

현재 이 애플리케이션은 환경 변수가 필요하지 않습니다. 모든 기능이 클라이언트 사이드에서 동작합니다.

## 📱 주요 기능

- ✅ AIAG 표준 FMEA 양식
- ✅ 실시간 RPN 계산
- ✅ 행 추가/삭제 기능
- ✅ 반응형 디자인
- ✅ 다크 모드 지원
- ✅ 한국어 인터페이스

## 🛠 커스터마이징

### 스타일 변경
- `src/index.css`에서 CSS 변수 수정
- `tailwind.config.js`에서 Tailwind 설정 변경

### 기능 추가
- 새로운 컴포넌트는 `src/components/` 폴더에 추가
- 유틸리티 함수는 `src/lib/` 폴더에 추가

## 🐛 문제 해결

### 빌드 오류 발생 시
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript 오류 발생 시
```bash
npx tsc --noEmit
```

## 📞 지원

문제가 발생하거나 추가 기능이 필요한 경우, 프로젝트 이슈 페이지에 문의해주세요.

---

**참고**: 이 애플리케이션은 클라이언트 사이드에서만 동작하며, 데이터는 브라우저 세션에만 저장됩니다. 영구 저장이 필요한 경우 백엔드 서버 연동을 고려해주세요.