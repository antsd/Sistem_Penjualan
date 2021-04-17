import React, { useState, useEffect } from "react";
import BarangDataService from "../../services/barang.service";

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

  const getTutorial = (id) => {
    BarangDataService.get(id)
      .then((response) => {
        setCurrentBarang(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

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
        props.history.push("/barang");
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
              <label htmlFor='id_barang'>Id Barang</label>
              <input
                type='text'
                className='form-control'
                id='id_barang'
                name='id_barang'
                value={currentBarang.id_barang}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='nama_barang'>Nama Barang</label>
              <input
                type='text'
                className='form-control'
                id='nama_barang'
                name='nama_barang'
                value={currentBarang.nama_barang}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='jenis_barang'>Jenis Barang</label>
              <input
                type='text'
                className='form-control'
                id='jenis_barang'
                name='jenis_barang'
                value={currentBarang.jenis_barang}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='material'>Material</label>
              <input
                type='text'
                className='form-control'
                id='material'
                name='material'
                value={currentBarang.material}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='qty'>Qty</label>
              <input
                type='text'
                className='form-control'
                id='qty'
                name='qty'
                value={currentBarang.qty}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='unit'>Unit</label>
              <input
                type='text'
                className='form-control'
                id='unit'
                name='unit'
                value={currentBarang.unit}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='harga'>Harga</label>
              <input
                type='text'
                className='form-control'
                id='harga'
                name='harga'
                value={currentBarang.harga}
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
