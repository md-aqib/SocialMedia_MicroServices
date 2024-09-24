const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: 'ap-south-1',
  accessKeyId: '',
  secretAccessKey: ''
});

const generatePresignedGetUrl = (key) => {
  const params = {
    Bucket: 'socialmedia-ms',
    Key: key,
    Expires: 60 * 60
  };
  
  return s3.getSignedUrlPromise('getObject', params);
};

const generatePresignedPutUrl = (fileName) => {
  const params = {
    Bucket: 'socialmedia-ms',
    Key: `user/${fileName}`,
    Expires: 60 * 60,
    ContentType: 'application/octet-stream'
  };

  return s3.getSignedUrlPromise('putObject', params);
};

// generatePresignedGetUrl('galleryimg2.jpg')
//   .then(url => console.log('Presigned GET URL:', url))
//   .catch(err => console.error('Error generating GET URL', err));

// generatePresignedPutUrl('galleryimg2.jpg')
//   .then(url => console.log('Presigned PUT URL:', url))
//   .catch(err => console.error('Error generating PUT URL', err));

module.exports = {
    generatePresignedGetUrl,
    generatePresignedPutUrl
};
