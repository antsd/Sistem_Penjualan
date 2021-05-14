module.exports = (data) => {
  const today = new Date();
  let output = data.barang.map((i, index) => {
    return `<tr class="item item-detail">
    <td class="justify-center">${index + 1}</td>
    <td>${i.nama_barang}</td>
    <td class="justify-center">${i.material}</td>
    <td class="justify-center">${i.qty}</td>
    <td class="justify-center">${i.unit}</td>
    <td class="justify-right">${i.harga}</td>
    <td class="justify-right">${i.total}</td>
  </tr>>`;
  });
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>PDF Result Template</title>
    <style>
    .invoice-box {
      max-width: 800px;
      margin: auto;
      padding: 20px;
      line-height: 10px;
      -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      font-size: 12px;
      font-family: "Helvetica";
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
   
      line-height: 15px;
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
      width: 37.5%;
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
      line-height: 5px;
    }

    .customer-right {
      line-height: 15px;
      text-align: center;
      width: 20%;
    }
    .invoice-box table {
      width: 100%;
    }
    .invoice-box table td {
      vertical-align: top;
    }
    .total {
      font-size: 12px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: end;
          -ms-flex-pack: end;
              justify-content: flex-end;
    }
    .total_detail {
      width: 40%;
    }
  
    .invoice-box table tr.heading td {
      font-family: "Helvetica";
      background: #eee;
      text-align: center;
      border: 1px solid #eee;
      padding:4px;
      font-weight: bold;
    }
    .invoice-box table tr.item td {
      padding:4px;
      border: 1px solid #eee;
    }
    .invoice-box table tr.total td:nth-child(2) {
      text-align: right;
      padding:4px;
      border: 1px solid #eee;
      font-weight: bold;
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
      <div class="customer-box">
        <div class="customer">
          <div class="customer-left">
            <p>Messr</p>
            <p>Factory</p>
            <p>Address</p>
            <p>Telp</p>
            <p>Mess</p>
          </div>
          <div>
            <p>: ${data.contact_person}</p>
            <p>: ${data.nama_perusahaan}</p>
            <p>: ${data.alamat}</p>
            <p>: ${data.no_telp}</p>
            <p>: ${data.fax}</p>
          </div>
        </div>
        <div class="invoice customer-right">
          <tr class="top">
            <td colspan="2">
              <table cellpadding="0" cellspacing="0">
                <tr class="heading item">
                  <td>Quotation Date</td>
                </tr>
                <tr class="item">
                  <td>${`${today.getDate()}. ${
                    today.getMonth() + 1
                  }. ${today.getFullYear()}.`}</td>
                </tr>
              </table>
              <br />
              <table cellpadding="0" cellspacing="0">
                <tr class="heading item">
                  <td>Quotation No</td>
                </tr>
                <tr class="item">
                  <td>${data.id_penawaran}</td>
                </tr>
              </table>
              <br />
              <table cellpadding="0" cellspacing="0">
                <tr class="heading item">
                  <td>Remarks</td>
                </tr>
                <tr class="item">
                  <td>Quotation</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="information">
            <td colspan="1">
              <table>
                <tr></tr>
              </table>
            </td>
          </tr>
        </div>
      </div>
      <div class="dear">
        <p>Dear Sir,</p>
        <p>
          Pursuant to your request. We are pleased submit the quotation bellow :
        </p>
      </div>
      <div class="table-barang">
        <table cellpadding="0" cellspacing="0">
          <tr class="heading">
            <td class="tb-1">No</td>
            <td class="tb-2">Work Description</td>
            <td class="tb-3">Material</td>
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
            <td class="justify-center">&nbsp</td>
            <td class="justify-center">&nbsp</td>
            <td class="justify-right">&nbsp</td>
            <td class="justify-right">&nbsp</td>
          </tr>
          <tr class="item item-detail">
            <td class="justify-center">&nbsp</td>
            <td>&nbsp</td>
            <td class="justify-center">&nbsp</td>
            <td class="justify-center">&nbsp</td>
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
              <td>Total</td>
              <td class="justify-right tb-8">${data.subtotal}</td>
            </tr>
            <tr class="item">
              <td>Discount</td>
              <td class="justify-right">${data.disc}%</td>
            </tr>
            <tr class="item">
              <td>Total(After Discount)</td>
              <td class="justify-right">${data.after_disc}</td>
            </tr>
            <tr class="item">
              <td>Ppn</td>
              <td class="justify-right">${data.ppn}%</td>
            </tr>
            <tr class="item">
              <td>Grand Total</td>
              <td class="justify-right">${data.grand_total}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="dear-1">
        <p>Under Terms & Circumstance</p>
        <p>Payment : 30 Days after invoice</p>
        <p>Delivery: ASAP</p>
        <p>
          Transfer : BRI (Bank Rakyat Indonesia); a/n PT Dwidaya Mulia Setyawan
        </p>
        <p>No. Rek : 031901001423307</p>
        <p>Validity : 2 Week</p>
        <br />
        <p>You will be please by placing on order to us.</p>
        <br />
        <p>Thanks you</p>
        <br />
        <br />
        <p>Agustinus Ricky I</p>
        <p>0813-1971 1919</p>
      </div>
    </div>
  </body>
</html>
  `;
};
