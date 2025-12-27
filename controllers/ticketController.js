exports.createTicket = async (req, res) => {
  const ticket = await Ticket.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(ticket);
};

exports.myTickets = async (req, res) => {
  const tickets = await Ticket.find({ createdBy: req.user.id });
  res.json(tickets);
};


exports.allTickets = async (req, res) => {
  const tickets = await Ticket.find().populate("createdBy", "name email");
  res.json(tickets);
};


exports.updateTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(ticket);
};

exports.deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "Ticket deleted" });
};
