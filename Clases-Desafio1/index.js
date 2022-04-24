
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`Hola, me llamo ${this.nombre} y mi apellido ${this.apellido}`);
    }

    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota);
        console.log(this.mascotas);
    }

    countMascotas() {
        this.mascotas.length;
        console.log(this.mascotas.length)
    }

    addBook(nombreLibro, autorLibro) {
        let libroNuevo = {nombre: nombreLibro, autor: autorLibro};
        this.libros.push(libroNuevo);
        console.log(this.libros);
    }

    getBookNames() {
        let  nombreLibros = this.libros.map(libro => libro.nombre );
        console.log(nombreLibros);
    }
}

const usuario_1 = new Usuario("Emilia", "Fernández", [{ nombre: "El Señor de los Anillos", autor: "J.J.R.Tolkien" }, 
{ nombre: "El Silmarillion", autor: "J.J.R.Tolkien" },
{ nombre: "El Trono de Huesos de Dragón", autor: "Tad Williams" } ], ["Perro", "Gato", "Conejo" ]);
usuario_1.getFullName();
usuario_1.addMascota();
usuario_1.countMascotas();
usuario_1.addBook();
usuario_1.getBookNames();