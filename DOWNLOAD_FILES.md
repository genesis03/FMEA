# 📁 FMEA 분석 도구 - 다운로드 파일 목록

웹에 배포하기 위해 다음 파일들을 다운받아 새 프로젝트 폴더에 넣어주세요.

## 🔧 설정 파일들 (프로젝트 루트)
```
package.json
vite.config.ts
tsconfig.json
tsconfig.node.json
tailwind.config.js
postcss.config.js
index.html
```

## 📄 문서 파일들
```
README.md
DEPLOYMENT_GUIDE.md
```

## 💻 소스 코드 파일들

### src 폴더
```
src/
├── main.tsx
├── App.tsx
├── index.css
├── lib/
│   └── utils.ts
└── components/
    ├── FMEAHeader.tsx
    ├── FMEAForm.tsx
    ├── FMEAGuide.tsx
    └── ui/ (전체 폴더)
```

### components/ui 폴더 전체 (src/components/ui로 복사)
현재 `/components/ui/` 폴더의 모든 파일들을 `src/components/ui/`로 복사해주세요:

```
src/components/ui/
├── accordion.tsx
├── alert-dialog.tsx
├── alert.tsx
├── aspect-ratio.tsx
├── avatar.tsx
├── badge.tsx
├── breadcrumb.tsx
├── button.tsx
├── calendar.tsx
├── card.tsx
├── carousel.tsx
├── chart.tsx
├── checkbox.tsx
├── collapsible.tsx
├── command.tsx
├── context-menu.tsx
├── dialog.tsx
├── drawer.tsx
├── dropdown-menu.tsx
├── form.tsx
├── hover-card.tsx
├── input-otp.tsx
├── input.tsx
├── label.tsx
├── menubar.tsx
├── navigation-menu.tsx
├── pagination.tsx
├── popover.tsx
├── progress.tsx
├── radio-group.tsx
├── resizable.tsx
├── scroll-area.tsx
├── select.tsx
├── separator.tsx
├── sheet.tsx
├── sidebar.tsx
├── skeleton.tsx
├── slider.tsx
├── sonner.tsx
├── switch.tsx
├── table.tsx
├── tabs.tsx
├── textarea.tsx
├── toggle-group.tsx
├── toggle.tsx
├── tooltip.tsx
├── use-mobile.ts
└── utils.ts
```

## 🚀 배포 단계별 가이드

### 1단계: 프로젝트 폴더 생성
```bash
mkdir fmea-analysis-tool
cd fmea-analysis-tool
```

### 2단계: 파일 다운로드 및 배치
위 목록의 모든 파일을 정확한 경로에 배치해주세요.

### 3단계: 의존성 설치
```bash
npm install
```

### 4단계: 로컬 실행 확인
```bash
npm run dev
```

### 5단계: 프로덕션 빌드
```bash
npm run build
```

### 6단계: 웹 배포
- **Vercel**: GitHub에 업로드 후 Vercel 연결
- **Netlify**: `dist` 폴더를 Netlify에 드래그 앤 드롭
- **기타 호스팅**: `dist` 폴더 내용을 서버에 업로드

## ⚠️ 중요 사항

1. **파일 구조 확인**: 모든 파일이 정확한 경로에 있는지 확인
2. **UI 컴포넌트**: `components/ui` 폴더의 모든 파일이 `src/components/ui`에 있어야 함
3. **Import 경로**: src 구조에 맞게 상대 경로로 import됨
4. **tailwindcss-animate**: package.json에 포함되어 있으니 별도 설치 불필요

## 🔍 문제 해결

빌드 오류 발생 시:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

타입 오류 확인:
```bash
npx tsc --noEmit
```

## 📞 지원

문제가 발생하면 DEPLOYMENT_GUIDE.md 파일을 참고하거나, 에러 메시지와 함께 문의해주세요.

---

**배포 성공을 위한 체크리스트:**
- [ ] 모든 파일이 올바른 경로에 배치됨
- [ ] `npm install` 실행 완료
- [ ] `npm run dev`로 로컬 실행 확인
- [ ] `npm run build` 성공
- [ ] 배포 플랫폼에 업로드