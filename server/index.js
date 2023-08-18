const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.static("public"));

const JWT_SECRET = "secret";
const USERS = [];
const SUBMISSIONS = [];

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ msg: "Missing auth header" });
  }

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Incorrect token" });
  }
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});
const userSchema = {
  email: String,
  password: String
};

const User = new mongoose.model("User", userSchema);

// Problem data
const PROBLEMS = [
  {
    problemId: "1",
    title: "201. Bitwise AND of Numbers Range",
    difficulty: "Medium",
    acceptance: "42%",
    description:
      "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
    exampleIn: "left = 5, right = 7",
    exampleOut: "4",
  },
  {
    problemId: "2",
    title: "202. Add two numbers",
    difficulty: "Medium",
    acceptance: "41%",
    description:
      "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
    exampleIn: "a = 100 , b = 200",
    exampleOut: "300",
  },
  {
    problemId: "3",
    title: "203. Happy Number",
    difficulty: "Easy",
    acceptance: "54.9%",
    description: "Write an algorithm to determine if a number n is happy.",
    exampleIn: "n = 19",
    exampleOut: "true",
  },
  {
    problemId: "4",
    title: "204. Remove Linked List Elements",
    difficulty: "Hard",
    acceptance: "42%",
    description: "Given number k , removed kth element",
    exampleIn: "list: 1->2->3 , k=2",
    exampleOut: "1->3",
  },
  {
    problemId: "5",
    title: "205. Bitwise AND of Numbers Range",
    difficulty: "Medium",
    acceptance: "42%",
    description:
      "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
    exampleIn: "left = 5, right = 7",
    exampleOut: "4",
  },
  {
    problemId: "6",
    title: "206. Add two numbers",
    difficulty: "Medium",
    acceptance: "41%",
    description:
      "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
    exampleIn: "a = 100 , b = 200",
    exampleOut: "300",
  },
  {
    problemId: "7",
    title: "207. Happy Number",
    difficulty: "Easy",
    acceptance: "54.9%",
    description: "Write an algorithm to determine if a number n is happy.",
    exampleIn: "n = 19",
    exampleOut: "true",
  },
  {
    problemId: "8",
    title: "208. Remove Linked List Elements",
    difficulty: "Hard",
    acceptance: "42%",
    description: "Given number k , removed kth element",
    exampleIn: "list: 1->2->3 , k=2",
    exampleOut: "1->3",
  },
];

app.get("/", (req, res) => {
  res.json({
    msg: "hello world",
  });
});

app.get("/problems", (req, res) => {
  const filteredProblems = PROBLEMS.map(({ problemId, difficulty, acceptance, title }) => ({
    problemId, difficulty, acceptance, title
  }));

  res.json({
    problems: filteredProblems,
  });
});

app.get("/problem/:id", (req, res) => {
  const id = req.params.id;
  const problem = PROBLEMS.find((x) => x.problemId === id);

  if (!problem) {
    return res.status(404).json({});
  }

  res.json({
    problem,
  });
});

// app.get("/me", auth, (req, res) => {
//   const user = USERS.find((x) => x.id === req.userId);
//   res.json({ email: user.email, id: user.id });
// });

app.get("/submissions/:problemId", auth, (req, res) => {
  const problemId = req.params.problemId;
  const submissions = SUBMISSIONS.filter(
    (x) => x.problemId === problemId && x.userId === req.userId
  );
  res.json({
    submissions,
  });
});

app.post("/submission", auth, (req, res) => {
  const isCorrect = Math.random() < 0.5;
  const { problemId, submission } = req.body;

  SUBMISSIONS.push({
    submission,
    problemId,
    userId: req.userId,
    status: isCorrect ? "AC" : "WA",
  });

  res.json({
    status: isCorrect ? "AC" : "WA",
  });
});

app.post(", (req, res) => {

  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  console.log("helxczxcbc");
  newUser.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("hello");
     // res.render('/problems');
    }
  })

  // // const { email, password } = req.body;
  // // console.log(email,password);
  // if (USERS.find((x) => x.email === email)) {
  //   return res.status(403).json({ msg: "Email already exists" });
  // }
  // // else{
  // //   return res.json({msg: "Email Not found"});
  // // }

  // USERS.push({
  //   email,
  //   password,
  //   id: USERS.length + 1,
  // });

  // res.json({
  //   msg: "Success",
  // });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find((x) => x.email === email);

  if (!user || user.password !== password) {
    return res.status(403).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
