const AWS = require("aws-sdk");

// var dynamodb = new AWS.DynamoDB();
const s3 = new AWS.S3();

exports.handler = async function (event, context) {
  console.log(event["Records"][0]["awsRegion"]);
  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};
