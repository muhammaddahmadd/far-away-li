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

function App() {
  const [data, setData] = useState(initialFriends);
  const [selectedFren, setSelectedFren] = useState(null);


  function handleSelected(friend) {
    setSelectedFren((cur) => (cur?.id === friend.id ? null : friend));
  }

  function handleSplitBill(value) {
    setData((data) =>
      data.map((friend) =>
        friend.id === selectedFren.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFren(null); // Close the form after splitting the bill
  }

  return (
    <div className="app">
      <Friends data={data} onSelect={handleSelected} selectedFren={selectedFren} />
      {selectedFren && (
        <BillForm
          selectedFren={selectedFren}
          onSplitBill={handleSplitBill}
        />
      )}
<AddForm data={data} setData={setData} />
    </div>
  );
}

function Friends({ data, onSelect, selectedFren }) {
  return (
    <div className="sidebar">
      <ul>
        {data.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelect={onSelect}
            isSelected={selectedFren?.id === friend.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelect, isSelected }) {
  const { id, name, image, balance } = friend;

  let balanceText;
  if (balance > 0) balanceText = `${name} owes you $${balance}`;
  if (balance < 0) balanceText = `You owe ${name} $${Math.abs(balance)}`;
  if (balance === 0) balanceText = `You and ${name} are even`;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className={balance > 0 ? "green" : balance < 0 ? "red" : "black"}>
        {balanceText}
      </p>
      <button className="button" onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function BillForm({ selectedFren, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [payingPerson, setPayingPerson] = useState("you");

  const friendsContribution = billValue ? billValue - yourExpense : "";

  function handleSubmit(e) {
    e.preventDefault();

    if (!billValue || !yourExpense) return;

    const value = payingPerson === "you" ? friendsContribution : -yourExpense;
    onSplitBill(value);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFren.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type="number"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />
      <label>🧍 Your Expense</label>
      <input
        type="number"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > billValue ? yourExpense : Number(e.target.value)
          )
        }
      />
      <label>👫 {selectedFren.name}'s Contribution</label>
      <input type="number" value={friendsContribution} disabled />
      <label>🤑 Who's paying?</label>
      <select
        value={payingPerson}
        onChange={(e) => setPayingPerson(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{selectedFren.name}</option>
      </select>
      <button className="button" type="submit">
        Split Bill
      </button>
    </form>
  );
}

function AddForm({ data, setData }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return; //guard clause

    const newFriend = {
      id: Date.now(),
      name,
      image: `${image}?u=${Date.now()}`,
      balance: 0,
    };

    setData((data) => [...data, newFriend]);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button" type="submit">
        Add Friend
      </button>
    </form>
  );
}



function Button({children}){
  return <button>
    {children}
  </button>
}

export default App;