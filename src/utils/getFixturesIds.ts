export async function getFixturesIds(hashtable:any){
    let string=''
    Object.keys(hashtable).slice(0,19).forEach(id=>{
        string+=`${id}-`
    })
    return string.slice(0, -1)
}
