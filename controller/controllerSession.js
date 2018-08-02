class ControllerSession {
    static generalPage(req, res, next) {

    }
    static User (req, res, next) {
        if (!req.session.user) {
            res.redirect('/')
        } else if (req.session.user.role == 'User') {
            next()
        } else {
            res.redirect('/guide')
        }
    }
    static Guide (req, res, next) {
        if (!req.session.user) {
            res.redirect('/')
        } else if (req.session.user.role == 'Guide') {
            next()
        } else {
            res.redirect('/user')
        }
    }
}

module.exports = ControllerSession