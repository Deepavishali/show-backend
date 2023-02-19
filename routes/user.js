import express from "express";
import bcrypt from "bcrypt";
import { genPassword, createUser, getUserByName,contactEmail } from "../query.js";
import  jwt  from "jsonwebtoken";
const router = express.Router();

//signup page//

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const isuserExist = await getUserByName(username);
    console.log(isuserExist);
    if (isuserExist) {
        res.status(400).send({ message: "User already taken" });
        return;
    }
    if (!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(password)) {
        res.status(400).send({ message: "Password pattern does not match" });
        return;
    }
    const hashedPassword = await genPassword(password);
    const result = await createUser(username, hashedPassword)
    // console.log(hashedPassword);
    res.send(result);
});

//login page //

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    if (!userFromDB) {
        res.status(400).send({ message: "Invalid credentials/username does not exist" });
        return;
    }
    const storedDbPassword = userFromDB.password;
    const isPasswordMatch=await bcrypt.compare(password,storedDbPassword);
    if(!isPasswordMatch){
        res.status(400).send({ message: "Invalid credentials/password does not exist" });
        return;
    }

//generating token//

    const token = jwt.sign({id:userFromDB._id},process.env.SECRET_KEY);

    res.send({message:"🙌Sucessful login",token:token})

});

//setting route for contactform//
router.post("/contact",(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: email,
      subject: "Contact Form Submission",
      Message:"Thankyou for contacting We will reach you soon !! Have a nice day !!😜",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent ! Check your mail !!😉" });
      }
    });
  });


export const userRouter = router;