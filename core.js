'use strict';(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.DocSearch=factory()})(globalThis,function(){
function tokens(s){return String(s).toLowerCase().normalize('NFKC').match(/[\p{L}\p{N}]+/gu)||[]}
function clean(s){return s.replace(/\`\`\`[\s\S]*?\`\`\`/g,' ').replace(/<[^>]*>/g,' ').replace(/!?\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/[#*_>\`~]/g,' ').replace(/\s+/g,' ').trim()}
function makeDoc(path,raw){let title=(raw.match(/^#\s+(.+)$/m)||[])[1]||path;return {path,title:clean(title).slice(0,200),text:clean(raw).slice(0,20000)}}
function validate(index){if(!index||index.version!==1||!Array.isArray(index.documents)||index.documents.length>1000)throw Error('Indeks tidak valid');return {version:1,documents:index.documents.map(d=>{if(!d||typeof d.path!=='string'||d.path.length>1000||typeof d.title!=='string'||d.title.length>200||typeof d.text!=='string'||d.text.length>20000)throw Error('Dokumen tidak valid');return {path:d.path,title:d.title,text:d.text}})}}
function search(index,query){const words=[...new Set(tokens(query))].slice(0,20);if(!words.length)return [];return index.documents.map(d=>{const title=tokens(d.title),body=tokens(d.text);let score=words.reduce((sum,w)=>sum+(title.includes(w)?5:0)+(body.includes(w)?1:0),0);return {path:d.path,title:d.title,snippet:d.text.slice(0,200),score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)).slice(0,50)}
return{tokens,clean,makeDoc,validate,search};
});
