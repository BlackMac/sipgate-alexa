'use strict'

const Alexa = require('alexa-sdk')
const sipgate = require('./sipgate-rest.js')

const handlers = {

  'BalanceIntent': function () {
    const rest = sipgate(this.event.session.user.accessToken)
    rest.balance((res) => {
      const balance = (res.amount / 10000).toFixed(2)
      this.emit(':tell', 'Dein Guthaben bei sipgate beträgt ' + balance + '€')
    })
  },
  'LastVoicemailIntent': function () {
    const rest = sipgate(this.event.session.user.accessToken)
    rest.history((res) => {
      const text = res.items[0].transcription;
      this.emit(':tell', text);
    }, 0, 1, ['VOICEMAIL'])
  }

}

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}
