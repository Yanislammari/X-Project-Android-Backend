import express from "express";
import path from "path";

const uploadsRoutes = () => {
  const router = express.Router();
  router.use("/profile-pictures", express.static(path.join(__dirname, "../../uploads/profile-pictures")));
  return router;
}

export default uploadsRoutes;
