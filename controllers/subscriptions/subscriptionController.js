const Respond = require('../../services/responses');

class SubscriptionController {
    /**
     * update users subscription
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async updateSubscription (req, res) {
        const { user } = req;
        const { subscription } = req.body;

        if (!subscription) return Respond(res).error(
            400, 'missingParamsError', 'subscription is required'
        );
        user.subscription = subscription
        user.save()
    }
}

module.exports = SubscriptionController;
