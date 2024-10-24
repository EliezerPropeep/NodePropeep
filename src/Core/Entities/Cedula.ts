export class Cedula {
    constructor(
        public id: string,
        public nombre?: string,
        public primerApellido?: string,
        public segundoApellido?: string,
        public apellidoConyuge?: string,
        public fechaNacimiento?: string,
        public lugarNacimiento?: string,
        public sexo?: string,
        public estadoCivil?: string,
        public estado?: string,
        public rutaFoto?: string
    ) {}
}
