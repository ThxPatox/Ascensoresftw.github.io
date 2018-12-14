const content = document.getElementById('content'),
    search = document.getElementById('search');

if(navigator.onLine){
    console.log('ONLINE');
}else{
    console.log('OFFLINE');
};

const getConnection = () =>{
    const URL='http://127.0.0.1:8000/tareas/';
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.results.forEach(e => {
                drawTarea(e);
            });
        })
        .catch(e => console.log(e));
};
const drawTarea = e =>{
    const tarea = `<div class="tarea">
    <h3>Trabajo Pendiente: ${e.tarea_id}</h3>                           
    <b><p>cliente:</b> ${e.cliente}</p>                                  
    <b><p>fecha:</b> ${e.fecha}</p>                                      
    <b><p>inicio_atencion:</b> ${e.inicio_atencion}</p>                  
    <b><p>termino_atencion:</b> ${e.termino_atencion}</p>                
    <b><p>id_ascensor:</b> ${e.id_ascensor}</p>                          
    <b><p>modelo_ascensor:</b> ${e.modelo_ascensor}</p>                  
    <b><p>fallas_detectadas:</b> ${e.fallas_detectadas}</p>              
    <b><p>reparaciones_efectuadas:</b> ${e.reparaciones_efectuadas}</p>  
    <b><p>piezas_cambiadas:</b> ${e.piezas_cambiadas}</p>                
    <b><p>tecnico:</b> ${e.tecnico}</p>                                  
    </div>`;
    content.insertAdjacentHTML('beforeend',tarea)
};
const searchtarea = tarea_id =>{
    const tarea = encodeURIComponent(tarea_id),
        URL=`http://127.0.0.1:8000/tareas/`;
    fetch(URL)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(e => {
            if (e.modelo_ascensor==tarea){
                drawTarea(e);
            };
            if (e.tarea_id!=tarea){
                console.log('no coincide');
            };
        });
    })
    .catch(e => console.log(e));
};
search.addEventListener('keyup',e => {
    if(e.keyCode===13){
        content.innerHTML='';
        searchtarea(e.target.value.trim());
    }
});
getConnection();