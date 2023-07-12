'use strict';

import { mongoose } from 'mongoose';
import FormModel from '../models/form.model';
import UserModel from '../models/user.model';

export async function listForm(req, res, next) {
  try {
    var result = await Form.find().lean();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
}

export async function getSingleForm(req, res, next) {
  const formId = req.params.formId;

  const form = await FormModel.findOne({ _id: formId });

  if (form == null) {
    res.status(404).send('Form not found');
  } else {
    res.status(200).json(form);
  }
}

export async function createForm(req, res, next) {
  const data = {
    createdBy: req.body.createdBy,
    name: req.body.name,
    description: req.body.description,
  };
  const newForm = new FormModel(data);

  await newForm.save().then((docs) => {
    UserModel.updateOne(
      { _id: data.createdBy },
      { $push: { createdForms: docs._id } }
    )
      .then(() => {
        console.log('Form id added to user details');
      })
      .catch((error) => console.log('got some error'));

    res.status(200).json(docs);
  });
}

export async function editForm(req, res, next) {
  const { formId } = req.params;
  const { name, description, questions } = req.body;

  const data = {
    name,
    description,
    questions,
  };

  await FormModel.updateOne({ _id: formId }, data);
  res.status(200).json(data);
}

export async function deleteForm(req, res, next) {
  const { formId } = req.params;

  await FormModel.findOne({ _id: formId }).then(async (form) => {
    console.log(form);
    if (form == null) {
      res.status(404).send('Form not found or already deleted');
    } else {
      if (form.createdBy == req.userId) {
        form.remove(function (err) {
          if (err) {
            return res.status(500).send(err);
          }
          console.log('Form deleted');
          return res.status(202).send('Form Deleted');
        });
      } else {
        res.status(401).send('You are not the owner of this Form');
      }
    }
  });
}
