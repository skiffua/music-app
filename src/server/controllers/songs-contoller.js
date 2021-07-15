import path from 'path';
import fs from 'fs';

import dbConnection from "../config/database";
import {SONGS, USERS_BASE} from '../constants/db';

export const getSongsList = async (req, res) => {
  let connector;

  try {
      connector = await dbConnection();
      const songList = await connector.query(
              `SELECT id, author, trackName, date, positive, negative FROM ${SONGS.NAME}`
          );
          res.status(200).send({
              message: 'songs get succesfully',
              songs: songList
          });
      } catch (e) {
          res.status(404).send({
              message: 'sorry ...'
          });
  } finally {
      if (connector) {
          connector.end();
      }
  }
};

export const getSong = async (req, res) => {
    let connector;
    const { id } = req.params;

    try {
        connector = await dbConnection();
        const fileName = await connector.query(
            `SELECT DISTINCT fileName FROM songs 
            WHERE id=${id}`
        );

        const audioFilePath = path.resolve(__dirname, `../media/top/${fileName[0].fileName}.mp3`);
        fs.access(audioFilePath, (err) => {
            if (err) {
                res.status(404).send({
                    message: 'sorry, file not found...',
                });

            } else {
                res.status(200).sendFile(path.resolve(__dirname, `../media/top/${fileName[0].fileName}.mp3`));
            }
        })

    } catch (e) {
        res.status(404).send({
            message: 'sorry ...'
        });
    } finally {
        if (connector) {
            connector.end();
        }
    }
};
