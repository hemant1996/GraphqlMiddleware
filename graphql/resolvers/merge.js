const { User } = require('../../models/user');
const { dateToString } = require('../../helpers/date');
const { Menu } = require('../../models/menu');

const userData = async userId => {
    try {
        const user = await User.findById(userId)
        return {...user._doc, _id: user.id, createdEvents: events.bind(this, user.createdEvents) };
    } catch (err) {
        throw err;
    }
}

exports.transformUser = transformUser;

//exports.events = events;