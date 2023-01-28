import nodemailer from 'nodemailer';

const sendMail = async (subject, text, html, recipents = []) => {
  try {
    const mailerUser = process.env.DEFAULT_MAILER_USER;
    const mailerPass = process.env.DEFAULT_MAILER_PASSWORD;

    console.log(mailerUser, mailerPass);

    if (!mailerUser || !mailerPass) {
      throw Error('Environment mailer credentials are missing');
    }

    if (recipents.length) {
      throw Error('No recipents');
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailerUser,
        pass: mailerPass,
      },
    });

    await transporter.sendMail({
      from: '"Comix Mailer 👻" <comix.mailer@gmail.com>', // sender address
      to: recipents, // sender address
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Mail sent');

    // send mail with defined transport object
  } catch (e) {
    console.log('Mail sent error', e.message);
  }
};

export default sendMail;
