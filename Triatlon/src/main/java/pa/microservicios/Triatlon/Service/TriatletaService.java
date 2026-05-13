/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pa.microservicios.Triatlon.Model.TriatletaDTO;
import pa.microservicios.Triatlon.Repository.TriatletaRepository;

/**
 *
 * @author Asus
 */
@Service
public class TriatletaService {

    @Autowired
    private TriatletaRepository triatletaRepository;

    @Autowired
    private JavaMailSender mailSender;

    //EXTRAIDO DE: https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/value-annotations.html
    @Value("${correo.asunto}")//extrae del application properties y lo guarda en esta variable global
    private String asuntoRegistro;

    @Value("${correo.mensaje}")//extrae del applicaton properties y lo guarda en esta variable global
    private String mensajeRegistro;

//================OPERACIONES CRUD=========================
    //=============OPERACION CREATE========================
    /**
     * Crea un Triatleta delegando al triatletaRepository
     *
     * @param triatletaDTO
     * @return
     */
    public TriatletaDTO createTriatletaDTO(TriatletaDTO triatletaDTO) {
        //Como la identificacion la definimos como unica, sirve para validar si ya hay un usuario con esta identificacion
        if (triatletaRepository.findByIdentificacion(triatletaDTO.getIdentificacion()).isPresent()) {
            //el service hace la validacion y lanza la excepcion, ya el controller se encarga de propagarla
            throw new RuntimeException("Ya existe un triatleta con identificacion: " + triatletaDTO.getIdentificacion());
        }
        
        TriatletaDTO guardado = triatletaRepository.save(triatletaDTO);

        try {
            String contenido = mensajeRegistro.replace("{nombre}", guardado.getNombre()); //remplazar la variable nombre por el nombre del triatleta creado
            enviarCorreoConfimacion(guardado, asuntoRegistro, contenido); //usamos el metodo
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return guardado;
    }

    //=============OPERACIONES READ========================
    /**
     * Consulta Triatleta por Identificacion
     *
     * @param identificacion La identificacion del triatleta a buscar
     * @return Optional con el triatleta si existe
     */
    public TriatletaDTO getTriatletaByIdentificacion(String identificacion) {
        Optional<TriatletaDTO> optionalTriatleta = triatletaRepository.findByIdentificacion(identificacion);//delega a repository
        return optionalTriatleta.get();
    }

    /**
     * Consulta todos los tritatletas por su genero
     *
     * @param genero Genero de los/las triatletas a consultar
     * @return Grupo de triatletas consultado por genero Femenino/Masculino
     */
    public List<TriatletaDTO> getTriatletasByGenero(String genero) {
        List<TriatletaDTO> triatletasByGenero = triatletaRepository.findByGenero(genero);//delega a repository
        return triatletasByGenero;
    }

    /**
     * Consulta todos los triatletas por su categoria
     *
     * @param categoria Categoria especifica de los triatletas a consultar
     * @return Grupo de triatletas consultado por su categoria
     */
    public List<TriatletaDTO> getTriatletasByCategoria(String categoria) {
        List<TriatletaDTO> triatletasByCategoria = triatletaRepository.findByCategoria(categoria);//delega a repository
        return triatletasByCategoria;
    }

    /**
     * Consulta todos los triatletas por su especialidad
     *
     * @param especialidad Especialidad de los triatletas a consultar
     * @return Grupo de triatletas consultado por especialidad
     */
    public List<TriatletaDTO> getTriatletasByEspecialidad(String especialidad) {
        List<TriatletaDTO> triatletasByEspecialidad = triatletaRepository.findByEspecialidad(especialidad);//delega a repository
        return triatletasByEspecialidad;
    }

    /**
     * Consulta todos los triatletas que hacen o no hacen Modalidad Cross
     *
     * @param cross Hace cross? si o no
     * @return Grupo de triatletas consultado si hace o no hace Modalidad Cross
     */
    public List<TriatletaDTO> getTriatletasByModalidadCross(String cross) {
        List<TriatletaDTO> triatletasByModalidadCross = triatletaRepository.findByModalidadCross(cross);//delega a repository
        return triatletasByModalidadCross;
    }

    //=============OPERACIONES UPDATE========================
    public TriatletaDTO updateCompleto(Long id, TriatletaDTO triatletaDTO) {
        if (!triatletaRepository.existsById(id)) {
            throw new RuntimeException("No existe triatleta con id: " + id);
        }
        triatletaDTO.setId(id); // asegura que actualiza el correcto
        return triatletaRepository.save(triatletaDTO);//delega a repository
    }

    /**
     * Actualiza el nombre de un triatleta delegando a repository
     *
     * @param id
     * @param nuevoNombre
     */
    public void updateNombre(Long id, String nuevoNombre) {
        int filas = triatletaRepository.actualizarNombre(id, nuevoNombre);//delega a repository
        if (filas == 0) {
            throw new RuntimeException("No existe triatleta con id: " + id);
        }
    }

    /**
     * Actualiza la identificacion de un triatleta por su id delegando a
     * repository
     *
     * @param id
     * @param nuevaIdentificacion
     */
    public void updateIdentificacion(Long id, String nuevaIdentificacion) {
        int filas = triatletaRepository.actualizarIdentificacion(id, nuevaIdentificacion);//delega a repository
        if (filas == 0) {
            throw new RuntimeException("No existe triatleta con id: " + id);
        }
    }

    /**
     * Actualiza la categoria de un triatleta por su id delegando a repository
     *
     * @param id
     * @param nuevaCategoria
     */
    public void updateCategoria(Long id, String nuevaCategoria) {
        int filas = triatletaRepository.actualizarCategoria(id, nuevaCategoria);//delega a repository
        if (filas == 0) {
            throw new RuntimeException("No existe triatleta con id: " + id);
        }
    }

    //=============OPERACION DELETE ========================
    /**
     * Borra por id un triatleta
     *
     * @param id
     */
    public void deleteTriatletaDTO(Long id) {
        if (!triatletaRepository.existsById(id)) {
            throw new RuntimeException("No existe triatleta con id: " + id);
        }
        triatletaRepository.deleteById(id);//delega a repository
    }

    //====================CORREO DE REGISTRO===============
    public void enviarCorreoConfimacion(TriatletaDTO triatletaDTO, String asunto, String contenido) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(triatletaDTO.getCorreo());
        mensaje.setSubject(asunto);
        mensaje.setText(contenido);
        mailSender.send(mensaje);
    }

}
