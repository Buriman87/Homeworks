import { useEffect, useState } from 'react'
import './App.css'
import DataComponent from './DataComponent'


interface IDataModel
{
  userId:number,
  id:number,
  body:string,
  title:string
}


function App() {
 const [count,setCount]=useState<number>(0)
 const [users, setUsers]=useState<IDataModel[]>()
  useEffect(()=>{
   const GetData = async () =>{
    const response =await fetch('https://jsonplaceholder.typicode.com/posts',{
      method:'Get',
      headers:{
        "Content-type":"application/json"
      }
    })
    const json = await response.json() as IDataModel[];
    console.log(json);
    setUsers(json);
   }
   GetData();



  },[count])

  return (
    <>
     <p>My count is :{count}</p>
     <button onClick={()=>setCount(count+1)}>Count</button>
     {users?.length ? users.map((user)=><DataComponent body={user.body} id={user.id} title={user.title} userid={user.userId} key={user.id} /> ): <p>Dont  have data</p>}
    </>
  )
}

export default App