import bcrypt from "bcryptjs";

export const cryptData = (value) => {
    const salt = bcrypt.genSaltSync(Number.parseInt(process.env.REACT_APP_SALT));
    return bcrypt.hashSync(value, salt);
};

export const checkEquality = (value, fetchedValue) => bcrypt.compareSync(value, fetchedValue);