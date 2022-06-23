const moment = require('moment');

const formatMessage = (isBot, username, message) => {
    return {
        isBot,
        username,
        message,
        time: `[${moment().format('L')} ${moment().format('LTS')}]`
    }
};

module.exports = {
    formatMessage,
}