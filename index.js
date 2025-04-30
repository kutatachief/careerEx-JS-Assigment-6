const express = require('express');
const app = express();
const PORT = process.env.PORT || 6000;

// const bodyParser = require('body-parser');

app.get('/', (request, respo) => {
  respo.send('Hello World from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json()); // Middleware to parse JSON body

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the API!' });
});


// assigment started from here

const drugs = [

  { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },
 
  { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },
 
  { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },
 
  { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },
 
  { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },
 
  { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },
 
  { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },
 
  { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },
 
  { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },
 
  { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },
 
  { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },
 
  { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },
 
  { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },
 
  { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },
 
  { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },
 
  { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },
 
  { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },
 
  { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },
 
  { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },
 
  { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }
 
 ];
 
 
//  1. GET /drugs/antibiotics
 
//  Return all drugs where category is "Antibiotic".
 
app.get('/drugs/antibiotics', (req, res) => {
  const antibiotics = drugs.filter(drug => drug.category === "Antibiotic");
  res.json(antibiotics);
});


//  2.GET /drugs/names
 
//  Return an array of all drug names converted to lowercase.

app.get('/drugs/names', (req, res) => {
  const drugNames = drugs.map(drug => drug.name.toLowerCase());
  res.json(drugNames);
});
 
 
//  3.POST /drugs/by-category
 
//  Accept a category in the body and return all drugs under that category.
//  Example body: { "category": "Antibiotic" }

app.post('/drugs/by-category', (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Category is required in the request body." });
  }

  const filteredDrugs = drugs.filter(
    drug => drug.category.toLowerCase() === category.toLowerCase()
  );

  res.json(filteredDrugs);
});
 
 
 
//  4.GET /drugs/names-manufacturers
 
//  Return an array of objects showing each drug’s name and manufacturer.
 
app.get('/drugs/names-manufacturers', (req, res) => {
  const result = drugs.map(drug => ({
    name: drug.name,
    manufacturer: drug.manufacturer
  }));
  res.json(result);
});

//  5.GET /drugs/prescription
 
//  Return all drugs where isPrescriptionOnly is true.
 
app.get('/drugs/prescription', (req, res) => {
  const prescriptionDrugs = drugs.filter(drug => drug.isPrescriptionOnly === true);
  res.json(prescriptionDrugs);
});

 
//  6. GET /drugs/formatted
 
//  Return a new array where each item is a string like:
//  "Drug: [name] - [dosageMg]mg"

app.get('/drugs/formatted', (req, res) => {
  const formattedDrugs = drugs.map(drug => `Drug: ${drug.name} - ${drug.dosageMg}mg`);
  res.json(formattedDrugs);
});

 
//  7.GET /drugs/low-stock
 
//  Return all drugs where stock is less than 50.
 
app.get('/drugs/low-stock', (req, res) => {
  const lowStockDrugs = drugs.filter(drug => drug.stock < 50);
  res.json(lowStockDrugs);
});

 
//  8.GET /drugs/non-prescription
 
//  Return all drugs where isPrescriptionOnly is false.
 
app.get('/drugs/non-prescription', (req, res) => {
  const nonPrescriptionDrugs = drugs.filter(drug => drug.isPrescriptionOnly === false);
  res.json(nonPrescriptionDrugs);
});

 
//  9.POST /drugs/manufacturer-count
 
//  Accept a manufacturer in the body and return how many drugs are produced by that manufacturer.
//  Example body: { "manufacturer": "Pfizer" }

app.post('/drugs/manufacturer-count', (req, res) => {
  const { manufacturer } = req.body;

  if (!manufacturer) {
    return res.status(400).json({ error: "Manufacturer is required in the request body." });
  }

  const count = drugs.filter(
    drug => drug.manufacturer.toLowerCase() === manufacturer.toLowerCase()
  ).length;

  res.json({ manufacturer, count });
});

 
//  10. GET /drugs/count-analgesics
 
//  Count and return how many drugs have the category "Analgesic".

app.get('/drugs/count-analgesics', (req, res) => {
  const count = drugs.filter(drug => drug.category === "Analgesic").length;
  res.json({ count });
});
