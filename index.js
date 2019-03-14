'use strict';
const AWS = require('aws-sdk');
var sqs_client = new AWS.SQS({apiVersion: '2012-11-05'});
var response = {
		"statusCode": 200,
		"headers": {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Credentials': true,
		},
		"isBase64Encoded": false,
};

var queueURL = "https://sqs.ap-southeast-2.amazonaws.com/535370547254/myFct";

exports.sqspush = function(request, context, callback) {

	var params = {
	  DelaySeconds: 10,
	  MessageBody: "my sqs message",
	  QueueUrl: queueURL
	};

	sqs_client.sendMessage(params, function(err, data) {
	  if (err) {
	    console.log("Error", err);
            response.body = "Error";
	  } else {
	    console.log("Success", data.MessageId);
            response.body = "Success";
	  }
          callback(null, response);
	});
};

exports.sqspull = function(request, context, callback) {

	var params = {
	 AttributeNames: [
	    "SentTimestamp"
	 ],
	 MaxNumberOfMessages: 1,
	 MessageAttributeNames: [
	    "All"
	 ],
	 QueueUrl: queueURL,
	 VisibilityTimeout: 20,
	 WaitTimeSeconds: 0
	};

	sqs_client.receiveMessage(params, function(err, data) {
	  if (err) {
	    console.log("Receive Error", err);
            response.body = "Receive Error";
            callback(null, response);
	  } else if (data.Messages) {
	    var deleteParams = {
	      QueueUrl: queueURL,
	      ReceiptHandle: data.Messages[0].ReceiptHandle
	    };
	    sqs_client.deleteMessage(deleteParams, function(err, data) {
	      if (err) {
		console.log("Delete Error", err);
                response.body = "Delete Error";
	      } else {
		console.log("Message Deleted", data);
                response.body = "Message Deleted";
	      }
              callback(null, response);
	    });
	  }
	});

};
