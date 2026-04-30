function resetCurrentTracker(){
  if(!currentTrackerId)return;
  if(!confirm('Reset all progress for this tracker?'))return;
  progress[currentTrackerId]={};
  saveProgress(currentTrackerId);
  renderDetail();
}

function renderDetail(){
  const t=trackers.find(x=>x.id===currentTrackerId);
  if(!t)return;
  const p=progress[t.id]||{};
  const {total,done,pct}=calcProgress(t,p);
  const el=document.getElementById('detailContent');
  let html=`
    <div class="prog-header" style="border-top:2px solid ${t.color}">
      <div class="prog-row">
        <div>
          <div style="font-size:9px;letter-spacing:2px;color:var(--t3);margin-bottom:4px">PROGRESS</div>
          <div class="prog-pct" style="color:${t.color}">${pct}%</div>
          <div class="prog-sub">${done} of ${total} tasks done</div>
        </div>
      </div>
      <div class="prog-track"><div class="prog-fill" style="width:${pct}%;background:${t.color}"></div></div>
    </div>
  `;
  t.sections.forEach((sec,si)=>{
    let secTotal=0,secDone=0;
    sec.items.forEach(item=>item.tasks.forEach((_,ti)=>{secTotal++;if(p[item.id+'-'+ti])secDone++}));
    const secPct=secTotal?Math.round(secDone/secTotal*100):0;
    html+=`
      <div class="sec-group" style="--accent:${sec.color||t.color}">
        <div class="sec-hdr">
          <div>
            <div class="sec-hdr-title" style="color:${sec.color||t.color}">${sec.title}</div>
            <div class="sec-hdr-sub">${sec.subtitle||''}</div>
          </div>
          <div class="sec-hdr-pct" style="color:${sec.color||t.color}">${secPct}%</div>
        </div>
        <div class="sec-bar"><div class="sec-bar-fill" style="width:${secPct}%;background:${sec.color||t.color}"></div></div>
    `;
    sec.items.forEach((item,ii)=>{
      const iDone=item.tasks.filter((_,ti)=>p[item.id+'-'+ti]).length;
      const iPct=Math.round(iDone/item.tasks.length*100);
      const isOpen=openItems[item.id];
      html+=`
        <div class="item-card${isOpen?' open':''}" id="ic-${item.id}" style="--accent:${sec.color||t.color}">
          <div class="item-hdr" onclick="toggleItem('${item.id}')">
            <div class="item-badge" style="border-color:${(sec.color||t.color)}50;background:${(sec.color||t.color)}15;color:${sec.color||t.color}">
              ${iPct===100?'✓':ii+1}
            </div>
            <div class="item-info">
              <div class="item-title">${item.title}</div>
              <div class="item-sub">${item.subtitle||''} · ${iDone}/${item.tasks.length} tasks</div>
            </div>
            <div class="item-right">
              ${iPct>0?`<div class="item-pct" style="color:${sec.color||t.color}">${iPct}%</div>`:''}
              <div class="item-chev">${isOpen?'▲':'▼'}</div>
            </div>
          </div>
          ${iPct>0?`<div class="item-pbar"><div class="item-pfill" style="width:${iPct}%;background:${sec.color||t.color}"></div></div>`:''}
          ${isOpen?renderItemBody(item,p,sec.color||t.color):''}
        </div>
      `;
    });
    html+=`</div>`;
  });
  el.innerHTML=html;
}

function renderModalStep1(){
  document.getElementById('modalStep1').style.display='';
  document.getElementById('modalStep2').style.display='none';
  document.getElementById('modalStep3').style.display='none';
  const tl=document.getElementById('templateList');
  tl.innerHTML=TEMPLATES.map((t,i)=>`
    <div class="tmpl-card" onclick="pickTemplate(${i})">
      <div class="tmpl-emoji">${t.emoji}</div>
      <div class="tmpl-info">
        <div class="tmpl-name">${t.name}</div>
        <div class="tmpl-desc">${t.description}</div>
      </div>
      <div class="tmpl-arr">→</div>
    </div>
  `).join('');
}
