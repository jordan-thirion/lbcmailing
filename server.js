const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, object, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.MAIL_USER,
    subject: `Contact de ${name} pour ${object}`,
    text: message
  };

  try{
    await transporter.sendMail(mailOptions, (err, info) => {
      console.log(`Email envoyé de ${email} via ${process.env.MAIL_USER}`);
      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur en ligne sur le port ${PORT}`));
