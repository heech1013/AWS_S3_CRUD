const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
const s3 = new AWS.S3();
var params = {
  Bucket: "human-of-psyche" // 어떤 bucket의 list를 가져올 것인가
  //MaxKeys: 2
 };
 s3.listObjects(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
});

// data: 파일 각각의 정보 리스트(data.Contents), bucket의 정보 등이 들어있다.
/* (파일 이름만 가져오기)
for(let name in data.Contents){
    console.log(data.Contents[name].Key);
};
*/