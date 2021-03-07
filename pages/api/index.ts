import type { NextApiRequest, NextApiResponse } from "next";
import { Console } from "node:console";
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_API_KEY,
    },
  })
);
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const msg = {
      // to: "post@min-eiendom.no",
      to: "amkleven@gmail.com",
      from: "anders@baremathiesen.net",
      subject: "lei",
      html: `
          <h4>email: ${data.email}</h4>
          <h4>navn: ${data.name}</h4>
          <h4>start leie: ${data.startLeie}</h4>
          <h4>slutt leie: ${data.sluttLeie}</h4>
          <h4>Hva skal leies:</h4>
          ${Object.keys(data.leie).map((lei) => {
            return `${lei}, `;
          })}
          <br/>
          <h3>Tilegs info:</h3>
          <h5>${data.body}</h5>
          `,
    };
    transporter
      .sendMail(msg)
      .then(() => {})
      .catch((err) => {
        return res.status(400).json({ message: "ikke sent" });
      });
    return res.status(200).json({ message: "sent" });
  }
  return res.status(400).json({ message: "only POST method" });
};
