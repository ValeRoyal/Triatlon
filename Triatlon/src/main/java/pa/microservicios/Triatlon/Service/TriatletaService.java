/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
        return triatletaRepository.save(triatletaDTO);
    }

    //=============OPERACIONES READ========================
    /**
     * Consulta Triatleta por Identificacion
     *
     * @param identificacion La identificacion del triatleta a buscar
     * @return Optional con el triatleta si existe
     */
    public TriatletaDTO getTriatletaByIdentificacion(String identificacion) {
        return triatletaRepository.findByIdentificacion(identificacion)
                .orElseThrow(() -> new RuntimeException("No existe triatleta con identificacion: " + identificacion));
    }

    /**
     * Consulta todos los tritatletas por su genero
     *
     * @param genero Genero de los/las triatletas a consultar
     * @return Grupo de triatletas consultado por genero Femenino/Masculino
     */
    public List<TriatletaDTO> getTriatletasByGenero(String genero) {
        List<TriatletaDTO> triatletasByGenero = triatletaRepository.findByGenero(genero);
        return triatletasByGenero;
    }

    /**
     * Consulta todos los triatletas por su categoria
     *
     * @param categoria Categoria especifica de los triatletas a consultar
     * @return Grupo de triatletas consultado por su categoria
     */
    public List<TriatletaDTO> getTriatletasByCategoria(String categoria) {
        List<TriatletaDTO> triatletasByCategoria = triatletaRepository.findByCategoria(categoria);
        return triatletasByCategoria;
    }

    /**
     * Consulta todos los triatletas por su especialidad
     *
     * @param especialidad Especialidad de los triatletas a consultar
     * @return Grupo de triatletas consultado por especialidad
     */
    public List<TriatletaDTO> getTriatletasByEspecialidad(String especialidad) {
        List<TriatletaDTO> triatletasByEspecialidad = triatletaRepository.findByEspecialidad(especialidad);
        return triatletasByEspecialidad;
    }

    /**
     * Consulta todos los triatletas que hacen o no hacen Modalidad Cross
     *
     * @param cross Hace cross? si o no
     * @return Grupo de triatletas consultado si hace o no hace Modalidad Cross
     */
    public List<TriatletaDTO> getTriatletasByModalidadCross(String cross) {
        List<TriatletaDTO> triatletasByModalidadCross = triatletaRepository.findByModalidadCross(cross);
        return triatletasByModalidadCross;
    }

    //=============OPERACIONES UPDATE========================
    public TriatletaDTO updateCompleto(Long id, TriatletaDTO triatletaDTO) {
        if (!triatletaRepository.existsById(id)) {
            throw new RuntimeException("No existe triatleta con id: " + id);
        }
        triatletaDTO.setId(id); // asegura que actualiza el correcto
        return triatletaRepository.save(triatletaDTO);
    }

    /**
     * Actualiza el nombre de un triatleta delegando a repository
     *
     * @param id
     * @param nuevoNombre
     */
    public void updateNombre(Long id, String nuevoNombre) {
        int filas = triatletaRepository.actualizarNombre(id, nuevoNombre);
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
        int filas = triatletaRepository.actualizarIdentificacion(id, nuevaIdentificacion);
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
        int filas = triatletaRepository.actualizarCategoria(id, nuevaCategoria);
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
        triatletaRepository.deleteById(id);
    }

}
