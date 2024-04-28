export const useReadArrayBuffer = (file:File) =>{
    return new Promise((resolve, reject) =>{
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = (e) => {
          const arrayBuffer = e.target!.result as ArrayBuffer
          resolve(arrayBuffer)
        }
    })
   
}