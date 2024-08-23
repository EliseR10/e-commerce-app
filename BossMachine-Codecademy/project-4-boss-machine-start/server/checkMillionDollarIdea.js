const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;

    //wrote as in Number(numWeeks) to transfer a string into a number
    const totalMoney = Number(numWeeks) * Number(weeklyRevenue);

    //if there is none of these... then send 400 status
    if (!numWeeks || !weeklyRevenue || isNaN(totalMoney) || totalMoney < 1000000) {
      res.status(400).send();
    } else {
      next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
