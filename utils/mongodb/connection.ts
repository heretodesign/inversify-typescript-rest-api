import { Db, MongoClient } from "mongodb";
const connectionStr = "mongodb://localhost:27017";
const dbName = "inversify";

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static getConnection(result: (connection: any) => void) {
    if (this.isConnected) {
      return result(this.db);
    } else {
      this.connect((error, db: Db) => {
        return result(this.db);
      });
    }
  }

  private static connect(result: (error: any, db: Db) => void) {
    MongoClient.connect(connectionStr, (err, client) => {
      this.db = client.db(dbName);
      this.isConnected = true;
      return result(err, this.db);
    });
  }
}
