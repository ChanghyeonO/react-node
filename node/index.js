//npm init -y
//npm i express --save

//서버 구동할 때는 터미널에서 node index.js
//해당 서버 파일에 변경점이 생길 때마다 일일이 기존 웹 서버를 끊어주고 node index.js 매번 실행하는 번거로움

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const { Post } = require('./model/postSchema.js')

//express에서 리액트 안쪽 build폴더까지 경로를 stactic으로 지정한다.
app.use(express.static(path.join(__dirname, '../react/build')))

//클라이언트에서 보내는 데이터를 받도록 설정(body-parsor)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    mongoose.connect('mongodb+srv://Cola:Jisu5897@cluster0.2knbyz0.mongodb.net/?retryWrites=true&w=majority')
        //접속 성공시
        .then(() => console.log(`Server app listening on port ${port} with MongoDB`))
        //접속 실패시
        .catch(err => console.log(err));
})

app.get('/', (req, res) => {
    //서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build 안쪽의 index.html을 화면에 내보낸다.
    res.sendFile(path.join(__dirname, '../react/build/index.html'));
})

//어떤 url에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../react/build/index.html'));
})

//리액트로부터 받은 요청 처리
app.post('/api/create', (req, res) => {
    console.log(req.body);
    const PostModel = new Post({
        titie: req.body.title,
        content: req.body.content
    })

    PostModel.save()
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ success: false })
        })
})
