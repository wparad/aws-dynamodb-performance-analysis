/**
 * Module dependencies
 */
const aws = require('aws-sdk');
const commander = require('commander');

const TestingTable = 'wparad-LargeNumberOfItems';
aws.config.credentials = new aws.SharedIniFileCredentials({profile: 'atsquad'});

commander
	.command('generate-rows')
	.description('Create rows in a dynamoDB table.')
	.action(async() => {
		console.log('Starting generation of test data');
	});

commander.on('*', () => {
	if(commander.args.join(' ') == 'tests/**/*.js') { return; }
	console.log('Unknown Command: ' + commander.args.join(' '));
	commander.help();
	process.exit(0);
});
commander.parse(process.argv[2] ? process.argv : process.argv.concat(['generate-rows']));