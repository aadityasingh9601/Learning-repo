"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: "postgres",
    host: "localhost",
    database: "first",
    password: "#@Aaditya@pgsql.",
    port: 5432,
});
function conntodb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        console.log("Connected to postgres");
    });
}
conntodb();
function getData(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(username);
            const getQuery = `SELECT * FROM users WHERE username = '${username}'`;
            const result = yield client.query(getQuery);
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            yield client.end();
        }
    });
}
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(username, password, email);
            const insertQuery = "INSERT INTO users (username,email, password) VALUES ($1,$2,$3)";
            const values = [username, email, password];
            const result = yield client.query(insertQuery, values);
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            yield client.end();
        }
    });
}
function updateData(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateQuery = `UPDATE users SET password = '${password}' WHERE username = '${username}'`;
            const result = yield client.query(updateQuery);
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            yield client.end();
        }
    });
}
function deleteData(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteQuery = `DELETE FROM users WHERE username = '${username}'`;
            const result = yield client.query(deleteQuery);
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            yield client.end();
        }
    });
}
function insertDataTogether(username, email, country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.query("BEGIN");
            const insert1 = `INSERT INTO users (username,email) VALUES ($1,$2) RETURNING id `;
            const values1 = [username, email];
            const result1 = yield client.query(insert1, values1);
            const userId = result1.rows[0].id;
            const insert2 = `INSERT INTO addresses (user_id,country) VALUES ($1,$2)`;
            const values2 = [userId, country];
            const result2 = yield client.query(insert2, values2);
            console.log(result1);
            console.log(result2);
            yield client.query("COMMIT");
        }
        catch (e) {
            console.log(e);
        }
        finally {
            yield client.end();
        }
    });
}
insertDataTogether("aadityad", "abc@9gmaild.com", "Australiad");
