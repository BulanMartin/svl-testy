import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
const root=path.resolve(import.meta.dirname,'..');
const topics=[], ids=new Set();
for(const file of fs.readdirSync(path.join(root,'questions')).filter(f=>/\.ya?ml$/i.test(f)).sort()){
 const d=YAML.parse(fs.readFileSync(path.join(root,'questions',file),'utf8'));
 const fail=m=>{throw new Error(`${file}: ${m}`)};
 if(!d?.topic?.id||!d.topic.title||!Array.isArray(d.questions)||!d.questions.length)fail('Chybí topic nebo questions');
 if(topics.some(t=>t.id===d.topic.id))fail('Duplicitní topic.id');
 for(const q of d.questions){
  if(!q.id||ids.has(q.id))fail('Chybějící nebo duplicitní question.id'); ids.add(q.id);
  if(q.type!=='single_choice'||typeof q.question!=='string'||!Array.isArray(q.options)||q.options.length<2)fail(`Neplatná otázka ${q.id}`);
  if(new Set(q.options.map(o=>o.id)).size!==q.options.length||q.options.some(o=>!o.id||typeof o.text!=='string')||!q.options.some(o=>o.id===q.correct_option_id))fail(`Neplatné odpovědi ${q.id}`);
 }
 topics.push({...d.topic,questions:d.questions});
}
if(!topics.length)throw new Error('Žádné okruhy');
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
fs.writeFileSync(path.join(root,'dist','questions.json'),JSON.stringify(topics));
for(const f of ['index.html','app.js','style.css'])fs.copyFileSync(path.join(root,'src',f),path.join(root,'dist',f));
console.log(`${topics.length} okruhů, ${ids.size} otázek. Build OK.`);
