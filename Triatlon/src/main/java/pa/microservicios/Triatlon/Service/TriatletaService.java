/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Service;

import java.util.List;
import java.util.Optional;
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
    public TriatletaDTO createTriatletaDTO(TriatletaDTO triatletaDTO) {
        return triatletaRepository.save(triatletaDTO);
    }

    public void deleteTriatletaDTO(Long id) {
        triatletaRepository.deleteById(id);
    }

//================UPDATE OPERATIONS===========================
    /**
     * Actualiza el nombre de un triatleta delegando a repository
     *
     * @param id
     * @param nuevoNombre
     */
    public void updateNombre(Long id, String nuevoNombre) {
        triatletaRepository.actualizarNombre(id, nuevoNombre);
    }

    /**
     * Actualiza la identificacion de un triatleta por su id delegando a
     * repository
     *
     * @param id
     * @param nuevaIdentificacion
     */
    public void updateIdentificacion(Long id, String nuevaIdentificacion) {
        triatletaRepository.actualizarIdentificacion(id, nuevaIdentificacion);
    }

    /**
     * Actualiza la categoria de un triatleta por su id delegando a repository
     *
     * @param id
     * @param nuevaCategoira
     */
    public void updateCategoria(Long id, String nuevaCategoira) {
        triatletaRepository.actualizarCategoria(id, nuevaCategoira);
    }

    /**
     *
     * @param identificacion
     * @return
     */
    public TriatletaDTO getTriatletaByIdentificacion(String identificacion) {
        Optional<TriatletaDTO> optionalTriatletaDTO = triatletaRepository.findByIdentificacion(identificacion);
        return optionalTriatletaDTO.get();
    }

    public List<TriatletaDTO> getTriatletasByGenero(String genero) {
        List<TriatletaDTO> triatletasByGenero = triatletaRepository.findByGenero(genero);
        return triatletasByGenero;
    }

    public List<TriatletaDTO> getTriatletasByCategoria(String categoria) {
        List<TriatletaDTO> triatletasByCategoria = triatletaRepository.findByCategoria(categoria);
        return triatletasByCategoria;
    }

    public List<TriatletaDTO> getTriatletasByEspecialidad(String especialidad) {
        List<TriatletaDTO> triatletasByEspecialidad = triatletaRepository.findByEspecialidad(especialidad);
        return triatletasByEspecialidad;
    }

    public List<TriatletaDTO> getTriatletasByModalidadCross(String cross) {
        List<TriatletaDTO> triatletasByModalidadCross = triatletaRepository.findByModalidadCross(cross);
        return triatletasByModalidadCross;
    }

}
