<img src="https://capsule-render.vercel.app/api?type=transparent&height=200&color=dddddd&text=Todo&fontSize=120&animation=fadeIn" />

## 환경

- 프론트 : <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
- 백엔드 : <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
<br/>

## 목표

- CRUD 기능 구현
- 재접속 시에도 데이터가 남아있도록 LocalStorage와 Node.js+Express 두 방식으로 각각 적용하기
- 메인 페이지와 Help 페이지를 라우팅(Reduct)
- PWA로 모바일에서도 예쁘게 보이게 만들어보기

<br/>

## 목업
![mockup](readme_image/Todo-2.png)

<br/>

## 개발

### 구현 기능 세부 사항

- 항목 추가
- 항목 상태 변경 (완료 / 미완료)
- Todo, Help 페이지 라우팅
- 리스트 필터링
- 항목 제거
- 완료 구역 나누기
- 항목 내용 수정 구현(모달)
- 선택한 탭 활성화 처리

<br/>

## 빌드 방법
해당 repo에는 빌드 결과물을 포함하고 있지 않습니다.
해당 프로젝트의 결과물을 확인하려면 아래의 절차를 따라주세요.

 - /frontend 경로에서 빌드를 수행 : `npm run build`
 - /backend 경로에서 관련 모듈 설치 : `npm install`
 - /backend 경로에서 서버 작동을 시작 :  `node server.js`