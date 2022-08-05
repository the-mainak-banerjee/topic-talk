export default function formatDate (date) {
    const msgdate = (new Date(date?.toDate()))
    const formatedMsgHour = msgdate.getHours() < 10 ? `0${msgdate.getHours()}` :  `${msgdate.getHours()}` 
    const formatedMsgMins = msgdate.getMinutes() < 10 ? `0${msgdate.getMinutes()}` : `${msgdate.getMinutes()}`
    const formatedMsgDate = msgdate.toDateString()

    return {
        formatedMsgDate,
        formatedMsgHour,
        formatedMsgMins
    }
}