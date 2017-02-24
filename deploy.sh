#!/bin/sh

rm callSipgate.zip
cd src
zip -r ../callSipgate.zip *
cd ..
zip -r callSipgate.zip node_modules
aws lambda update-function-code --function-name callSipgate --zip-file fileb://callSipgate.zip
