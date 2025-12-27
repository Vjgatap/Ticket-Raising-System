const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const controller = require("../controllers/ticketController");

router.post("/", auth, controller.createTicket);
router.get("/my", auth, controller.myTickets);
router.get("/", auth, role("admin"), controller.allTickets);
router.put("/:id", auth, controller.updateTicket);
router.delete("/:id", auth, role("admin"), controller.deleteTicket);

module.exports = router;
