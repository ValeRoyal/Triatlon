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

    /**
     * Define y expone el endpoint tipo POST para insertar un triatleta
     *
     * @param triatletaDTO
     * @return HTTP 200 (exito) HTTP 400 si falla
     */
    @RequestMapping(value = "/triatleta", method = RequestMethod.POST) //define el endpoint y el verbo http
    public ResponseEntity<TriatletaDTO> createTriatletaDTO(@Valid @RequestBody TriatletaDTO triatletaDTO) { //toma el JSON del body
        //y lo valida con Bean Validation
        try {
            TriatletaDTO creado = triatletaService.createTriatletaDTO(triatletaDTO); //llama al servicio para guardar el triatleta
            return ResponseEntity.ok(creado); //retorna HTTP 200 OK con el objeto creado
        } catch (RuntimeException e) { //captura el error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); //retorna 400 si algo falla
        }
    }

    /**
     * Define y expone el endpoint tipo GET para consultar un triatleta por su
     * identificacion
     *
     * @param identificacion
     * @return HTTP 200 ok
     */
    @RequestMapping(value = "/triatleta/identificacion/{identificacion}", method = RequestMethod.GET)
    public ResponseEntity<TriatletaDTO> getTriatletaByIdentificacion(@PathVariable("identificacion") String identificacion) {//Se manda el parametro en la url
        return ResponseEntity.ok(triatletaService.getTriatletaByIdentificacion(identificacion));//delega a service para buscar por identificacion
    }

    /**
     * Expone y define el endpoint para consultar todos los triatletas por
     * genero
     *
     * @param genero
     * @return HTTP 200 ok
     */
    @RequestMapping(value = "/triatleta/genero", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasByGenero(@RequestParam String genero) {//Viene en la url despues del ?genero=(Masculino o Femenino)
        List<TriatletaDTO> triatletasPorGenero = triatletaService.getTriatletasByGenero(genero); //delega a service
        return ResponseEntity.ok(triatletasPorGenero); //retorna un HTTP 200 ok
    }

    /**
     * Expone y define el endpoint para consultar todos los triatletas por
     * categoria
     *
     * @param categoria
     * @return HTTP 200 ok
     */
    @RequestMapping(value = "/triatleta/categoria", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasByCategoria(@RequestParam String categoria) { //viene en la url despues del ?categoria=...
        List<TriatletaDTO> triatletasPorCategoria = triatletaService.getTriatletasByCategoria(categoria);//delega a service
        return ResponseEntity.ok(triatletasPorCategoria); //retorna un HTTP 200 ok
    }

    /**
     * Expone y define el endpoint tipo GET para consultar todos los triatletas
     * por su especialidad
     *
     * @param especialidad
     * @return HTTP 200 ok
     */
    @RequestMapping(value = "/triatleta/especialidad", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasByEspecialidad(@RequestParam String especialidad) { //viene en la url despues del ?especialidad=...
        List<TriatletaDTO> triatletasPorEspecialidad = triatletaService.getTriatletasByEspecialidad(especialidad);//delega a service
        return ResponseEntity.ok(triatletasPorEspecialidad); //retorna un HTTP 200 ok
    }

    /**
     ** Expone y define el endpoint tipo GET para consultar todos los
     * triatletas por si hacen o no modalidad cross
     *
     * @param cross
     * @return HTTP 200 ok
     */
    @RequestMapping(value = "/triatleta/modalidadcross", method = RequestMethod.GET)
    public ResponseEntity<List<TriatletaDTO>> getTraitletasByModalidadCross(@RequestParam String cross) {  //viene en la url despues del ?modalidadcross=
        List<TriatletaDTO> triatletasPorCross = triatletaService.getTriatletasByModalidadCross(cross);//delega a service
        return ResponseEntity.ok(triatletasPorCross); //retorna un HTTP 200 ok
    }

    /**
     * Expone y define el endpoint tipo PUT para actualizar totalmente un
     * triatleta por su id
     *
     * @param id
     * @param triatletaDTO
     * @return HTTP 200 (exito) HTTP 404 si no existe
     */
    @RequestMapping(value = "/triatleta/actualizar/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateCompleto(@PathVariable("id") Long id, @Valid @RequestBody TriatletaDTO triatletaDTO) {//el parametro id viene de la url. toma el JSON del body 
        //y lo valida con @Valid
        try {
            TriatletaDTO actualizado = triatletaService.updateCompleto(id, triatletaDTO); //actualiza el triatleta delegando al service
            return ResponseEntity.ok(actualizado); //retorna HTTP 200 ok si todo sale bien
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); //retorna HTTP 404 si no existe
        }
    }

    /**
     * Expone y define el endpoint tipo PATCH para actualizar el nombre de un
     * triatleta por su id
     *
     * @param id
     * @param body
     * @return HTTP 200 (exito) HTTP 404 si falla
     */
    @RequestMapping(value = "/triatleta/actualizarnombre/{id}/nombre", method = RequestMethod.PATCH)//PATCH porque solo es un campo, no todo el objeto
    public ResponseEntity<?> updateNombre(@PathVariable("id") Long id, @Valid @RequestBody Map<String, String> body) {//toma el id de la URL
        //toma el JSON del body @RequestBody lo valida con  @Valid y lo guarda en el Map<>
        try {
            triatletaService.updateNombre(id, body.get("nombre")); //llama al service y extrae el nombre del Map<>
            return ResponseEntity.ok("Nombre actualizado"); //200 ok 
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); //404 si no lo encontro
        }
    }

    /**
     * Expone y define el endpoint tipo PATCH para actualizar la identificacion
     * de un triatleta por su id
     *
     * @param id
     * @param body
     * @return 200 ok si todo sale bien, 404 si no lo encontro
     */
    @RequestMapping(value = "/triatleta/actualizaridentificacion/{id}/identificacion", method = RequestMethod.PATCH) //PATCH porque solo modificamos un campo, no todo el objeto
    public ResponseEntity<?> updateIdentificacion(@PathVariable("id") Long id, @Valid @RequestBody Map<String, String> body) {//extrae el id de la URL
        //toma el JSON del body con la etiqueta @RequestBody, lo valida con @Valid y luego lo guarda en el Map<>
        try {
            triatletaService.updateIdentificacion(id, body.get("identificacion"));//llama al service y extrae la identificacion del Map<>
            return ResponseEntity.ok("Indentificacion actualizada"); //200 ok 
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); //404 si no lo encuentra
        }
    }

    /**
     * Expoen y define el endpoint tipo PATCH para actualizar el campo categoria
     * del triatleta
     *
     * @param id
     * @param body
     * @return 200 si todo salio bien, 404 si no lo encontro
     */
    @RequestMapping(value = "/triatleta/actualizarcategoria/{id}/categoria", method = RequestMethod.PATCH)//PATCH porque solo modificamos un campo, no todo el objeto
    public ResponseEntity<?> updateCategoria(@PathVariable("id") Long id, @Valid @RequestBody Map<String, String> body) {//Extrae el id de la URL, 
        //toma el JSON del body, lo valida con @Valid, luego lo guarda en el Map<>
        try {
            triatletaService.updateCategoria(id, body.get("categoria")); //delega a service para actualizar la categoria mandandole como parametro lo que extraiga de el campo categoria del Map<>
            return ResponseEntity.ok("Categoria actualizada"); //200 ok
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); //404, no lo encontro
        }
    }

    /**
     * Expone y define el endpoint tipo DELETE para borrar un triatleta
     *
     * @param id
     * @return 404 si no lo encontro, 200 si todo funciono
     */
    @RequestMapping(value = "/triatleta/borrartriatleta/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTriatleta(@PathVariable("id") Long id) {//extrae el id de la URL
        try {
            triatletaService.deleteTriatletaDTO(id); //delega al service para que lo borre por su id
            return ResponseEntity.ok("Triatleta Eliminado"); //200 ok
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());//404 si no lo encontro
        }
    }

}
