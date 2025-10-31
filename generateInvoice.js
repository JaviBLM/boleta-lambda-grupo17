const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateInvoice(data) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const filePath = `/tmp/boleta_${data.request_id}.pdf`;
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(18).text("Boleta de Compra", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Grupo: ${data.group_id}`);
    doc.text(`Usuario: ${data.buyer_id}`);
    doc.text(`Propiedad: ${data.property_name}`);
    doc.text(`Dirección: ${data.property_address}`);
    doc.text(`URL: ${data.property_url}`);
    doc.text(`Monto: $${data.amount}`);
    doc.text(`Fecha: ${data.purchase_date}`);
    doc.end();

    stream.on("finish", () => resolve(filePath));
  });
}

module.exports = { generateInvoice };
