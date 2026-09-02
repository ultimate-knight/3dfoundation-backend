const express = require("express");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const file = require("file");
const { dbconnect } = require("./db/db");
const { error } = require("console");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());

app.use(cors());

console.log(process.env.user);
console.log(process.env.password);

const port = 9000;

//nodemailer
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
  family: 4
});

transport.verify((error) => {
  if (error) {
    console.log("nodemailer failed to connect", error.message);
  } else {
    console.log("nodemailer connected to the server");
  }
});

// partnerships

app.post("/partnership", (req, res) => {
  const { partnership, Name, phone, email, company, remarks } = req.body;

  let sql =
    "insert into partnership2(partnership,Name,phone,email,company,remarks) values(?,?,?,?,?,?)";

  dbconnect.query(
    sql,
    [partnership, Name, phone, email, company, remarks],
    async (error, result) => {
      try {
        await transport.sendMail({
          from: process.env.user,
          to: process.env.user,
          subject: "email submitted for partnership program at 3dwebsoft",
          text: `
     partnership:${partnership},
     Name:${Name},
     phone:${phone},
     email:${email},
     company:${company},
     remarks:${remarks}
                `,
        });

        await transport.sendMail({
          from: process.env.user,
          to: email,
          subject: "email acknowledgement for partnership program at 3dwebsoft foundation",
          text: `
      Dear ${Name},

      Thank you for contacting 3dwebsoft foundation 
      regarding a partnership. 
      We have received your email and will review it 
      shortly. 
      Our team will contact you soon.

      Thank you,

      Yours sincerely,
      3dwebsoft`,
        });
        res.json({ Message: "data added successfully" });
      } catch (error) {
        if (error) {
          console.log("error", error.message);
        }
        res
          .status(500)
          .json({ error: "partnership saved but unable to send email" });
      }
    },
  );
});

app.get("/partnership", (req, res) => {
  let sql = "select * from partnership2";

  dbconnect.query(sql, (error, result) => {
    if (error) {
      console.log("error", error.message);
    }
    res.json({ Message: "data fetched successfully", data: result });
  });
});

app.delete("/partnership/:id", (req, res) => {
  const { id } = req.params;

  const sql = "delete from partnership2 where id=?";

  dbconnect.query(sql, [id], (err, result) => {
    if (err) {
      console.log("error", err.message);
    }
    res.json({ Message: `entry with ${id} deleted successfully` });
  });
});

app.delete("/partnership", (req, res) => {
  const sql = "delete from partnership2";

  dbconnect.query(sql, (err) => {
    if (err) {
      console.log("error", err.message);
    }
    res.json({ Message: `entries deleted successfully` });
  });
});

// admissions

app.post("/admission", (req, res) => {
  const { city, student, contact, email, remarks, course } = req.body;

  const sql =
    "insert into Admission2(city,student,contact,email,remarks,course) values(?,?,?,?,?,?)";

  dbconnect.query(
    sql,
    [city, student, contact, email, remarks, course],
    async (error, result) => {
    try {
        await transport.sendMail({
          from: process.env.user,
          to: process.env.user,
          subject: "email submitted for admission program at 3dwebsoft foundation",
          text: `
     city:${city},
     student:${student},
     contact:${contact},
     email:${email},
     remarks:${remarks},
     course:${course}
                `,
        });

        await transport.sendMail({
          from: process.env.user,
          to: email,
          subject: "email acknowledgement for admission program at 3dwebsoft foundation",
          text: `
      Dear ${student},



      Thank you for contacting 3dwebsoft foundation 
      regarding an admission. 
      We have received your email and will review it 
      shortly.
      Our team will contact you soon.

      Thank you,

      Yours sincerely,
      3dwebsoft`,
        });
        res.json({ Message: "data added successfully" });
      } catch (error) {
        if (error) {
          console.log("error", error.message);
        }
        res
          .status(500)
          .json({ error: "partnership saved but unable to send email" });
      }
    },
  );
});

app.get("/admission", (req, res) => {
  const sql = "select * from Admission2";

  dbconnect.query(sql, (error, result) => {
    if (error) {
      console.log("error", error.message);
    }

    res.json({ message: "data fetched successfully", data: result });
  });
});

app.delete("/admission/:id", (req, res) => {
  const { id } = req.params;

  const sql = "delete from Admission2 where id=?";

  dbconnect.query(sql, [id], (err, result) => {
    if (error) {
      console.log("error", error.message);
    }
    res.json({ Message: `entry with ${id} deleted successfully` });
  });
});

// ngo

app.post("/ngo", (req, res) => {
  const { ngo, name, contact, city, email, remarks } = req.body;

  const sql =
    "insert into Ngo2(ngo,name,contact,city,email,remarks) values(?,?,?,?,?,?)";

  dbconnect.query(
    sql,
    [ngo, name, contact, city, email, remarks],
    async (error, result) => {
      try {
        await transport.sendMail({
          from: process.env.user,
          to: process.env.user,
          subject: "email submitted for ngo program at 3dwebsoft foundation",
          text: `
     ngo:${ngo},
     name:${name},
     contact:${contact},
     city:${city},
     email:${email},
     remarks:${remarks}
                `,
        });

        await transport.sendMail({
          from: process.env.user,
          to: email,
          subject: "email acknowledgement for ngo program at 3dwebsoft foundation",
          text: `
      Dear ${name},

      Thank you for contacting 3dwebsoft foundation 
      regarding ngo program. 
      We have received your email and will review it 
      shortly.
      Our team will contact you soon.

      Thank you,

      Yours sincerely,
      3dwebsoft`,
        });
        res.json({ Message: "data added successfully" });
      } catch (error) {
        if (error) {
          console.log("error", error.message);
        }
        res
          .status(500)
          .json({ error: "partnership saved but unable to send email" });
      }
   
    },
  );
});

app.get("/ngo", (req, res) => {
  const sql = "select * from Ngo2";

  dbconnect.query(sql, (error, result) => {
    if (error) {
      console.log("error", error.message);
    }

    res.json({ message: "data fetched successfully", data: result });
  });
});

app.delete("/ngo/:id", (req, res) => {
  const { id } = req.params;

  const sql = "delete from Ngo2 where id=?";

  dbconnect.query(sql, [id], (err, result) => {
    if (error) {
      console.log("error", error.message);
    }
    res.json({ Message: `entry with ${id} deleted successfully` });
  });
});

// volunteer

app.post("/volunteer", (req, res) => {
  const { state, volunteer, contact, email, city, area } = req.body;

  const sql =
    "insert into Volunteer2(state,volunteer,contact,email,city,area) values(?,?,?,?,?,?)";

  dbconnect.query(
    sql,
    [state, volunteer, contact, email, city, area],
    async (error, result) => {

        try {
        await transport.sendMail({
          from: process.env.user,
          to: process.env.user,
          subject: "email submitted for volunteer program at 3dwebsoft foundation",
          text: `
     state:${state},
     volunteer:${volunteer},
     contact:${contact},
     email:${email},
     city:${city},
     area:${area}
                `,
        });

        await transport.sendMail({
          from: process.env.user,
          to: email,
          subject: "email acknowledgement for volunteer program at 3dwebsoft foundation",
          text: `
      Dear ${volunteer},

      Thank you for contacting 3dwebsoft foundation 
      regarding volunteer program. 
      We have received your email and will review it 
      shortly.
      Our team will contact you soon.

      Thank you,

      Yours sincerely,
      3dwebsoft`,
        });
        res.json({ Message: "data added successfully" });
      } catch (error) {
        if (error) {
          console.log("error", error.message);
        }
        res
          .status(500)
          .json({ error: "partnership saved but unable to send email" });
      }
   
      
    },
  );
});

app.get("/volunteer", (req, res) => {
  const sql = "select * from Volunteer2";

  dbconnect.query(sql, (error, result) => {
    if (error) {
      console.log("error", error.message);
    }

    res.json({ message: "data fetched successfully", data: result });
  });
});

app.delete("/volunteer/:id", (req, res) => {
  const { id } = req.params;

  const sql = "delete from Volunteer2 where id=?";

  dbconnect.query(sql, [id], (err, result) => {
    if (error) {
      console.log("error", error.message);
    }
    res.json({ Message: `entry with ${id} deleted successfully` });
  });
});

// newsletter

app.post("/newsletter", (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email is required" });
  }

  const normalizedEmail = email;
  const sql = "insert into newsletter4(email) values(?)";
  const sql2 = "select * from newsletter4 where email=?";

  dbconnect.query(sql2, [normalizedEmail], async (error, result) => {
    if (error) {
      console.log("error", error.message);
      return res.status(500).json({ error: "database error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "you are already subscribed" });
    }

    dbconnect.query(sql, [normalizedEmail], async (insertError) => {
      if (insertError) {
        console.log("error", insertError.message);
        return res.status(500).json({ error: "failed to save newsletter subscription" });
      }

      try {
        await transport.sendMail({
          from: process.env.user,
          to: process.env.user,
          subject: "email submitted for newsletter subscription at 3dwebsoft foundation",
          text: `
     email:${email},
                `,
        });

        await transport.sendMail({
          from: process.env.user,
          to: email,
          subject: "email acknowledgement for subscription at 3dwebsoft foundation newsletter",
          text: `
    Hi,

    Thank you for subscribing newsletter
    for 3dwebsoft foundation.
    Stay tuned for more updates
    from newsletter.

    Thank you,

    Yours sincerely,
    3dwebsoft`,
        });

        return res.status(200).json({ message: "data added successfully" });
      } catch (error) {
        if (error) {
          console.log("error", error.message);
        }
        return res.status(500).json({ error: "newsletter saved but unable to send email" });
      }
    });
  });
});

app.get("/newsletter", (req, res) => {
  const sql = "select * from newsletter4";

  dbconnect.query(sql, (error, result) => {
    if (error) {
      console.log("error", error.message);
    }

    res.json({ message: "data fetched successfully", data: result });
  });
});

app.delete("/newsletter", (req, res) => {
  const sql = "delete from newsletter4";

  dbconnect.query(sql, (err, result) => {
    if (error) {
      console.log("error", error.message);
    }
    res.json({ Message: `entry with  deleted successfully` });
  });
});

app.delete("/newsletter/:id", (req, res) => {
  const { id } = req.params;

  const sql = "delete from newsletter4 where id=?";

  dbconnect.query(sql, [id], (err, result) => {
    if (error) {
      console.log("error", error.message);
    }
    res.json({ Message: `entry with ${id} deleted successfully` });
  });
});

//enrollment

app.post("/enrollment", (req, res) => {
  const { course, name, contact, email, state, gender } = req.body;

  const sql =
    "insert into enrollment2(course,name,contact,email,state,gender) values(?,?,?,?,?,?)";

  dbconnect.query(
    sql,
    [course, name, contact, email, state, gender],
    async (error, result) => {
    
     try {
        await transport.sendMail({
          from: process.env.user,
          to: process.env.user,
          subject: "email submitted for enrollment program at 3dwebsoft foundation",
          text: `
     course:${course},
     name:${name},
     contact:${contact},
     email:${email},
     state:${state},
     gender:${gender}
                `,
        });

        await transport.sendMail({
          from: process.env.user,
          to: email,
          subject: "email acknowledgement for enrollment program at 3dwebsoft foundation",
          text: `
      Dear ${name},

      Thank you for contacting 3dwebsoft foundation 
      regarding an enrollment program. 
      We have received your email and will review it 
      shortly.
      Our team will contact you soon.

      Thank you,

      Yours sincerely,
      3dwebsoft`,
        });
        res.json({ Message: "data added successfully" });
      } catch (error) {
        if (error) {
          console.log("error", error.message);
        }
        res
          .status(500)
          .json({ error: "partnership saved but unable to send email" });
      }
   
    },
  );
});

app.get("/enrollment", (req, res) => {
  const sql = "select * from enrollment2";

  dbconnect.query(sql, (error, result) => {
    if (error) {
      console.log("error", error.message);
      res.status(404).error("error", error.message);
    }

    res.json({ Message: "enrollment data fetched successfully", data: result });
  });
});

app.delete("/enrollment", (req, res) => {
  const sql = "delete from enrollment2";

  dbconnect.query(sql, (err, result) => {
    if (err) {
      console.log("error", err.message);
    }
    res.json({ Message: `entries deleted successfully` });
  });
});

app.delete("/enrollment/:id", (req, res) => {
  const { id } = req.params;

  const sql = "delete from enrollment2 where id=?";

  dbconnect.query(sql, [id], (err, result) => {
    if (err) {
      console.log("err", err.message);
    }
    res.json({ Message: `entry with ${id} deleted successfully` });
  });
});

// login

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const sql = "insert into Login1(username,password) values(?,?)";

  dbconnect.query(sql, [username, password], (error, result) => {
    if (!username && !password) {
      res.send("password or email is required");
    }
    if (error) {
      res.json({ error: error.message });
      console.log("error", error.message);
    }

    res.json({
      message: "user registered successfully",
      data: result.affectedRows,
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1. Check empty credentials
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const sql = "SELECT * FROM Login1 WHERE username=? AND password=?";

  // 2. Check database
  dbconnect.query(sql, [username, password], (error, result) => {
    if (error) {
      console.log("Error:", error.message);
      return res.status(500).json({
        message: "Database error",
      });
    }

    // 3. Wrong credentials
    if (result.length === 0) {
      return res.status(401).json({
        message: "You are not authroized to login",
      });
    }

    // 4. Success
    return res.status(200).json({
      message: "User logged in successfully",
      data: result,
    });
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
