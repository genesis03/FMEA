# FMEA 분석 도구

AIAG 표준에 따른 고장모드 및 영향분석(FMEA) 웹 애플리케이션입니다.

## 🎯 주요 기능

- ✅ **AIAG 표준 준수**: AIAG-VDA FMEA Handbook에 따른 표준 양식
- ✅ **실시간 RPN 계산**: 심각도 × 발생도 × 검출도 자동 계산
- ✅ **동적 테이블**: 행 추가/삭제 및 실시간 편집
- ✅ **완성된 헤더**: 회사정보, 제품정보, 승인자 등 모든 필수 필드
- ✅ **평가 가이드**: 심각도, 발생도, 검출도 평가 기준 제공
- ✅ **반응형 디자인**: 데스크톱 및 모바일 지원
- ✅ **한국어 인터페이스**: 완전한 한국어 지원

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📊 FMEA 평가 기준

### 심각도 (Severity)
- **위험 (9-10)**: 안전성에 영향을 주거나 규정 위반
- **높음 (7-8)**: 고객 불만족, 기능 완전 상실
- **보통 (4-6)**: 성능 저하, 고객 인지 가능
- **낮음 (1-3)**: 경미한 영향, 고객이 거의 인지하지 못함

### 발생도 (Occurrence)
- **매우 높음 (9-10)**: 1/20 ~ 1/2 (거의 확실)
- **높음 (7-8)**: 1/80 ~ 1/20 (높은 확률)
- **보통 (4-6)**: 1/400 ~ 1/80 (보통 확률)
- **낮음 (1-3)**: 1/1,500,000 ~ 1/400 (낮은 확률)

### 검출도 (Detection)
- **검출 불가 (9-10)**: 검출 방법이 없거나 매우 어려움
- **검출 어려움 (7-8)**: 낮은 검출 확률
- **보통 검출 (4-6)**: 중간 정도의 검출 확률
- **높은 검출 (1-3)**: 높은 검출 확률, 자동 검출

### RPN 해석
- **RPN ≥ 200**: 즉시 조치 필요 (우선순위 높음)
- **100 ≤ RPN < 200**: 단기 조치 필요 (우선순위 중간)
- **50 ≤ RPN < 100**: 장기 조치 고려 (우선순위 낮음)
- **RPN < 50**: 모니터링 (조치 불필요)

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ui/              # ShadCN UI 컴포넌트들
│   ├── FMEAHeader.tsx   # FMEA 헤더 정보
│   ├── FMEAForm.tsx     # FMEA 분석표
│   └── FMEAGuide.tsx    # 평가 기준 가이드
├── lib/
│   └── utils.ts         # 유틸리티 함수
├── App.tsx              # 메인 앱 컴포넌트
├── main.tsx             # 앱 엔트리 포인트
└── index.css            # 글로벌 스타일
```

## 🌐 배포

자세한 배포 방법은 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)를 참조하세요.

### Vercel (추천)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/fmea-analysis-tool)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/fmea-analysis-tool)

## 📝 사용법

1. **헤더 정보 입력**: 회사명, 제품명, 팀 정보 등을 입력합니다.
2. **FMEA 분석**: 항목별로 고장모드, 영향, 원인을 분석합니다.
3. **평가 점수 입력**: 심각도, 발생도, 검출도를 1-10점으로 평가합니다.
4. **RPN 확인**: 자동 계산된 RPN을 통해 우선순위를 파악합니다.
5. **조치 계획**: 권장조치와 책임자, 목표일을 설정합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙋‍♂️ 지원

문제가 발생하거나 제안사항이 있으시면 이슈를 생성해주세요.

---

**Made with ❤️ for Quality Engineers**