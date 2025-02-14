const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

// Instead of Database
const name = 'seonhwa';
const courses = [
    {
        name: 'HTML',
    },
    {
        name: 'CSS',
    },
    {
        name: 'JS',
    },
];

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(url);
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        // ejs로 변환한 Html 파일을 받아옴
        ejs.renderFile('./template/index.ejs', { name }) //
            .then((data) => res.end(data));
    } else if (url === '/courses') {
        ejs.renderFile('./template/courses.ejs', { courses }) //
            .then((data) => res.end(data));
    } else {
        ejs.renderFile('./template/not-found.ejs', { name }) //
            .then((data) => res.end(data));
    }
    // res.end();
});

server.listen(8080); // port

console.log(' ');
