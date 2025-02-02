import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
function Table() {
  const API = "http://localhost:3000";

  const openModal = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };

  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API}/users`, {
        params: { page, limit, search },
      });
      console.log(response);
      setDataUsers(response.data.users);
      setTotalPage(response.data.totalPage);
    } catch (error) {
      console.error("eeror bagian mana" + error);
    } finally {
      setLoading(false);
    }
  };

  const handlePencarian = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang sudah dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Menampilkan notifikasi sukses sebelum melakukan penghapusan
        await Swal.fire({
          title: "Data berhasil dihapus!",
          icon: "success",
        });

        // Menghapus data dari server
        await axios.delete(`${API}/users/${id}`);

        // Memperbarui data setelah penghapusan
        getUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Menampilkan notifikasi error jika terjadi kesalahan
      await Swal.fire({
        title: "Terjadi kesalahan!",
        text: "Gagal menghapus data.",
        icon: "error",
      });
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");

  const clearInput = () => {
    setName("");
    setEmail("");
    setAlamat("");
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/users`, {
        name,
        email,
        alamat,
      });
      Swal.fire({
        title: "Data berhasil ditambahkan!",
        icon: "success",
      });
      clearInput();
      getUsers();
      closeModal();
    } catch (error) {
      console.error("Error adding user:", error);
      Swal.fire({
        title: "Terjadi kesalahan!",
        text: "Gagal menambah data.",
        icon: "error",
      });
    }
  };

  const navigate = useNavigate();

  const { id } = useParams();
  const Edit = (id) => {
    navigate(`/edit/${id}`);
  };
  useEffect(() => {
    getUsers();
  }, [page, limit, search]);
  return (
    <>
      <div className="container px-[5%} mx-auto my-12 ">
        <div className="flex justify-between px-5">
          <h1 className="mb-2 font-semibold underline ">Data Users</h1>
          <input
            type="text"
            placeholder="Cari Data..."
            onChange={handlePencarian}
            value={search}
            className="input"
          />
          <button
            onClick={() => openModal()}
            className="pl-2 mb-2 font-semibold text-white btn bg-slate-900"
          >
            Tambah Users
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center mt-20">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-box border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Email</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {dataUsers.length > 0 ? (
                  dataUsers.map((item, index) => (
                    <tr key={item.id}>
                      <th>{index + 1 + (page - 1) * limit}</th>
                      <td>{item.email}</td>
                      <td>{item.name}</td>
                      <td>{item.alamat}</td>
                      <td>
                        <button
                          onClick={() => Edit(item.id)}
                          className="text-white btn bg-slate-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-white btn bg-slate-900"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex items-center justify-center mt-10 gap-7">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="text-white btn bg-slate-900"
              >
                Sebelumnya
              </button>
              <span>
                page {page} of {totalPage}
              </span>
              <label>
                Items Per page:
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </label>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPage || page > totalPage}
                className="text-white btn bg-slate-900"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            <form onSubmit={handleForm}>
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
                required
                type="text"
                onChange={(e) => setAlamat(e.target.value)}
                value={alamat}
                placeholder="Type here"
                className="w-full mb-3 input"
              />
              <button className="w-full text-white btn bg-slate-900">
                Create
              </button>
            </form>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => closeModal()} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Table;
