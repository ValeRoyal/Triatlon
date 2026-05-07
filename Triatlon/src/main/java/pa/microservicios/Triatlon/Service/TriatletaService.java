/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @CrossOrigin
    public TriatletaDTO getTriatletaById(Long id) {
        Optional<TriatletaDTO> optionalTriatletaDTO = triatletaRepository.findById(id);
        return optionalTriatletaDTO.get();
    }

    @CrossOrigin
    public List<TriatletaDTO> getTriatletasByGenero(String genero) {
        List<TriatletaDTO> triatletasByGenero = triatletaRepository.findByGenero(genero);
        return triatletasByGenero;
    }

    @CrossOrigin
    public List<TriatletaDTO> getTriatletasByCategoria(String categoria) {
        List<TriatletaDTO> triatletasByCategoria = triatletaRepository.findByCategoria(categoria);
        return triatletasByCategoria;
    }

    @CrossOrigin
    public List<TriatletaDTO> getTriatletasByEspecialidad(String especialidad) {
        List<TriatletaDTO> triatletasByEspecialidad = triatletaRepository.findByEspecialidad(especialidad);
        return triatletasByEspecialidad;
    }

    @CrossOrigin
    public List<TriatletaDTO> getTriatletasByModalidadCross(String cross) {
        List<TriatletaDTO> triatletasByModalidadCross = triatletaRepository.findByModalidadCross(cross);
        return triatletasByModalidadCross;
    }
}
