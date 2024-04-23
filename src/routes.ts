import { Router } from "express";
import pricingRouter from "./app/pricing/pricing.routes";
import seedRouter from "./app/seed/seed.routes";

const router = Router();

router.use("/pricing", pricingRouter);
router.use("/seed", seedRouter);

export default router;
