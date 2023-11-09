const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { fetchContact } = require("./utility/contacts.js");

// Konfigurasi alamat host dan port
const host = "localhost"; // alamat host
const port = 3000; // alamat port

// Mengatur view engine menggunakan EJS
app.set("view engine", "ejs");

app.use(expressLayouts);

app.use(express.static("public"));

// // application level middleware
// app.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

app.get("/", (req, res) => {
  res.render("index", {
    namaWeb: "around world.",
    title: "around world.",
    layout: "layout/core-layout",
  });
});

// Handle permintaan GET ke "/about" dan mengirimkan file "about.html"
app.get("/about", (req, res) => {
  res.render("about", {
    title: "around world. - About",
    layout: "layout/core-layout",
  });
});

// Handle permintaan GET ke "/contact" dan mengirimkan file "contact.html"
app.get("/contact", (req, res) => {
  const contacts = fetchContact();
  // Data contact static
  // const contacts = [
  //   { nama: "Fadel Muhamad Aliyafasya", mobile: "082121569844" },
  //   { nama: "Raya Adinda Jayadi Ahmad", mobile: "082121569999" },
  //   { nama: "Ahmad Faidh", mobile: "082121567655" },
  //   { nama: "Raya Asmarinda", mobile: "085151569999" },
  //   { nama: "Lukmanul Hakim", mobile: "085221576999" },
  // ];

  if (contacts.length === 0) {
    // Menampilkan pesan pemberitahuan jika objek contacts kosong
    res.render("contact", {
      title: "around world. - Contact",
      contacts,
      isEmpty: true, // Variabel flag untuk menunjukkan bahwa objek kosong
      layout: "layout/core-layout.ejs", // Ejs core layout
    });
  } else {
    res.render("contact", {
      title: "around world. - Contact",
      contacts,
      isEmpty: false, // Variabel flag untuk menunjukkan bahwa objek tidak kosong
      layout: "layout/core-layout.ejs", // Ejs core layout
    });
  }
});

// Menangani permintaan GET ke halaman "Product" dengan parameter ID dan query category
app.get("/product/:id", (req, res) => {
  res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`);
});

// Middleware untuk menangani permintaan yang tidak sesuai dengan rute yang ada
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Not Found</h1>");
});

// Menjalankan server Express pada host dan port yang ditentukan
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
