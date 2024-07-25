const express = require('express');
const path = require('path');
const app = express();
const { connectToDatabase } = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const port = 3000;

// for ajax
app.use(express.json());
var cors = require('cors');
app.use(cors());

// 미들웨어 설정
app.use(express.json());

// 데이터베이스 연결
connectToDatabase().catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1); // 연결 실패 시 서버 종료
});

// 라우터 설정
app.use('/todos', todoRoutes);

// 서버 시작
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

//////////////////////////////////////////////////////////
// 프론트 관련 설정
app.use(express.static(path.join(__dirname, 'react_build')));

app.get('/', function(요청, 응답) {
    응답.sendFile(path.join(__dirname, './react_build/index.html'))
});

// 아래 코드는 가장 하단에 있어야 함.
// 모든 경로를 허용
app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
