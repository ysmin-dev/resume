# 민연식 이력서

Next.js로 만든 개인 이력서 웹페이지입니다. 모든 이력서 내용은 코드로 관리되며, 브라우저에서 바로 PDF로 저장할 수 있습니다.

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS 4

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
  app/
    page.tsx        # 이력서 페이지 레이아웃 및 렌더링
    layout.tsx       # 공통 레이아웃, 메타데이터
    globals.css      # 전역 스타일
  components/
    PrintButton.tsx  # 우측 하단 PDF 저장 버튼
  data/
    resume.ts        # 이력서 실제 내용 (프로필, 경력, 프로젝트, 학력, 자격증)
public/
  profile.jpg        # 프로필 사진
```

## 이력서 내용 수정

이력서에 표시되는 모든 텍스트(자기소개, 경력, 프로젝트, 학력, 자격증 등)는 [src/data/resume.ts](src/data/resume.ts) 한 파일에서 관리합니다. 화면 레이아웃을 건드릴 필요 없이 이 파일의 데이터만 수정하면 됩니다.

`summary`(자기소개) 텍스트에서 `**강조할 문구**`처럼 별표 두 개로 감싸면 화면에서 굵게 표시됩니다.

## PDF로 저장

우측 하단의 "PDF로 저장" 버튼을 누르면 브라우저 인쇄 다이얼로그가 열리며, 인쇄 시 버튼과 불필요한 여백은 자동으로 숨겨집니다.

## 커밋 컨벤션

커밋 메시지 규칙은 [.claude/commit-convention.md](.claude/commit-convention.md)를 따릅니다.
