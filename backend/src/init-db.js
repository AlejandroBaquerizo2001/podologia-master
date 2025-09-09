const { sequelize, User, Paciente, Cita, FichaMedica } = require('./src/models');
const bcrypt = require('bcryptjs');

const initDatabase = async () => {
  try {
    // Sincronizar base de datos
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada');

    // Crear usuario admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      nombre: 'Administrador',
      email: 'admin@podologia.cl',
      password: adminPassword,
      role: 'admin',
      especialidad: 'Administración',
      telefono: '+56 9 1234 5678'
    });

    // Crear usuario doctor
    const doctorPassword = await bcrypt.hash('doctor123', 10);
    const doctor = await User.create({
      nombre: 'Dr. Juan Pérez',
      email: 'doctor@podologia.cl',
      password: doctorPassword,
      role: 'doctor',
      especialidad: 'Podología',
      telefono: '+56 9 8765 4321'
    });

    // Crear pacientes de prueba
    const pacientes = await Paciente.bulkCreate([
      {
        nombre: 'María González',
        rut: '12345678-9',
        fechaNacimiento: new Date('1985-05-15'),
        genero: 'femenino',
        direccion: 'Av. Principal 123, Santiago',
        telefono: '+56 9 1111 1111',
        email: 'maria@email.com',
        previsionsalud: 'isapre',
        userId: doctor.id
      },
      {
        nombre: 'Carlos Rodríguez',
        rut: '23456789-0',
        fechaNacimiento: new Date('1978-12-22'),
        genero: 'masculino',
        direccion: 'Calle Secundaria 456, Santiago',
        telefono: '+56 9 2222 2222',
        email: 'carlos@email.com',
        previsionsalud: 'fonasa',
        userId: doctor.id
      }
    ]);

    // Crear fichas médicas
    await FichaMedica.bulkCreate([
      {
        pacienteId: pacientes[0].id,
        antecedentesMedicos: 'Diabetes tipo 2 diagnosticada en 2010, Hipertensión arterial',
        antecedentesQuirurgicos: 'Apendicectomía (2015)',
        antecedentesAlergicos: 'Penicilina (rash cutáneo)',
        antecedentesFamiliares: 'Padre: Infarto a los 65 años, Madre: Cáncer de mama a los 58 años',
        tratamientos: [
          {
            medicamento: 'Metformina',
            dosis: '500mg',
            frecuencia: 'Cada 12 horas',
            inicio: '2020-03-15'
          }
        ],
        notasClinicas: [
          {
            fecha: '2024-01-15',
            profesional: 'Dr. Juan Pérez',
            contenido: 'Paciente presenta mejoría en niveles de glucosa. Continuar tratamiento.'
          }
        ]
      },
      {
        pacienteId: pacientes[1].id,
        antecedentesMedicos: 'Asma leve, Colesterol elevado',
        antecedentesQuirurgicos: 'Ninguno',
        antecedentesAlergicos: 'Mariscos (edema facial)',
        antecedentesFamiliares: 'Padre: Diabetes tipo 2, Madre: Hipertensión',
        tratamientos: [
          {
            medicamento: 'Atorvastatina',
            dosis: '20mg',
            frecuencia: 'Una vez al día',
            inicio: '2023-11-10'
          }
        ],
        notasClinicas: [
          {
            fecha: '2024-01-10',
            profesional: 'Dr. Juan Pérez',
            contenido: 'Paciente refiere mejoría en síntomas respiratorios. Controlar colesterol en 3 meses.'
          }
        ]
      }
    ]);

    // Crear citas de prueba
    await Cita.bulkCreate([
      {
        fecha: new Date('2024-02-15'),
        hora: '10:00',
        tipo: 'consulta',
        estado: 'confirmada',
        notas: 'Control de diabetes y evaluación de pie diabético',
        recordatorio: true,
        ubicacion: 'Consultorio Central',
        pacienteId: pacientes[0].id,
        userId: doctor.id
      },
      {
        fecha: new Date('2024-02-16'),
        hora: '11:30',
        tipo: 'examen',
        estado: 'pendiente',
        notas: 'Realizar examen de biomecánica de la marcha',
        recordatorio: true,
        ubicacion: 'Consultorio Central',
        pacienteId: pacientes[1].id,
        userId: doctor.id
      }
    ]);

    console.log('Datos de prueba creados exitosamente');
    console.log('Usuario admin: admin@podologia.cl / admin123');
    console.log('Usuario doctor: doctor@podologia.cl / doctor123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
    process.exit(1);
  }
};

initDatabase();