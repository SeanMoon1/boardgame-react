# 🎲 보드게임 모음

React와 TypeScript로 만든 다양한 주사위 게임 모음 사이트입니다.

## 🎮 게임 목록

1. **배낭여행 놀이** - 주사위를 굴려 세계 여행을 떠나는 보드게임
2. **소개하기 게임** - 주사위를 굴려 친구들에게 자신을 소개하는 게임
3. **단답형 게임** - 주사위를 굴려 -아요/어요 형태의 단어를 말하는 게임
4. **문장 만들기** - 두 개의 주사위를 굴려 문장을 만드는 게임
5. **주사위 굴리기** - 간단한 3D 주사위를 굴리는 게임

## 🚀 기술 스택

- **Frontend**: React 19, TypeScript
- **Styling**: CSS3, CSS Grid, Flexbox
- **Routing**: React Router DOM
- **Deployment**: Firebase Hosting
- **Build Tool**: Create React App

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 Firebase 설정을 추가하세요:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. 개발 서버 실행

```bash
npm start
```

### 4. 프로덕션 빌드

```bash
npm run build
```

## 🔥 Firebase 배포

### 1. Firebase CLI 설치

```bash
npm install -g firebase-tools
```

### 2. Firebase 로그인

```bash
firebase login
```

### 3. Firebase 프로젝트 초기화

```bash
firebase init hosting
```

### 4. 배포

```bash
npm run deploy
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Dice3D.tsx      # 3D 주사위 컴포넌트
│   └── GameBoard.tsx   # 게임 보드 컴포넌트
├── hooks/              # 커스텀 훅
│   ├── useDiceGame.ts  # 주사위 게임 로직
│   └── useTravelGame.ts # 여행 게임 로직
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.tsx    # 홈페이지
│   ├── TravelGame.tsx  # 배낭여행 게임
│   ├── IntroductionGame.tsx # 소개하기 게임
│   ├── ShortAnswerGame.tsx # 단답형 게임
│   ├── SentenceGame.tsx # 문장 만들기 게임
│   └── DiceOnlyGame.tsx # 주사위 게임
├── types/              # TypeScript 타입 정의
│   └── game.ts         # 게임 관련 타입
├── firebase/           # Firebase 설정
│   └── config.ts       # Firebase 설정 파일
└── App.tsx             # 메인 앱 컴포넌트
```

## 🎯 주요 기능

- **3D 주사위**: 실제 주사위처럼 굴러가는 3D 애니메이션
- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- **다양한 게임**: 5가지 다른 주사위 게임 제공
- **TypeScript**: 타입 안전성을 위한 TypeScript 사용
- **모듈화**: 재사용 가능한 컴포넌트와 훅으로 구성

## 🎨 디자인 특징

- **모던한 UI**: 깔끔하고 직관적인 사용자 인터페이스
- **애니메이션**: 부드러운 3D 주사위 회전 애니메이션
- **색상 구분**: 각 주사위 눈마다 다른 색상으로 구분
- **반응형**: 다양한 화면 크기에 최적화

## 📱 지원 브라우저

- Chrome (권장)
- Firefox
- Safari
- Edge

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👨‍💻 개발자

문승연 - [GitHub](https://github.com/SeanMoon1)
