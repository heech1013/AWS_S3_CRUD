const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.region = 'ap-northeast-2';  // EC2 지역 설정

const s3 = new AWS.S3();

var params = {
  Bucket: 'human-of-psyche', /* required: S3 bucket 설정 */
  Key: 's3_upload_test_NYG', /* required: S3에 저장될 파일 이름 설정*/
  ACL: 'public-read', // 권한 설정
  Body: fs.createReadStream('AKR20180607069400060_01_i.jpg'),  // streamObject 사용 권장. 파일의 크기가 커도 안정적으로 다운로드할 수 있다(?)
  ContentType: 'image/jpg'  // 설정하지 않으면 다운로드가 되는 문제(?)
};

s3.putObject(params, function(err, data) {  // 업로드한 파일에 접근할 수 있는 주소가 필요한 경우 upload()를 사용한다.
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
