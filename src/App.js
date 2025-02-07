import React, { useState } from "react";


const initialFriends = [
  {
    id: 118836,
    name: "Umer",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Hassaan",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Shappi",
    image: "https://i.pravatar.cc/48?u=931372",
    balance: 0,
  },
  {
    id: 499176,
    name: "Tarri",
    image: "https://i.pravatar.cc/48?u=499426",
    balance: -70,
  },
];



function App(){
  const [data, setData] = useState(initialFriends)
  const [selectedFren, setSelectedFren] = useState("")

  function handleSelected(id) {
    setSelectedFren(data.filter((item) => item.id === id).map((item) => item.name));
  }
  return <div className="app">
    <Friends data={data}  onSelect={handleSelected}/>
    <BillForm selectedFren={selectedFren} />
    <AddForm data={data} setData={setData}/>
    {/* <button className="button">Close</button> */}
  </div>
}


function Friends({ data, onSelect }){
  return <div className="sidebar">
   <ul>
      {data.map(fren => <Friend  onSelect={onSelect} data={data} fren={fren} key={fren.id} />)}
   </ul>
  </div>
}


function Friend({ fren, data, onSelect }){
  const { id, name, image, balance } = fren;
 
  let clr;
  if (balance > 0) clr = "green";
  if (balance < 0) clr = "red";
  if (balance === 0) clr = "black"

  return <li>
    <img src={image} alt={name}/>
    <h3>{name}</h3>
    <p className={clr}>
      {balance > 0 && `${name} owes you ${balance}$`}
      {balance < 0 &&  `You owe ${name} ${Math.abs(balance)}`}
      {balance === 0 && `You and ${name} are even`}
    </p>
    <button className="button" onClick={() => onSelect(id)}>Select</button>
  </li>
}



function BillForm({ selectedFren }){
  return <form className="form-split-bill ">
    <h2> Split a bill with {selectedFren}</h2>
    <p>Bill Value</p>
    <input type="number"/> 
    <p>Your Expense</p>
    <input type="number" /> 
    <p>{selectedFren}'s Contribution</p>
    <input type="number" disabled/> 
    <p>Who's paying:</p>
   <select>
    <option>You</option>
      <option>{selectedFren}</option>
   </select>
  </form>
}


function AddForm({ data , setData }){
  // const {name, image, balance, id} = data;
  const [newFrenName, setnewFrenName] = useState("")
  const [newFrenNameImg, setnewFrenNameImg] = useState("")


  function handlenewFrenNameInput(e) {
    setnewFrenName(e.target.value)
  }

  function handlenewFrenNameImg(e) {
    setnewFrenNameImg(e.target.value)
  }


  function handleAddFren(e){
    e.preventDefault()
    const newFrenNameItem = {
      name: newFrenName,
      image: newFrenNameImg,
      balance: 0, // Default balance or another value
      id: Date.now()
    };

    setData(data => [...data, newFrenNameItem])
  } 

 

  console.log(data)

  return <form className="form-add-friend " onSubmit={(e)=>handleAddFren(e)}>
    <p>Friend Name</p>
    <input type="text" value={newFrenName} onChange={(e)=> handlenewFrenNameInput(e)}/>
    <p>Image Url</p>
    <input type="text" value={newFrenNameImg} onChange={(e)=>handlenewFrenNameImg(e)} />
    <button className="button" type="submit" >Add</button>
  </form>
 
}
export default App;