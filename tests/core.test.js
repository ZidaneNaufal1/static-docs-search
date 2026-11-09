'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),d=require('../core');
test('tokenisasi unicode dan query kosong',()=>{assert.deepEqual(d.tokens('Café SQL!'),['café','sql']);assert.deepEqual(d.search({documents:[]},'  '),[])});
test('ranking memberi bobot lebih pada judul',()=>{let index={documents:[d.makeDoc('a.md','# Catatan\nPanduan server'),d.makeDoc('b.md','# Server\nCara mulai')]};assert.equal(d.search(index,'server')[0].path,'b.md')});
test('teks kosong dan tag HTML ditangani sebagai teks biasa',()=>{let doc=d.makeDoc('x.md','# Halo\n<script>alert(1)</script>');assert.equal(doc.text.includes('<script>'),false);assert.deepEqual(d.tokens(''),[])});
test('indeks rusak ditolak',()=>assert.throws(()=>d.validate({version:1,documents:[{path:'a',title:3,text:''}]})));
