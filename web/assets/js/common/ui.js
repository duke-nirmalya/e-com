function loadComponents(url,targetId){
    return fetch(url)
    .then(response=>{

        if(!response.ok) throw new Error("Failed to load components"); 
        return response.text();
      })
   .then(html=>{
     document.getElementById(targetId).innerHTML=html;
     
   })
   .catch(error=>console.error(error))
}
loadComponents("components/header.html","header-section");