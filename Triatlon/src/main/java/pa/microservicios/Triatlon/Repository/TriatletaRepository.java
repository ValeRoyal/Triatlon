/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pa.microservicios.Triatlon.Model.TriatletaDTO;

/**
 *
 * @author Asus
 */
@Repository
public interface TriatletaRepository extends JpaRepository<TriatletaDTO, Long> {
    List<TriatletaDTO> findByGenero(String genero);
    List<TriatletaDTO> findByCategoria(String categoria);
    List<TriatletaDTO> findByEspecialidad(String especialidad);
    List<TriatletaDTO> findByModalidadCross(String modalidadCross);
}
