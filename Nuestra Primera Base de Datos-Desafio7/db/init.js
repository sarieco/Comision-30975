const config = require("./config");
const knexLib = require("knex");

(async () => {
    const knex = knexLib(config.mariaDB);
    try {
        const result = await knex.schema.hasTable("products");
        if (!result) {
            await knex.schema.createTable("products", table => {
                table.increments("id");
                table.string("nameProduct").notNullable();
                table.integer("priceProduct").notNullable();
                table.string("imageProduct").notNullable();
            });
            console.log("Products table created.");
        } else console.error("skipping creation...");
    }
    catch (err) { console.error(err); }
    finally { knex.destroy(); }
})();

(async () => {
    const knex = knexLib(config.sqlite);
    try {
        const result = await knex.schema.hasTable("chats");
        if (!result) {
            await knex.schema.createTable("chats", table => {
                table.increments("id");
                table.string("username").notNullable();
                table.string("message").notNullable();
                table.string("time").notNullable();
            });
            console.log("Chats table created.");
        } else console.error("skipping creation...");
    }
    catch (err) { console.error(err); }
    finally { knex.destroy(); }
})();