import React, { useState, useEffect } from "react";
import CustomerDataService from "../../services/customer.service";

const Tutorial = (props) => {
  const initialCustomerState = {
    id_perusahaan: "",
    nama_perusahaan: "",
    contact_person: "",
    alamat: "",
    no_telp: "",
    fax: "",
    jenis_perusahaan: "",
  };
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");

  const getTutorial = (id) => {
    CustomerDataService.get(id)
      .then((response) => {
        setCurrentCustomer(response.data);
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
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updateTutorial = () => {
    CustomerDataService.update(currentCustomer.id_perusahaan, currentCustomer)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
        props.history.push("/customer");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    CustomerDataService.remove(currentCustomer.id_perusahaan)
      .then((response) => {
        console.log(response.data);
        props.history.push("/customer");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentCustomer ? (
        <div className='edit-form'>
          <h4>Tutorial</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='id_perusahaan'>Id Customer</label>
              <input
                type='text'
                className='form-control'
                id='id_perusahaan'
                name='id_perusahaan'
                value={currentCustomer.id_perusahaan}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='nama_perusahaan'>Nama Perusahaan</label>
              <input
                type='text'
                className='form-control'
                id='nama_perusahaan'
                name='nama_perusahaan'
                value={currentCustomer.nama_perusahaan}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='contact_person'>Contact Person</label>
              <input
                type='text'
                className='form-control'
                id='contact_person'
                name='contact_person'
                value={currentCustomer.contact_person}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='alamat'>Alamat</label>
              <input
                type='text'
                className='form-control'
                id='alamat'
                name='alamat'
                value={currentCustomer.alamat}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='no_telp'>No Telp</label>
              <input
                type='text'
                className='form-control'
                id='no_telp'
                name='no_telp'
                value={currentCustomer.no_telp}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='fax'>Fax</label>
              <input
                type='text'
                className='form-control'
                id='fax'
                name='fax'
                value={currentCustomer.fax}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='jenis_perusahaan'>Jenis Perusahaan</label>
              <input
                type='text'
                className='form-control'
                id='jenis_perusahaan'
                name='jenis_perusahaan'
                value={currentCustomer.jenis_perusahaan}
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
