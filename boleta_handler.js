//prueba 2 de actualización CI
const { generateInvoice } = require("./generateInvoice");
const { uploadToS3 } = require("./uploadToS3");

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const filePath = await generateInvoice(body);
    const fileKey = `boleta_${body.request_id || Date.now()}.pdf`;
    const url = await uploadToS3(filePath, fileKey);


    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Boleta generada correctamente",
        url,
      }),
    };
  } catch (error) {
    console.error("Error generando boleta:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generando boleta",
        error: error.message,
      }),
    };
  }
};
