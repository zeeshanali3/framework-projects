function getPaginationParams(req) {
    const page = req.query.page || 1;
    const limit = 100;
    const offset = (page - 1) * limit;
    return {page, offset, limit };
  }


module.exports = getPaginationParams;
  