//this is the service for the creation of a path with mongoDB
import { Path } from "../types";
const pathServices = (app: any, db: any) => {
  app.post("/path", (req: any, res: any) => {
    const path: Path = {
      name: req.body.name,
      description: req.body.description,
      photos: req.body.photos,
    };

    db.collection("paths")
      .insert(path)
      .then((result: any) => {
        res.send(result.ops[0]);
      })
      .catch((err: any) => {
        res.send({ error: "An error has occurred" });
      });
  });
  app.get("/path", (req: any, res: any) => {
    db.collection("paths")
      .find({})
      .toArray((err: any, result: any) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(result);
        }
      });
  });
  app.get("/path/:id", (req: any, res: any) => {
    db.collection("paths")
      .find({ _id: req.params.id })
      .toArray((err: any, result: any) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(result);
        }
      });
  });
};
