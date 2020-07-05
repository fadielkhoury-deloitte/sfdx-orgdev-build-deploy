const core = require('@actions/core')
const { spawnSync } = require('child_process');

module.exports.run = function(command, args, isLogResponse) {
    var extraParams = {};
    extraParams.shell = true;

    extraParams.cwd = process.cwd();
    extraParams.env = process.env;
    extraParams.stdio = [process.stdin, process.stdout, process.stderr];
    extraParams.encoding = 'utf-8';

    var spawn = spawnSync(command, args, extraParams);

    if(isLogResponse === undefined){
        isLogResponse = true;
    }else{
        isLogResponse = false;
    }

    if (spawn.stdout !== undefined) {
        
        core.info("Command executed: " + command)
        core.info("With the following args: " + args.toString());
        console.log("---> " + isLogResponse);
        if(isLogResponse){
            console.log("Having the following return: " + spawn.stdout.toString());
        }
        
    }

    if (spawn.error !== undefined || spawn.status !== 0) {
        var errorMessage = '';
        if (spawn.error !== undefined) {
            errorMessage = spawn.error;
        } 
        
        if (spawn.stderr !== undefined) {
            errorMessage += " " + spawn.stderr.toString();
        }
        core.error(errorMessage);
        throw Error(errorMessage);
    } 
}