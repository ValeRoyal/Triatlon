/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pa.microservicios.Triatlon.Model.TriatletaDTO;
import pa.microservicios.Triatlon.Service.TriatletaService;

/**
 *
 * @author Asus
 */
@RestController
@RequestMapping("/api")
public class TriatletaRestController {

    @Autowired
    private TriatletaService triatletaService;

    @RequestMapping(value = "/triatleta", method = RequestMethod.POST)
    public ResponseEntity<TriatletaDTO> createTriatletaDTO(@Valid @RequestBody TriatletaDTO triatletaDTO) {
        try {
            TriatletaDTO creado = triatletaService.createTriatletaDTO(triatletaDTO);
            return ResponseEntity.ok(creado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @RequestMapping(value = "/triatleta/identificacion/{identificacion}", method = RequestMethod.GET)
    public ResponseEntity<TriatletaDTO> getTriatletaByIdentificacion(@PathVariable("identificacion") String identificacion) {
        return ResponseEntity.ok(triatletaService.getTriatletaByIdentificacion(identificacion));
    }

    @RequestMapping(value = "/triatleta/genero", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasByGenero(@RequestParam String genero) {
        List<TriatletaDTO> triatletasPorGenero = triatletaService.getTriatletasByGenero(genero);
        return ResponseEntity.ok(triatletasPorGenero);
    }

    @RequestMapping(value = "/triatleta/categoria", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasBy(@RequestParam String categoria) {
        List<TriatletaDTO> triatletasPorCategoria = triatletaService.getTriatletasByCategoria(categoria);
        return ResponseEntity.ok(triatletasPorCategoria);
    }

    @RequestMapping(value = "/triatleta/especialidad", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasByEspecialidad(@RequestParam String especialidad) {
        List<TriatletaDTO> triatletasPorEspecialidad = triatletaService.getTriatletasByEspecialidad(especialidad);
        return ResponseEntity.ok(triatletasPorEspecialidad);
    }

    @RequestMapping(value = "/triatleta/modalidadcross", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasByModalidadCross(@RequestParam String cross) {
        List<TriatletaDTO> triatletasPorCross = triatletaService.getTriatletasByModalidadCross(cross);
        return ResponseEntity.ok(triatletasPorCross);
    }

    @RequestMapping(value = "/triatleta/actualizar/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateCompleto(@PathVariable("id") Long id, @RequestBody TriatletaDTO triatletaDTO) {
        try {
            TriatletaDTO actualizado = triatletaService.updateCompleto(id, triatletaDTO);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/triatleta/actualizarnombre/{id}/nombre", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateNombre(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        try {
            triatletaService.updateNombre(id, body.get("nombre"));
            return ResponseEntity.ok("Nombre actualizado");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/triatleta/actualizaridentificacion/{id}/identificacion", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateIdentificacion(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        try {
            triatletaService.updateIdentificacion(id, body.get("identificacion"));
            return ResponseEntity.ok("Indentificacion actualizada");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/triatleta/actualizarcategoria/{id}/categoria", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateCategoria(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        try {
            triatletaService.updateCategoria(id, body.get("categoria"));
            return ResponseEntity.ok("Categoria actualizada");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/triatleta/borrartriatleta/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTriatleta(@PathVariable("id") Long id) {
        try {
            triatletaService.deleteTriatletaDTO(id);
            return ResponseEntity.ok("Triatleta Eliminado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
