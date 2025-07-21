import { Request, Response, NextFunction } from "express";
import SubscribeService from "../services/subscribe.service";


class SubscribeController{
  private readonly subscribeService: SubscribeService;

  constructor() {
    this.subscribeService = new SubscribeService();
  }

  async subscribe(req : Request, res : Response, next: NextFunction) {
    try {
      const {subscribeToId} = req.body;
      if (!subscribeToId) {
        res.status(400).json({ message: "subscribeToId is required" });
        return;
      }
      const result = await this.subscribeService.subscribe((req as any).user.id,subscribeToId);
      if (!result) {
        res.status(200).json({ message: "No tweet found for the subscribed user" });
        return;
      }
      res.status(201).json(result);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async unsubscribe(req : Request, res : Response, next: NextFunction) {
    try {
      const {subscribeToId} = req.body;
      if (!subscribeToId) {
        res.status(400).json({ message: "subscribeToId is required" });
        return;
      }
      await this.subscribeService.unsubscribe((req as any).user.id,subscribeToId);
      res.status(200).json("Successfully unsubscribed");
    } catch (error) {
      next(error);
    }
  }

  async getSubscriptions(req : Request, res : Response, next: NextFunction) {
    try {
      const result = await this.subscribeService.getSubscriptions((req as any).user.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default SubscribeController;