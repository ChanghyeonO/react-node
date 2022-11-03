//npm init -y
//npm i express --save

//서버 구동할 때는 터미널에서 node index.js
//해당 서버 파일에 변경점이 생길 때마다 일일이 기존 웹 서버를 끊어주고 node index.js 매번 실행하는 번거로움

const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Sever app lisening on port ${port}`);
})