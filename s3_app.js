const express = require('express');
const AWS = require('aws-sdk');
const formidable = require('formidable');

const app = express();

app.get('/s3', (req, res)=>{
    res.send('hello s3 heech');
});

app.get('/form', (req, res)=>{
    let output = `
<html>
<body>
    <form enctype='multipart/form-data' method='post' action='upload_receiver'>
        <input type='file' name='userfile'>
        <input type='submit'>
    </form>
</body>
</html>
    `;
    res.send(output);
});

app.post('/upload_receiver', (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (Error, fields, files)=>{
        const s3 = new AWS.S3();  // 파일을 S3로 업로드하기 위해 추가
        
        let params = {
            Bucket: 'human-of-psyche',
            Key: files.userfile.name, // S3에 어떤 이름으로 파일이 저장될 것인가? / files(사용자가 업로드한 파일의 정보).userfile(<form>의 input type의 name)
            ACL: 'public-read',
            Body: require('fs').createReadStream(files.userfile.path)  // form.parse를 통해 파일을 읽어 임시경로(path)에 저장된 상태. 다시 S3에 저장하기 위해 임시경로의 파일을 stream으로 읽는다.
        };

        s3.upload(params, (err, data)=>{  // 어떤 데이터를 업로드했는지 정보를 보기 위해서는 putObject보단 upload
            let result = ``;
            if(err) result = 'Fail';
            else result = `<img src=${data.Location}>`;
            res.send(`<html><body>${result}</body></html>`);
        });
        
    });
/*
    form.parse의 files의 path: 클라이언트가 업로드한 파일을 바로 최종 목적지로 보낼 경우 보안상 위험요소가 있기 때문에
    임시 path에 저장됨(tmp 등에). 그 경로를 담은 프로퍼티가 path.
*/
});

app.listen(80, ()=>{
        console.log('connected: port 80');
});
