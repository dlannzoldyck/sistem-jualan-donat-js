/*
    Membuat Program Penjualan Donat

    Kita mempunyai berbagai macam donat diantarnya sebagai berikut :

    - donat bulat khas semarang
    - donat coklat khas jakarta
    - donat lumpia khas jawa timur

    dari masing-masing harganya terinci sebagai berikut :
    (A). Donat bulat seharga 8000 | disc dasar : 5%
    (B). Donat coklat seharga 9000 | disc dasar : 10%
    (C). Donat lumpia seharga 4500 | disc dasar : 3%

    jika pembeli berasal dari daerah jakarta maka ditambahkan diskon sebesar 2%
    jika pembeli berasl dari daerah bogor maka ditambahkan diskon sebesar 9%
    jika pembeli berasal dari daerah tangerang maka ditambahkan diskon sebesar 8% 
    jika pembeli berasal dari luar daerah yang tadi disebutkan maka akan ditambahkan diskon  6% dan potongan harga sebesar 2000

    jika pembeli membeli barang sampai dengan 50.000 maka akan dikenakan ppn sebesar 11% dan ditanggung oleh pembelinya

*/

function checkLokasi(lokasi) {
  let result;

  let daerah = [
    {
      namaDaerah: "JAKARTA",
      disc: 2,
    },
    {
      namaDaerah: "BOGOR",
      disc: 9,
    },
    {
      namaDaerah: "TANGERANG",
      disc: 8,
    },
  ];
  let cekHasil = daerah.find((wilayah) => wilayah.namaDaerah === lokasi);
  if (cekHasil) {
    result = [
      {
        lok: cekHasil.namaDaerah,
        diskon: cekHasil.disc,
        potongan: 0,
      },
    ];
  } else {
    result = [
      {
        diskon: 6,
        potongan: 2000,
      },
    ];
  }

  return result;
}
function checkKue(kuwe) {
  let hisal;
  let daftarKue = [
    {
      kue: "donat bulat",
      price: 8000,
      disc: 5,
    },
    {
      kue: "donat coklat",
      price: 9000,
      disc: 10,
    },
    {
      kue: "donat lumpia",
      price: 4500,
      disc: 3,
    },
  ];
  let jenisKue = daftarKue.find((cari) => cari.kue === kuwe);
  if (jenisKue) {
    hisal = [
      {
        tipeKue: jenisKue.kue,
        harga: jenisKue.price,
        diskon: jenisKue.disc,
      },
    ];
  }
  return hisal;
}
let pembeli,
  askAsalPembeli,
  asalPembeli,
  jenisKue,
  jumlahDibeli,
  inputKue,
  kueNya,
  askKue,
  ppn;
let msg = {
  pesan1: `SELAMAT DATANG DI LANZZ STORE
    KAMI MENJUAL BERBAGAI PRODUK KUE
    MULAI DARI HARGA 4000 - 15000

    BERIKUT RINCIAN HARGANYA!

    - DONAT BULAT = Rp. 8.000,.
    - DONAT COKLAT = Rp. 9.000,.
    - DONAT LUMPIA = Rp. 4.500,.`,
  ask1: `Apakah kamu ingin membeli?`,
  ask2: `Kamu dari daerah mana?`,
  ask3: `Mau kuewe apa neng?`,
  ask4: `Berapa yang mau dibeli?`,
};
let membeli = confirm(msg.ask1);

while (membeli) {
  // varibel dan asking //
  askAsalPembeli = prompt(msg.ask2).toUpperCase();
  asalPembeli = checkLokasi(askAsalPembeli);
  inputKue = prompt(msg.ask3);
  askKue = inputKue ? inputKue : "donat coklat";
  kueNya = checkKue(askKue);
  jumlahDibeli = parseInt(prompt(msg.ask4), 10);
  // pengkondisisan //
  let hargaKueNya = kueNya[0].harga * jumlahDibeli;

  if (!isNaN(jumlahDibeli) && jumlahDibeli > 0) {
    let hargaKueNya = kueNya[0].harga * jumlahDibeli;
    let diskonTambahPr = kueNya[0].diskon * jumlahDibeli;
    let diskonTambahLk = asalPembeli[0].diskon * jumlahDibeli;
    let tambahanDisSemuanya = diskonTambahLk + diskonTambahPr;

    // Hitung PPN terlebih dahulu
    ppn = 0;
    if (hargaKueNya >= 50000) {
      ppn = (hargaKueNya * 11) / 100;
    }

    // Hitung total
    let totalSebelumDiskon = hargaKueNya + ppn;
    let totalSetelahDiskon =
      totalSebelumDiskon - tambahanDisSemuanya - asalPembeli[0].potongan;

    console.log(
      hargaKueNya,
      diskonTambahPr,
      diskonTambahLk,
      tambahanDisSemuanya,
      totalSebelumDiskon,
      totalSetelahDiskon
    );

    alert(`Total harga = Rp. ${totalSetelahDiskon.toLocaleString("id-ID")},.`);
    membeli = confirm("Mau beli lagi?");
  } else {
    alert("Anda bukan memasukan noomor, ulangi masukan nomor dari 1-99");
  }
}
