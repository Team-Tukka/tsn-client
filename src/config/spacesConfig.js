import AWS from 'aws-sdk';

// Instantiér endpoint vha. AWS
const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');

// Initialisér endpointet til et S3-objekt sammen med accessKeyId og secretAccessKey
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'ATVOV26DKSYLWT46IP65',
  secretAccessKey: '5IKT5k3n5dJczHOvgS53lNAAeKhfLJd3RFuP+fVBWBE'
});

export default s3;
