export default(accept?:string)=>{
    const input = document.createElement('input');
    input.type = 'file'
    input.style.display = 'none'
    input.accept = accept || 'none'
    document.body.appendChild(input)
    input.click()
    
    return new Promise((resolve, reject) =>{
        input.onchange = (event:Event)=>{
            const target = (event.target as HTMLInputElement);
    
            if(target?.files?.length){
                resolve(event)
            }
            
            reject('Not Select Files')
        }
    })
    
}