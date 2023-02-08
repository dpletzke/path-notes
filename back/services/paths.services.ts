//this is the service for the creation of a path with mongoDB
import { Path } from "../types";
const pathServices = (app: any, db: ) => {

    const makePath = (path: Path) => db.collection("paths")
      .insert(path)
      .then((result: any) => {
        res.send(result.ops[0]);
      })
      .catch((err: any) => {
        res.send({ error: "An error has occurred" });
      });

      return {
        makePath
      }
  };
  // app.get("/path", (req: any, res: any) => {
  //   db.collection("paths")
  //     .find({})
  //     .toArray((err: any, result: any) => {
  //       if (err) {
  //         res.send({ error: "An error has occurred" });
  //       } else {
  //         res.send(result);
  //       }
  //     });
  // });
  // app.get("/path/:id", (req: any, res: any) => {
  //   db.collection("paths")
  //     .find({ _id: req.params.id })
  //     .toArray((err: any, result: any) => {
  //       if (err) {
  //         res.send({ error: "An error has occurred" });
  //       } else {
  //         res.send(result);
  //       }
  //     });
  // });
// };

module.exports = pathServices;
