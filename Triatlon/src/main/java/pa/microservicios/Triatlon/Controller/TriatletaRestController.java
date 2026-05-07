/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import pa.microservicios.Triatlon.Service.TriatletaService;

/**
 *
 * @author Asus
 */
@RestController
public class TriatletaRestController {
    @Autowired
    private TriatletaService triatletaService;
}
