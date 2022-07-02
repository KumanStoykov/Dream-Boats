exports.userPayload = (user) => {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
};