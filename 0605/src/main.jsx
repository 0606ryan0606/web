
import React,{useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';

const defaults={title:'LOVE',subtitle:'Editable website',bg:'#111111',text:'#ffffff',gallery:[]};

function App(){
 const [data,setData]=useState(()=>JSON.parse(localStorage.getItem('siteData')||'null')||defaults);
 useEffect(()=>localStorage.setItem('siteData',JSON.stringify(data)),[data]);
 const upload=(e)=>{
  const f=e.target.files?.[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>setData({...data,gallery:[...data.gallery,r.result]});
  r.readAsDataURL(f);
 };
 return <div style={{display:'grid',gridTemplateColumns:'320px 1fr',minHeight:'100vh'}}>
 <aside style={{padding:20,borderRight:'1px solid #ccc'}}>
 <h2>Editor</h2>
 <input value={data.title} onChange={e=>setData({...data,title:e.target.value})}/><br/><br/>
 <textarea value={data.subtitle} onChange={e=>setData({...data,subtitle:e.target.value})}/><br/><br/>
 <input type="color" value={data.bg} onChange={e=>setData({...data,bg:e.target.value})}/><br/><br/>
 <input type="color" value={data.text} onChange={e=>setData({...data,text:e.target.value})}/><br/><br/>
 <input type="file" accept="image/*" onChange={upload}/>
 </aside>
 <main style={{background:data.bg,color:data.text,padding:40}}>
 <h1>{data.title}</h1><p>{data.subtitle}</p>
 {data.gallery.map((g,i)=><img key={i} src={g} style={{width:220,margin:8,borderRadius:12}} />)}
 </main></div>
}
createRoot(document.getElementById('root')).render(<App />);
