class ContainerApi {
    constructor(config, nameTable) {
        this.knex = require("knex")(config);
        this.table = nameTable;
    }

    async getAll() {
        const productsResponse = await this.knex.from(this.table).select("*");
        return { success: true, result: productsResponse };
    }
    async getById(id) {
        const productFound = await this.knex.from(this.table).select("*").where("id", "=", id);
        if (!productFound) return { success: false, error: "Product not found." };
        return { success: true, result: productFound };
    }
    async save(product) {
        const newData = await this.knex.from(this.table).insert(product);
        return newData[0];
    };
    async update(id, item) {
        const updated = await this.knex.from(this.table).where("id", "=", id).update(item);
        if (!updated) return false;
        return true;
    }
    async delete(id) {
        const deleted = await this.knex.from(this.table).where("id", "=", id).del();
        if (!deleted) return false;
        return true;
    }
}

module.exports = ContainerApi;