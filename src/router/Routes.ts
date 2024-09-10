import {
  Piano,
  Typing,
  Login,
  QuestionPool,
  Question,
  ScoreBoard,
} from "../pages";

const routes = (isLoggedIn: boolean) => [
  {
    path: isLoggedIn ? "/login" : "/",
    component: Login,
    Private: false,
  },
  {
    path: isLoggedIn ? "/" : "/questions",
    component: QuestionPool,
    Private: false,
  },
  {
    path: ":id",
    component: Question,
    Private: true,
  },
  {
    path: "/piano",
    component: Piano,
    Private: true,
  },
  {
    path: "/typing",
    component: Typing,
    Private: true,
  },
  {
    path: "/score-board",
    component: ScoreBoard,
    Private: true,
  },
];

export default routes;
