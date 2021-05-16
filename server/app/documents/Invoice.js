module.exports = (data) => {
  const today = new Date();
  let output = data.barang.map((i, index) => {
    return `
    <tr class="item item-detail">
    <td class="justify-center">${index + 1}</td>
    <td>${i.nama_barang}</td>
    <td class="justify-center">${i.qty}</td>
    <td class="justify-center">${i.unit}</td>
    <td class="justify-right">${i.harga}</td>
    <td class="justify-right">${i.total}</td>
  </tr>`;
  });
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>PDF Result Template</title>
      <style>

      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        line-height: 24px;
        border: 1px solid #eee;
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 12px;
        font-family: "Times New Roman", "Helvetica";
        color: #555;
      }
      .justify-center {
        text-align: center;
      }
      .justify-right {
        text-align: right;
      }
      .invoice {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
      }
      .customer {
        line-height: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 50%;
      }
      .customer-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
      }
      .tb-1 {
        width: 5%;
      }
      .tb-2 {
        width: 30%;
      }
      .tb-3 {
        width: 15%;
      }
      .tb-4 {
        width: 10%;
      }
      .tb-5 {
        width: 10%;
      }
      .tb-6 {
        width: 15%;
      }
      .tb-7 {
        width: 15%;
      }
      .tb-8 {
        width: 35.5%;
      }
      .customer-left {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        width: 30%;
      }
      .dear {
        display: inline-block;
        line-height: 5px;
   
      }
      .dear-1 {
        display: inline-block;
        line-height: 10px;
        padding: 50px;
      }
      .gg {
        display: inline-block;
        line-height: 10px;

      }

      .bold{
        font-weight: bold;
      }

      .customer-right {
        line-height: 20px;
        text-align: center;
        width: 50%;
      }
      .invoice-box table {
        width: 100%;
      }
      .invoice-box table td {
        vertical-align: top;
      }
      .total {
      
        display: -webkit-box;
      
        display: -ms-flexbox;
      
        display: flex;
        -webkit-box-pack: end;
            -ms-flex-pack: end;
                justify-content: flex-end;
      }
      .total_detail {
        width: 46.5%;
      }

      .invoice-box table tr.top table td.title {
        font-size: 45px;
        color: #333;
      }

      .invoice-box table tr.heading td {
        background: #eee;
        text-align: center;
        border: 1px solid #ddd;
        font-weight: bold;
      }
      .invoice-box table tr.item td {
        border: 1px solid #eee;
      }
      .invoice-box table tr.total td:nth-child(2) {
        text-align: right;
        border-top: 2px solid #eee;
        font-weight: bold;
      }
      .inv{
        border: 1px  solid #000;
        height: 25px;
        padding-bottom: 25px;
        margin-bottom: 20px;
      }

      .penerima {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-top: 20px;
      }

      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }
        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }
      </style>
    </head>
    <body>
      <div class="invoice-box">
      <img src="https://s3.gifyu.com/images/header.md.png" style="width: 100%" />
      <img src="https://s3.gifyu.com/images/Line.md.png" style="width: 100%" />
        <div class="justify-center inv">
          <h2>INVOICE</h5>
        </div>
        <div class="customer-box">
          <div class="customer">
            <div class="customer-left">
              <p>To</p>
              <p>Address</p>
              <br />
              <p>Telp</p>
            </div>
            <div>
              <p>: ${data.nama_perusahaan}</p>
              <p>: ${data.alamat}</p>
              <br />
              <p>: ${data.no_telp}</p>
            </div>
          </div>
          <div class="customer">
            <div class="customer-left">
              <p>Date</p>
              <p>Invoice No</p>
              <p>Order Date</p>
              <p>Order Reference</p>
            </div>
            <div>
              <p>: ${`${today.getDate()}. ${
                today.getMonth() + 1
              }. ${today.getFullYear()}.`}</p>
              <p>: ${data.id_po}</p>
              <p>: ${`${today.getDate()}. ${
                today.getMonth() + 1
              }. ${today.getFullYear()}.`}</p>
              <p>: ${`${today.getDate() + 30}. ${
                today.getMonth() + 1
              }. ${today.getFullYear()}.`}</p>
            </div>
          </div>
        </div>
        <div class="table-barang">
          <table cellpadding="0" cellspacing="0">
            <tr class="heading">
              <td class="tb-1">No</td>
              <td class="tb-2">Description</td>
      
              <td class="tb-4">Qty</td>
              <td class="tb-5">Unit</td>
              <td class="tb-6">Price Unit</td>
              <td class="tb-7">Amount</td>
            </tr>
            ${output}
            <tr class="item item-detail">
              <td class="justify-center">&nbsp</td>
              <td>&nbsp</td>
              <td class="justify-center">&nbsp</td>
              <td class="justify-right">&nbsp</td>
              <td class="justify-right">&nbsp</td>
            </tr>

          </table>
        </div>
        <div class="total">
          <div class="total_detail item">
            <table cellpadding="0" cellspacing="0">
              <tr class="item">
                <td class="bold">Total</td>
                <td class="justify-right tb-8">${data.subtotal}</td>
              </tr>
              <tr class="item">
                <td>Discount</td>
                <td class="justify-right">${data.disc}</td>
              </tr>
              <tr class="item">
                <td class="bold">Subtotal</td>
                <td class="justify-right">${data.after_disc}</td>
              </tr>
              <tr class="item">
                <td>Ppn</td>
                <td class="justify-right">${data.ppn}</td>
              </tr>
              <tr class="item">
                <td class="bold">Grand Total</td>
                <td class="justify-right">${data.grand_total}</td>
              </tr>
            </table>
          </div>
        </div>
  
        <div class="penerima">
  
          <div class="dear-1">
            <p class="bold">Payment Transfer To :</p>
            <p>A/C  : 031901001423307</p>
           
            <p>
              Bank : BRI (Bank Rakyat Indonesia)
            </p>
            <p>A/N : PT Dwidaya Mulia Setyawan</p>
         
          </div>
          <div class="justify-center gg">
            <p>PT. Dwidaya Mulia Setyawan</p>
            <br>
            <br>
            <br>

            <br>
            <p class="bold">Faris Setyawan</p>
         
          </div>
        </div>
      </div>
    </body>
  </html>
  
    `;
};
