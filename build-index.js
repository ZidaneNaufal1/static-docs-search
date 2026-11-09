#!/usr/bin/env node
'use strict';const fs=require('node:fs'),path=require('node:path'),core=require('./core');
if(process.argv.length!==4){console.error('Usage: node build-index.js <folder> <new-index.json>');process.exit(2)}
const root=path.resolve(process.argv[2]),output=path.resolve(process.argv[3]),documents=[];
try{if(!fs.statSync(root).isDirectory())throw Error('Input must be a directory');if(output===root||output.startsWith(root+path.sep))throw Error('Output must be outside input folder');
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const full=path.join(dir,entry.name);if(entry.isSymbolicLink())continue;if(entry.isDirectory())walk(full);else if(entry.isFile()&&/\.md$/i.test(entry.name)){if(documents.length>=1000)throw Error('Maximum 1000 Markdown files');const stat=fs.statSync(full);if(stat.size>1000000)throw Error('File exceeds 1 MB: '+entry.name);documents.push(core.makeDoc(path.relative(root,full).split(path.sep).join('/'),fs.readFileSync(full,'utf8')))}}}
walk(root);fs.writeFileSync(output,JSON.stringify({version:1,documents},null,2),{encoding:'utf8',flag:'wx'});console.log('Indexed '+documents.length+' files into '+output)
}catch(e){console.error('Error: '+e.message);process.exitCode=1}
