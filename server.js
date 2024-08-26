const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

const apiKey = "AIzaSyA2S1GzYPZ-vHvNdUCwdOZvN-IRckRII9o";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Faculty details mapping
const facultyDetails = {
  "sakthivel": {
    name: "Dr. K. Sakthivel",
    designation: "Professor & Head",
    qualification: "AICTE Faculty ID: 1-461677947 | College ID: KSRCSE07",
    emails: ["hodcsbs@ksrct.ac.in", "sakthivelk@ksrct.ac.in"],
    biography: `Dr. K. Sakthivel received the M.E. (Computer Science and Engineering) degree in 2005, and Ph.D. degree in 2012. He is working as a Professor in the Department of Computer Science and Engineering, K.S.Rangasamy College of Technology (Autonomous), Tiruchengode. He has 25 years of teaching experience. He has published papers in several international journals and conferences. His areas of research interest include image retrieval using hierarchical agglomerative and K-Means clustering algorithms. He is an active member of ISTE and IAENG.`,
    image: "img/sakthivel.jpg"
  },
  "manimaran": {
    name: "Dr. P. Manimaran",
    designation: "Associate Professor",
    qualification: "AICTE Faculty ID: 1-7501819748 | College ID: CTCSF027",
    emails: ["manimaran@ksrct.ac.in"],
    biography: `Dr. P. Manimaran is working as an Associate Professor in the Department of Computer Science and Business Systems at K.S.Rangasamy College of Technology. He received his M.E. degree and Ph.D. from Anna University. He has 17 years of teaching experience. His research interests include Data Mining. He has published more than 5 papers in International Journals and 14 papers in Conferences. He has filed 2 patents and published them. He has delivered guest lectures at reputed institutions.`,
    image: "img/manimaran.png"
  },
  "logapriya": {
    name: "Mrs. R. Logapriya",
    designation: "Assistant Professor",
    qualification: "AICTE Faculty ID: 1-11329880622  | College ID: CTITF024",
    emails: ["logapriyar@ksrct.ac.in"],
    biography: `Mrs. R. Logapriya is working as an Assistant Professor in the Department of Computer Science and Business Systems at K.S.Rangasamy College of Technology, Tiruchengode, Namakkal (DT), Tamilnadu, India. She graduated from K.S.Rangasamy College of Technology and secured a Master of Technology in Information Technology at Vivekanandha College of Engineering for Women. She is specialized in Data mining, DBMS, and Programming with over 2 years of teaching experience. She strives to inspire and mentor students to reach their full potential by creating an inclusive and engaging learning environment. She is dedicated to equipping students with the skills and knowledge they need to succeed and believes in the power of education to transform lives and shape a brighter future.`,
    image: "img/logapriya.png"
  },
  "karthikeyan": {
    name: "Mr. K. Karthikeyan",
    designation: "Assistant Professor",
    qualification: "AICTE Faculty ID: 1-4626338034 | College ID: CTITF025",
    emails: ["karthikeyank@ksrct.ac.in"],
    biography: `Mr. K. Karthikeyan is an Assistant Professor in the Department of Computer Science and Business Systems at K.S.Rangasamy College of Technology. He has completed his M.E. degree and is pursuing a Ph.D. from Anna University. He has 10 years of teaching experience. His research interests include Network Security and Machine Learning. He has published 3 papers in International Refereed Journals and 4 papers in Conferences. He has filed 2 patents and published them, and also submitted 2 book chapters.`,
    image: "img/ksrthikeyan.png"
  },
  "vignesh": {
    name: "Mr. S. Vignesh",
    designation: "Assistant Professor",
    qualification: "AICTE Faculty ID: 1-478121431 | College ID: CTCBF008",
    emails: ["vigneshs@ksrct.ac.in"],
    biography: `Mr. S. Vignesh is an Assistant Professor in the Department of Computer Science and Business Systems at K.S.Rangasamy College of Technology. He has completed his M.E. in Computer Science and Engineering and is currently pursuing a Ph.D. from Anna University. With over 12 years of dedicated teaching experience, he brings a passion for fostering intellectual growth and academic excellence in the field of Computer Science and Business Systems. His area of interest lies in Machine Learning, a dynamic and rapidly evolving field with immense potential to transform industries and drive technological advancements.`,
    image: "img/vignesh.png"
  },
  "karthik": {
  name: "Mr. R. Karthik",
  designation: "Assistant Professor",
  specialization: "Computer Networks",
  aicteId: "1-3187267705",
  collegeId: "CTCBF007",
  emails: ["karthikr@ksrct.ac.in"],
  biography: "Mr. R. Karthik is an Assistant Professor in the Department of Computer Science and Business Systems at K.S.Rangasamy College of Technology. He has received his M.E degree from Anna University. He has a teaching experience of 13 years in total. His research interest is in Wireless Sensor Networks. He has published more than 5 papers in International Journals and 6 papers in Conferences. He has filed 1 patent and published it. He has delivered guest lectures at reputed institutions. He is an Innovation Ambassador.",
  image: "img/karthik.png"
},
"venkatesh": {
  name: "Mr. P. Venkatesh",
  designation: "Assistant Professor",
  specialization: "Computer Networks",
  aicteId: "1-461677947",
  collegeId: "CTCBF009",
  emails: ["venkateshp@ksrct.ac.in"],
  biography: "Mr. P. Venkatesh is an Assistant Professor in the Department of Computer Science and Business Systems at K.S.Rangasamy College of Technology. He has received his M.E degree from Anna University. He has a teaching experience of 3 months in total. His research interest is in Computer Networks. He has industry experience which aids in teaching the students effectively.",
  image: "img/venkates.png"
},
"udhaya": {
  name: "Mrs. T. Udhaya",
  designation: "Programmer",
  emails: ["udhaya@ksrct.ac.in"],
  biography: "",
  image: "img/udhaya.png"
},
"porkodi": {
  name: "Mrs. K. Porkodi",
  designation: "Lab Assistant",
  emails: ["porkodik@ksrct.ac.in"],
  biography: "",
  image: "img/poerkodi.png"
},
"vaideki": {
  name: "Mrs. P. Vaideki",
  designation: "Lab Technician",
  emails: ["vaidekip@ksrct.ac.in"],
  biography: "",
  image: "img/vaideki.png"
},
"mohanraj": {
  name: "Dr. E. Mohanraj",
  designation: "Head & Associate Professor",
  specialization: "Network Security",
  collegeId: "KSRCSE21",
  qualification: "B.E., M.E., Ph.D.",
  publications: "IJ: 23, IC: 30, NC: 07",
  emails: ["mohanraj@2023.ksrct.ac.in"],
  biography: "",
  image: "img/Mohanraj.jpg"
}

};


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Check if the message is a faculty name
  const faculty = facultyDetails[userMessage.toLowerCase()];
  if (faculty) {
    return res.json({ response: formatFacultyDetails(faculty) });
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(userMessage);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Function to format faculty details
const formatFacultyDetails = (faculty) => {
  const emailLinks = faculty.emails.map(email => `<a href="mailto:${email}">${email}</a>`).join(", ");
  return `
    <div class="faculty-profile">
      <img src="${faculty.image}" alt="${faculty.name}">
      <div>
        <h2>${faculty.name}</h2>
        <p><strong>Designation:</strong> ${faculty.designation}</p>
        <p><strong>Qualification:</strong> ${faculty.qualification}</p>
        <p><strong>Email IDs:</strong> ${emailLinks}</p>
        <p>${faculty.biography}</p>
      </div>
    </div>
  `;
};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
