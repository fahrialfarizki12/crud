import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

function Edit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");

  const clearInput = () => {
    setName("");
    setEmail("");
    setAlamat("");
  };
  const API = "http://localhost:3000";
  const { id } = useParams();
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${API}/users/${id}`, {
        name,
        email,
        alamat,
      });
      Swal.fire({
        title: "User Updated!",
        icon: "success",
        confirmButtonText: "Okay",
      });
      clearInput();
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update user",
        icon: "error",
      });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleUpdate}>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Type here"
            className="w-full mb-3 input"
          />
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type here"
            className="w-full mb-3 input"
          />
          <label className="block mb-1">Alamat</label>
          <input
            type="text"
            required
            onChange={(e) => setAlamat(e.target.value)}
            value={alamat}
            placeholder="Type here"
            className="w-full mb-3 input"
          />
          <button className="w-full text-white btn bg-slate-900">Update</button>
        </form>
      </div>
    </>
  );
}

export default Edit;
