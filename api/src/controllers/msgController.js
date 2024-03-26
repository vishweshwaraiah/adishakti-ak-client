const NumsGroup = require('@api/models/nums_group');

const sendMessages = async (req, res) => {
  const myTwilioNumber = process.env.TWILIO_NUMBER;
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_SERVICE_SID;

  const numbers = req.body?.numbers;
  const messageContent = req.body?.message;

  console.log(numbers, messageContent);

  const client = require('twilio')(accountSid, authToken);

  Promise.all(
    numbers.map((number) => {
      const numInd = '+91' + number;
      return client.messages.create({
        to: numInd,
        from: myTwilioNumber || serviceSid,
        body: messageContent,
      });
    })
  )
    .then((message) => {
      console.log('Success', message);
      return res.status(200).json(message);
    })
    .catch((err) => {
      console.log('Failed', err.message);
      const errMessage = err.message;
      return res.status(err.status).json({ message: errMessage });
    });
};

const createGroup = async (req, res) => {
  try {
    const groupName = req.body?.groupName;
    const numberList = req.body?.numberList;

    if (!groupName || !numberList.length) {
      return res.status(400).json({ message: 'All the fields are required!' });
    }

    const newGroup = new NumsGroup({
      group_name: groupName,
      nums_group: numberList,
    });

    const savedItem = await newGroup.save();

    return res.status(200).json(savedItem);
  } catch (error) {
    console.log('Error while saving group!', error.message);
    return res.status(500).json({ message: 'Save failed!' });
  }
};

const fetchNumsGroups = async (req, res) => {
  try {
    const groupDetails = await NumsGroup.find();
    return res.status(200).json(groupDetails);
  } catch (error) {
    console.log('Failed', err.message);
    const errMessage = err.message;
    return res.status(err.status).json({ message: errMessage });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const groupName = req.params.groupName;

    if (!groupName) {
      return res
        .status(400)
        .json({ message: 'Please send a proper Group name!' });
    }

    const deletedItem = await NumsGroup.findOneAndDelete({
      group_name: groupName,
    });

    return res.status(200).json(deletedItem);
  } catch (error) {
    console.log('Error while deleting group!', error.message);
    return res.status(500).json({ message: 'Delete failed!' });
  }
};

module.exports = {
  sendMessages,
  createGroup,
  fetchNumsGroups,
  deleteGroup,
};
