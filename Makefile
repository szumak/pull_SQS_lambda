LAMBDA_NAME=SQSPullTest
LAMBDA_ROLE=arn:aws:iam::535370547254:role/s3uploadTest-dev-ap-southeast-2-lambdaRole
done: foo.zip
	aws lambda create-function --function-name ${LAMBDA_NAME} --runtime nodejs8.10 --role ${LAMBDA_ROLE} --handler index.sqspull --zip-file fileb://foo.zip ; rm -f foo.zip

foo.zip: index.js
	zip -r foo.zip *.js 

update: foo.zip
	aws lambda update-function-code --function-name ${LAMBDA_NAME} --zip-file fileb://foo.zip | jq .  ; rm -f foo.zip

invoke:
	aws lambda invoke --function-name ${LAMBDA_NAME} /dev/stdout | jq .

clean:
	 aws lambda delete-function --function-name ${LAMBDA_NAME} ; rm -f foo.zip
