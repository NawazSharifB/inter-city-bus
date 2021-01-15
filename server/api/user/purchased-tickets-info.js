// const {fs} = require('../../../index')
const index = require('../../../index')

module.exports = async (req, res, next) => {
    const fs = index.fs

    // const userData = req.userData
    const userData = req.userData
    // console.log(userData)

    try {
        const fsData = (await fs.collection('user').doc(userData.uid).get()).data()
        const upcomingTickets = fsData.tickets.upcoming
        const backDatedTickets = fsData.tickets.backDated
        if (Object.keys(upcomingTickets).length <= 0) {
            return res.status(200).json({upcoming: [], backDated: backDatedTickets})
        }

        for(let strDate in upcomingTickets) {

            const date = strDate.split('.')[1]
            const month = strDate.split('.')[0]
            const year = strDate.split('.')[2]

            const today = new Date(Date.now() + 21600000)

            if (
                today.getDate() === date &&
                today.getMonth() === month &&
                today.getFullYear() === year
            ) {
                // console.log('hit today')
                const validatedUpcomingTickets = upcomingTickets[strDate].filter(ticket => {
                    const time = today.getHours() * 100 + today.getMinutes()
                    // console.log('server time', time)

                    if (time > ticket.journeyTime) {
                        backDatedTickets.push(ticket)
                        return false
                    } else {
                        return true
                    }
                })

                upcomingTickets[strDate] = validatedUpcomingTickets
            }

            
        }

        for(let strDate in upcomingTickets) { 
            if (!upcomingTickets[strDate].length) {
                delete upcomingTickets[strDate]
            }
        }

        await fs.collection('user').doc(userData.uid).update({tickets: {upcoming: upcomingTickets, backDated: backDatedTickets}})
        res.status(200).json({
            upcoming: makingUpcomingTicketsArray(upcomingTickets),
            backDated: backDatedTickets
        })


        function makingUpcomingTicketsArray(upcomingTickets) {
            const tickets = []
            for(let date in upcomingTickets) {
                upcomingTickets[date].forEach(ticket => tickets.push(ticket))
            }
            return tickets
        }

    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
}