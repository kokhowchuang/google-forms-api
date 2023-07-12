const ResponseModel = require('../models/response.model.js');

export async function addResponse(req, res, next) {
  const { formId, userId, response } = req.body;

  if (response.length > 0) {
    const newResponse = new ResponseModel({ formId, userId, response });

    await newResponse.save().then((docs) => {
      res.status(200).json(docs);
    });
  } else {
    res.status(400).send('Fill atleast one field, MF!');
  }
}
