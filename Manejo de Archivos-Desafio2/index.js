
const { promises: fs } = require('fs');

class Productos {
    constructor(url) {
        this.url = url;
    }

    save = async (object) => {
        const objects = await this.getAll();
        const findObject = objects.find(item => item.title == object.title);
        const findId = objects.map(item => item.id);

        let newId;
        if (findId.length == 0) newId = 1
        else newId = Math.max.apply(null, findId) + 1;

        if (findObject) {
            throw new Error('Ingrese un producto diferente')
        } else {
            objects.push({ ...object, id: newId });
            await fs.writeFile('./productos.txt', JSON.stringify(objects, null, 2));
            return newId;
        }
    }

    getById = async (id) => {
        const objects = await this.getAll();
        const idFound = objects.find(item => item.id == id);
        if (!idFound) return null
        else return idFound;
    }

    getAll = async () => {
        try {
            const objects = await fs.readFile(this.url, 'utf-8');
            return JSON.parse(objects);
        } catch (error) {
            throw new Error(`ERROR: ${error.message}`);
        }
    }

    deleteById = async (id) => {
        const objects = await this.getAll();
        const deleteId = objects.filter(item => item.id !=id)
        await fs.writeFile('./productos.txt', JSON.stringify(deleteId, null, 2));
    }

    deleteAll = async () => {
        await fs.writeFile(this.url, '[]');
    }

}

module.exports = Productos;