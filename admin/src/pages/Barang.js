import React, { useState, useEffect } from "react";
import BarangDataService from "../services/barang.service";

const Tutorial = (props) => {
  const initialBarangState = {
    id_barang: "",
    nama_barang: "",
    jenis_barang: "",
    material: "",
    qty: "",
    unit: "",
    harga: "",
  };
  const [currentBarang, setCurrentBarang] = useState(initialBarangState);
  const [message, setMessage] = useState("");

  const getTutorial = (nama_barang) => {
    BarangDataService.get(nama_barang)
      .then((response) => {
        setCurrentBarang(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.nama_barang);
  }, [props.match.params.nama_barang]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBarang({ ...currentBarang, [name]: value });
  };

  // const updatePublished = (status) => {
  //   var data = {
  //     id: currentBarang.id,
  //     title: currentBarang.title,
  //     description: currentBarang.description,
  //     published: status,
  //   };

  //   BarangDataService.update(currentBarang.id, data)
  //     .then((response) => {
  //       setCurrentBarang({ ...currentBarang, published: status });
  //       console.log(response.data);
  //       setMessage("The status was updated successfully!");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const updateTutorial = () => {
    BarangDataService.update(currentBarang.id_barang, currentBarang)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    BarangDataService.remove(currentBarang.id_barang)
      .then((response) => {
        console.log(response.data);
        props.history.push("/barang");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBarang ? (
        <div className='edit-form'>
          <h4>Tutorial</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentBarang.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={currentBarang.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className='badge badge-danger mr-2' onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
