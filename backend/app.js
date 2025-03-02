import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import cors from 'cors';
import "./UserSchema.js";
import nodemailer from "nodemailer"

const app = express();
app.use(express.json());
app.use(cors());

const Users = mongoose.model("userLoginDetail")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'adityatripathi1001@gmail.com',
        pass: 'ltmq iefp qckf pubi',
    },
});

const mongooseUrl = "mongodb+srv://adityatripathi1001:8Mi9rkz3KXymmIeY@cluster0.0jyay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(mongooseUrl)
    .then(() => {
        console.log('DB is connected.');
    })
    .catch((err) => {
        console.log(err);
    });



app.get('/', (req, res) => {
    res.send("Server has started...");
});


app.post("/send-email", async (req, res) => {
    const { name, phone, email, contactTime, address, notes } = req.body;

    try {
        await transporter.sendMail({
            from: 'adityatripathi1001@gmail.com',
            to: email,
            subject: "🐶 Pet Adoption Request Received! 🐾",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background: #f9f9f9;">
                    <h2 style="color: #2c3e50; text-align: center;">🐾 Pet Adoption Request Submitted! 🐶</h2>
                    <p>Dear <strong>${name}</strong>,</p>
                    <p>We’re excited to receive your pet adoption request! Here are the details you provided:</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>📞 Phone:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>⏰ Preferred Contact Time:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${contactTime}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>📍 Address:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>📝 Notes:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${notes || "No additional notes provided"}</td>
                        </tr>
                    </table>
                    <p>Our team will review your application and reach out to you soon.</p>
                    <p>Thank you for choosing adoption and giving a pet a loving home! 🏡❤️</p>
                    <p style="text-align: center; font-size: 14px; color: #555;"> Best Regards, <br><strong>The PawPal🐾 Team</strong></p>  
                </div>
            `,
        });

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log(req.body);

        if (!fullName || !email || !password) {
            return res.status(400).send('Please fill all required fields');
        } else {
            const isAlreadyExist = await Users.findOne({ email });
            if (isAlreadyExist) {
                return res.status(400).send('User already exists');
            } else {
                const newUser = new Users({ fullName, email });
                bcryptjs.hash(password, 10, async (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).send('Error hashing password');
                    }
                    newUser.set('password', hashedPassword);
                    console.log(newUser)
                    await newUser.save();
                    return res.status(200).send('User registered successfully');
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send('Please fill all required fields');
        } else {
            const user = await Users.findOne({ email: email });
            console.log(user);
            if (!user) {
                res.status(400).send('User email or password is incorrect');
            } else {
                const validateUser = await bcryptjs.compare(password, user.password);
                // const validateUser = user.password
                console.log(validateUser);
                if (!validateUser) {
                    res.status(400).send('User email or password is incorrect');
                } else {
                    const payload = {
                        userId: user._id,
                        email: user.email
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

                    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
                        if (err) {
                            return res.status(500).send('Error generating token');
                        }
                        await Users.updateOne({ _id: user._id }, {
                            $set: { token }
                        });
                        user.save();
                        res.status(200).json({ user: { id: user._id, email: user.email, fullName: user.fullName }, token: token });
                    });
                }
            }
        }
    } catch (error) {
        console.log(error, "Error");
    }
})

app.post('/update-profile', async (req, res) => {
    const { userId, email, fullName, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        // alert('Please check your passwords!!')
        return res.status(400).send('Please check your passwords!!');
    }

    try {
        const hashedPassword = password ? await bcryptjs.hash(password, 10) : undefined;

        const updateData = {
            ...(email && { email }),
            ...(fullName && { fullName }),
            ...(hashedPassword && { password: hashedPassword }),
        };

        const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });
        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

app.listen(5000, "0.0.0.0", () => {
    console.log('Server is running on port 5000...');
});
