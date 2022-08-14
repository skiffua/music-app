import dbConnection from "../config/database";
import { USERS_BASE } from '../constants/db';

const ifUserExist = async (connector, email, nick) => {
    try {
        let userData = await connector.query(
            `SELECT *
            FROM ${USERS_BASE.NAME}
            WHERE ${USERS_BASE.EMAIL} = '${email}'
            OR ${USERS_BASE.NICK} = '${nick}'`
        );
        return userData[0];
    } catch {
        return null;
    } finally {
    }
};

export const userRegister = async (req, res) => {
  const { email, nick, gender, password } = req.body;
  let connector;

  try {
      connector = await dbConnection();
      let user = await ifUserExist(connector, email, nick);

      if (user === undefined) {
          await connector.query(
              `INSERT INTO ${USERS_BASE.NAME}
              (email, nick, gender, password)
              VALUES
              ('${email}', '${nick}', '${gender}', '${password}')`
          );
          let newUser = await ifUserExist(connector, email);
          res.status(201).send({
              message: 'great, user registered',
              user: JSON.stringify(newUser)
          });
      } else if (user === null) {
          res.status(503).send({
              message: 'can not check user data, try later'
          });
      } else if (user) {
          res.status(202).send({
              message: 'user with such mail or nick is exist'
          }).end();
      }
      if (connector) {
          connector.end();
      }
      } catch (e) {

          res.send({
              message: 'sorry but user NOT register, please try again...'
          });
  } finally {
          console.log('connection closed');
  }
};

export const userLogin = async (req, res) => {
    const { email } = req.body;
    let connector;

    try {
        connector = await dbConnection();
        let user = await ifUserExist(connector, email);

        if (user === undefined) {
            res.status(404).send({
                message: 'user not found'});
        } else if (user === null) {
            res.status(503).end('can not check user data, try later');
        } else if (user) {
            res.status(200).send({
                message: 'user with such email finded',
                user: JSON.stringify(user)
            });
        }
    } catch (e) {
        res.end('user NOT logined, connecting to db closed');
    } finally {
        if (connector) {
            connector.end();
        }
    }
};
