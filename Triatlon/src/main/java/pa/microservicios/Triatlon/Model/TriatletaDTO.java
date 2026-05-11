/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

/**
 *
 * @author Asus 
 * Entidad del modelo Triatleta con los siguientes atributos:
 * String urlFoto String categoria String modalidadCross String especialidad
 * LocalDate fechaNacimiento (tipo de dato abstracto de java)
 */
@EqualsAndHashCode(callSuper = true) //Para que incluya los campos de la superclase (clase padre) por eso esta en true
@Data //Getters y Setters
@Entity //Entidad a mapear ORM => objet relational mapping
@Table(name = "triatleta") //Nombre de la tabal que lo va a representar en la BD
@FieldDefaults(level = AccessLevel.PRIVATE) //Todos los atributos de nivel de acceso privado
public class TriatletaDTO extends Persona {

    @NotBlank //No puede ser en blanco
    //Nombre de la columna, no puede ser nula, no es unica, maxima cantidad 200 VarChar
    @Column(name = "url_foto", nullable = false, unique = false, length = 200)
    String urlFoto;

    @NotBlank
    @Column(name = "categoria", nullable = false, unique = false, length = 30)
    String categoria;

    @NotBlank
    @Column(name = "modalidad_cross", nullable = false, unique = false, length = 2)
    String modalidadCross;

    @NotBlank
    @Column(name = "especialidad", nullable = false, unique = false, length = 20)
    String especialidad;

    /**
     * Constructor de la clase hija, en este caso necesitamos los atributos de
     * la clase padre, por eso llamamos el super!
     * @param urlFoto
     * @param categoria
     * @param modalidadCross
     * @param especialidad
     * @param id
     * @param nombre
     * @param fechaNacimiento
     * @param identificacion
     * @param correo
     * @param genero
     * @param activo
     */
    public TriatletaDTO(String urlFoto, String categoria, String modalidadCross, String especialidad, Long id, String nombre, LocalDate fechaNacimiento, String identificacion, String correo, String genero, Boolean activo) {
        super(id, nombre, fechaNacimiento, identificacion, correo, genero, activo);
        this.urlFoto = urlFoto;
        this.categoria = categoria;
        this.modalidadCross = modalidadCross;
        this.especialidad = especialidad;
    }

}
