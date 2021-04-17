import React, { useState, useEffect } from "react";
import BarangDataService from "../../services/barang.service";

import UserService from "../../services/user.service";
import { Switch, Route, Link } from "react-router-dom";

const AddBarang = () => {
  const initialBarangState = {
    id_barang: "",
    nama_barang: "",
    jenis_barang: "",
    material: "",
    qty: "",
    unit: "",
    harga: "",
  };
  const [barang, setBarang] = useState(initialBarangState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBarang({ ...barang, [name]: value });
  };

  const saveBarang = () => {
    let data = {
      id_barang: barang.id_barang,
      nama_barang: barang.nama_barang,
      jenis_barang: barang.jenis_barang,
      material: barang.material,
      qty: barang.qty,
      unit: barang.unit,
      harga: barang.harga,
    };

    BarangDataService.create(data)
      .then((response) => {
        setBarang({
          id_barang: response.data.id_barang,
          nama_barang: response.data.nama_barang,
          jenis_barang: response.data.jenis_barang,
          material: response.data.material,
          qty: response.data.qty,
          unit: response.data.unit,
          harga: response.data.harga,
        });

        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newBarang = () => {
    setBarang(initialBarangState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>Barang Berhasil Disimpan</h4>
          <button className='btn btn-success' onClick={newBarang}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='id_barang'>Id Barang</label>
            <input
              type='text'
              className='form-control'
              id='id_barang'
              required
              value={barang.id_barang}
              onChange={handleInputChange}
              name='id_barang'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='nama_barang'>Nama Barang</label>
            <input
              type='text'
              className='form-control'
              id='nama_barang'
              required
              value={barang.nama_barang}
              onChange={handleInputChange}
              name='nama_barang'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='jenis_barang'>Jenis Barang</label>
            <input
              type='text'
              className='form-control'
              id='jenis_barang'
              required
              value={barang.jenis_barang}
              onChange={handleInputChange}
              name='jenis_barang'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='material'>Material</label>
            <input
              type='text'
              className='form-control'
              id='material'
              required
              value={barang.material}
              onChange={handleInputChange}
              name='material'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='qty'>qty</label>
            <input
              type='number'
              className='form-control'
              id='qty'
              required
              value={barang.qty}
              onChange={handleInputChange}
              name='qty'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='unit'>unit</label>
            <input
              type='text'
              className='form-control'
              id='unit'
              required
              value={barang.unit}
              onChange={handleInputChange}
              name='unit'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='harga'>harga</label>
            <input
              type='number'
              className='form-control'
              id='harga'
              required
              value={barang.harga}
              onChange={handleInputChange}
              name='harga'
            />
          </div>

          <button onClick={saveBarang} className='btn btn-success'>
            Simpan
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBarang;
