function topAction() {
    const page = document.querySelector('.page.active').id;
    if (page === 'pageDetail') { resetCurrentTracker() }
    else { openAddModal() }
}

function openAddModal(){
  newT={step:1,template:null,name:'',desc:'',emoji:'🎯',color:'#38bdf8',sections:[]};
  renderModalStep1();
  document.getElementById('addModal').classList.remove('hidden');
}