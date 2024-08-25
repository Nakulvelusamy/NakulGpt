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
    designation: "Professor",
    qualification: "M.E., Ph.D.",
    experience: "Teaching: 20.8 Yrs, Research: 0 Yrs",
    specialization: "Image Processing",
    email: "sakthivelk@ksrct.ac.in",
    publications: "IJ: 04, IC: 04, NC: 10",
    image: "img/sakthivel_sir.jpg"
  },
  // Add more faculty details here
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
  return `
    <div class="faculty-profile">
      <img src="${faculty.image}" alt="${faculty.name}">
      <div>
        <h2>${faculty.name}</h2>
        <p><strong>Designation:</strong> ${faculty.designation}</p>
        <p><strong>Educational Qualification:</strong> ${faculty.qualification}</p>
        <p><strong>Experience:</strong> ${faculty.experience}</p>
        <p><strong>Area of Specialization:</strong> ${faculty.specialization}</p>
        <p><strong>Email ID:</strong> <a href="mailto:${faculty.email}">${faculty.email}</a></p>
        <p><strong>Publications:</strong> ${faculty.publications}</p>
      </div>
    </div>
  `;
};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
