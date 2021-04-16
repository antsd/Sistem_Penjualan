import React, { useState, useEffect } from "react";
import CustomerDataService from "../../services/customer.service";

const AddBarang = () => {
  const initialCustomerState = {
    id_perusahaan: "",
    nama_perusahaan: "",
    contact_person: "",
    alamat: "",
    no_telp: "",
    fax: "",
    jenis_perusahaan: "",
  };
  const [customer, setBarang] = useState(initialCustomerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBarang({ ...customer, [name]: value });
  };

  const saveBarang = () => {
    let data = {
      id_perusahaan: customer.id_perusahaan,
      nama_perusahaan: customer.nama_perusahaan,
      contact_person: customer.contact_person,
      alamat: customer.alamat,
      no_telp: customer.no_telp,
      fax: customer.fax,
      jenis_perusahaan: customer.jenis_perusahaan,
    };

    CustomerDataService.create(data)
      .then((response) => {
        setBarang({
          id_perusahaan: response.data.id_perusahaan,
          nama_perusahaan: response.data.nama_perusahaan,
          contact_person: response.data.contact_person,
          alamat: response.data.alamat,
          no_telp: response.data.no_telp,
          fax: response.data.fax,
          hjenis_perusahaanarga: response.data.jenis_perusahaan,
        });

        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newBarang = () => {
    setBarang(initialCustomerState);
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
            <label htmlFor='id_perusahaan'>Id Perusahaan</label>
            <input
              type='text'
              className='form-control'
              id='id_perusahaan'
              required
              value={customer.id_perusahaan}
              onChange={handleInputChange}
              name='id_perusahaan'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='nama_perusahaan'>Nama Perusahaan</label>
            <input
              type='text'
              className='form-control'
              id='nama_perusahaan'
              required
              value={customer.nama_perusahaan}
              onChange={handleInputChange}
              name='nama_perusahaan'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='contact_person'>Contact Person</label>
            <input
              type='text'
              className='form-control'
              id='contact_person'
              required
              value={customer.contact_person}
              onChange={handleInputChange}
              name='contact_person'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='alamat'>Alamat</label>
            <input
              type='text'
              className='form-control'
              id='alamat'
              required
              value={customer.alamat}
              onChange={handleInputChange}
              name='alamat'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='no_telp'>No Telp</label>
            <input
              type='number'
              className='form-control'
              id='alamat'
              required
              value={customer.no_telp}
              onChange={handleInputChange}
              name='no_telp'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='fax'>Fax</label>
            <input
              type='number'
              className='form-control'
              id='fax'
              required
              value={customer.fax}
              onChange={handleInputChange}
              name='fax'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='jenis_perusahaan'>Jenis Perusahaan</label>
            <input
              type='text'
              className='form-control'
              id='jenis_perusahaan'
              required
              value={customer.jenis_perusahaan}
              onChange={handleInputChange}
              name='jenis_perusahaan'
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
