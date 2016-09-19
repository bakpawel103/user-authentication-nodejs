'use strict';
let initial_config = require(__base + 'config/initial'); // get initial config file
let errorBuilder = require(__base + 'services/error/builder');
// get the mongoose model
let User = require(__base + 'models/user');
let Role = require(__base + 'models/role');

exports.initialize = (req, res, next) => {
    let errorHandler = (error) => {
        next(error);
    }
    setRoles().then(() => {
        setAdminUser().then(() => {
            res.json({
                success: true,
                message: 'Successful initialize.'
            })
        }, errorHandler)
    }, errorHandler)
}

//private methods
function setAdminUser() {
    let deferred = Promise.defer();
    Role.findOne({$query:{},$orderby:{level:-1}}, (error, role) => {
        if (error) deferred.reject(errorBuilder.badRequest(error.errmsg));
        else if (role) {
            let adminUser = new User({
                displayName: initial_config.admin_account,
                username: initial_config.admin_account,
                password: initial_config.admin_password,
                roleId: role._id
            })
            adminUser.save(err => {
                if (err) deferred.reject(errorBuilder.badRequest(err.errmsg));
                else deferred.resolve();
            })
        }
    })
    return deferred.promise;
}

function setRoles() {
    let promises = [];
    let result = Promise.defer();
    let roles = initial_config.roles;
    roles.forEach(role => {
        let deferred = Promise.defer();
        let newRole = new Role(role);
        newRole.save(error => {
            if (error) deferred.reject(errorBuilder.badRequest(error.errmsg));
            else deferred.resolve();
        });
        promises.push(deferred.promise);
    })
    Promise.all(promises).then(() => {
        result.resolve();
    }, error => {
        result.reject(error);
    })
    return result.promise;
}
