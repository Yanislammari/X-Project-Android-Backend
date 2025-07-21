import express from "express";
import SubscribeController from "../controllers/subscribe.controller";
import { createVerifyTokenMiddleware } from "../middleware/token";

const subscribeRoutes = () => {
  const router = express.Router();
  const subscribeController = new SubscribeController();

  router.post("/unsub", createVerifyTokenMiddleware(), subscribeController.unsubscribe.bind(subscribeController));
  router.post("/sub", createVerifyTokenMiddleware(),subscribeController.subscribe.bind(subscribeController));
  router.get("/sub", createVerifyTokenMiddleware(), subscribeController.getSubscriptions.bind(subscribeController));

  return router;
}

export default subscribeRoutes;