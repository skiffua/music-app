import dbConnection, {pool} from "../config/database";
import { USERS_BASE } from '../constants/db';

const ifUserExist = async (connector, userEmail, nick) => {
    try {
        let userData = await connector.query(
            `SELECT *
            FROM ${USERS_BASE.NAME}
            WHERE ${USERS_BASE.EMAIL} = '${userEmail}'
            OR ${USERS_BASE.NICK} = '${nick}'`
        );
        return userData[0];
    } catch {
        return null;
    } finally {
        console.log('user checked');
    }
};

export const userRegister = async (req, res) => {
  const { userEmail, nick, userPassword } = req.body;
  let connector;

  try {
      connector = await dbConnection();
      let user = await ifUserExist(connector, userEmail, nick);

      if (user === undefined) {
          await connector.query(
              `INSERT INTO ${USERS_BASE.NAME}
              (email, nick, password)
              VALUES
              ('${userEmail}', '${nick}', '${userPassword}')`
          );
          let newUser = await ifUserExist(connector, userEmail);
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
              message: 'user with such mail or nick is exist',
              user: JSON.stringify(user)
          }).end();
      }
      if (connector) {
          connector.end();
      }
      } catch (e) {
          console.log('registration failed', e);
          res.send({
              message: 'user NOT register, connecting to db closed'
          });
  } finally {
          console.log('connection closed');
  }
};

export const userLogin = async (req, res) => {
    const { userEmail } = req.body;
    let connector;

    try {
        connector = await dbConnection();
        let user = await ifUserExist(connector, userEmail);

        if (user === undefined) {
            res.status(404).end('user not found');
        } else if (user === null) {
            res.status(503).end('can not check user data, try later');
        } else if (user) {
            res.status(200).send({
                message: 'user logined success',
                user: JSON.stringify(user)
            });
        }
    } catch (e) {
        console.log('logined failed', e);
        res.end('user NOT logined, connecting to db closed');
    } finally {
        if (connector) {
            connector.end();
        }
        console.log('connection closed');
    }
};