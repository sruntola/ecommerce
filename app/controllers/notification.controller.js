const { admin } = require("../config/admin_firebase");
exports.sendNotification = async (req, res) => {
  const registrationToken =
    "f2m34fzVGElRjplRKEtRO8:APA91bG_wS-wjh-JshUq4LEmWFo6Bl6t06dE9q-5V07tN1YnC-tfNe_MPMMtpTeyW_YBJwuVF0RBhdXwLFx_fOfhl02IbXzpYk7O7Jakn0cG2Kes42WdBtCHIKBPliF-tuLSnUX_9BfG";
  var dryRun = true;
  const message = {
    notification: {
      title: "Hello World",
    },
    android: {
      notification: {
        imageUrl:
          "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
      },
    },
    topic: "Topic",
  };
  // const message_notification = {
  //     notification: {
  //         title: 'Hello World'
  //     },
  //     topic: 'Topic'
  // };
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  // const registrationToken = req.body.registrationToken
  // const message = req.body.message
  const options = notification_options;
  admin
    .messaging()
    .send(message, dryRun, notification_options)
    .then((response) => {
      res.status(200).send({
        message: response,
      });
    })
    .catch((error) => {
      console.log("Error message:", error);
    });
};
