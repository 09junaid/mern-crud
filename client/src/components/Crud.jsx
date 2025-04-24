import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Crud() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [record, setRecord] = useState([]);
  const [editId, setEditId] = useState(null); // Renamed for clarity

  const URL = `http://localhost:3000/user`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/get`);
      const getData = response.data.user; // assuming the API returns an array in the data.user property
      setRecord(getData);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target; 
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.name || !inputData.email || !inputData.phone || !inputData.address) {
      alert("Please fill up all the fields");
      return;
    }
    
    try {
      if (editId !== null) {
        await axios.put(`${URL}/update/${editId}`, inputData);
        setEditId(null);
      } else {
        await axios.post(`${URL}/create`, inputData);
      }
      setInputData({ name: "", email: "", phone: "", address: "" });
      fetchData(); // Refresh the records
    } catch (error) {
      console.log(`Error submitting data: ${error}`);
      alert("Failed to submit data");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/delete/${id}`);
      fetchData();
    } catch (error) {
      console.log(`Error deleting data: ${error}`);
    }
  };

  const handleEdit = (id) => {
    const selectedRecord = record.find(item => item._id === id);
    // if (selectedRecord) {
    //   setInputData({
    //     name: selectedRecord.name,
    //     email: selectedRecord.email,
    //     phone: selectedRecord.phone,
    //     address: selectedRecord.address
    //   });
      
    // }
    setInputData(selectedRecord);
    setEditId(id);
  };

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder='name' 
          name='name' 
          value={inputData.name} 
          onChange={handleInput}
        />
        <input 
          type="email" 
          placeholder='email' 
          name='email' 
          value={inputData.email} 
          onChange={handleInput}
        />
        <input 
          type="number" 
          placeholder='phone' 
          name='phone' 
          value={inputData.phone} 
          onChange={handleInput}
        />
        <input 
          type="text" 
          placeholder='address' 
          name='address' 
          value={inputData.address} 
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>
          {editId !== null ? "Update Record" : "Submit"}
        </button>

        <div>
          {record && record.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.address}</p>
              <div>
                <button onClick={() => handleEdit(item._id)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}