export async function getFixturesIds(hashtable:any){
    let string=''
    Object.keys(hashtable).forEach(id=>{
        string+=`${id}-`
    })
    return string.slice(0, -1)
}
