const aws = require('aws-sdk');
const commander = require('commander');
const uuid = require('uuid');

const testingTable = 'wparad-LargeNumberOfItems';
aws.config.credentials = new aws.SharedIniFileCredentials({ profile: 'atsquad' });
aws.config.update({ region: 'eu-west-1' });

commander
  .command('info')
  .description('Does nothing.')
  .action(async() => {
    console.log('Nothing to do.');
  });

commander
  .command('generate')
  .description('Create rows in a dynamoDB table.')
  .action(async() => {
    console.log('Starting generation of test data', new Date().toISOString());
    for (let outer = 0; outer < 9; outer++) {
      let dynamoDbClient = new aws.DynamoDB.DocumentClient();
      let rowCount = 1000;
      let promiseList = [];
      console.log(`  ${new Date().toISOString()} - ${outer}`);
      for (let counter = 0; counter < rowCount; counter++) {
        let getParams = id => ({
          TableName: testingTable,
          Item: {
            itemId: id,
            data: {
              idAgain: id
            }
          }
        });
        let a = dynamoDbClient.put(getParams(uuid.v4())).promise();
        let b = dynamoDbClient.put(getParams(uuid.v4())).promise();
        let c = dynamoDbClient.put(getParams(uuid.v4())).promise();
        let d = dynamoDbClient.put(getParams(uuid.v4())).promise();
        let e = dynamoDbClient.put(getParams(uuid.v4())).promise();
        let f = dynamoDbClient.put(getParams(uuid.v4())).promise();
        let g = dynamoDbClient.put(getParams(uuid.v4())).promise();
        let h = dynamoDbClient.put(getParams(uuid.v4())).promise();
        promiseList.push(Promise.all([a, b, c, d, e, f, g, h]));
      }
      await Promise.all(promiseList);
    }
    console.log('=>>>> Done', new Date().toISOString());
  });

commander
  .command('scan')
  .description('Scan all the rows in a dynamoDB table.')
  .action(async() => {
    console.log('Starting Scan of test data', new Date().toISOString());
    let dynamoDbClient = new aws.DynamoDB.DocumentClient();
    let exclusiveStartKey = null;
    let totalCount = 0;
    for (let counter = 0; counter < 100; counter++) {
      // let id = uuid.v4();
      console.log(`  ${new Date().toISOString()} - ${counter}`);
      let params = {
        TableName: testingTable
      };
      if (exclusiveStartKey) {
        params.ExclusiveStartKey = exclusiveStartKey;
      }
      if (!exclusiveStartKey && counter) {
        break;
      }
      let scanResult = await dynamoDbClient.scan(params).promise();
      totalCount += scanResult.Items.length;
      delete scanResult.Items;
      exclusiveStartKey = scanResult.LastEvaluatedKey;
      console.log('****** Result', scanResult);
    }
    console.log('=>>>> Total Count', totalCount);
    console.log('=>>>> Done', new Date().toISOString());
  });

commander.on('*', () => {
  console.log(`Unknown Command: ${commander.args.join(' ')}`);
});
commander.parse(process.argv[2] ? process.argv : process.argv.concat(['info']));
