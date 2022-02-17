#!/usr/bin/env node

"use strict";

const { exec } = require("child_process");
const { apps } = require('./ecosystem.config')
const node_env = process.env.NODE_ENV
let run_port = 4000

if(node_env == 'production') {
    run_port = apps[0].env_production.PORT
} else {
    run_port = apps[0].env.PORT
}

exec(`hexo server -p ${run_port} -s`, (error, stdout, stderr) => {
  if (error) {
    console.log("exec error: ${error}");
    return;
  }
  console.log("stdout: ${stdout}");
  console.log("stderr: ${stderr}");
});
console.log('success load hexo server');
