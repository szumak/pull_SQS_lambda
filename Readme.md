# create, update and invoke AWS lambda function

## Preparation:  

 - A s3 bucket named `msz-test-inbox`

 - A function role wich allows lambda to access and create s3 object

## Makefile: 

`make` - will create an lambda function

`make update` - will update lambda function code

`make invoke` - will trigger function 

`make result` - download and print content from the s3 object

`make clean` - remove lambda and unneeded files
