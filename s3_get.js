const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
const s3 = new AWS.S3();

var params = {Bucket: 'human-of-psyche', Key: 'test_5959.jpg'}; // s3에 있는 버킷과 파일의 이름
var file = require('fs').createWriteStream('writest_5959.jpg');  // 저장할 파일의 원하는 이름
s3.getObject(params).createReadStream().pipe(file);